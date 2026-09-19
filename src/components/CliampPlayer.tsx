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
  freq: string
}

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: 'cliamp-lofi',
    name: 'CLiAMP // Lo-Fi Coding Beats',
    genre: 'Lo-Fi / Chill / Study',
    url: 'https://radio.cliamp.stream/lofi/stream',
    bitrate: '128 kbps',
    description: 'Official CLIAMP stream • Chill lofi beats to hack/code to',
    freq: '140.85 MHz',
  },
  {
    id: 'cliamp-synthwave',
    name: 'CLiAMP // Synthwave 80s',
    genre: 'Synthwave / Outrun / Retro',
    url: 'https://radio.cliamp.stream/synthwave/stream',
    bitrate: '128 kbps',
    description: 'Official CLIAMP stream • Neon retrowave & nostalgic synth drives',
    freq: '141.12 MHz',
  },
  {
    id: 'cliamp-edm',
    name: 'CLiAMP // Cyber EDM',
    genre: 'Electronic / Bass / Dance',
    url: 'https://radio.cliamp.stream/edm/stream',
    bitrate: '128 kbps',
    description: 'Official CLIAMP stream • High-energy electronic & bass frequencies',
    freq: '142.33 MHz',
  },
  {
    id: 'nightwave-plaza',
    name: 'Nightwave Plaza // Vaporwave',
    genre: 'Vaporwave / Future Funk',
    url: 'https://radio.plaza.one/mp3',
    bitrate: '128 kbps',
    description: 'Aesthetic vaporwave, mallsoft, and nostalgic soundscapes 24/7',
    freq: '143.75 MHz',
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

  // MGS2 Tactical Volume HUD Controller (Mouse Wheel & Pointer Drag)
  const [isDraggingVolume, setIsDraggingVolume] = useState(false)
  const volumeContainerRef = useRef<HTMLDivElement>(null)

  const updateVolumeFromPointer = (clientX: number) => {
    if (!volumeContainerRef.current) return
    const rect = volumeContainerRef.current.getBoundingClientRect()
    const pct = Math.round(((clientX - rect.left) / rect.width) * 100)
    const clamped = Math.max(0, Math.min(100, pct))
    setVolume(clamped)
    if (isMuted) setIsMuted(false)
  }

  // Pointer dragging handler across document
  useEffect(() => {
    if (!isDraggingVolume) return
    const onMouseMove = (e: MouseEvent) => {
      updateVolumeFromPointer(e.clientX)
    }
    const onMouseUp = () => {
      setIsDraggingVolume(false)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDraggingVolume, isMuted])

  // Native wheel event with passive: false to prevent background page scroll while scrolling volume
  useEffect(() => {
    const el = volumeContainerRef.current
    if (!el) return

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const delta = e.deltaY < 0 ? 5 : -5
      setVolume((prev) => {
        const next = Math.max(0, Math.min(100, prev + delta))
        return next
      })
      setIsMuted(false)
      soundFx.playClick('key')
    }

    el.addEventListener('wheel', handleNativeWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', handleNativeWheel)
    }
  }, [])

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
      freq: '145.00 MHz',
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
    <div className="relative border-2 border-[#282C3F] bg-[#0E101A] rounded-sm font-mono shadow-2xl overflow-hidden text-[#D8DEE9]">
      {/* MGS2 Tactical Corner Reticle Accents */}
      <span className="absolute top-0 left-0 text-[#8BE9FD] text-[11px] font-mono select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD]">
        ┌──
      </span>
      <span className="absolute top-0 right-0 text-[#8BE9FD] text-[11px] font-mono select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD]">
        ──┐
      </span>
      <span className="absolute bottom-0 left-0 text-[#8BE9FD] text-[11px] font-mono select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD]">
        └──
      </span>
      <span className="absolute bottom-0 right-0 text-[#8BE9FD] text-[11px] font-mono select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD]">
        ──┘
      </span>

      {/* Title Bar (MGS2 Codec Receiver Style) */}
      <div className="bg-[#090C15] px-3 py-2 border-b border-[#23283E] flex items-center justify-between select-none relative overflow-hidden">
        <div className="flex items-center space-x-2 text-xs">
          <Radio className="w-3.5 h-3.5 text-[#8BE9FD] animate-pulse" />
          <span className="font-bold text-[#8BE9FD] tracking-wider">
            MGS2 CODEC RX
          </span>
          <span className="text-[#CBA6F7] text-[10px] hidden sm:inline-block">
            // FREQ: {currentStation.freq}
          </span>
          <span className="hidden md:inline-block text-[9px] text-[#A6E3A1] bg-[#0E1B1B] px-1.5 py-0.5 rounded border border-[#A6E3A1]/30 font-mono">
            BURST LINK: OPTIMAL
          </span>
        </div>

        {/* Window control buttons */}
        <div className="flex items-center space-x-1.5 text-[10px] font-mono">
          <button
            onClick={() => {
              soundFx.playClick('key')
              setShowEqualizer(!showEqualizer)
            }}
            className={`px-2 py-0.5 rounded border cursor-pointer transition-colors ${
              showEqualizer
                ? 'bg-[#CBA6F7] text-[#0A0C14] border-[#CBA6F7] font-bold shadow-[0_0_6px_#CBA6F7]'
                : 'bg-[#121524] text-[#7F849C] border-[#282C3F] hover:text-[#D8DEE9]'
            }`}
            title="Toggle Graphic Equalizer"
          >
            [EQ]
          </button>
          <button
            onClick={() => {
              soundFx.playClick('key')
              setShowStationsList(!showStationsList)
            }}
            className={`px-2 py-0.5 rounded border cursor-pointer transition-colors ${
              showStationsList
                ? 'bg-[#8BE9FD] text-[#0A0C14] border-[#8BE9FD] font-bold shadow-[0_0_6px_#8BE9FD]'
                : 'bg-[#121524] text-[#7F849C] border-[#282C3F] hover:text-[#D8DEE9]'
            }`}
            title="Toggle Frequency Memory Presets"
          >
            [MEM]
          </button>
          <button
            onClick={() => {
              soundFx.playClick('key')
              setIsMinimized(!isMinimized)
            }}
            className="p-1 text-[#7F849C] hover:text-[#8BE9FD] hover:bg-[#1C2034] rounded border border-transparent hover:border-[#282C3F] cursor-pointer"
            title={isMinimized ? 'Expand Codec' : 'Minimize Codec'}
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
      <div className="p-3 sm:p-4 bg-[#0F121F] space-y-3">
        {/* LCD / Codec Display Box */}
        <div className="p-2.5 bg-[#060810] border border-[#1E2538] rounded shadow-inner flex flex-col gap-2 relative overflow-hidden">
          {/* Tactical Crosshair Reticles in Corners */}
          <span className="absolute top-1 left-1 text-[#8BE9FD]/50 text-[10px] font-mono select-none pointer-events-none">+</span>
          <span className="absolute top-1 right-1 text-[#8BE9FD]/50 text-[10px] font-mono select-none pointer-events-none">+</span>
          <span className="absolute bottom-1 left-1 text-[#8BE9FD]/50 text-[10px] font-mono select-none pointer-events-none">+</span>
          <span className="absolute bottom-1 right-1 text-[#8BE9FD]/50 text-[10px] font-mono select-none pointer-events-none">+</span>

          {/* Top readout: Digital Clock + Telemetry + Format Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            {/* 7-Segment style Green LED Timer & Frequency dial */}
            <div className="flex items-center space-x-2.5">
              <div className="bg-[#030606] px-2.5 py-0.5 rounded border border-[#162E20] font-mono font-bold tracking-widest text-base text-[#A6E3A1] shadow-[inset_0_0_8px_rgba(166,227,161,0.25)] drop-shadow-[0_0_4px_rgba(166,227,161,0.4)]">
                {formatTimer(elapsedSeconds)}
              </div>
              <div className="text-[10px] font-mono flex flex-col leading-tight">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[#8BE9FD] font-bold">RX: {currentStation.freq}</span>
                  <span className="text-[#585B70]">|</span>
                  <span className={isPlaying ? 'text-[#A6E3A1] font-bold' : 'text-[#585B70]'}>
                    {isLoading ? 'HANDSHAKE...' : isPlaying ? '● BURST LINK' : '○ STANDBY'}
                  </span>
                </div>
                {/* S-Meter Signal Strength Bar */}
                <div className="flex items-center space-x-1.5 text-[9px] text-[#7F849C] mt-0.5">
                  <span className="text-[#8BE9FD]">S-MTR:</span>
                  <div className="flex gap-[1px]">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-[1px] ${
                          isPlaying
                            ? i < 7
                              ? 'bg-[#A6E3A1] shadow-[0_0_2px_#A6E3A1]'
                              : 'bg-[#F9E2AF]'
                            : 'bg-[#15231B]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#A6E3A1]">99.4%</span>
                </div>
              </div>
            </div>

            {/* Audio format indicators & Overload Clip Warning */}
            <div className="flex items-center space-x-1.5 text-[10px]">
              {isOverload && (
                <span className="px-1.5 py-0.5 rounded bg-[#F38BA8] text-[#111420] font-bold animate-pulse shadow-[0_0_6px_#F38BA8]">
                  CLIP
                </span>
              )}
              <span className="px-1.5 py-0.5 rounded bg-[#0E1524] text-[#CBA6F7] border border-[#232E48]">
                44.1 kHz
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#0E1524] text-[#F9E2AF] border border-[#232E48]">
                STEREO
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#0E1B1B] text-[#A6E3A1] border border-[#1D3528]">
                CIPHER: S-1002
              </span>
            </div>
          </div>

          {/* Scrolling Marquee LCD Text */}
          <div className="bg-[#04060C] px-2.5 py-1.5 rounded border border-[#161C2C] overflow-hidden whitespace-nowrap text-xs text-[#8BE9FD] relative">
            <div className={`inline-block font-mono ${isPlaying ? 'animate-marquee' : ''}`}>
              ♫ CODEC RX // {currentStation.name} • [{currentStation.genre}] • FREQ: {currentStation.freq} • {currentStation.description} •{' '}
              <span className="text-[#F5C2E7]">CLIAMP PROTOCOL // BURST AUDIO CIPHER ACTIVE</span> •{' '}
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
            {/* Tactical MGS2 Transport Buttons */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={handlePrev}
                className="px-2.5 py-1.5 rounded bg-[#111422] hover:bg-[#1A2035] text-[#D8DEE9] hover:text-[#8BE9FD] border border-[#232B40] text-xs font-mono transition-colors cursor-pointer flex items-center gap-1"
                title="Previous Frequency (Z)"
              >
                <SkipBack className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px] font-bold">PREV</span>
              </button>

              <button
                onClick={handleTogglePlay}
                disabled={isLoading}
                className={`px-3.5 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isPlaying
                    ? 'bg-[#A6E3A1]/20 text-[#A6E3A1] border border-[#A6E3A1]/60 shadow-[0_0_10px_rgba(166,227,161,0.25)]'
                    : 'bg-[#8BE9FD]/20 hover:bg-[#8BE9FD]/30 text-[#8BE9FD] border border-[#8BE9FD]/50 shadow-sm shadow-[#8BE9FD]/20'
                }`}
                title={isPlaying ? 'Hold Transmission (C)' : 'Transmit Frequency (X)'}
              >
                {isLoading ? (
                  <span className="animate-spin text-xs">◷</span>
                ) : isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                <span>{isLoading ? 'CIPHER...' : isPlaying ? 'HOLD' : 'TRANSMIT'}</span>
              </button>

              <button
                onClick={handleStop}
                className="px-2.5 py-1.5 rounded bg-[#111422] hover:bg-[#1A2035] text-[#D8DEE9] hover:text-[#F38BA8] border border-[#232B40] text-xs font-mono transition-colors cursor-pointer flex items-center gap-1"
                title="Abort Transmission (V)"
              >
                <Square className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">ABORT</span>
              </button>

              <button
                onClick={handleNext}
                className="px-2.5 py-1.5 rounded bg-[#111422] hover:bg-[#1A2035] text-[#D8DEE9] hover:text-[#8BE9FD] border border-[#232B40] text-xs font-mono transition-colors cursor-pointer flex items-center gap-1"
                title="Next Frequency (B)"
              >
                <span className="hidden sm:inline text-[10px] font-bold">NEXT</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Preset Badge */}
            <div className="text-[11px] text-[#7F849C] truncate max-w-[200px] hidden md:flex items-center gap-1.5 font-mono">
              <span className="text-[#8BE9FD] text-[10px] bg-[#0E1524] px-1.5 py-0.5 rounded border border-[#232E48]">
                CH 0{stationIndex + 1}
              </span>
              <span className="text-[#D8DEE9] truncate">{currentStation.name.split('//')[1]?.trim() || currentStation.name}</span>
            </div>

            {/* Tactical MGS2 Volume HUD Rack with Mouse Wheel & Pointer Scrub */}
            <div
              className="flex items-center space-x-2.5 bg-[#090C16] border border-[#1F273B] rounded px-2.5 py-1.5 select-none relative group hover:border-[#8BE9FD]/50 transition-colors"
              title="Mouse wheel scroll up/down or click & drag to adjust volume"
            >
              {/* Mute / Stealth Toggle Button */}
              <button
                onClick={() => {
                  soundFx.playClick('key')
                  setIsMuted(!isMuted)
                }}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  isMuted || volume === 0
                    ? 'text-[#F38BA8] hover:bg-[#F38BA8]/20 bg-[#2B1622]'
                    : 'text-[#A6E3A1] hover:bg-[#A6E3A1]/20 hover:text-[#8BE9FD]'
                }`}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio (Silent Mode)'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Volume Ladder & Real-Time Readout */}
              <div className="flex flex-col gap-0.5">
                {/* Micro Header: VOL GAIN [WHEEL ⇕] and dB Level */}
                <div className="flex items-center justify-between text-[9px] font-mono text-[#7F849C] leading-none">
                  <span className="text-[#8BE9FD] flex items-center gap-1">
                    <span>VOL GAIN</span>
                    <span className="text-[#585B70] text-[8px] group-hover:text-[#8BE9FD] transition-colors">[WHEEL ⇕]</span>
                  </span>
                  <span className="text-[#A6E3A1] font-mono">
                    {isMuted || volume === 0
                      ? '-∞ dB'
                      : `${(20 * Math.log10(volume / 100)).toFixed(1)} dB`}
                  </span>
                </div>

                {/* 20-Segment Tactical LED Ladder Rack */}
                <div
                  ref={volumeContainerRef}
                  onMouseDown={(e) => {
                    setIsDraggingVolume(true)
                    updateVolumeFromPointer(e.clientX)
                    soundFx.playClick('key')
                  }}
                  className="h-3.5 w-36 sm:w-44 bg-[#05070E] border border-[#1A2234] rounded-xs p-[2px] flex items-center gap-[2px] cursor-ew-resize relative group-hover:border-[#8BE9FD]/50 transition-colors shadow-inner"
                >
                  {Array.from({ length: 20 }).map((_, idx) => {
                    const stepPct = (idx + 1) * 5
                    const isLit = !isMuted && volume >= stepPct
                    const color =
                      idx >= 17
                        ? isLit
                          ? 'bg-[#F38BA8] shadow-[0_0_5px_#F38BA8]'
                          : 'bg-[#2A1520]'
                        : idx >= 12
                        ? isLit
                          ? 'bg-[#F9E2AF] shadow-[0_0_4px_#F9E2AF]'
                          : 'bg-[#282416]'
                        : isLit
                        ? 'bg-[#8BE9FD] shadow-[0_0_4px_#8BE9FD]'
                        : 'bg-[#121E2B]'

                    return (
                      <div
                        key={idx}
                        className={`flex-1 h-full rounded-[1px] transition-all duration-75 ${color}`}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Numerical Percentage Display */}
              <div className="font-mono text-xs text-right w-8">
                <span className={isMuted || volume === 0 ? 'text-[#F38BA8]' : 'text-[#8BE9FD] font-bold'}>
                  {isMuted ? 'MUT' : `${volume}%`}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Equalizer Drawer Panel (MGS2 10-band DSP) */}
        {showEqualizer && !isMinimized && (
          <div className="mt-3 pt-3 border-t border-[#1E2538] bg-[#070912] p-3 rounded border border-[#1F273B] space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#7F849C] font-mono">
              <div className="flex items-center space-x-2">
                <Sliders className="w-3.5 h-3.5 text-[#CBA6F7]" />
                <span className="font-bold text-[#D8DEE9]">MGS2 AUDIO FREQ MODULATOR (10-BAND DSP)</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEqEnabled(!eqEnabled)}
                  className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer font-mono ${
                    eqEnabled
                      ? 'bg-[#A6E3A1]/20 text-[#A6E3A1] border-[#A6E3A1]/50 shadow-[0_0_4px_rgba(166,227,161,0.3)]'
                      : 'bg-[#181B28] text-[#585B70] border-[#282C3F]'
                  }`}
                >
                  {eqEnabled ? '[EQ ACTIVE]' : '[EQ BYPASS]'}
                </button>
                <button
                  onClick={() => setEqLevels([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])}
                  className="px-2 py-0.5 rounded text-[10px] bg-[#121624] text-[#7F849C] border border-[#232B40] hover:text-[#D8DEE9] cursor-pointer font-mono"
                >
                  [FLAT]
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
                      className="h-16 w-3 accent-[#8BE9FD] cursor-pointer appearance-none bg-[#101422] rounded-full [writing-mode:vertical-lr] [direction:rtl]"
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

        {/* Station Frequency Memory Presets Selector */}
        {showStationsList && !isMinimized && (
          <div className="mt-3 pt-3 border-t border-[#1E2538] bg-[#070912] p-3 rounded border border-[#1F273B] space-y-2">
            <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#1A2234] font-mono">
              <span className="font-bold text-[#8BE9FD]">CODEC FREQUENCY MEMORY (CLICK TO TUNE)</span>
              <button
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="text-[10px] text-[#CBA6F7] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3 h-3" />
                <span>+ Custom Stream</span>
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
                  className="flex-1 bg-[#0E121E] border border-[#232B40] rounded px-2 py-1 text-xs text-[#D8DEE9] placeholder-[#585B70] focus:border-[#8BE9FD] focus:outline-none font-mono"
                  required
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded bg-[#8BE9FD] text-[#0A0C14] text-xs font-bold hover:bg-[#a6f0ff] cursor-pointer font-mono"
                >
                  Tune URL
                </button>
              </form>
            )}

            {/* List of Codec Preset Stations */}
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {RADIO_STATIONS.map((st, idx) => {
                const isCurrent = idx === stationIndex
                return (
                  <div
                    key={st.id}
                    onClick={() => handleSelectStation(idx)}
                    className={`p-2 rounded text-xs flex items-center justify-between cursor-pointer transition-colors font-mono ${
                      isCurrent
                        ? 'bg-[#141D30] border border-[#8BE9FD]/50 text-[#8BE9FD] shadow-[0_0_6px_rgba(139,233,253,0.15)]'
                        : 'bg-[#0A0D18] border border-[#161D2E] text-[#7F849C] hover:bg-[#12172A] hover:text-[#D8DEE9]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-[10px] text-[#585B70]">
                        MEM-0{idx + 1}
                      </span>
                      <span className="text-[10px] text-[#8BE9FD] font-bold">
                        [{st.freq}]
                      </span>
                      <div className="truncate">
                        <span className="font-bold text-[#D8DEE9] mr-2">{st.name}</span>
                        <span className="text-[10px] text-[#7F849C]">({st.genre})</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-[10px] shrink-0 ml-2">
                      <span className="text-[#A6E3A1]">{st.bitrate}</span>
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

      {/* MGS2 Telemetry Footer Status Line */}
      <div className="px-3 py-1.5 bg-[#060810] border-t border-[#182030] flex items-center justify-between text-[10px] text-[#585B70] font-mono select-none">
        <div className="truncate flex items-center space-x-2">
          <span className="text-[#8BE9FD]">RX SOURCE:</span>
          <span className="text-[#D8DEE9] truncate max-w-[280px] sm:max-w-md">{currentStation.url}</span>
        </div>
        <div className="shrink-0 flex items-center space-x-2">
          <span className="text-[#CBA6F7]">CIPHER: S-1002</span>
          <span>•</span>
          <span className="text-[#A6E3A1]">BURST: ACTIVE</span>
        </div>
      </div>
    </div>
  )
}
