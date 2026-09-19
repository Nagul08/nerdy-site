import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { soundFx } from '../utils/audio'

interface MatrixRainProps {
  isActive: boolean
  onClose: () => void
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ isActive, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const characters =
      'abcdefghijklmnopqrstuvwxyz0123456789ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ[]{}<>/\\|;:!@#$%^&*'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50)
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(13, 15, 24, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Gradient color: bright white-cyan head, neon green body
        if (Math.random() > 0.85) {
          ctx.fillStyle = '#8BE9FD'
        } else {
          ctx.fillStyle = '#A6E3A1'
        }

        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
      <div className="absolute top-4 right-4 pointer-events-auto">
        <button
          onClick={() => {
            soundFx.playClick('key')
            onClose()
          }}
          className="px-3 py-1 rounded bg-[#0D0F18]/90 border border-[#A6E3A1] text-[#A6E3A1] hover:bg-[#A6E3A1]/20 font-mono text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
        >
          <X className="w-3.5 h-3.5" />
          <span>[ EXIT MATRIX ]</span>
        </button>
      </div>
    </div>
  )
}
