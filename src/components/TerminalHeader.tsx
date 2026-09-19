import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, Monitor, Sparkles, Menu, X, Radio, Terminal } from 'lucide-react'
import { soundFx } from '../utils/audio'
import type { ThemeName } from '../types'

interface TerminalHeaderProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
  onToggleTerminal: () => void
  currentTheme: ThemeName
  onChangeTheme: (theme: ThemeName) => void
  crtEnabled: boolean
  onToggleCrt: () => void
  onToggleMatrix: () => void
  onReplayIntro?: () => void
  isRadioPlaying?: boolean
  onToggleRadioHud?: () => void
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  activeSection,
  onNavigate,
  onToggleTerminal,
  currentTheme,
  onChangeTheme,
  crtEnabled,
  onToggleCrt,
  onToggleMatrix,
  onReplayIntro,
  isRadioPlaying = false,
  onToggleRadioHud,
}) => {
  const [isMuted, setIsMuted] = useState(soundFx.getMuted())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const navItems = [
    { id: 'home', label: '~/home' },
    { id: 'projects', label: '~/projects' },
    { id: 'skills', label: '~/skills' },
    { id: 'about', label: '~/about' },
    { id: 'contact', label: '~/contact' },
  ]

  const handleNavClick = (id: string) => {
    soundFx.playClick('key')
    setMobileMenuOpen(false)
    setTimeout(() => {
      onNavigate(id)
    }, 20)
  }

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute()
    setIsMuted(muted)
    if (!muted) soundFx.playClick('enter')
  }

  const themes: { id: ThemeName; label: string; accent: string }[] = [
    { id: 'catppuccin', label: 'Catppuccin', accent: '#CBA6F7' },
    { id: 'tokyo', label: 'Tokyo Night', accent: '#82AAFF' },
    { id: 'cyber', label: 'Cyberpunk', accent: '#8BE9FD' },
    { id: 'nord', label: 'Nord Ice', accent: '#88C0D0' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-[#0A0C14]/95 backdrop-blur-md border-b border-[#23283E] text-sm font-mono shadow-lg shadow-black/30">
      {/* Sleek single-bar cyber navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
        {/* Left: Identity / Callsign & Online Indicator */}
        <div className="flex items-center space-x-3">
          {/* OS Window dots */}
          <div className="hidden sm:flex items-center space-x-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#F38BA8]/80 border border-[#F38BA8] inline-block hover:opacity-100 cursor-pointer"
              title="Close"
              onClick={() => soundFx.playClick('beep')}
            />
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#F9E2AF]/80 border border-[#F9E2AF] inline-block hover:opacity-100 cursor-pointer"
              title="Minimize"
              onClick={() => soundFx.playClick('key')}
            />
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#A6E3A1]/80 border border-[#A6E3A1] inline-block hover:opacity-100 cursor-pointer"
              title="Maximize"
              onClick={() => soundFx.playClick('enter')}
            />
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 text-left cursor-pointer group"
          >
            <span className="text-[#8BE9FD] font-bold tracking-tight group-hover:text-[#F5C2E7] transition-colors">
              niko-rax
            </span>
            <span className="text-[#7F849C]">@</span>
            <span className="text-[#CBA6F7]">portfolio</span>
            <span className="text-[#A6E3A1]">:~$</span>
          </button>

          {/* Active status pill */}
          <div className="hidden md:flex items-center space-x-1.5 px-2 py-0.5 rounded bg-[#0D1515] border border-[#A6E3A1]/30 text-[10px]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A6E3A1] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#A6E3A1]" />
            </span>
            <span className="text-[#A6E3A1] font-semibold tracking-wider">ONLINE</span>
            <span className="text-[#585B70]">|</span>
            <span className="text-[#8BE9FD]">140.85 MHz</span>
          </div>
        </div>

        {/* Center: Clean Command Navigation Pills (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1 bg-[#111420]/80 p-1 rounded-sm border border-[#23283E]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all flex items-center gap-1 cursor-pointer ${
                  isActive
                    ? 'bg-[#23283E] text-[#8BE9FD] border border-[#8BE9FD]/50 shadow-sm shadow-[#8BE9FD]/15 font-semibold'
                    : 'text-[#BAC2DE] hover:text-[#8BE9FD] hover:bg-[#181B28]'
                }`}
              >
                <span className="text-[#CBA6F7] text-[10px]">$</span>
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#8BE9FD] animate-pulse" />}
              </button>
            )
          })}
        </nav>

        {/* Right: Controls, Radio, Theme, CLI Trigger */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs">
          {/* Radio status / HUD trigger */}
          {onToggleRadioHud && (
            <button
              onClick={() => {
                soundFx.playClick('enter')
                onToggleRadioHud()
              }}
              className={`flex items-center space-x-1.5 px-2 py-1 rounded border text-[11px] cursor-pointer transition-all ${
                isRadioPlaying
                  ? 'bg-[#A6E3A1]/15 text-[#A6E3A1] border-[#A6E3A1]/50 shadow-sm shadow-[#A6E3A1]/20'
                  : 'bg-[#121524] text-[#7F849C] border-[#282C3F] hover:text-[#8BE9FD] hover:border-[#8BE9FD]/30'
              }`}
              title="CLiAMP Streamer (MGS2 Codec Radio)"
            >
              <Radio className={`w-3.5 h-3.5 ${isRadioPlaying ? 'text-[#A6E3A1] animate-pulse' : ''}`} />
              <span className="hidden sm:inline font-semibold">
                {isRadioPlaying ? 'LIVE' : 'RADIO'}
              </span>
            </button>
          )}

          {/* Sound FX toggle */}
          <button
            onClick={handleToggleMute}
            className="p-1 sm:px-1.5 sm:py-1 rounded text-[#7F849C] hover:text-[#8BE9FD] transition-colors cursor-pointer border border-transparent hover:border-[#23283E]"
            title={isMuted ? 'Unmute Audio & Keyclicks' : 'Mute Audio & Keyclicks'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#F38BA8]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#A6E3A1]" />
            )}
          </button>

          {/* CRT toggle */}
          <button
            onClick={() => {
              soundFx.playClick('tab')
              onToggleCrt()
            }}
            className={`hidden sm:flex items-center space-x-1 px-1.5 py-1 rounded text-[11px] cursor-pointer border transition-colors ${
              crtEnabled
                ? 'bg-[#CBA6F7]/20 text-[#CBA6F7] border-[#CBA6F7]/50'
                : 'text-[#7F849C] border-transparent hover:border-[#23283E] hover:text-[#D8DEE9]'
            }`}
            title="Toggle CRT Scanline Effect"
          >
            <Monitor className="w-3 h-3" />
            <span className="text-[10px]">CRT</span>
          </button>

          {/* Matrix rain toggle */}
          <button
            onClick={() => {
              soundFx.playClick('enter')
              onToggleMatrix()
            }}
            className="hidden md:flex items-center space-x-1 px-1.5 py-1 rounded text-[11px] text-[#7F849C] border border-transparent hover:border-[#23283E] hover:text-[#A6E3A1] transition-colors cursor-pointer"
            title="Toggle Digital Rain Effect"
          >
            <Sparkles className="w-3 h-3 text-[#A6E3A1]" />
            <span className="text-[10px]">MATRIX</span>
          </button>

          {/* Replay intro cipher */}
          {onReplayIntro && (
            <button
              onClick={() => {
                soundFx.playClick('enter')
                onReplayIntro()
              }}
              className="hidden md:flex items-center space-x-1 px-1.5 py-1 rounded text-[11px] text-[#8BE9FD]/90 hover:text-[#8BE9FD] hover:bg-[#8BE9FD]/10 border border-[#8BE9FD]/30 transition-colors cursor-pointer"
              title="Replay Crypto Glyph Cipher Opening Screen"
            >
              <span className="text-[10px] font-bold">&lt;/&gt; CIPHER</span>
            </button>
          )}

          {/* Digital Clock */}
          <span className="hidden lg:inline text-[11px] text-[#89B4FA] tabular-nums pl-1 border-l border-[#23283E]">
            {currentTime}
          </span>

          {/* Theme selector */}
          <div className="hidden sm:block">
            <select
              value={currentTheme}
              onChange={(e) => {
                soundFx.playClick('key')
                onChangeTheme(e.target.value as ThemeName)
              }}
              className="bg-[#111420] text-[11px] font-mono text-[#BAC2DE] border border-[#23283E] rounded px-1.5 py-0.5 outline-none cursor-pointer hover:border-[#8BE9FD]/40"
              title="Switch Visual Theme"
            >
              {themes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Interactive CLI Drawer Button */}
          <button
            onClick={() => {
              soundFx.playClick('enter')
              onToggleTerminal()
            }}
            className="px-2.5 py-1 rounded bg-[#8BE9FD]/15 border border-[#8BE9FD]/40 text-[#8BE9FD] hover:bg-[#8BE9FD]/25 font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-[#8BE9FD]/20"
            title="Open Interactive Terminal (Ctrl + ~)"
          >
            <Terminal className="w-3 h-3" />
            <span>&gt;_ CLI</span>
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => {
              soundFx.playClick('tab')
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="lg:hidden p-1.5 rounded border border-[#23283E] bg-[#111420] text-[#D8DEE9] hover:text-[#8BE9FD] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#23283E] bg-[#0A0C14] px-4 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded text-xs font-mono border transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-[#23283E] text-[#8BE9FD] border-[#8BE9FD]/50 font-bold'
                    : 'bg-[#111420] text-[#D8DEE9] border-[#23283E] hover:border-[#8BE9FD]/30'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[#7F849C] text-[10px]">↵</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#1E2235] text-xs">
            <span className="text-[#7F849C]">THEME:</span>
            <select
              value={currentTheme}
              onChange={(e) => {
                soundFx.playClick('key')
                onChangeTheme(e.target.value as ThemeName)
              }}
              className="bg-[#111420] text-xs font-mono text-[#BAC2DE] border border-[#23283E] rounded px-2 py-1 outline-none"
            >
              {themes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  )
}
