import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, Monitor, Sparkles, Menu, X } from 'lucide-react'
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
    { id: 'home', command: '~/home' },
    { id: 'audio', command: '~/radio' },
    { id: 'about', command: '~/about' },
    { id: 'projects', command: '~/projects' },
    { id: 'skills', command: '~/skills' },
    { id: 'github', command: '~/github' },
    { id: 'social', command: '~/social' },
    { id: 'contact', command: '~/contact' },
  ]

  const handleNavClick = (id: string) => {
    soundFx.playClick('key')
    onNavigate(id)
    setMobileMenuOpen(false)
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
    <header className="sticky top-0 z-40 bg-[#0D0F18]/95 backdrop-blur-md border-b border-[#23283E] text-sm">
      {/* Top micro status bar */}
      <div className="bg-[#090A10] border-b border-[#1A1D2B] px-3 py-1 flex items-center justify-between text-xs text-[#7F849C] font-mono select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F38BA8]/70 border border-[#F38BA8] inline-block hover:opacity-100 cursor-pointer" title="close" onClick={() => soundFx.playClick('beep')} />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F9E2AF]/70 border border-[#F9E2AF] inline-block hover:opacity-100 cursor-pointer" title="minimize" onClick={() => soundFx.playClick('key')} />
            <span className="w-2.5 h-2.5 rounded-full bg-[#A6E3A1]/70 border border-[#A6E3A1] inline-block hover:opacity-100 cursor-pointer" title="maximize" onClick={() => soundFx.playClick('enter')} />
          </div>
          <span className="text-[#585B70] hidden sm:inline">|</span>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A6E3A1] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A6E3A1]"></span>
            </span>
            <span className="text-[#A6E3A1] font-semibold tracking-wider">● ONLINE</span>
            <span className="text-[#8BE9FD] font-mono text-[10px] bg-[#0E1524] px-1.5 py-0.2 rounded border border-[#8BE9FD]/30 hidden sm:inline-block">
              CODEC 140.85 MHz
            </span>
            <span className="text-[#585B70] hidden md:inline">| 24ms (chennai-in)</span>
            <span className="text-[#585B70] hidden lg:inline">| SECURE CIPHER</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Sound toggle */}
          <button
            onClick={handleToggleMute}
            className="flex items-center space-x-1 hover:text-[#8BE9FD] transition-colors cursor-pointer px-1.5 py-0.5 rounded border border-transparent hover:border-[#23283E]"
            title={isMuted ? 'Unmute Audio & Keyclicks' : 'Mute Audio & Keyclicks'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#F38BA8]" /> : <Volume2 className="w-3.5 h-3.5 text-[#A6E3A1]" />}
            <span className="hidden sm:inline">{isMuted ? 'SFX:MUTED' : 'SFX:ON'}</span>
          </button>

          {/* CRT toggle */}
          <button
            onClick={() => {
              soundFx.playClick('tab')
              onToggleCrt()
            }}
            className={`flex items-center space-x-1 hover:text-[#CBA6F7] transition-colors cursor-pointer px-1.5 py-0.5 rounded border border-transparent hover:border-[#23283E] ${
              crtEnabled ? 'text-[#CBA6F7]' : 'text-[#7F849C]'
            }`}
            title="Toggle CRT Scanline Effect"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CRT</span>
          </button>

          {/* Matrix rain toggle */}
          <button
            onClick={() => {
              soundFx.playClick('enter')
              onToggleMatrix()
            }}
            className="flex items-center space-x-1 hover:text-[#A6E3A1] transition-colors cursor-pointer px-1.5 py-0.5 rounded border border-transparent hover:border-[#23283E]"
            title="Toggle Digital Rain Effect"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A6E3A1]" />
            <span className="hidden md:inline">MATRIX</span>
          </button>

          {/* Clock */}
          <span className="text-[#89B4FA] tabular-nums font-mono pl-1 border-l border-[#23283E]">
            {currentTime}
          </span>
        </div>
      </div>

      {/* Main Terminal Header Banner */}
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Terminal Title Box */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="border border-[#313754] bg-[#111420] px-3 py-1.5 rounded-sm font-mono shadow-sm">
              <div className="text-[11px] text-[#7F849C] flex items-center gap-1.5 mb-0.5">
                <span>┌─[</span>
                <span className="text-[#8BE9FD] font-medium">retr0@portfolio</span>
                <span>]──────────────────────────────┐</span>
              </div>
              <div className="pl-3 py-0.5 border-l-2 border-[#8BE9FD]/50 my-1">
                <div className="text-base sm:text-lg font-bold text-[#F5C2E7] tracking-tight flex flex-wrap items-center gap-2">
                  <span>Siva Kowsik S</span>
                  <span className="text-xs font-medium text-[#8BE9FD] px-1.5 py-0.5 bg-[#8BE9FD]/10 rounded border border-[#8BE9FD]/30 font-mono">
                    aka "Nagul"
                  </span>
                  <span className="text-xs font-normal px-2 py-0.5 rounded bg-[#CBA6F7]/10 text-[#CBA6F7] border border-[#CBA6F7]/30">
                    CSE '29
                  </span>
                </div>
                <div className="text-xs text-[#89B4FA] font-medium">
                  Computer Science Engineering Student @ Sri Sairam Engineering College
                </div>
              </div>
              <div className="text-[11px] text-[#7F849C]">
                <span>└───────────────────────────────────────────────────┘</span>
              </div>
            </div>
          </div>

          {/* Desktop Terminal Command Navigation */}
          <nav className="hidden lg:flex items-center space-x-1.5 bg-[#111420]/80 p-1.5 rounded border border-[#23283E]">
            {navItems.map(item => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 py-1.5 rounded font-mono text-xs transition-all flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-[#23283E] text-[#8BE9FD] border border-[#8BE9FD]/40 shadow-sm shadow-[#8BE9FD]/10'
                      : 'text-[#D8DEE9]/80 hover:text-[#8BE9FD] hover:bg-[#1E2235]'
                  }`}
                >
                  <span className="text-[#CBA6F7]">$</span>
                  <span>{item.command}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#8BE9FD] animate-pulse" />}
                </button>
              )
            })}

            {/* Interactive Terminal Drawer Trigger Button */}
            <button
              onClick={() => {
                soundFx.playClick('enter')
                onToggleTerminal()
              }}
              className="ml-2 px-2.5 py-1.5 rounded bg-[#8BE9FD]/10 border border-[#8BE9FD]/40 text-[#8BE9FD] hover:bg-[#8BE9FD]/20 font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-[#8BE9FD]/20"
              title="Open Interactive Terminal (Ctrl + ~)"
            >
              <span>&gt;_ CLI</span>
            </button>
          </nav>

          {/* Medium Screen / Mobile Action Bar */}
          <div className="flex lg:hidden items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  soundFx.playClick('enter')
                  onToggleTerminal()
                }}
                className="px-2.5 py-1.5 rounded bg-[#8BE9FD]/10 border border-[#8BE9FD]/40 text-[#8BE9FD] font-mono text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span>&gt;_ CLI</span>
              </button>

              {/* Theme selector */}
              <select
                value={currentTheme}
                onChange={(e) => {
                  soundFx.playClick('key')
                  onChangeTheme(e.target.value as ThemeName)
                }}
                className="bg-[#111420] text-xs font-mono text-[#D8DEE9] border border-[#23283E] rounded px-2 py-1 outline-none"
              >
                {themes.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                soundFx.playClick('tab')
                setMobileMenuOpen(!mobileMenuOpen)
              }}
              className="p-1.5 rounded border border-[#23283E] bg-[#111420] text-[#D8DEE9] hover:text-[#8BE9FD]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#23283E] grid grid-cols-2 gap-2 pb-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded text-xs font-mono border transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-[#23283E] text-[#8BE9FD] border-[#8BE9FD]/50'
                    : 'bg-[#111420] text-[#D8DEE9] border-[#23283E] hover:border-[#8BE9FD]/30'
                }`}
              >
                <span>{item.command}</span>
                <span className="text-[#7F849C]">↵</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
