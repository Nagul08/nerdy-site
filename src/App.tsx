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
import { TerminalFooter } from './components/TerminalFooter'
import { CryptoGlyphIntro } from './components/CryptoGlyphIntro'
import { soundFx } from './utils/audio'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('has_seen_niko_intro')
  })

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'projects', 'skills', 'about', 'social', 'contact']
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
      if ((e.key === '`' || e.key === '~') && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        soundFx.playClick('enter')
        setIsTerminalOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        if (isTerminalOpen) setIsTerminalOpen(false)
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isTerminalOpen])

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection('home')
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

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F8FAFC] font-mono selection:bg-[#00F0FF] selection:text-[#08090C]">
      {/* Crypto Glyph Opening Screen */}
      <CryptoGlyphIntro
        isOpen={showIntro}
        onClose={() => setShowIntro(false)}
      />

      {/* Top Navbar */}
      <TerminalHeader
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-12">
        {/* 1. Hero: Clean Dante Avatar, Official Name, Statement */}
        <HeroSystemInfo
          onNavigate={scrollToSection}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* 2. Featured Projects */}
        <ProjectsSection />

        {/* 3. Skills & Arsenal */}
        <SkillsSection />

        {/* 4. About & Mindset */}
        <AboutSection />

        {/* 5. Social Channels */}
        <SocialSection />

        {/* 6. Contact Form & Transmission */}
        <ContactSection />
      </main>

      {/* Clean Footer */}
      <TerminalFooter onScrollToTop={scrollToTop} />

      {/* Discreet, Ultra-Minimal Floating Lo-Fi Audio Pill */}
      <CliampPlayer />

      {/* Interactive CLI Drawer (on ~ or CLI button) */}
      <InteractiveTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigate={scrollToSection}
        onToggleMatrix={() => {}}
        onChangeTheme={() => {}}
        onReplayIntro={() => setShowIntro(true)}
      />
    </div>
  )
}
