import React, { useState, useEffect, useRef } from 'react'
import {
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Radio,
  Sliders,
  Maximize2,
  Minimize2,
  PlusCircle,
  BarChart2,
  Gauge,
  Activity,
} from 'lucide-react'
import { soundFx } from '../utils/audio'

export interface RadioStation {
  id: string
  name: string
  genre: string
  url: string
  bitrate: string
  description: string
}

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: 'cliamp-lofi',
    name: 'CLiAMP // Lo-Fi Coding Beats',
    genre: 'Lo-Fi / Chill / Study',
    url: 'https://radio.cliamp.stream/lofi/stream',
    bitrate: '128 kbps',
    description: 'Official CLIAMP stream • Chill lofi beats to hack/code to',
  },
  {
    id: 'cliamp-synthwave',
    name: 'CLiAMP // Synthwave 80s',
    genre: 'Synthwave / Outrun / Retro',
    url: 'https://radio.cliamp.stream/synthwave/stream',
    bitrate: '128 kbps',
    description: 'Official CLIAMP stream • Neon retrowave & nostalgic synth drives',
  },
  {
    id: 'cliamp-edm',
    name: 'CLiAMP // Cyber EDM',
    genre: 'Electronic / Bass / Dance',
    url: 'https://radio.cliamp.stream/edm/stream',
    bitrate: '128 kbps',
    description: 'Official CLIAMP stream • High-energy electronic & bass frequencies',
  },
  {
    id: 'nightwave-plaza',
    name: 'Nightwave Plaza // Vaporwave',
    genre: 'Vaporwave / Future Funk',
    url: 'https://radio.plaza.one/mp3',
    bitrate: '128 kbps',
    description: 'Aesthetic vaporwave, mallsoft, and nostalgic soundscapes 24/7',
  },
  {
    id: 'somafm-defcon',
    name: 'SomaFM // DEF CON Radio',
    genre: 'Cyberpunk / Hacker Ambient',
    url: 'https://ice1.somafm.com/defcon-128-mp3',
    bitrate: '128 kbps',
    description: 'Music for hackers and cyber security geeks from DEF CON conference',
  },
]

const EQ_FREQUENCIES = [
  '60Hz',
  '170Hz',
  '310Hz',
  '600Hz',
  '1kHz',
  '3kHz',
  '6kHz',
  '12kHz',
  '14kHz',
  '16kHz',
]

type VisualizerMode = 'spectrum' | 'vumeter' | 'oscilloscope'

export const CliampPlayer: React.FC = () => {
  const [stationIndex, setStationIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(75) // 0 - 100
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [showEqualizer, setShowEqualizer] = useState(false)
  const [showStationsList, setShowStationsList] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [customUrlInput, setCustomUrlInput] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [streamError, setStreamError] = useState<string | null>(null)

  // Visualizer Mode and Peak Hold toggles
  const [visMode, setVisMode] = useState<VisualizerMode>('spectrum')
  const [peakHoldEnabled, setPeakHoldEnabled] = useState(true)

  // 10-band EQ state (-12 to +12 dB)
  const [eqLevels, setEqLevels] = useState<number[]>([
    2, 4, 3, 1, 0, 2, 4, 5, 3, 2,
  ])
  const [eqEnabled, setEqEnabled] = useState(true)

  // Real-time spectrum analyzer bars (16 bands)
  const [spectrumBars, setSpectrumBars] = useState<number[]>(Array(16).fill(1))
  // Floating Peak Bars (0 to 8)
  const [peakBars, setPeakBars] = useState<number[]>(Array(16).fill(1))

  // Stereo Peak VU levels (0 - 100%)
  const [leftLevel, setLeftLevel] = useState(0)
  const [rightLevel, setRightLevel] = useState(0)
  const [leftPeak, setLeftPeak] = useState(0)
  const [rightPeak, setRightPeak] = useState(0)
  const [isOverload, setIsOverload] = useState(false)

  // Oscilloscope waveform points
  const [wavePoints, setWavePoints] = useState<number[]>(Array(32).fill(0))

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animFrameIdRef = useRef<number | null>(null)

  // Refs for tracking peak hold counters without re-triggering effect loops
  const peakHoldCountersRef = useRef<number[]>(Array(16).fill(0))
  const peakBarsRef = useRef<number[]>(Array(16).fill(1))
  const leftPeakRef = useRef<number>(0)
  const rightPeakRef = useRef<number>(0)
  const leftPeakHoldRef = useRef<number>(0)
  const rightPeakHoldRef = useRef<number>(0)

  const currentStation = RADIO_STATIONS[stationIndex]

  // Setup / Clean Audio Element
  useEffect(() => {
    const audio = new Audio()
    audio.crossOrigin = 'anonymous'
    audio.preload = 'none'
    audioRef.current = audio

    const handlePlaying = () => {
      setIsLoading(false)
      setIsPlaying(true)
      setStreamError(null)
    }

    const handleWaiting = () => {
      setIsLoading(true)
    }

    const handleError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      setStreamError('Stream connection error. Reconnecting or switch station.')
    }

    audio.addEventListener('playing', handlePlaying)
    audio.addEventListener('waiting', handleWaiting)
    audio.addEventListener('error', handleError)

    return () => {
      audio.pause()
      audio.removeEventListener('playing', handlePlaying)
      audio.removeEventListener('waiting', handleWaiting)
      audio.removeEventListener('error', handleError)
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {})
      }
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [])

  // Sync Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  // Track listening elapsed time
  useEffect(() => {
    let timer: any
    if (isPlaying) {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isPlaying])

  // Setup Web Audio Analyser when stream begins
  const initWebAudio = () => {
    if (!audioRef.current || audioContextRef.current) return

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 64
      analyser.smoothingTimeConstant = 0.75

      const source = ctx.createMediaElementSource(audioRef.current)
      source.connect(analyser)
      analyser.connect(ctx.destination)

      audioContextRef.current = ctx
      analyserRef.current = analyser
      sourceNodeRef.current = source
    } catch (e) {
      console.warn('Web Audio Analyser fallback mode:', e)
    }
  }

  // Animation Loop for Spectrum Analyzer, Peak Hold, Stereo VU Meters & Oscilloscope
  useEffect(() => {
    const updateVisualizers = () => {
      if (isPlaying) {
        let currentBars: number[] = []
        let currentWave: number[] = []

        if (analyserRef.current) {
          const freqData = new Uint8Array(analyserRef.current.frequencyBinCount)
          analyserRef.current.getByteFrequencyData(freqData)

          const timeData = new Uint8Array(analyserRef.current.fftSize)
          analyserRef.current.getByteTimeDomainData(timeData)

          // Sample 16 bins across the spectrum
          const step = Math.max(1, Math.floor(freqData.length / 16))
          for (let i = 0; i < 16; i++) {
            const rawVal = freqData[i * step] || 0
            const scaled = Math.min(8, Math.floor((rawVal / 255) * 8.8))
            currentBars.push(Math.max(1, scaled))
          }

          // Sample 32 points for oscilloscope
          const waveStep = Math.max(1, Math.floor(timeData.length / 32))
          for (let i = 0; i < 32; i++) {
            const raw = (timeData[i * waveStep] - 128) / 128
            currentWave.push(raw)
          }

          // Calculate Stereo Energy / VU meters
          let sumSq = 0
          for (let i = 0; i < timeData.length; i++) {
            const norm = (timeData[i] - 128) / 128
            sumSq += norm * norm
          }
          const rms = Math.sqrt(sumSq / timeData.length)
          const lRaw = Math.min(100, Math.round(rms * 190 + (currentBars[2] || 0) * 5))
          const rRaw = Math.min(100, Math.round(rms * 185 + (currentBars[11] || 0) * 5.5))

          setLeftLevel(lRaw)
          setRightLevel(rRaw)
          setIsOverload(lRaw > 92 || rRaw > 92)

          // Track Stereo Peak VU Meters with hold and gravity decay
          if (lRaw >= leftPeakRef.current) {
            leftPeakRef.current = lRaw
            leftPeakHoldRef.current = 15
          } else if (leftPeakHoldRef.current > 0) {
            leftPeakHoldRef.current--
          } else {
            leftPeakRef.current = Math.max(0, leftPeakRef.current - 2.5)
          }

          if (rRaw >= rightPeakRef.current) {
            rightPeakRef.current = rRaw
            rightPeakHoldRef.current = 15
          } else if (rightPeakHoldRef.current > 0) {
            rightPeakHoldRef.current--
          } else {
            rightPeakRef.current = Math.max(0, rightPeakRef.current - 2.5)
          }

          setLeftPeak(Math.round(leftPeakRef.current))
          setRightPeak(Math.round(rightPeakRef.current))
        } else {
          // Synthetic audio reactive simulation based on rhythm & sine waves
          const time = Date.now() / 200
          for (let i = 0; i < 16; i++) {
            const wave = Math.sin(time + i * 0.4) * 3.5 + Math.cos(time * 1.5 + i * 0.8) * 2.5 + 4
            currentBars.push(Math.min(8, Math.max(1, Math.floor(wave))))
          }

          for (let i = 0; i < 32; i++) {
            currentWave.push(Math.sin(time * 2 + i * 0.3) * 0.75)
          }

          const synL = Math.min(95, Math.max(20, Math.round(Math.abs(Math.sin(time)) * 85 + 10)))
          const synR = Math.min(95, Math.max(20, Math.round(Math.abs(Math.cos(time * 0.9)) * 85 + 10)))
          setLeftLevel(synL)
          setRightLevel(synR)
          setIsOverload(synL > 90 || synR > 90)

          if (synL >= leftPeakRef.current) {
            leftPeakRef.current = synL
            leftPeakHoldRef.current = 12
          } else if (leftPeakHoldRef.current > 0) {
            leftPeakHoldRef.current--
          } else {
            leftPeakRef.current = Math.max(0, leftPeakRef.current - 2)
          }

          if (synR >= rightPeakRef.current) {
            rightPeakRef.current = synR
            rightPeakHoldRef.current = 12
          } else if (rightPeakHoldRef.current > 0) {
            rightPeakHoldRef.current--
          } else {
            rightPeakRef.current = Math.max(0, rightPeakRef.current - 2)
          }

          setLeftPeak(Math.round(leftPeakRef.current))
          setRightPeak(Math.round(rightPeakRef.current))
        }

        setSpectrumBars(currentBars)
        setWavePoints(currentWave)

        // Calculate 16-Band Peak Hold with Gravity
        const nextPeaks = [...peakBarsRef.current]
        const nextCounters = [...peakHoldCountersRef.current]

        for (let i = 0; i < 16; i++) {
          const barVal = currentBars[i] || 1
          if (barVal >= nextPeaks[i]) {
            nextPeaks[i] = barVal
            nextCounters[i] = 14 // hold for ~230ms
          } else if (nextCounters[i] > 0) {
            nextCounters[i]--
          } else {
            // Smooth gravity descent
            nextPeaks[i] = Math.max(barVal, nextPeaks[i] - 0.22)
          }
        }

        peakBarsRef.current = nextPeaks
        peakHoldCountersRef.current = nextCounters
        setPeakBars(nextPeaks)
      } else {
        // Idle State: Decay smoothly to baseline
        setSpectrumBars(Array(16).fill(1))
        setPeakBars(Array(16).fill(1))
        setLeftLevel(0)
        setRightLevel(0)
        setLeftPeak(0)
        setRightPeak(0)
        setIsOverload(false)
        setWavePoints(Array(32).fill(0))
      }

      animFrameIdRef.current = requestAnimationFrame(updateVisualizers)
    }

    animFrameIdRef.current = requestAnimationFrame(updateVisualizers)
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [isPlaying])

  const startStream = async (url: string) => {
    if (!audioRef.current) return
    setIsLoading(true)
    setStreamError(null)

    try {
      initWebAudio()
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }
      audioRef.current.src = url
      audioRef.current.load()
      await audioRef.current.play()
      setIsPlaying(true)
      setIsLoading(false)
    } catch (err: any) {
      console.error('Audio play error:', err)
      setIsLoading(false)
      setIsPlaying(false)
      setStreamError('Playback blocked by browser or stream offline. Click Play to retry.')
    }
  }

  const handleTogglePlay = () => {
    soundFx.playClick('enter')
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setIsPlaying(false)
    } else {
      startStream(currentStation.url)
    }
  }

  const handleStop = () => {
    soundFx.playClick('key')
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
    setIsPlaying(false)
    setIsLoading(false)
    setElapsedSeconds(0)
  }

  const handleSelectStation = (index: number) => {
    soundFx.playClick('key')
    setStationIndex(index)
    setElapsedSeconds(0)
    if (isPlaying) {
      startStream(RADIO_STATIONS[index].url)
    }
  }

  const handlePrev = () => {
    const prevIdx = (stationIndex - 1 + RADIO_STATIONS.length) % RADIO_STATIONS.length
    handleSelectStation(prevIdx)
  }

  const handleNext = () => {
    const nextIdx = (stationIndex + 1) % RADIO_STATIONS.length
    handleSelectStation(nextIdx)
  }

  const handleAddCustomStream = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customUrlInput.trim()) return

    const newStation: RadioStation = {
      id: `custom-${Date.now()}`,
      name: `Custom Stream [${new URL(customUrlInput).hostname}]`,
      genre: 'User Stream',
      url: customUrlInput.trim(),
      bitrate: 'Live Stream',
      description: customUrlInput.trim(),
    }

    RADIO_STATIONS.push(newStation)
    setStationIndex(RADIO_STATIONS.length - 1)
    setCustomUrlInput('')
    setShowCustomInput(false)
    if (isPlaying) {
      startStream(newStation.url)
    }
  }

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="border border-[#282C3F] bg-[#0E101A] rounded-sm font-mono shadow-2xl overflow-hidden text-[#D8DEE9]">
      {/* Title Bar (Classic Winamp / CLiAMP Style) */}
      <div className="bg-gradient-to-r from-[#1E2235] via-[#2A2E45] to-[#1E2235] px-3 py-1.5 border-b border-[#282C3F] flex items-center justify-between select-none">
        <div className="flex items-center space-x-2 text-xs">
          <Radio className="w-3.5 h-3.5 text-[#CBA6F7] animate-pulse" />
          <span className="font-bold text-[#F5C2E7] tracking-wider">
            CLiAMP v2.95 // TERMINAL RADIO
          </span>
          <span className="hidden sm:inline-block text-[10px] text-[#A6E3A1] bg-[#162024] px-1.5 py-0.2 rounded border border-[#A6E3A1]/30">
            ONLINE STREAM
          </span>
        </div>

        {/* Window control buttons */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              soundFx.playClick('key')
              setShowEqualizer(!showEqualizer)
            }}
            className={`px-1.5 py-0.5 text-[10px] rounded border cursor-pointer ${
              showEqualizer
                ? 'bg-[#CBA6F7] text-[#111420] border-[#CBA6F7] font-bold'
                : 'bg-[#181B28] text-[#7F849C] border-[#282C3F] hover:text-[#D8DEE9]'
            }`}
            title="Toggle Graphic Equalizer"
          >
            EQ
          </button>
          <button
            onClick={() => {
              soundFx.playClick('key')
              setShowStationsList(!showStationsList)
            }}
            className={`px-1.5 py-0.5 text-[10px] rounded border cursor-pointer ${
              showStationsList
                ? 'bg-[#8BE9FD] text-[#111420] border-[#8BE9FD] font-bold'
                : 'bg-[#181B28] text-[#7F849C] border-[#282C3F] hover:text-[#D8DEE9]'
            }`}
            title="Toggle Station List"
          >
            PL
          </button>
          <button
            onClick={() => {
              soundFx.playClick('key')
              setIsMinimized(!isMinimized)
            }}
            className="p-1 text-[#7F849C] hover:text-[#D8DEE9] hover:bg-[#1F2438] rounded cursor-pointer"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? (
              <Maximize2 className="w-3 h-3" />
            ) : (
              <Minimize2 className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {/* Main Player Faceplate */}
      <div className="p-3 sm:p-4 bg-[#111422] space-y-3">
        {/* LCD / VFD Display Box */}
        <div className="p-2.5 bg-[#08090E] border border-[#23283E] rounded shadow-inner flex flex-col gap-2 relative overflow-hidden">
          {/* Top readout: Digital Clock + Status Badges */}
          <div className="flex items-center justify-between text-xs">
            {/* 7-Segment style Green LED Timer */}
            <div className="flex items-center space-x-2">
              <div className="bg-[#040608] px-2 py-0.5 rounded border border-[#1B2A1E] font-mono font-bold tracking-widest text-base text-[#A6E3A1] shadow-[inset_0_0_8px_rgba(166,227,161,0.2)]">
                {formatTimer(elapsedSeconds)}
              </div>
              <div className="text-[10px] text-[#7F849C] flex flex-col leading-tight">
                <span className={isPlaying ? 'text-[#A6E3A1] font-bold' : 'text-[#585B70]'}>
                  {isLoading ? 'BUFFERING' : isPlaying ? '● LIVE' : '○ READY'}
                </span>
                <span className="text-[#8BE9FD]">{currentStation.bitrate}</span>
              </div>
            </div>

            {/* Audio format indicators & Overload Clip Warning */}
            <div className="flex items-center space-x-1.5 text-[10px]">
              {isOverload && (
                <span className="px-1.5 py-0.5 rounded bg-[#F38BA8] text-[#111420] font-bold animate-pulse">
                  CLIP
                </span>
              )}
              <span className="px-1 py-0.5 rounded bg-[#1A1E30] text-[#CBA6F7] border border-[#2B314F]">
                44.1 kHz
              </span>
              <span className="px-1 py-0.5 rounded bg-[#1A1E30] text-[#F9E2AF] border border-[#2B314F]">
                STEREO
              </span>
              <span className="hidden sm:inline-block px-1 py-0.5 rounded bg-[#1A1E30] text-[#A6E3A1] border border-[#2B314F]">
                ICE/SHOUT
              </span>
            </div>
          </div>

          {/* Scrolling Marquee LCD Text */}
          <div className="bg-[#05070C] px-2 py-1.5 rounded border border-[#1A1E30] overflow-hidden whitespace-nowrap text-xs text-[#8BE9FD] relative">
            <div className={`inline-block font-mono ${isPlaying ? 'animate-marquee' : ''}`}>
              ♫ {currentStation.name} • [{currentStation.genre}] • {currentStation.description} •{' '}
              <span className="text-[#F5C2E7]">CLiAMP: IT REALLY WHIPS THE LLAMA'S ASS!</span> •{' '}
            </div>
          </div>

          {/* Visualizer Mode Header & Peak Hold Toggle */}
          <div className="flex items-center justify-between text-[10px] text-[#7F849C] pt-1 border-t border-[#141824] px-0.5">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => {
                  soundFx.playClick('key')
                  setVisMode('spectrum')
                }}
                className={`px-1.5 py-0.5 rounded border flex items-center gap-1 cursor-pointer transition-colors ${
                  visMode === 'spectrum'
                    ? 'bg-[#8BE9FD]/20 text-[#8BE9FD] border-[#8BE9FD]/40 font-bold'
                    : 'bg-[#101320] text-[#7F849C] border-[#1C2030] hover:text-[#D8DEE9]'
                }`}
                title="16-Band Equalizer with Floating Peak Caps"
              >
                <BarChart2 className="w-3 h-3" />
                <span>SPECTRUM+PEAKS</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick('key')
                  setVisMode('vumeter')
                }}
                className={`px-1.5 py-0.5 rounded border flex items-center gap-1 cursor-pointer transition-colors ${
                  visMode === 'vumeter'
                    ? 'bg-[#CBA6F7]/20 text-[#CBA6F7] border-[#CBA6F7]/40 font-bold'
                    : 'bg-[#101320] text-[#7F849C] border-[#1C2030] hover:text-[#D8DEE9]'
                }`}
                title="Dual Channel Peak VU Level Meters"
              >
                <Gauge className="w-3 h-3" />
                <span>STEREO VU</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick('key')
                  setVisMode('oscilloscope')
                }}
                className={`px-1.5 py-0.5 rounded border flex items-center gap-1 cursor-pointer transition-colors ${
                  visMode === 'oscilloscope'
                    ? 'bg-[#A6E3A1]/20 text-[#A6E3A1] border-[#A6E3A1]/40 font-bold'
                    : 'bg-[#101320] text-[#7F849C] border-[#1C2030] hover:text-[#D8DEE9]'
                }`}
                title="Live Audio Waveform Oscilloscope"
              >
                <Activity className="w-3 h-3" />
                <span>OSC WAVE</span>
              </button>
            </div>

            <button
              onClick={() => {
                soundFx.playClick('tab')
                setPeakHoldEnabled(!peakHoldEnabled)
              }}
              className={`px-1.5 py-0.5 rounded border text-[9px] cursor-pointer ${
                peakHoldEnabled
                  ? 'bg-[#F9E2AF]/15 text-[#F9E2AF] border-[#F9E2AF]/40'
                  : 'bg-[#101320] text-[#585B70] border-[#1C2030]'
              }`}
              title="Toggle floating peak hold markers"
            >
              PEAK HOLD: {peakHoldEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* VISUALIZER DISPLAY CONTAINER */}
          <div className="bg-[#040508] p-2 rounded border border-[#141824] min-h-[72px] flex flex-col justify-center">
            {/* MODE 1: 16-BAND SPECTRUM WITH FLOATING PEAK HOLD CAPS */}
            {visMode === 'spectrum' && (
              <div className="flex items-end justify-between gap-1 sm:gap-1.5 h-16 px-1">
                {spectrumBars.map((val, idx) => {
                  const peakVal = peakHoldEnabled
                    ? Math.min(8, Math.max(1, Math.round(peakBars[idx] || 1)))
                    : val

                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col justify-end items-center h-full relative group"
                    >
                      {/* Floating Peak Hold Cap with Gravity */}
                      {peakHoldEnabled && (
                        <div
                          className="absolute w-full h-[2.5px] rounded-xs transition-all duration-75 z-10"
                          style={{
                            bottom: `${Math.max(4, (peakVal / 8) * 100 - 4)}%`,
                            backgroundColor:
                              peakVal >= 7 ? '#F38BA8' : peakVal >= 4 ? '#F9E2AF' : '#8BE9FD',
                            boxShadow:
                              peakVal >= 7
                                ? '0 0 4px #F38BA8'
                                : peakVal >= 4
                                ? '0 0 3px #F9E2AF'
                                : '0 0 3px #8BE9FD',
                          }}
                        />
                      )}

                      {/* 8-Segment Vertical LED Bar */}
                      <div className="w-full flex flex-col justify-end gap-[1.5px] h-full">
                        {Array.from({ length: 8 }).map((_, segIdx) => {
                          const segLevel = 8 - segIdx
                          const isLit = val >= segLevel
                          const color =
                            segLevel >= 7
                              ? isLit
                                ? 'bg-[#F38BA8] shadow-[0_0_3px_#F38BA8]'
                                : 'bg-[#2A1622]/40'
                              : segLevel >= 4
                              ? isLit
                                ? 'bg-[#F9E2AF] shadow-[0_0_2px_#F9E2AF]'
                                : 'bg-[#2B271A]/40'
                              : isLit
                              ? 'bg-[#A6E3A1] shadow-[0_0_2px_#A6E3A1]'
                              : 'bg-[#14261B]/40'

                          return (
                            <div
                              key={segIdx}
                              className={`w-full h-[3.5px] rounded-xs transition-colors duration-75 ${color}`}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* MODE 2: DUAL STEREO PEAK VU METERS (CH-L & CH-R) */}
            {visMode === 'vumeter' && (
              <div className="space-y-2.5 py-0.5">
                {/* Left Channel */}
                <div>
                  <div className="flex justify-between text-[10px] text-[#7F849C] mb-1">
                    <span className="text-[#8BE9FD] font-bold">CH-L (LEFT)</span>
                    <span className="font-mono text-xs text-[#A6E3A1]">
                      PEAK:{' '}
                      <span className={leftPeak > 88 ? 'text-[#F38BA8] font-bold' : 'text-[#8BE9FD]'}>
                        {leftPeak > 88 ? '-0.8 dB' : leftPeak > 60 ? '-4.2 dB' : leftPeak > 30 ? '-10 dB' : '-22 dB'}
                      </span>{' '}
                      [{leftPeak}%]
                    </span>
                  </div>
                  <div className="h-3.5 bg-[#090C16] rounded-xs p-0.5 border border-[#1A1F30] relative overflow-hidden flex items-center">
                    {/* 28-Segment Bar */}
                    <div className="flex-1 flex gap-0.5 h-full">
                      {Array.from({ length: 28 }).map((_, i) => {
                        const threshold = (i / 28) * 100
                        const isLit = leftLevel >= threshold
                        const color =
                          i >= 23
                            ? isLit
                              ? 'bg-[#F38BA8] shadow-[0_0_4px_#F38BA8]'
                              : 'bg-[#2A1620]'
                            : i >= 16
                            ? isLit
                              ? 'bg-[#F9E2AF] shadow-[0_0_3px_#F9E2AF]'
                              : 'bg-[#262215]'
                            : isLit
                            ? 'bg-[#A6E3A1] shadow-[0_0_3px_#A6E3A1]'
                            : 'bg-[#122216]'

                        return <div key={i} className={`flex-1 h-full rounded-xs ${color}`} />
                      })}
                    </div>
                    {/* Peak Pointer Indicator */}
                    {peakHoldEnabled && (
                      <div
                        className="absolute top-0 bottom-0 w-1.5 bg-white shadow-[0_0_6px_#FFFFFF] rounded-xs transition-all duration-75"
                        style={{ left: `${Math.max(2, Math.min(97, leftPeak))}%` }}
                      />
                    )}
                  </div>
                </div>

                {/* Right Channel */}
                <div>
                  <div className="flex justify-between text-[10px] text-[#7F849C] mb-1">
                    <span className="text-[#CBA6F7] font-bold">CH-R (RIGHT)</span>
                    <span className="font-mono text-xs text-[#A6E3A1]">
                      PEAK:{' '}
                      <span className={rightPeak > 88 ? 'text-[#F38BA8] font-bold' : 'text-[#CBA6F7]'}>
                        {rightPeak > 88 ? '-0.5 dB' : rightPeak > 60 ? '-3.9 dB' : rightPeak > 30 ? '-9 dB' : '-21 dB'}
                      </span>{' '}
                      [{rightPeak}%]
                    </span>
                  </div>
                  <div className="h-3.5 bg-[#090C16] rounded-xs p-0.5 border border-[#1A1F30] relative overflow-hidden flex items-center">
                    {/* 28-Segment Bar */}
                    <div className="flex-1 flex gap-0.5 h-full">
                      {Array.from({ length: 28 }).map((_, i) => {
                        const threshold = (i / 28) * 100
                        const isLit = rightLevel >= threshold
                        const color =
                          i >= 23
                            ? isLit
                              ? 'bg-[#F38BA8] shadow-[0_0_4px_#F38BA8]'
                              : 'bg-[#2A1620]'
                            : i >= 16
                            ? isLit
                              ? 'bg-[#F9E2AF] shadow-[0_0_3px_#F9E2AF]'
                              : 'bg-[#262215]'
                            : isLit
                            ? 'bg-[#A6E3A1] shadow-[0_0_3px_#A6E3A1]'
                            : 'bg-[#122216]'

                        return <div key={i} className={`flex-1 h-full rounded-xs ${color}`} />
                      })}
                    </div>
                    {/* Peak Pointer Indicator */}
                    {peakHoldEnabled && (
                      <div
                        className="absolute top-0 bottom-0 w-1.5 bg-white shadow-[0_0_6px_#FFFFFF] rounded-xs transition-all duration-75"
                        style={{ left: `${Math.max(2, Math.min(97, rightPeak))}%` }}
                      />
                    )}
                  </div>
                </div>

                {/* dB Scale Legend */}
                <div className="flex justify-between text-[8px] text-[#585B70] px-1 font-mono pt-0.5">
                  <span>-30dB</span>
                  <span>-20dB</span>
                  <span>-12dB</span>
                  <span>-6dB</span>
                  <span>-3dB</span>
                  <span className="text-[#F9E2AF]">0dB</span>
                  <span className="text-[#F38BA8]">+3dB (CLIP)</span>
                </div>
              </div>
            )}

            {/* MODE 3: OSCILLOSCOPE WAVEFORM */}
            {visMode === 'oscilloscope' && (
              <div className="h-16 relative flex items-center justify-center overflow-hidden">
                {/* Center Baseline */}
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#1C2235] border-dashed" />
                {/* Upper / Lower Peak Envelope Limit Markers */}
                <div className="absolute inset-x-0 top-1.5 h-[1px] bg-[#F38BA8]/30 text-[8px] text-[#F38BA8] px-1 flex justify-between select-none">
                  <span>+1.0 PEAK</span>
                  <span>LIMIT</span>
                </div>
                <div className="absolute inset-x-0 bottom-1.5 h-[1px] bg-[#F38BA8]/30 text-[8px] text-[#F38BA8] px-1 flex justify-between select-none">
                  <span>-1.0 PEAK</span>
                  <span>LIMIT</span>
                </div>

                {/* SVG Oscilloscope Line */}
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                  <polyline
                    fill="none"
                    stroke="#8BE9FD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={wavePoints
                      .map((val, i) => {
                        const x = (i / (wavePoints.length - 1)) * 100
                        const y = 25 - val * 22
                        return `${x.toFixed(1)},${y.toFixed(1)}`
                      })
                      .join(' ')}
                    filter="drop-shadow(0 0 4px #8BE9FD)"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Error Notification if stream drops */}
        {streamError && (
          <div className="p-2 bg-[#2D1B28] border border-[#F38BA8]/40 rounded text-[11px] text-[#F38BA8] flex items-center justify-between">
            <span>⚠️ {streamError}</span>
            <button
              onClick={() => startStream(currentStation.url)}
              className="px-2 py-0.5 rounded bg-[#F38BA8]/20 hover:bg-[#F38BA8]/30 font-bold cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Playback Controls & Volume Rack */}
        {!isMinimized && (
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#1C2030]">
            {/* Transport Buttons */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={handlePrev}
                className="px-2 py-1.5 rounded bg-[#181B28] hover:bg-[#23283E] text-[#D8DEE9] hover:text-[#8BE9FD] border border-[#282C3F] text-xs font-mono transition-colors cursor-pointer"
                title="Previous Station (Z)"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleTogglePlay}
                disabled={isLoading}
                className="px-3.5 py-1.5 rounded bg-[#CBA6F7]/20 hover:bg-[#CBA6F7]/30 text-[#CBA6F7] border border-[#CBA6F7]/50 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shadow-[#CBA6F7]/20"
                title={isPlaying ? 'Pause Stream (C)' : 'Play Stream (X)'}
              >
                {isLoading ? (
                  <span className="animate-spin text-xs">◷</span>
                ) : isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                <span>{isLoading ? 'LOADING' : isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>

              <button
                onClick={handleStop}
                className="px-2.5 py-1.5 rounded bg-[#181B28] hover:bg-[#23283E] text-[#D8DEE9] hover:text-[#F38BA8] border border-[#282C3F] text-xs font-mono transition-colors cursor-pointer"
                title="Stop Stream (V)"
              >
                <Square className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleNext}
                className="px-2 py-1.5 rounded bg-[#181B28] hover:bg-[#23283E] text-[#D8DEE9] hover:text-[#8BE9FD] border border-[#282C3F] text-xs font-mono transition-colors cursor-pointer"
                title="Next Station (B)"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Station Name Badge */}
            <div className="text-[11px] text-[#7F849C] truncate max-w-[200px] hidden md:block">
              Station: <span className="text-[#D8DEE9]">{currentStation.name.split('//')[1] || currentStation.name}</span>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2 text-xs text-[#7F849C] w-full sm:w-auto justify-end">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-[#D8DEE9] cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-[#F38BA8]" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#A6E3A1]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value))
                  if (isMuted) setIsMuted(false)
                }}
                className="w-20 sm:w-24 accent-[#CBA6F7] cursor-pointer h-1.5 bg-[#1C2030] rounded-lg"
              />
              <span className="text-[10px] w-7 text-right font-mono text-[#A6E3A1]">
                {isMuted ? '0%' : `${volume}%`}
              </span>
            </div>
          </div>
        )}

        {/* Equalizer Drawer Panel (Classic 10-band) */}
        {showEqualizer && !isMinimized && (
          <div className="mt-3 pt-3 border-t border-[#1E2235] bg-[#0A0C14] p-3 rounded border border-[#23283E] space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#7F849C]">
              <div className="flex items-center space-x-2">
                <Sliders className="w-3 h-3 text-[#CBA6F7]" />
                <span className="font-bold text-[#D8DEE9]">10-BAND GRAPHIC EQUALIZER</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEqEnabled(!eqEnabled)}
                  className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer ${
                    eqEnabled
                      ? 'bg-[#A6E3A1]/20 text-[#A6E3A1] border-[#A6E3A1]/50'
                      : 'bg-[#181B28] text-[#585B70] border-[#282C3F]'
                  }`}
                >
                  {eqEnabled ? 'EQ ON' : 'EQ BYPASS'}
                </button>
                <button
                  onClick={() => setEqLevels([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])}
                  className="px-2 py-0.5 rounded text-[10px] bg-[#181B28] text-[#7F849C] border border-[#282C3F] hover:text-[#D8DEE9] cursor-pointer"
                >
                  FLAT
                </button>
              </div>
            </div>

            {/* Equalizer Sliders Rack */}
            <div className="grid grid-cols-10 gap-1.5 pt-2 pb-1">
              {EQ_FREQUENCIES.map((freq, i) => (
                <div key={freq} className="flex flex-col items-center space-y-1">
                  <div className="h-16 flex items-center justify-center">
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      value={eqLevels[i]}
                      onChange={(e) => {
                        const newLevels = [...eqLevels]
                        newLevels[i] = Number(e.target.value)
                        setEqLevels(newLevels)
                      }}
                      className="h-16 w-3 accent-[#8BE9FD] cursor-pointer appearance-none bg-[#141826] rounded-full [writing-mode:vertical-lr] [direction:rtl]"
                    />
                  </div>
                  <span className="text-[9px] text-[#7F849C] font-mono truncate w-full text-center">
                    {freq}
                  </span>
                  <span className="text-[8px] text-[#A6E3A1] font-mono">
                    {eqLevels[i] > 0 ? `+${eqLevels[i]}` : eqLevels[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Station Playlist Selector */}
        {showStationsList && !isMinimized && (
          <div className="mt-3 pt-3 border-t border-[#1E2235] bg-[#0A0C14] p-3 rounded border border-[#23283E] space-y-2">
            <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#1A1E30]">
              <span className="font-bold text-[#8BE9FD]">STREAM DIRECTORY (CLICK TO TUNE)</span>
              <button
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="text-[10px] text-[#CBA6F7] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3 h-3" />
                <span>Custom Stream</span>
              </button>
            </div>

            {/* Custom URL Input Box */}
            {showCustomInput && (
              <form onSubmit={handleAddCustomStream} className="flex items-center gap-2 pt-1 pb-2">
                <input
                  type="url"
                  placeholder="https://radio.example.com/stream"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  className="flex-1 bg-[#141826] border border-[#282C3F] rounded px-2 py-1 text-xs text-[#D8DEE9] placeholder-[#585B70] focus:border-[#CBA6F7] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-2 py-1 rounded bg-[#CBA6F7] text-[#111420] text-xs font-bold hover:bg-[#b088e8] cursor-pointer"
                >
                  Tune URL
                </button>
              </form>
            )}

            {/* List of stations */}
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {RADIO_STATIONS.map((st, idx) => {
                const isCurrent = idx === stationIndex
                return (
                  <div
                    key={st.id}
                    onClick={() => handleSelectStation(idx)}
                    className={`p-2 rounded text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      isCurrent
                        ? 'bg-[#1C2237] border border-[#CBA6F7]/40 text-[#F5C2E7]'
                        : 'bg-[#101320] border border-[#1A1E2E] text-[#7F849C] hover:bg-[#161B2E] hover:text-[#D8DEE9]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-[10px] text-[#585B70] font-mono">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <div className="truncate">
                        <div className="font-bold truncate text-[#D8DEE9]">{st.name}</div>
                        <div className="text-[10px] text-[#7F849C]">{st.genre}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-[10px] shrink-0 ml-2">
                      <span className="text-[#8BE9FD]">{st.bitrate}</span>
                      {isCurrent && isPlaying && (
                        <span className="text-[#A6E3A1] animate-pulse font-bold">● TUNED</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Retro Footer Status Line */}
      <div className="px-3 py-1 bg-[#090A12] border-t border-[#1A1E2E] flex items-center justify-between text-[10px] text-[#585B70]">
        <div className="truncate">
          SOURCE: <span className="text-[#8BE9FD]">{currentStation.url}</span>
        </div>
        <div className="shrink-0 flex items-center space-x-2">
          <span>BUFF: 512KB</span>
          <span>•</span>
          <span className="text-[#A6E3A1]">PEAKS: ACTIVE</span>
        </div>
      </div>
    </div>
  )
}
