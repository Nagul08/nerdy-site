import React from 'react'

interface Mgs2FrameProps {
  children?: React.ReactNode
  title?: string
  freq?: string
  code?: string
  className?: string
  showCornersOnly?: boolean
}

export const Mgs2Frame: React.FC<Mgs2FrameProps> = ({
  children,
  title,
  freq = '140.85',
  code,
  className = '',
  showCornersOnly = false,
}) => {
  return (
    <div className={`relative border border-[#23283E] bg-[#111420]/95 rounded-sm shadow-xl overflow-hidden ${className}`}>
      {/* MGS2 Tactical Corner Brackets */}
      <span className="absolute top-0 left-0 text-[#8BE9FD] text-[11px] font-mono select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD]">
        ┌──
      </span>
      <span className="absolute top-0 right-0 text-[#8BE9FD] text-[11px] font-mono select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD]">
        ──┐
      </span>
      <span className="absolute bottom-0 left-0 text-[#8BE9FD] text-[11px] font-mono select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD]">
        └──
      </span>
      <span className="absolute bottom-0 right-0 text-[#8BE9FD] text-[11px] font-mono select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD]">
        ──┘
      </span>

      {/* Top MGS2 Tactical Header Strip */}
      {!showCornersOnly && title && (
        <div className="bg-[#080B14] px-3 py-1 border-b border-[#1E2438] flex items-center justify-between text-[10px] font-mono text-[#7F849C] select-none">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A6E3A1] animate-pulse" />
            <span className="text-[#8BE9FD] font-bold tracking-wider">{title}</span>
            {code && (
              <span className="hidden sm:inline-block text-[#CBA6F7] text-[9px] bg-[#161B2E] px-1.5 py-0.2 rounded border border-[#2B314F]">
                {code}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-[9px]">
            <span className="text-[#585B70] hidden sm:inline">CODEC</span>
            <span className="text-[#A6E3A1] font-mono font-bold bg-[#0D151F] px-1.5 py-0.5 rounded border border-[#A6E3A1]/30">
              {freq} MHz
            </span>
          </div>
        </div>
      )}

      {children}
    </div>
  )
}

export const Mgs2CornerAccents: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <>
      <span className={`absolute top-0 left-0 text-[#8BE9FD] text-[11px] font-mono select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD] ${className}`}>
        ┌──
      </span>
      <span className={`absolute top-0 right-0 text-[#8BE9FD] text-[11px] font-mono select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD] ${className}`}>
        ──┐
      </span>
      <span className={`absolute bottom-0 left-0 text-[#8BE9FD] text-[11px] font-mono select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD] ${className}`}>
        └──
      </span>
      <span className={`absolute bottom-0 right-0 text-[#8BE9FD] text-[11px] font-mono select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD] ${className}`}>
        ──┘
      </span>
    </>
  )
}
