import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react'
import { soundFx } from '../utils/audio'

export const RADIO_STATIONS = [
  {
    id: 'cliamp-lofi',
    name: 'Lo-Fi Beats',
    url: 'https://radio.cliamp.stream/lofi/stream',
  },
  {
    id: 'cliamp-synthwave',
    name: 'Synthwave',
    url: 'https://radio.cliamp.stream/synthwave/stream',
  },
]

export const CliampPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [stationIndex, setStationIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const [volume, setVolume] = useState(70)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentStation = RADIO_STATIONS[stationIndex]

  useEffect(() => {
    const audio = new Audio()
    audio.crossOrigin = 'anonymous'
    audio.preload = 'none'
    audioRef.current = audio

    const onPlaying = () => {
      setIsLoading(false)
      setIsPlaying(true)
    }

    const onWaiting = () => {
      setIsLoading(true)
    }

    const onError = () => {
      setIsLoading(false)
      setIsPlaying(false)
    }

    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('error', onError)

    return () => {
      audio.pause()
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('error', onError)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  const togglePlay = async () => {
    soundFx.playClick('enter')
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)
      try {
        if (!audioRef.current.src || audioRef.current.src !== currentStation.url) {
          audioRef.current.src = currentStation.url
          audioRef.current.load()
        }
        await audioRef.current.play()
        setIsPlaying(true)
        setIsLoading(false)
      } catch (err) {
        console.error('Audio stream playback error:', err)
        setIsLoading(false)
        setIsPlaying(false)
      }
    }
  }

  const nextStation = (e: React.MouseEvent) => {
    e.stopPropagation()
    soundFx.playClick('key')
    const nextIdx = (stationIndex + 1) % RADIO_STATIONS.length
    setStationIndex(nextIdx)
    if (isPlaying && audioRef.current) {
      audioRef.current.src = RADIO_STATIONS[nextIdx].url
      audioRef.current.load()
      audioRef.current.play().catch(() => {})
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 font-mono text-xs select-none">
      <div
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
        className="bg-[#0D0F17]/95 border border-[#1E2436] hover:border-[#00F0FF]/40 rounded-full px-3.5 py-2 shadow-2xl backdrop-blur-md flex items-center gap-2.5 transition-all text-[#CBD5E1]"
      >
        {/* Animated equalizer bars / icon */}
        <div className="flex items-center space-x-1 text-[#00F0FF]">
          {isPlaying ? (
            <div className="flex items-end space-x-0.5 h-3.5 w-3">
              <span className="w-0.5 bg-[#00F0FF] h-2 animate-pulse" />
              <span className="w-0.5 bg-[#00F0FF] h-3.5 animate-pulse delay-75" />
              <span className="w-0.5 bg-[#00F0FF] h-1.5 animate-pulse delay-150" />
            </div>
          ) : (
            <Music className="w-3.5 h-3.5 text-[#64748B]" />
          )}
        </div>

        {/* Station name toggle */}
        <button
          onClick={nextStation}
          className="text-xs font-semibold text-[#F1F5F9] hover:text-[#00F0FF] transition-colors cursor-pointer"
          title="Click to switch radio station"
        >
          {isLoading ? 'Connecting...' : currentStation.name}
        </button>

        {/* Volume controls (visible on hover or active) */}
        {showVolume && (
          <div className="flex items-center space-x-2 pl-1 border-l border-[#22273A] animate-fade-in">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-[#94A3B8] hover:text-[#F1F5F9] cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-3 h-3 text-[#EF4444]" />
              ) : (
                <Volume2 className="w-3 h-3" />
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
              className="w-12 h-1 bg-[#1E2436] rounded-lg appearance-none cursor-pointer accent-[#00F0FF]"
              title="Volume"
            />
          </div>
        )}

        {/* Play / Pause Toggle Button */}
        <button
          onClick={togglePlay}
          className={`p-1.5 rounded-full cursor-pointer transition-colors ${
            isPlaying
              ? 'bg-[#00F0FF] text-[#08090C] hover:bg-[#38BDF8]'
              : 'bg-[#181C2C] text-[#F1F5F9] hover:bg-[#252B42]'
          }`}
          title={isPlaying ? 'Pause' : 'Play lo-fi radio'}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
      </div>
    </div>
  )
}
