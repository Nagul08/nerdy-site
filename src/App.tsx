import { useState, useEffect } from 'react'
import { TerminalHeader } from './components/TerminalHeader'
import { HeroSystemInfo } from './components/HeroSystemInfo'
import { AboutSection } from './components/AboutSection'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { GitHubSection } from './components/GitHubSection'
import { SocialSection } from './components/SocialSection'
import { ContactSection } from './components/ContactSection'
import { InteractiveTerminalModal } from './components/InteractiveTerminalModal'
import { CliampPlayer } from './components/CliampPlayer'
import { MatrixRain } from './components/MatrixRain'
import { TerminalFooter } from './components/TerminalFooter'
import type { ThemeName } from './types'
import { soundFx } from './utils/audio'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('catppuccin')
  const [crtEnabled, setCrtEnabled] = useState(false)
  const [matrixActive, setMatrixActive] = useState(false)

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'audio', 'about', 'projects', 'skills', 'github', 'social', 'contact']
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id)
              }
            })
          },
          { threshold: 0.25 }
        )
        observer.observe(el)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  // Keyboard shortcut listener (Ctrl + ~ or ~ to open CLI, Esc to close)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal on ~ or Ctrl+~ (if not typing in an input)
      if ((e.key === '`' || e.key === '~') && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        soundFx.playClick('enter')
        setIsTerminalOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        if (matrixActive) setMatrixActive(false)
        if (isTerminalOpen) setIsTerminalOpen(false)
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [matrixActive, isTerminalOpen])

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Theme accent colors
  const themeClasses: Record<ThemeName, string> = {
    catppuccin: 'theme-catppuccin',
    tokyo: 'theme-tokyo',
    cyber: 'theme-cyber',
    nord: 'theme-nord',
    matrix: 'theme-matrix',
  }

  return (
    <div className={`min-h-screen bg-[#0D0F18] text-[#D8DEE9] font-mono relative ${themeClasses[currentTheme]}`}>
      {/* Optional CRT Scanlines Effect */}
      {crtEnabled && (
        <div className="fixed inset-0 crt-overlay z-50 pointer-events-none" />
      )}

      {/* Matrix Rain Effect when toggled */}
      <MatrixRain isActive={matrixActive} onClose={() => setMatrixActive(false)} />

      {/* Top Terminal Header with Navigation and System Controls */}
      <TerminalHeader
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        currentTheme={currentTheme}
        onChangeTheme={setCurrentTheme}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled((prev) => !prev)}
        onToggleMatrix={() => setMatrixActive((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 space-y-8">
        {/* Hero / System Information (fastfetch) */}
        <HeroSystemInfo
          onNavigate={scrollToSection}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* CLiAMP Retro Audio Player (Icecast/Shoutcast Online Radio) */}
        <section id="audio" className="scroll-mt-24 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7F849C] px-1 font-mono">
            <div className="flex items-center space-x-2">
              <span className="text-[#CBA6F7]">01.5 //</span>
              <span className="text-[#D8DEE9] font-bold">AUDIO SUBSYSTEM (CLIAMP TUI STREAMER)</span>
            </div>
            <span className="text-[11px] text-[#A6E3A1]">icecast/shoutcast • 128kbps stereo</span>
          </div>
          <CliampPlayer />
        </section>

        {/* About Me Section & Systemctl Status Banner */}
        <div className="space-y-4">
          <div className="p-3 bg-[#0A0C14] border border-[#23283E] rounded-sm text-xs text-[#7F849C] flex items-center justify-between font-mono">
            <div className="flex items-center space-x-2">
              <span className="text-[#A6E3A1]">systemctl:</span>
              <span className="text-[#D8DEE9]">portfolio.service loaded (active, running)</span>
            </div>
            <div className="hidden sm:flex items-center space-x-3 text-[11px]">
              <span>memory: 1.2G/16G</span>
              <span>tasks: 114</span>
            </div>
          </div>
          
          <AboutSection />
        </div>

        {/* Projects Section */}
        <ProjectsSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* GitHub Section */}
        <GitHubSection />

        {/* Social Links Section */}
        <SocialSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Terminal Footer */}
      <TerminalFooter onScrollToTop={scrollToTop} />

      {/* Floating Interactive Terminal Shell Drawer / Window */}
      <InteractiveTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigate={scrollToSection}
        onToggleMatrix={() => setMatrixActive((prev) => !prev)}
        onChangeTheme={setCurrentTheme}
      />
    </div>
  )
}
