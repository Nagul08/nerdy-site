import React from 'react'
import { ArrowUp } from 'lucide-react'
import { soundFx } from '../utils/audio'

interface TerminalFooterProps {
  onScrollToTop: () => void
}

export const TerminalFooter: React.FC<TerminalFooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="border-t border-[#1C2030] bg-[#08090C] font-mono text-xs text-[#94A3B8] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-[#F8FAFC] flex items-center gap-2">
            <span>Siva Kowsik S</span>
            <span className="text-[#64748B]">•</span>
            <span className="text-[#00F0FF]">@niko-rax</span>
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
            className="px-3 py-1.5 rounded bg-[#131624] text-[#CBD5E1] hover:text-[#00F0FF] border border-[#22273C] hover:border-[#00F0FF]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
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
