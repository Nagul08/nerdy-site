import React, { useState, useEffect, useRef } from 'react'
import { soundFx } from '../utils/audio'

interface CryptoGlyphIntroProps {
  onComplete?: () => void
  isOpen?: boolean
  onClose?: () => void
}

const GLYPHS = "!@#$%^&*()_+-=[]{}|;':\",./<>?~0123456789ABCDEF"
const TARGET_WORD = 'niko-rax'
const TARGET_SUB = 'ACCESS GRANTED // SYSTEM READY'

export const CryptoGlyphIntro: React.FC<CryptoGlyphIntroProps> = ({
  onComplete,
  isOpen = true,
  onClose,
}) => {
  const [displayChars, setDisplayChars] = useState<string[]>(
    Array(TARGET_WORD.length)
      .fill('')
      .map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
  )
  const [subText, setSubText] = useState('INITIALIZING CIPHER HANDSHAKE...')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isSlidingOut, setIsSlidingOut] = useState(false)
  const [shouldRender, setShouldRender] = useState(isOpen)

  const stepRef = useRef(0)
  const animIntervalRef = useRef<any>(null)

  useEffect(() => {
    if (!isOpen) {
      setShouldRender(false)
      return
    }

    setShouldRender(true)
    setIsSlidingOut(false)
    setIsUnlocked(false)
    stepRef.current = 0

    // Play subtle keyclick on start
    soundFx.playClick('key')

    // Scramble / Decrypt loop (runs every 40ms)
    animIntervalRef.current = setInterval(() => {
      stepRef.current += 1
      const step = stepRef.current

      // Calculate how many characters are resolved
      // Start resolving after step 10 (~400ms of chaos scramble)
      const resolvedCount = Math.max(0, Math.min(TARGET_WORD.length, Math.floor((step - 10) / 3)))

      const newChars: string[] = []
      for (let i = 0; i < TARGET_WORD.length; i++) {
        if (i < resolvedCount) {
          newChars.push(TARGET_WORD[i])
        } else {
          newChars.push(GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
        }
      }
      setDisplayChars(newChars)

      // Random subtext scramble
      if (resolvedCount < TARGET_WORD.length) {
        if (step % 4 === 0) {
          soundFx.playClick('key')
        }
        if (step < 12) {
          setSubText('INITIALIZING CIPHER HANDSHAKE...')
        } else if (step < 22) {
          setSubText('DECRYPTING GLYPH BLOCKS [0x7FFE8A90]...')
        } else {
          setSubText('VERIFYING OPERATOR CALLSIGN: NIKO-RAX...')
        }
      } else {
        // Complete unlock!
        clearInterval(animIntervalRef.current)
        setIsUnlocked(true)
        setSubText(TARGET_SUB)
        soundFx.playClick('enter')

        // Hold decoded name for 450ms, then slide out like retr0.blog
        setTimeout(() => {
          setIsSlidingOut(true)
          // Wait for slide animation (750ms), then finish
          setTimeout(() => {
            setShouldRender(false)
            sessionStorage.setItem('has_seen_niko_intro', 'true')
            if (onComplete) onComplete()
            if (onClose) onClose()
          }, 750)
        }, 500)
      }
    }, 40)

    // Keyboard ESC listener to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      if (animIntervalRef.current) clearInterval(animIntervalRef.current)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSkip = () => {
    if (animIntervalRef.current) clearInterval(animIntervalRef.current)
    setIsUnlocked(true)
    setDisplayChars(TARGET_WORD.split(''))
    setSubText(TARGET_SUB)
    setIsSlidingOut(true)
    setTimeout(() => {
      setShouldRender(false)
      sessionStorage.setItem('has_seen_niko_intro', 'true')
      if (onComplete) onComplete()
      if (onClose) onClose()
    }, 400)
  }

  if (!shouldRender) return null

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090F] select-none cursor-pointer overflow-hidden transition-all duration-750 ${
        isSlidingOut
          ? 'translate-x-full rounded-l-3xl shadow-[-20px_0_40px_rgba(0,0,0,0.8)]'
          : 'translate-x-0 rounded-none'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
      }}
    >
      {/* Background Matrix / Radar Scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,233,253,0.06)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07090F]/40 to-[#07090F] pointer-events-none" />

      {/* Center Crypto Glyph Content Box */}
      <div className="relative z-10 flex flex-col items-center px-4 max-w-xl text-center">
        {/* Top Micro Telemetry Header */}
        <div className="flex items-center space-x-2 text-[11px] font-mono text-[#585B70] mb-4 tracking-widest">
          <span className="text-[#8BE9FD]">┌─[</span>
          <span className="text-[#A6E3A1]">MGS2_CIPHER_RX</span>
          <span className="text-[#8BE9FD]">]─┐</span>
        </div>

        {/* Large Decrypting Glyph Header: niko in Cyan, -rax in Purple/Pink */}
        <div className="font-mono text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight select-none">
          {/* First 4 letters: niko */}
          <span
            className={`transition-colors duration-150 ${
              isUnlocked
                ? 'text-[#8BE9FD] drop-shadow-[0_0_16px_rgba(139,233,253,0.7)]'
                : 'text-[#8BE9FD]/90'
            }`}
          >
            {displayChars.slice(0, 4).join('')}
          </span>
          {/* Last 4 letters: -rax */}
          <span
            className={`transition-colors duration-150 ${
              isUnlocked
                ? 'text-[#CBA6F7] drop-shadow-[0_0_16px_rgba(203,166,247,0.7)]'
                : 'text-[#F5C2E7]/80'
            }`}
          >
            {displayChars.slice(4).join('')}
          </span>
        </div>

        {/* Dynamic Status / Subtitle Readout */}
        <div className="mt-6 flex flex-col items-center gap-2 font-mono text-xs sm:text-sm">
          <div className="flex items-center space-x-2 px-3 py-1 rounded bg-[#0D121F] border border-[#1F273B]">
            <span
              className={`w-2 h-2 rounded-full ${
                isUnlocked ? 'bg-[#A6E3A1] shadow-[0_0_6px_#A6E3A1]' : 'bg-[#8BE9FD] animate-ping'
              }`}
            />
            <span
              className={`tracking-wider font-semibold ${
                isUnlocked ? 'text-[#A6E3A1]' : 'text-[#8BE9FD]'
              }`}
            >
              {subText}
            </span>
          </div>

          <div className="text-[10px] text-[#585B70] font-mono tracking-widest mt-1">
            SOLITON RADAR LINK: FREQ 140.85 MHz // SECURE HANDSHAKE
          </div>
        </div>
      </div>

      {/* Bottom Floating Skip Prompt */}
      <div className="absolute bottom-6 right-6 z-20">
        <span className="text-[11px] font-mono text-[#585B70] hover:text-[#8BE9FD] transition-colors px-2.5 py-1 rounded border border-[#1A2234] bg-[#0A0E18]/80">
          [ ESC / Click to Skip ]
        </span>
      </div>
    </div>
  )
}
