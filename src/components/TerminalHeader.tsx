import React, { useState } from 'react'
import { Menu, X, Terminal } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { soundFx } from '../utils/audio'
import danteImg from '../assets/danteX.jpg'

interface TerminalHeaderProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
  onToggleTerminal: () => void
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  activeSection,
  onNavigate,
  onToggleTerminal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
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

  return (
    <header className="sticky top-0 z-40 bg-[#08090C]/90 backdrop-blur-md border-b border-[#181B26] text-sm font-mono">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Identity & Callsign */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <img
            src={danteImg}
            alt="Dante Avatar"
            className="w-6 h-6 rounded-full object-cover border border-[#2B334E] group-hover:border-[#00F0FF] transition-colors"
          />
          <div className="flex items-center space-x-1.5">
            <span className="text-[#F1F5F9] font-bold tracking-tight group-hover:text-[#00F0FF] transition-colors">
              niko-rax
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
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
                    ? 'text-[#00F0FF] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-[#00F0FF]" />}
              </button>
            )
          })}
        </nav>

        {/* Right: Quick Links & CLI Trigger */}
        <div className="flex items-center space-x-2.5">
          <a
            href="https://github.com/Nagul08"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#141722] transition-colors cursor-pointer"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              soundFx.playClick('enter')
              onToggleTerminal()
            }}
            className="px-2.5 py-1 rounded bg-[#131622] hover:bg-[#1C2030] text-[#00F0FF] border border-[#252A3D] hover:border-[#00F0FF]/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Interactive Terminal Shell (Ctrl + ~)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI</span>
            <kbd className="hidden sm:inline-block text-[10px] text-[#64748B] bg-[#0A0C13] px-1 rounded border border-[#252A3D]">
              ~
            </kbd>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => {
              soundFx.playClick('tab')
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="md:hidden p-1.5 rounded text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#141722] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#181B26] bg-[#08090C] px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
                activeSection === item.id
                  ? 'bg-[#131622] text-[#00F0FF] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#131622]'
              }`}
            >
              <span>{item.label}</span>
              {activeSection === item.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
