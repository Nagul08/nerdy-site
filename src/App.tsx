import { useState, useEffect } from 'react'
import { TerminalHeader } from './components/TerminalHeader'
import { HeroSystemInfo } from './components/HeroSystemInfo'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { AboutSection } from './components/AboutSection'
import { SocialSection } from './components/SocialSection'
import { ContactSection } from './components/ContactSection'
import { InteractiveTerminalModal } from './components/InteractiveTerminalModal'
import { CliampPlayer } from './components/CliampPlayer'
import { MatrixRain } from './components/MatrixRain'
import { TerminalFooter } from './components/TerminalFooter'
import { CryptoGlyphIntro } from './components/CryptoGlyphIntro'
import type { ThemeName } from './types'
import { soundFx } from './utils/audio'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isRadioExpanded, setIsRadioExpanded] = useState(false)
  const [isRadioPlaying, setIsRadioPlaying] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('catppuccin')
  const [crtEnabled, setCrtEnabled] = useState(false)
  const [matrixActive, setMatrixActive] = useState(false)
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('has_seen_niko_intro')
  })

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'projects', 'skills', 'about', 'contact', 'social']
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
          { rootMargin: '-60px 0px -40% 0px', threshold: 0.1 }
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
        if (isRadioExpanded) setIsRadioExpanded(false)
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [matrixActive, isTerminalOpen, isRadioExpanded])

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection('home')
      return
    }

    if (sectionId === 'audio' || sectionId === 'radio') {
      setIsRadioExpanded(true)
      return
    }

    const target = document.getElementById(sectionId)
    if (target) {
      const header = document.querySelector('header')
      const headerHeight = header ? header.offsetHeight : 56
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerHeight - 16
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      })
      setActiveSection(sectionId)
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
    <div className={`min-h-screen bg-[#0A0C14] text-[#D8DEE9] font-mono relative ${themeClasses[currentTheme]}`}>
      {/* Optional CRT Scanlines Effect */}
      {crtEnabled && (
        <div className="fixed inset-0 crt-overlay z-50 pointer-events-none" />
      )}

      {/* Matrix Rain Effect when toggled */}
      <MatrixRain isActive={matrixActive} onClose={() => setMatrixActive(false)} />

      {/* Crypto Glyph Opening Screen (retr0.blog inspiration) */}
      <CryptoGlyphIntro
        isOpen={showIntro}
        onClose={() => setShowIntro(false)}
      />

      {/* Top Terminal Header: Unified Single-Bar Cyber Navbar */}
      <TerminalHeader
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        currentTheme={currentTheme}
        onChangeTheme={setCurrentTheme}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled((prev) => !prev)}
        onToggleMatrix={() => setMatrixActive((prev) => !prev)}
        onReplayIntro={() => setShowIntro(true)}
        isRadioPlaying={isRadioPlaying}
        onToggleRadioHud={() => setIsRadioExpanded((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20 space-y-10">
        {/* 1. Hero / High-Impact Dossier & MGS2 Dante Avatar */}
        <HeroSystemInfo
          onNavigate={scrollToSection}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* 2. Featured Projects: Proof of skills first! */}
        <ProjectsSection />

        {/* 3. Skills Matrix: Clear, categorized capabilities */}
        <SkillsSection />

        {/* 4. About & System Status Dossier */}
        <section id="about" className="scroll-mt-24 space-y-4">
          <div className="p-3 bg-[#080A10] border border-[#23283E] rounded-sm text-xs text-[#7F849C] flex items-center justify-between font-mono">
            <div className="flex items-center space-x-2">
              <span className="text-[#A6E3A1]">systemctl:</span>
              <span className="text-[#D8DEE9]">portfolio.service loaded (active, running)</span>
            </div>
            <div className="hidden sm:flex items-center space-x-3 text-[11px]">
              <span className="text-[#8BE9FD]">node: niko-rax</span>
              <span className="text-[#A6E3A1]">status: 200 OK</span>
            </div>
          </div>
          
          <AboutSection />
        </section>

        {/* 5. Social Channels */}
        <SocialSection />

        {/* 6. Contact Transmission Channel */}
        <ContactSection />
      </main>

      {/* Terminal Footer */}
      <TerminalFooter onScrollToTop={scrollToTop} />

      {/* Floating CLiAMP Lo-Fi Cyber Mini-Dock / Expanded MGS2 HUD */}
      <CliampPlayer
        isFloating={true}
        isExpanded={isRadioExpanded}
        onToggleExpand={() => setIsRadioExpanded((prev) => !prev)}
        onPlaybackChange={setIsRadioPlaying}
      />

      {/* Floating Interactive Terminal Shell Drawer / Window */}
      <InteractiveTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigate={scrollToSection}
        onToggleMatrix={() => setMatrixActive((prev) => !prev)}
        onChangeTheme={setCurrentTheme}
        onReplayIntro={() => setShowIntro(true)}
      />
    </div>
  )
}
