import React from 'react'
import {
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Radio,
  Disc3,
} from 'lucide-react'
import { soundFx } from '../utils/audio'
import vinylArt from '../assets/vinyl-art.webp'
import { useRadioPlayer, RADIO_STATIONS } from '../utils/radioPlayer'

export const CliampPlayer: React.FC = () => {
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

  const handleTogglePlay = () => {
    soundFx.playClick('enter')
    togglePlay()
  }

  const handleSelectStation = (index: number) => {
    soundFx.playClick('key')
    selectStation(index)
  }

  const handleNextStation = () => {
    soundFx.playClick('key')
    nextStation()
  }

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <section id="audio" className="hidden md:block py-4 scroll-mt-20 font-mono">
      {/* Frosted Glass Cyberdeck Audio Unit Housing */}
      <div className="frosted-glass rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden transition-all duration-300">
        
        {/* Top Metallic Specular Bevel Line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* Header Strip & Presets */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-white/10 gap-3">
          
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-md bg-white/5 border border-white/10 text-accent">
              <Radio className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xs tracking-wider text-[#F8FAFC]">
                  DECK-X // TURNTABLE SUBSYSTEM
                </span>
                <span className="text-[10px] text-accent bg-accent-soft px-2 py-0.5 rounded border border-accent-subtle font-bold">
                  {currentStation.freq}
                </span>
              </div>
              <div className="text-[10px] text-[#94A3B8]">ICECAST LOW-LATENCY STREAMER</div>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            {RADIO_STATIONS.map((st, idx) => {
              const isSelected = idx === stationIndex
              return (
                <button
                  key={st.id}
                  onClick={() => handleSelectStation(idx)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold tracking-tight whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-accent text-[#08090C] shadow-md accent-box-glow'
                      : 'bg-white/5 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected && isPlaying
                        ? 'bg-[#08090C] animate-ping'
                        : isSelected
                        ? 'bg-[#08090C]'
                        : 'bg-[#64748B]'
                    }`}
                  />
                  <span>{st.code}</span>
                </button>
              )
            })}
          </div>

        </div>

        {/* Main Unit Deck: Turntable Platter (Left) + Cyber Audio Screen (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Authentic Vinyl Turntable with Needle Tonearm */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative p-2 select-none">
              
              {/* Turntable Plinth Platform */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-[#06080F]/90 border border-white/10 shadow-2xl relative flex items-center justify-center p-3">
                
                {/* Platter Strobe Dots Ring */}
                <div
                  className={`w-48 h-48 sm:w-54 sm:h-54 rounded-full border-2 border-dashed border-white/20 absolute flex items-center justify-center ${
                    isPlaying ? 'animate-vinyl-spin' : ''
                  }`}
                  style={{ animationDuration: '24s' }}
                />

                {/* Heavy Cast-Iron Vinyl Platter with Concentric Grooves */}
                <div className="w-44 h-44 sm:w-50 sm:h-50 rounded-full bg-[#040508] border-4 border-[#1c2235] shadow-inner relative flex items-center justify-center p-2 group">
                  
                  {/* Subtle Vinyl Grooves Texture */}
                  <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
                  <div className="absolute inset-5 rounded-full border border-white/5 pointer-events-none" />
                  <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />
                  <div className="absolute inset-11 rounded-full border border-white/5 pointer-events-none" />

                  {/* Rotating Vinyl Disc Core with Spidey.png Artwork */}
                  <div
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/20 relative shadow-2xl animate-vinyl-spin"
                    style={{
                      animationPlayState: isPlaying ? 'running' : 'paused',
                    }}
                  >
                    <img
                      src={vinylArt}
                      alt="Spidey Vinyl Disc Artwork"
                      className="w-full h-full object-cover object-center filter contrast-125 saturate-110 select-none"
                    />

                    {/* Concentric Vinyl Groove Specular Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none rounded-full" />

                    {/* Center Brass Spindle & Hole */}
                    <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-[#090C14] border-2 border-[#CBD5E1] shadow-md z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
                    </div>
                  </div>
                </div>

                {/* Mechanical Tonearm Assembly */}
                <div
                  className="absolute top-4 right-4 pointer-events-none transition-transform duration-700 ease-out origin-top-right"
                  style={{
                    transform: isPlaying ? 'rotate(19deg)' : 'rotate(-8deg)',
                  }}
                >
                  {/* Tonearm Pivot Base / Gimbal */}
                  <div className="w-6 h-6 rounded-full bg-[#20273c] border border-white/30 shadow-md relative flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
                  </div>

                  {/* Tonearm Wand Rod */}
                  <div className="w-1 h-24 sm:h-28 bg-gradient-to-b from-[#94A3B8] via-[#E2E8F0] to-[#64748B] rounded-full mx-auto shadow-sm" />

                  {/* Headshell & Cartridge with LED Stylus Light */}
                  <div className="w-3 h-5 bg-[#0F1422] border border-white/30 rounded-xs -mt-1 mx-auto relative shadow-sm">
                    <span
                      className={`absolute bottom-0 inset-x-0 h-1 rounded-full ${
                        isPlaying ? 'bg-accent shadow-[0_0_8px_var(--accent-primary)] animate-pulse' : 'bg-[#475569]'
                      }`}
                    />
                  </div>
                </div>

                {/* Platter Strobe Light Sensor */}
                <div className="absolute bottom-3 left-3 flex items-center space-x-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isPlaying ? 'bg-accent shadow-[0_0_8px_var(--accent-primary)] animate-ping' : 'bg-white/20'
                    }`}
                  />
                  <span className="text-[9px] text-[#64748B] font-bold">
                    {isPlaying ? '33 ⅓ RPM' : 'IDLE'}
                  </span>
                </div>

              </div>

              {/* Status Note Under Turntable */}
              <div className="text-[10px] text-[#94A3B8] mt-2.5 text-center font-semibold flex items-center justify-center gap-1.5">
                <Disc3 className={`w-3.5 h-3.5 text-accent ${isPlaying ? 'animate-spin' : ''}`} />
                <span>{isPlaying ? 'TURNTABLE ROTATING // AUDIO ENGAGED' : 'TONEARM PARKED // PRESS PLAY'}</span>
              </div>

            </div>
          </div>

          {/* Right Column: Cybernetic OLED Display Screen, VU Meters & Controls */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            
            {/* Cyber LCD/OLED Digital Display Box */}
            <div className="bg-[#05070D]/90 border border-white/10 rounded-xl p-4 sm:p-5 shadow-inner relative overflow-hidden">
              
              {/* Screen Specular Reflection */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

              {/* Top Station Line */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#F8FAFC] tracking-tight">
                      {currentStation.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{currentStation.genre}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-accent font-mono tabular-nums">
                    {formatTimer(elapsedSeconds)}
                  </span>
                  <div className="text-[9px] text-[#64748B] tracking-wider uppercase font-semibold">
                    {isLoading ? 'BUFFERING' : isPlaying ? 'ON AIR' : 'PAUSED'}
                  </div>
                </div>
              </div>

              {/* 16-Band Animated Visualizer EQ (GPU-Accelerated) */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-end justify-between gap-1 h-10 px-1 bg-black/40 rounded-lg p-2 border border-white/5">
                  {[0.4, 0.65, 0.35, 0.85, 0.5, 0.75, 0.6, 0.38, 0.8, 0.55, 0.9, 0.45, 0.7, 0.32, 0.6, 0.42].map((dur, idx) => (
                    <span
                      key={idx}
                      style={{
                        height: '100%',
                        animation: isPlaying
                          ? `eqBarBounce ${dur}s ease-in-out infinite alternate`
                          : 'none',
                        animationDelay: `${(idx * 0.06).toFixed(2)}s`,
                        transform: isPlaying ? undefined : 'scaleY(0.15)',
                      }}
                      className={`flex-1 rounded-xs animate-eq-bar transition-opacity duration-200 ${
                        isPlaying
                          ? idx % 2 === 0
                            ? 'bg-accent shadow-[0_0_8px_var(--accent-primary)]'
                            : 'bg-accent-sec'
                          : 'bg-white/15'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Stereo VU Channel Meters */}
              <div className="mt-3 grid grid-cols-2 gap-3 text-[10px] font-mono text-[#64748B]">
                <div className="flex items-center space-x-2 bg-black/30 px-2.5 py-1 rounded border border-white/5">
                  <span className="font-bold text-accent">L</span>
                  <div className="flex-1 flex space-x-0.5">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span
                        key={i}
                        className={`flex-1 h-1.5 rounded-xs transition-opacity duration-200 ${
                          isPlaying && i < 6
                            ? i >= 6
                              ? 'bg-[#EF4444]'
                              : 'bg-accent'
                            : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-[#94A3B8]">-3dB</span>
                </div>

                <div className="flex items-center space-x-2 bg-black/30 px-2.5 py-1 rounded border border-white/5">
                  <span className="font-bold text-accent">R</span>
                  <div className="flex-1 flex space-x-0.5">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span
                        key={i}
                        className={`flex-1 h-1.5 rounded-xs transition-opacity duration-200 ${
                          isPlaying && i < 5
                            ? i >= 6
                              ? 'bg-[#EF4444]'
                              : 'bg-accent'
                            : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-[#94A3B8]">-4dB</span>
                </div>
              </div>

            </div>

            {/* Tactile Hardware Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              
              <div className="flex items-center space-x-2.5">
                {/* Play / Pause Primary Button */}
                <button
                  onClick={handleTogglePlay}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                    isPlaying
                      ? 'bg-accent hover:opacity-90 text-[#08090C] accent-box-glow'
                      : 'bg-white/10 hover:bg-white/20 text-[#F1F5F9] border border-white/15'
                  }`}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>

                {/* Next Station Button */}
                <button
                  onClick={handleNextStation}
                  className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#CBD5E1] hover:text-accent border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Switch to next station"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>NEXT</span>
                </button>
              </div>

              {/* Volume Slider & Mute Toggle */}
              <div className="flex items-center space-x-2 bg-[#05070D]/80 px-3 py-2 rounded-xl border border-white/10 shadow-inner">
                <button
                  onClick={() => toggleMute()}
                  className="text-[#94A3B8] hover:text-[#F1F5F9] cursor-pointer"
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
                  className="w-16 sm:w-24 h-1 bg-[#1E2436] rounded-lg appearance-none cursor-pointer accent-ctrl"
                  title="Volume Control"
                />

                <span className="text-[11px] text-[#94A3B8] font-bold tabular-nums min-w-[28px] text-right">
                  {isMuted ? '0%' : `${volume}%`}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
