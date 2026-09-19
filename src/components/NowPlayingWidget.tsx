import React, { useState, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Disc } from 'lucide-react'
import { AUDIO_TRACKS } from '../data/portfolioData'
import { soundFx } from '../utils/audio'

export const NowPlayingWidget: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(42) // seconds
  const [eqBars, setEqBars] = useState<number[]>([3, 5, 8, 4, 7, 9, 6, 4, 8, 5, 3, 7])

  const track = AUDIO_TRACKS[currentTrackIndex]

  // Track progress timer
  useEffect(() => {
    let timer: any
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= track.duration) {
            handleNext()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isPlaying, track.duration])

  // Animated ASCII visualizer bars
  useEffect(() => {
    let eqTimer: any
    if (isPlaying) {
      eqTimer = setInterval(() => {
        setEqBars(Array.from({ length: 14 }, () => Math.floor(Math.random() * 8) + 1))
      }, 150)
    } else {
      setEqBars([2, 2, 3, 2, 1, 2, 3, 2, 2, 1, 2, 3, 2, 1])
    }
    return () => clearInterval(eqTimer)
  }, [isPlaying])

  const handleTogglePlay = () => {
    soundFx.playClick('enter')
    if (isPlaying) {
      soundFx.stopMusic()
      setIsPlaying(false)
    } else {
      soundFx.startMusic(currentTrackIndex)
      setIsPlaying(true)
    }
  }

  const handleNext = () => {
    soundFx.playClick('key')
    const nextIdx = (currentTrackIndex + 1) % AUDIO_TRACKS.length
    setCurrentTrackIndex(nextIdx)
    setCurrentTime(0)
    if (isPlaying) {
      soundFx.startMusic(nextIdx)
    }
  }

  const handlePrev = () => {
    soundFx.playClick('key')
    const prevIdx = (currentTrackIndex - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length
    setCurrentTrackIndex(prevIdx)
    setCurrentTime(0)
    if (isPlaying) {
      soundFx.startMusic(prevIdx)
    }
  }

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const progressPercent = Math.min(100, Math.round((currentTime / track.duration) * 100))

  const asciiEqualizerChar = (val: number) => {
    const chars = [' ', ' ', '▂', '▃', '▄', '▅', '▆', '▇', '█']
    return chars[Math.min(chars.length - 1, val)]
  }

  return (
    <div className="border border-[#282C3F] bg-[#111420]/95 rounded-sm p-4 font-mono shadow-lg relative overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1E2235] text-xs">
        <div className="flex items-center space-x-2 text-[#F5C2E7]">
          <Music className="w-3.5 h-3.5 text-[#F5C2E7] animate-pulse" />
          <span className="font-bold tracking-wider">♫ NOW PLAYING</span>
        </div>
        <div className="text-[11px] text-[#7F849C] flex items-center space-x-2">
          <span>{isPlaying ? '● PLAYING (WEBAUDIO)' : '○ PAUSED'}</span>
          <span>•</span>
          <span className="text-[#8BE9FD]">{track.bpm} BPM</span>
        </div>
      </div>

      {/* Main Track Layout */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Album Art Pixel / ASCII Vinyl */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#090A10] rounded border border-[#23283E] flex flex-col items-center justify-center p-2 relative group shrink-0">
          <Disc
            className={`w-12 h-12 text-[#CBA6F7] transition-all duration-1000 ${
              isPlaying ? 'animate-spin' : ''
            }`}
          />
          <span className="text-[9px] text-[#7F849C] mt-1 text-center font-mono">
            {track.genre.split(' ')[0]}
          </span>
        </div>

        {/* Track Details & Visualizer */}
        <div className="flex-1 w-full text-center sm:text-left">
          <div className="text-sm sm:text-base font-bold text-[#D8DEE9] truncate">
            {track.title}
          </div>
          <div className="text-xs text-[#8BE9FD] font-medium mt-0.5">
            {track.artist}
          </div>
          <div className="text-[11px] text-[#7F849C] truncate">
            {track.album}
          </div>

          {/* ASCII Soundwave Visualizer */}
          <div className="mt-2 text-[#A6E3A1] text-xs tracking-widest select-none drop-shadow-[0_0_5px_rgba(166,227,161,0.5)]">
            {eqBars.map((val, i) => (
              <span key={i}>{asciiEqualizerChar(val)}</span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-2 flex items-center space-x-2 text-[10px] text-[#7F849C]">
            <span>{formatSeconds(currentTime)}</span>
            <div className="flex-1 bg-[#1A1D2B] h-1.5 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPercent}%` }}
                className="bg-[#8BE9FD] h-full transition-all duration-300"
              />
            </div>
            <span>{formatSeconds(track.duration)}</span>
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="mt-4 pt-3 border-t border-[#1E2235] flex items-center justify-between">
        <div className="text-[11px] text-[#7F849C] hidden sm:block">
          Track {currentTrackIndex + 1} of {AUDIO_TRACKS.length}
        </div>

        <div className="flex items-center space-x-2 mx-auto sm:mx-0">
          <button
            onClick={handlePrev}
            className="px-2.5 py-1 rounded bg-[#181B28] hover:bg-[#23283E] text-[#D8DEE9] hover:text-[#8BE9FD] border border-[#282C3F] text-xs font-mono transition-colors cursor-pointer flex items-center gap-1"
            title="Previous Track"
          >
            <SkipBack className="w-3 h-3" />
            <span className="hidden sm:inline">PREV</span>
          </button>

          <button
            onClick={handleTogglePlay}
            className="px-3 py-1 rounded bg-[#CBA6F7]/20 hover:bg-[#CBA6F7]/30 text-[#CBA6F7] border border-[#CBA6F7]/50 text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm shadow-[#CBA6F7]/20"
            title={isPlaying ? 'Pause Track' : 'Play Lo-Fi Chords'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            className="px-2.5 py-1 rounded bg-[#181B28] hover:bg-[#23283E] text-[#D8DEE9] hover:text-[#8BE9FD] border border-[#282C3F] text-xs font-mono transition-colors cursor-pointer flex items-center gap-1"
            title="Next Track"
          >
            <span className="hidden sm:inline">NEXT</span>
            <SkipForward className="w-3 h-3" />
          </button>
        </div>

        <div className="text-[11px] text-[#A6E3A1] hidden sm:flex items-center space-x-1">
          <Volume2 className="w-3 h-3" />
          <span>80%</span>
        </div>
      </div>
    </div>
  )
}
