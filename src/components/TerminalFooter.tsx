import React from 'react'
import { ArrowUp, Coffee, GitBranch } from 'lucide-react'
import { soundFx } from '../utils/audio'

interface TerminalFooterProps {
  onScrollToTop: () => void
}

export const TerminalFooter: React.FC<TerminalFooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="mt-12 border-t border-[#282C3F] bg-[#090A10] font-mono text-xs">
      {/* Tmux / Powerline Statusbar */}
      <div className="bg-[#111420] px-4 py-1.5 border-b border-[#1E2235] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#7F849C]">
        <div className="flex items-center space-x-2">
          <span className="bg-[#CBA6F7] text-[#0D0F18] font-bold px-1.5 py-0.2 rounded-xs">
            TMUX 3.4
          </span>
          <span className="text-[#D8DEE9]">session: [0:nagul*]</span>
          <span className="text-[#585B70]">|</span>
          <span className="text-[#A6E3A1] flex items-center gap-1">
            <GitBranch className="w-3 h-3" /> main
          </span>
          <span className="text-[#585B70] hidden sm:inline">|</span>
          <span className="hidden sm:inline text-[#89B4FA]">TypeScript + Vite</span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-[#F9E2AF]">UTF-8</span>
          <span>100%</span>
          <button
            onClick={() => {
              soundFx.playClick('enter')
              onScrollToTop()
            }}
            className="text-[#8BE9FD] hover:underline flex items-center gap-1 cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-3 h-3" />
            <span>[ cd ~ ]</span>
          </button>
        </div>
      </div>

      {/* Main Terminal Exit Sequence */}
      <div className="max-w-6xl mx-auto px-4 py-8 text-center space-y-3">
        <div className="text-xs text-[#7F849C] select-none">
          ────────────────────────────────────────────────────────────────────────────
        </div>

        <div className="text-sm sm:text-base font-bold text-[#8BE9FD] flex items-center justify-center gap-2">
          <span>nagul@portfolio:~$</span>
          <span className="text-[#F9E2AF]">exit</span>
        </div>

        <div className="text-xs text-[#7F849C] space-y-1">
          <div>logout</div>
          <div>Connection to portfolio.nagul.dev closed (exit_code: 0).</div>
        </div>

        <div className="pt-4 text-xs text-[#D8DEE9]">
          © 2026 Nagul. All rights reserved.
        </div>

        <div className="text-xs text-[#7F849C] flex items-center justify-center gap-1.5">
          <span>Built with curiosity + questionable amounts of caffeine</span>
          <Coffee className="w-3.5 h-3.5 text-[#FAB387]" />
        </div>

        <div className="text-[11px] text-[#585B70] pt-2">
          Designed with JetBrains Mono • Catppuccin & Tokyo Night palette • Linux Rice Aesthetics
        </div>
      </div>
    </footer>
  )
}
