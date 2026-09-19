import React from 'react'
import { ArrowUp } from 'lucide-react'
import { soundFx } from '../utils/audio'

interface TerminalFooterProps {
  onScrollToTop: () => void
}

export const TerminalFooter: React.FC<TerminalFooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="border-t border-[#181d2e] bg-[#070911]/85 backdrop-blur-md font-mono text-xs text-[#94A3B8] pt-8 pb-24 sm:pb-8 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-[#F8FAFC] flex items-center gap-2">
            <span>Siva Kowsik S</span>
            <span className="text-[#64748B]">•</span>
            <span className="text-accent">@niko-rax</span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            B.E. Computer Science & Engineering (Class of 2029) • Sri Sairam Engineering College
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-[#64748B]">
            Crafted with React, TypeScript & Tailwind
          </span>

          <button
            onClick={() => {
              soundFx.playClick('enter')
              onScrollToTop()
            }}
            className="px-3 py-1.5 rounded bg-[#101422] text-[#CBD5E1] hover:text-accent border border-[#1f263d] hover:border-accent flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
