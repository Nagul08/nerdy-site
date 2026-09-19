import spideyBg from '../assets/pics/Spidey.png'
import kiintBg from '../assets/pics/kiint.jpg'
import spideoBg from '../assets/pics/spideo.png'
import spikoBg from '../assets/pics/spiko.png'
import type { ThemeName } from '../types'

export interface ThemeConfig {
  id: ThemeName
  name: string
  label: string
  wallpaperName: string
  bgImage: string
  primaryHex: string
  secondaryHex: string
  rgbPrimary: string
  accentClass: string
  borderAccentClass: string
  bgAccentClass: string
  tagline: string
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  sunset: {
    id: 'sunset',
    name: 'Solar Sunset',
    label: 'Sunset',
    wallpaperName: 'Spidey.png',
    bgImage: spideyBg,
    primaryHex: '#F97316', // Vibrant Amber Sunset
    secondaryHex: '#FBBF24',
    rgbPrimary: '249, 115, 22',
    accentClass: 'text-[#F97316]',
    borderAccentClass: 'border-[#F97316]',
    bgAccentClass: 'bg-[#F97316]',
    tagline: 'Warm amber sunset, rooftop silhouette, and solar scanlines',
  },
  dusk: {
    id: 'dusk',
    name: 'Mauve Dusk',
    label: 'Dusk',
    wallpaperName: 'kiint.jpg',
    bgImage: kiintBg,
    primaryHex: '#C084FC', // Neon Mauve / Purple Dusk
    secondaryHex: '#E879F9',
    rgbPrimary: '192, 132, 252',
    accentClass: 'text-[#C084FC]',
    borderAccentClass: 'border-[#C084FC]',
    bgAccentClass: 'bg-[#C084FC]',
    tagline: 'Moody magenta dusk, atmospheric night sky, and neon noir mist',
  },
  crimson: {
    id: 'crimson',
    name: 'Cyber Crimson',
    label: 'Crimson',
    wallpaperName: 'spideo.png',
    bgImage: spideoBg,
    primaryHex: '#EF4444', // Blood Red / Cyber Crimson
    secondaryHex: '#FB7185',
    rgbPrimary: '239, 68, 68',
    accentClass: 'text-[#EF4444]',
    borderAccentClass: 'border-[#EF4444]',
    bgAccentClass: 'bg-[#EF4444]',
    tagline: 'Electric blood red, glowing spider embers, and cyber intensity',
  },
  noir: {
    id: 'noir',
    name: 'Monochrome Noir',
    label: 'Noir',
    wallpaperName: 'spiko.png',
    bgImage: spikoBg,
    primaryHex: '#FFFFFF', // High-Contrast Stark Diamond White
    secondaryHex: '#CBD5E1', // Platinum Titanium Silver
    rgbPrimary: '255, 255, 255',
    accentClass: 'text-white',
    borderAccentClass: 'border-white',
    bgAccentClass: 'bg-white',
    tagline: 'High-contrast monochrome silhouette, stark white moonlight, and titanium silver',
  },
}

export const THEME_KEYS: ThemeName[] = ['sunset', 'dusk', 'crimson', 'noir']

export function getRandomTheme(): ThemeName {
  const randomIndex = Math.floor(Math.random() * THEME_KEYS.length)
  return THEME_KEYS[randomIndex]
}
