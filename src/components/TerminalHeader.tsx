import React, { useState } from 'react'
import { Menu, X, Terminal, Palette, Tv, Monitor, Play, Radio } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { soundFx } from '../utils/audio'
import danteImg from '../assets/danteX.jpg'
import type { ThemeName } from '../types'
import { THEMES, THEME_KEYS } from '../utils/themeConfig'
import { useRadioPlayer } from '../utils/radioPlayer'

interface TerminalHeaderProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
  onToggleTerminal: () => void
  currentTheme: ThemeName
  onChangeTheme: (theme: ThemeName) => void
  tvGlowEnabled: boolean
  onToggleTvGlow: () => void
  crtScanlinesEnabled: boolean
  onToggleCrt: () => void
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  activeSection,
  onNavigate,
  onToggleTerminal,
  currentTheme,
  onChangeTheme,
  tvGlowEnabled,
  onToggleTvGlow,
  crtScanlinesEnabled,
  onToggleCrt,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false)
  const { isPlaying, isLoading, togglePlay, currentStation } = useRadioPlayer()

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'audio', label: 'Radio' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleNavClick = (id: string) => {
    soundFx.playClick('key')
    setMobileMenuOpen(false)
    setTimeout(() => {
      onNavigate(id)
    }, 20)
  }

  const activeThemeConfig = THEMES[currentTheme] || THEMES.sunset

  return (
    <header className="sticky top-0 z-40 bg-[#070911]/85 backdrop-blur-md border-b border-[#181d2e] text-sm font-mono transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Identity & Callsign */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <img
            src={danteImg}
            alt="Dante Avatar"
            className="w-6 h-6 rounded-full object-cover border border-[#2B334E] group-hover:border-accent transition-colors"
          />
          <div className="flex items-center space-x-1.5">
            <span className="text-[#F1F5F9] font-bold tracking-tight group-hover:text-accent transition-colors">
              niko-rax
            </span>
            <span
              style={{ backgroundColor: activeThemeConfig.primaryHex }}
              className="w-1.5 h-1.5 rounded-full animate-pulse"
            />
          </div>
        </button>

        {/* Center: Clean Minimal Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs transition-colors cursor-pointer flex items-center gap-1.5 py-1 ${
                  isActive
                    ? 'text-accent font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    style={{ backgroundColor: activeThemeConfig.primaryHex }}
                    className="w-1 h-1 rounded-full"
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* Right: Theme Selector, CRT Toggle, Quick Links & CLI Trigger */}
        <div className="flex items-center space-x-2">
          {/* Wallpaper Theme Dropdown / Quick Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                soundFx.playClick('tab')
                setThemeDropdownOpen(!themeDropdownOpen)
              }}
              style={{ borderColor: activeThemeConfig.primaryHex + '60' }}
              className="px-2.5 py-1 rounded bg-[#0f121d]/90 hover:bg-[#181d2e] text-[#CBD5E1] hover:text-[#F8FAFC] border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Switch Background Wallpaper & Accent Theme"
            >
              <Palette className="w-3.5 h-3.5" style={{ color: activeThemeConfig.primaryHex }} />
              <span className="hidden sm:inline">{activeThemeConfig.label}</span>
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0c0f1a]/95 backdrop-blur-md border border-[#232a40] rounded-md shadow-2xl p-1.5 z-50 animate-fade-in font-mono text-xs">
                <div className="text-[10px] text-[#64748B] px-2 py-1 uppercase tracking-wider">
                  Select Theme / Wallpaper
                </div>
                {THEME_KEYS.map((key) => {
                  const t = THEMES[key]
                  const isCurrent = currentTheme === key
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        soundFx.playClick('key')
                        onChangeTheme(key)
                        setThemeDropdownOpen(false)
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between cursor-pointer transition-colors ${
                        isCurrent
                          ? 'bg-[#181d2f] text-[#F8FAFC] font-bold'
                          : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#121624]'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          style={{ backgroundColor: t.primaryHex }}
                          className="w-2.5 h-2.5 rounded-full inline-block"
                        />
                        <span>{t.label}</span>
                      </div>
                      <span className="text-[10px] text-[#64748B]">{t.wallpaperName}</span>
                    </button>
                  )
                })}

                {/* Separate Retro Display & Filter Controls */}
                <div className="pt-2 mt-1.5 border-t border-[#1e2438] space-y-1">
                  <div className="text-[10px] text-[#64748B] px-2 py-0.5 uppercase tracking-wider font-semibold">
                    Display Effects
                  </div>

                  {/* Toggle 1: Old TV Glow */}
                  <button
                    onClick={() => {
                      soundFx.playClick('enter')
                      onToggleTvGlow()
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between cursor-pointer hover:bg-[#141828] transition-colors group"
                    title="Vintage Cathode Tube Phosphor Bloom & Curvature Vignette"
                  >
                    <div className="flex items-center space-x-2">
                      <Tv className="w-3.5 h-3.5" style={{ color: activeThemeConfig.primaryHex }} />
                      <span className="text-[#CBD5E1] group-hover:text-[#F8FAFC]">Old TV Glow</span>
                    </div>
                    <span
                      style={{
                        borderColor: tvGlowEnabled ? activeThemeConfig.primaryHex : '#2A324B',
                        color: tvGlowEnabled ? activeThemeConfig.primaryHex : '#64748B',
                      }}
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                        tvGlowEnabled ? 'bg-accent-soft' : 'bg-[#181D2E]'
                      }`}
                    >
                      {tvGlowEnabled ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  {/* Toggle 2: CRT Scanlines */}
                  <button
                    onClick={() => {
                      soundFx.playClick('tab')
                      onToggleCrt()
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between cursor-pointer hover:bg-[#141828] transition-colors group"
                    title="CRT Monitor Scanlines & Rolling Refresh Beam"
                  >
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-3.5 h-3.5" style={{ color: activeThemeConfig.primaryHex }} />
                      <span className="text-[#CBD5E1] group-hover:text-[#F8FAFC]">CRT Scanlines</span>
                    </div>
                    <span
                      style={{
                        borderColor: crtScanlinesEnabled ? activeThemeConfig.primaryHex : '#2A324B',
                        color: crtScanlinesEnabled ? activeThemeConfig.primaryHex : '#64748B',
                      }}
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                        crtScanlinesEnabled ? 'bg-accent-soft' : 'bg-[#181D2E]'
                      }`}
                    >
                      {crtScanlinesEnabled ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <a
            href="https://github.com/Nagul08"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#121624] transition-colors cursor-pointer"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Desktop CLI Shell Button */}
          <button
            onClick={() => {
              soundFx.playClick('enter')
              onToggleTerminal()
            }}
            className="hidden md:flex px-2.5 py-1 rounded bg-[#0f121d]/90 hover:bg-[#181d2e] text-accent border border-accent-subtle hover:border-accent text-xs font-semibold items-center gap-1.5 transition-all cursor-pointer"
            title="Interactive Terminal Shell (Ctrl + ~)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI</span>
            <kbd className="hidden sm:inline-block text-[10px] text-[#64748B] bg-[#07090f] px-1 rounded border border-[#23283c]">
              ~
            </kbd>
          </button>

          {/* Mobile Audio Play/Pause Button (Replaces CLI on Mobile) */}
          <button
            onClick={() => {
              soundFx.playClick('enter')
              togglePlay()
            }}
            style={{
              borderColor: isPlaying ? activeThemeConfig.primaryHex : 'rgba(var(--accent-rgb), 0.35)',
            }}
            className={`md:hidden px-2.5 py-1.5 rounded-lg bg-[#0f121d]/95 border text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer select-none shadow-sm ${
              isPlaying
                ? 'bg-accent-soft text-accent shadow-[0_0_14px_rgba(var(--accent-rgb),0.35)]'
                : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
            }`}
            title={isPlaying ? `Playing: ${currentStation.name}` : 'Play Lo-Fi Radio'}
            aria-label="Toggle Lo-Fi Audio Stream"
          >
            {isLoading ? (
              <span className="w-3.5 h-3.5 border-2 border-accent border-t-transparent rounded-full animate-spin inline-block" />
            ) : isPlaying ? (
              <div className="flex items-end space-x-0.5 h-3.5 w-3.5 justify-center pb-0.5">
                <span
                  style={{ backgroundColor: activeThemeConfig.primaryHex }}
                  className="w-0.5 h-3.5 rounded-full animate-pulse"
                />
                <span
                  style={{ backgroundColor: activeThemeConfig.primaryHex }}
                  className="w-0.5 h-2 rounded-full animate-pulse delay-75"
                />
                <span
                  style={{ backgroundColor: activeThemeConfig.primaryHex }}
                  className="w-0.5 h-3 rounded-full animate-pulse delay-150"
                />
              </div>
            ) : (
              <Play className="w-3.5 h-3.5 fill-current text-accent" />
            )}
            <span className="text-[11px] font-bold tracking-tight">
              {isLoading ? 'BUFF...' : isPlaying ? 'LO-FI' : 'PLAY'}
            </span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => {
              soundFx.playClick('tab')
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#121624] active:scale-90 transition-all cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Staggered Entrance & Quick Controls */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#181B26] bg-[#070911]/98 backdrop-blur-xl px-4 py-3 space-y-1 animate-fade-in shadow-2xl">
          {/* Active Radio Station Card on Mobile */}
          <div className="p-2.5 mb-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Radio className={`w-4 h-4 ${isPlaying ? 'text-accent animate-pulse' : 'text-[#64748B]'}`} />
              <div>
                <div className="text-[11px] font-bold text-[#F8FAFC]">
                  {currentStation.code} • {currentStation.name}
                </div>
                <div className="text-[10px] text-[#94A3B8]">{currentStation.genre}</div>
              </div>
            </div>
            <button
              onClick={() => {
                soundFx.playClick('enter')
                togglePlay()
              }}
              style={{ borderColor: isPlaying ? activeThemeConfig.primaryHex : 'rgba(255,255,255,0.2)' }}
              className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer active:scale-95 ${
                isPlaying ? 'bg-accent-soft text-accent' : 'bg-white/5 text-[#CBD5E1]'
              }`}
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
          </div>

          {navItems.filter((i) => i.id !== 'audio').map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all active:scale-[0.98] flex items-center justify-between ${
                activeSection === item.id
                  ? 'bg-[#141828] text-accent font-bold'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#121624]'
              }`}
            >
              <span>{item.label}</span>
              {activeSection === item.id && (
                <span
                  style={{ backgroundColor: activeThemeConfig.primaryHex }}
                  className="w-1.5 h-1.5 rounded-full"
                />
              )}
            </button>
          ))}

          {/* Mobile CLI Shell Trigger in Dropdown */}
          <div className="pt-2 mt-2 border-t border-white/10">
            <button
              onClick={() => {
                soundFx.playClick('enter')
                setMobileMenuOpen(false)
                onToggleTerminal()
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold text-accent hover:bg-[#141828] transition-colors flex items-center justify-between active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>Open Terminal Shell (CLI)</span>
              </div>
              <span className="text-[10px] text-[#64748B] font-mono">[~]</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
