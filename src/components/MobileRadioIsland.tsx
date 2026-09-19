import React, { useState } from 'react'
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronUp,
  X,
  Disc3,
  Radio,
} from 'lucide-react'
import { soundFx } from '../utils/audio'
import vinylArt from '../assets/vinyl-art.webp'
import { useRadioPlayer, RADIO_STATIONS } from '../utils/radioPlayer'

export const MobileRadioIsland: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const {
    stationIndex,
    isPlaying,
    isLoading,
    isMuted,
    volume,
    elapsedSeconds,
    currentStation,
    togglePlay,
    selectStation,
    nextStation,
    setVolume,
    toggleMute,
  } = useRadioPlayer()

  const handleTogglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    soundFx.playClick('enter')
    togglePlay()
  }

  const handleNextStation = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    soundFx.playClick('key')
    nextStation()
  }

  const handleSelect = (idx: number) => {
    soundFx.playClick('key')
    selectStation(idx)
  }

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <>
      {/* ── 1. Compact Floating Cyber Island Pill (Bottom of Screen on Mobile) ── */}
      <div className="md:hidden fixed bottom-4 inset-x-3 z-40 max-w-sm mx-auto font-mono select-none">
        <div
          onClick={() => {
            soundFx.playClick('tab')
            setIsExpanded(true)
          }}
          style={{
            borderColor: isPlaying ? 'rgba(var(--accent-rgb), 0.45)' : 'rgba(255, 255, 255, 0.12)',
            boxShadow: isPlaying
              ? '0 8px 32px rgba(0, 0, 0, 0.7), 0 0 16px rgba(var(--accent-rgb), 0.2)'
              : '0 8px 24px rgba(0, 0, 0, 0.65)',
          }}
          className={`px-3 py-2 rounded-full glass-island-dock border flex items-center justify-between transition-all duration-300 cursor-pointer active:scale-[0.98] ${
            isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Left: Mini Spinning Vinyl Record & Glow */}
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/20 shadow-md">
              <img
                src={vinylArt}
                alt="Vinyl Artwork"
                className={`w-full h-full object-cover select-none ${
                  isPlaying ? 'animate-vinyl-spin' : ''
                }`}
              />
              <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-[#060810] border border-accent" />
            </div>

            {/* Station Title & Status */}
            <div className="min-w-0 pr-1">
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] font-bold text-[#F8FAFC] truncate tracking-tight">
                  {currentStation.code}
                </span>
                {isPlaying && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
                )}
              </div>
              <div className="text-[10px] text-[#94A3B8] truncate">
                {isLoading ? 'Buffering...' : currentStation.name}
              </div>
            </div>
          </div>

          {/* Right: Soundwave, Play Button & Expand Handle */}
          <div className="flex items-center space-x-1.5 shrink-0">
            {/* 3-Bar Equalizer Wave */}
            {isPlaying && (
              <div className="flex items-end space-x-0.5 h-3.5 px-1.5">
                <span className="w-0.5 h-3 bg-accent rounded-full animate-pulse" />
                <span className="w-0.5 h-1.5 bg-accent rounded-full animate-pulse delay-75" />
                <span className="w-0.5 h-3.5 bg-accent rounded-full animate-pulse delay-150" />
              </div>
            )}

            {/* Play/Pause Button */}
            <button
              onClick={handleTogglePlay}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-accent flex items-center justify-center border border-white/15 active:scale-90 transition-all cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label="Toggle Playback"
            >
              {isLoading ? (
                <span className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin inline-block" />
              ) : isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            {/* Expand Sheet Trigger Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                soundFx.playClick('tab')
                setIsExpanded(true)
              }}
              className="p-1 text-[#64748B] hover:text-[#CBD5E1] transition-colors"
              title="Expand Radio Subsystem"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Expandable Mobile Cyber Deck Bottom Sheet ── */}
      {isExpanded && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end font-mono">
          {/* Backdrop Blur Wash */}
          <div
            onClick={() => {
              soundFx.playClick('tab')
              setIsExpanded(false)
            }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in"
          />

          {/* Drawer Panel */}
          <div
            className="relative z-10 w-full max-h-[88vh] overflow-y-auto bg-[#090C16]/98 border-t border-white/15 rounded-t-3xl p-5 shadow-2xl space-y-4 animate-fade-in text-[#CBD5E1]"
            style={{
              boxShadow: '0 -8px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(var(--accent-rgb), 0.15)',
            }}
          >
            {/* Sheet Handle Bar */}
            <div className="flex justify-center -mt-1 pb-1">
              <div
                onClick={() => setIsExpanded(false)}
                className="w-12 h-1 rounded-full bg-white/20 cursor-pointer"
              />
            </div>

            {/* Header: Callsign & Close Button */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Radio className={`w-4 h-4 text-accent ${isPlaying ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-bold text-[#F8FAFC] tracking-wider">
                  DECK-X // TURNTABLE
                </span>
                <span className="text-[10px] text-accent bg-accent-soft px-1.5 py-0.5 rounded border border-accent-subtle font-bold">
                  {currentStation.freq}
                </span>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick('tab')
                  setIsExpanded(false)
                }}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                title="Collapse Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Turntable Disc Preview with Real Rotating Spidey Vinyl */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-36 h-36 rounded-full bg-[#05060B] border-2 border-white/15 shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Vinyl Grooves Texture */}
                <div
                  className="absolute inset-1.5 rounded-full border border-white/10 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, transparent 40%, rgba(255,255,255,0.03) 41%, transparent 42%, transparent 60%, rgba(255,255,255,0.03) 61%, transparent 62%)',
                  }}
                />

                {/* Rotating Spidey Record */}
                <div
                  className={`w-24 h-24 rounded-full overflow-hidden border border-white/20 shadow-lg relative ${
                    isPlaying ? 'animate-vinyl-spin' : ''
                  }`}
                >
                  <img
                    src={vinylArt}
                    alt="Turntable Center Vinyl"
                    className="w-full h-full object-cover select-none"
                  />
                  <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-[#060810] border-2 border-accent" />
                </div>
              </div>

              {/* Status & Time */}
              <div className="mt-3 text-center">
                <div className="text-sm font-bold text-[#F8FAFC]">
                  {currentStation.name}
                </div>
                <div className="text-xs text-accent font-semibold flex items-center justify-center gap-1.5 mt-0.5">
                  <Disc3 className={`w-3 h-3 ${isPlaying ? 'animate-spin' : ''}`} />
                  <span>{isPlaying ? `STREAMING // ${formatTimer(elapsedSeconds)}` : 'STANDBY // PAUSED'}</span>
                </div>
              </div>

              {/* Dynamic 16-Band Cyber Audio Spectrum (GPU-Accelerated) */}
              <div className="flex items-end justify-center space-x-1 h-6 mt-3 px-4 py-1 rounded-lg bg-black/40 border border-white/5">
                {[0.4, 0.65, 0.35, 0.85, 0.5, 0.75, 0.6, 0.38, 0.8, 0.55, 0.9, 0.45, 0.7, 0.32, 0.6, 0.42].map((dur, idx) => (
                  <div
                    key={idx}
                    style={{
                      height: '100%',
                      backgroundColor: 'var(--accent-primary)',
                      opacity: isPlaying ? 0.85 : 0.25,
                      animation: isPlaying
                        ? `eqBarBounce ${dur}s ease-in-out infinite alternate`
                        : 'none',
                      animationDelay: `${(idx * 0.06).toFixed(2)}s`,
                      transform: isPlaying ? undefined : 'scaleY(0.18)',
                    }}
                    className="w-1.5 rounded-t-sm animate-eq-bar transition-opacity duration-200"
                  />
                ))}
              </div>
            </div>

            {/* Station Preset Chips Grid */}
            <div className="space-y-1.5">
              <div className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">
                Frequency Channels
              </div>
              <div className="grid grid-cols-2 gap-2">
                {RADIO_STATIONS.map((st, idx) => {
                  const isSelected = stationIndex === idx
                  return (
                    <button
                      key={st.id}
                      onClick={() => handleSelect(idx)}
                      style={{
                        borderColor: isSelected ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                      }}
                      className={`p-2 rounded-xl text-left border transition-all cursor-pointer active:scale-95 flex items-center justify-between ${
                        isSelected
                          ? 'bg-accent-soft text-[#F8FAFC] font-bold shadow-sm'
                          : 'bg-white/5 hover:bg-white/10 text-[#94A3B8]'
                      }`}
                    >
                      <div className="min-w-0 pr-1">
                        <div className="text-xs font-bold truncate">{st.code}</div>
                        <div className="text-[10px] text-[#64748B] truncate">{st.genre}</div>
                      </div>
                      {isSelected && isPlaying && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Playback Controls & Volume Scrubber */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              {/* Transport Buttons */}
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={handleNextStation}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-[#CBD5E1] border border-white/10 active:scale-90 transition-all cursor-pointer"
                  title="Next Station"
                >
                  <SkipForward className="w-4 h-4 rotate-180" />
                </button>

                <button
                  onClick={handleTogglePlay}
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                  className="p-4 rounded-full text-[#08090C] font-bold shadow-lg shadow-accent/30 active:scale-90 transition-all cursor-pointer flex items-center justify-center"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-[#08090C] border-t-transparent rounded-full animate-spin inline-block" />
                  ) : isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNextStation}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-[#CBD5E1] border border-white/10 active:scale-90 transition-all cursor-pointer"
                  title="Next Station"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Scrubber & Mute */}
              <div className="flex items-center space-x-2.5 bg-[#05070E] px-3.5 py-2.5 rounded-xl border border-white/10">
                <button
                  onClick={() => {
                    soundFx.playClick('key')
                    toggleMute()
                  }}
                  className="text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-[#EF4444]" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-accent" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value))
                    if (isMuted) toggleMute()
                  }}
                  className="w-full h-1.5 bg-[#1C2030] rounded-lg appearance-none cursor-pointer accent-ctrl"
                  title="Volume Level"
                />

                <span className="text-[11px] text-[#94A3B8] font-bold tabular-nums min-w-[32px] text-right">
                  {isMuted ? '0%' : `${volume}%`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
