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
import type { ThemeName } from './types'
import { THEMES, getRandomTheme } from './utils/themeConfig'
import { useAnimatedFavicon } from './utils/useAnimatedFavicon'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(() => getRandomTheme())
  const [crtEnabled, setCrtEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('niko_crt_enabled')
    return saved !== null ? saved === 'true' : true
  })
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('has_seen_niko_intro')
  })

  // Dynamic Animated Favicon synced with current active theme palette
  useAnimatedFavicon(currentTheme)

  const handleToggleCrt = (forceState?: boolean) => {
    setCrtEnabled((prev) => {
      const next = typeof forceState === 'boolean' ? forceState : !prev
      localStorage.setItem('niko_crt_enabled', String(next))
      return next
    })
  }

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'audio', 'projects', 'skills', 'about', 'social', 'contact']
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

  const activeTheme = THEMES[currentTheme] || THEMES.sunset

  return (
    <div
      className={`min-h-screen text-[#F8FAFC] font-mono selection:bg-accent selection:text-[#08090C] theme-${currentTheme} relative overflow-x-hidden`}
      style={
        {
          '--accent-primary': activeTheme.primaryHex,
          '--accent-secondary': activeTheme.secondaryHex,
          '--accent-rgb': activeTheme.rgbPrimary,
        } as React.CSSProperties
      }
    >
      {/* ── Fixed High-Visibility Wallpaper Background from pics/ ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          key={activeTheme.id}
          src={activeTheme.bgImage}
          alt={activeTheme.name}
          className="w-full h-full object-cover object-center brightness-[0.65] contrast-[1.08] saturate-[1.1] transition-all duration-700 select-none scale-100"
        />
        {/* Atmospheric Tint: Clean glass wash ensuring all text is easily readable while photo shines through */}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(6, 8, 14, 0.52) 0%, rgba(6, 8, 14, 0.76) 75%, rgba(6, 8, 14, 0.90) 100%)',
          }}
        />
        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 crt-overlay opacity-15 pointer-events-none" />
      </div>

      {/* Old TV Cathode Tube Phosphor Glow & Rolling Scanlines Layer */}
      {crtEnabled && <div className="old-tv-screen pointer-events-none" />}

      {/* Dedicated Retro CRT Monitor Scanline Raster Layer for Sunset Theme (matches Spidey.png) */}
      {currentTheme === 'sunset' && crtEnabled && (
        <div className="crt-sunset-scanlines pointer-events-none" />
      )}

      {/* ── Foreground Content ── */}
      <div className="relative z-10">
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
          currentTheme={currentTheme}
          onChangeTheme={setCurrentTheme}
          crtEnabled={crtEnabled}
          onToggleCrt={handleToggleCrt}
        />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-12">
        {/* 1. Hero: Clean Dante Avatar, Official Name, Statement */}
        <HeroSystemInfo
          onNavigate={scrollToSection}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* 2. Audio Subsystem: Spinning Spidey Vinyl Disc & Lo-Fi Streams */}
        <CliampPlayer />

        {/* 3. Featured Projects */}
        <ProjectsSection />

        {/* 4. Skills & Arsenal */}
        <SkillsSection />

        {/* 5. About & Mindset */}
        <AboutSection />

        {/* 6. Social Channels */}
        <SocialSection />

        {/* 7. Contact Form & Transmission */}
        <ContactSection />
      </main>

      {/* Clean Footer */}
      <TerminalFooter onScrollToTop={scrollToTop} />

        {/* Interactive CLI Drawer (on ~ or CLI button) */}
        <InteractiveTerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          onNavigate={scrollToSection}
          onToggleMatrix={() => {}}
          onChangeTheme={setCurrentTheme}
          onReplayIntro={() => setShowIntro(true)}
          crtEnabled={crtEnabled}
          onToggleCrt={handleToggleCrt}
        />
      </div>
    </div>
  )
}
