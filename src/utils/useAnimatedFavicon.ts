import { useEffect } from 'react'
import type { ThemeName } from '../types'
import { THEMES } from './themeConfig'

export function useAnimatedFavicon(currentTheme: ThemeName) {
  useEffect(() => {
    const themeConfig = THEMES[currentTheme] || THEMES.sunset
    const primaryColor = themeConfig.primaryHex

    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }

    // Set SVG type for crisp vector rendering
    link.type = 'image/svg+xml'

    // 4 Distinct Cyber / Terminal Frames
    const frames = [
      // Frame 1: Terminal prompt with blinking accent cursor
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#08090C"/>
        <rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="${primaryColor}" stroke-width="3" opacity="0.8"/>
        <path d="M16 22 L28 32 L16 42" fill="none" stroke="${primaryColor}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="32" y1="42" x2="48" y2="42" stroke="${primaryColor}" stroke-width="5" stroke-linecap="round"/>
      </svg>`,

      // Frame 2: Cyber Spider / Radar reticle with pulsing center dot
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#08090C"/>
        <circle cx="32" cy="32" r="24" fill="none" stroke="${primaryColor}" stroke-width="3" opacity="0.6"/>
        <circle cx="32" cy="32" r="14" fill="none" stroke="${primaryColor}" stroke-width="2.5" opacity="0.8"/>
        <circle cx="32" cy="32" r="6" fill="${primaryColor}"/>
        <line x1="32" y1="4" x2="32" y2="12" stroke="${primaryColor}" stroke-width="3" stroke-linecap="round"/>
        <line x1="32" y1="52" x2="32" y2="60" stroke="${primaryColor}" stroke-width="3" stroke-linecap="round"/>
        <line x1="4" y1="32" x2="12" y2="32" stroke="${primaryColor}" stroke-width="3" stroke-linecap="round"/>
        <line x1="52" y1="32" x2="60" y2="32" stroke="${primaryColor}" stroke-width="3" stroke-linecap="round"/>
      </svg>`,

      // Frame 3: Radio broadcast waves (audio deck vibe)
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#08090C"/>
        <circle cx="32" cy="36" r="5" fill="${primaryColor}"/>
        <path d="M22 26 A 14 14 0 0 1 42 26" fill="none" stroke="${primaryColor}" stroke-width="4" stroke-linecap="round"/>
        <path d="M14 18 A 24 24 0 0 1 50 18" fill="none" stroke="${primaryColor}" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>
      </svg>`,

      // Frame 4: Cyber diamond / Soliton core
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#08090C"/>
        <rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="${primaryColor}" stroke-width="2.5" opacity="0.5"/>
        <polygon points="32,12 50,32 32,52 14,32" fill="${primaryColor}" opacity="0.2" stroke="${primaryColor}" stroke-width="3.5"/>
        <circle cx="32" cy="32" r="4" fill="#F8FAFC"/>
      </svg>`,
    ]

    let frameIndex = 0

    const updateFavicon = () => {
      if (document.hidden) return // Pause when browser tab is inactive to save battery
      const svg = frames[frameIndex]
      const encodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
      if (link) {
        link.href = encodedSvg
      }
      frameIndex = (frameIndex + 1) % frames.length
    }

    // Set immediate initial frame
    updateFavicon()

    // Animate every 750ms
    const interval = setInterval(updateFavicon, 750)

    return () => clearInterval(interval)
  }, [currentTheme])
}
