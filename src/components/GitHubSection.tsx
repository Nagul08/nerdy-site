import React, { useState } from 'react'
import {
  GitBranch,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { GIT_COMMITS } from '../data/portfolioData'
import { soundFx } from '../utils/audio'

export const GitHubSection: React.FC = () => {
  const [expandedCommit, setExpandedCommit] = useState<string | null>(GIT_COMMITS[0].hash)

  const toggleCommit = (hash: string) => {
    soundFx.playClick('key')
    setExpandedCommit(expandedCommit === hash ? null : hash)
  }

  // Simulated GitHub contribution matrix (12 columns x 7 days)
  const contributionGrid = [
    [0, 1, 2, 3, 1, 4, 2],
    [1, 2, 0, 2, 3, 2, 1],
    [3, 4, 2, 1, 0, 3, 4],
    [2, 1, 3, 4, 2, 1, 0],
    [0, 2, 4, 1, 3, 2, 3],
    [4, 3, 1, 2, 0, 4, 2],
    [1, 2, 3, 0, 2, 1, 4],
    [2, 4, 2, 3, 1, 0, 3],
    [3, 1, 0, 4, 2, 3, 1],
    [0, 2, 3, 1, 4, 2, 0],
    [2, 3, 4, 2, 1, 3, 4],
    [4, 2, 1, 3, 4, 2, 3],
    [3, 4, 2, 1, 3, 4, 2],
    [2, 1, 4, 3, 2, 1, 4],
    [4, 3, 2, 4, 1, 3, 2],
    [1, 2, 3, 0, 4, 2, 1],
  ]

  const getColorByLevel = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-[#161B22]'
      case 1:
        return 'bg-[#0E4429]'
      case 2:
        return 'bg-[#006D32]'
      case 3:
        return 'bg-[#26A641]'
      case 4:
        return 'bg-[#39D353]'
      default:
        return 'bg-[#161B22]'
    }
  }

  return (
    <section id="github" className="py-6 sm:py-8 scroll-mt-28">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2 font-mono text-sm sm:text-base text-[#8BE9FD]">
          <span className="text-[#CBA6F7]">visitor@portfolio:~$</span>
          <span className="text-[#F9E2AF] font-semibold">&gt; git log --oneline --graph --stat -n 6</span>
          <span className="w-2 h-4 bg-[#8BE9FD] animate-cursor inline-block" />
        </div>

        {/* View GitHub Profile Button with actual GitHub icon */}
        <a
          href="https://github.com/Nagul08"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.playClick('enter')}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded bg-[#23283E] hover:bg-[#8BE9FD]/20 text-[#D8DEE9] hover:text-[#8BE9FD] border border-[#3E4562] hover:border-[#8BE9FD]/50 font-mono text-xs font-semibold transition-all cursor-pointer shadow-sm"
        >
          <GithubIcon className="w-4 h-4 text-[#8BE9FD]" />
          <span>[ VIEW GITHUB ]</span>
          <ExternalLink className="w-3 h-3 text-[#7F849C]" />
        </a>
      </div>

      {/* Terminal Window Box */}
      <div className="relative border-2 border-[#282C3F] bg-[#111420]/95 rounded-sm shadow-xl overflow-hidden">
        {/* MGS2 Tactical Corner Reticle Accents */}
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

        {/* MGS2 Tactical Header Strip */}
        <div className="bg-[#080B14] px-3 py-1 border-b border-[#1E2438] flex items-center justify-between text-[10px] font-mono text-[#7F849C] select-none">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A6E3A1] animate-pulse" />
            <span className="text-[#8BE9FD] font-bold tracking-wider">MGS2 // RECON LOGS & COMMITS</span>
            <span className="text-[#CBA6F7] text-[9px] bg-[#161B2E] px-1.5 py-0.2 rounded border border-[#2B314F]">
              SEC-04
            </span>
          </div>
          <span className="text-[#A6E3A1] font-mono font-bold bg-[#0D151F] px-1.5 py-0.5 rounded border border-[#A6E3A1]/30 text-[9px]">
            140.85 MHz
          </span>
        </div>

        {/* Terminal Header */}
        <div className="bg-[#181B28] px-4 py-2 border-b border-[#282C3F] flex items-center justify-between font-mono text-xs text-[#7F849C]">
          <div className="flex items-center space-x-2">
            <GitBranch className="w-3.5 h-3.5 text-[#CBA6F7]" />
            <span className="text-[#D8DEE9]">branch: main (tracking origin/main)</span>
            <span className="text-[#585B70]">|</span>
            <span className="text-[#A6E3A1]">up to date</span>
          </div>
          <div className="hidden sm:block text-[11px]">remote: https://github.com/Nagul08/nerdy-site.git</div>
        </div>

        {/* Git Contribution Activity Matrix */}
        <div className="p-4 bg-[#0A0C14] border-b border-[#1E2235]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 font-mono text-xs">
            <span className="text-[#D8DEE9] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#A6E3A1]" />
              <span>COMMIT ACTIVITY HEATMAP (2025 - 2026)</span>
            </span>
            <span className="text-[#7F849C] text-[11px]">842 contributions this year</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {contributionGrid.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((day, dIdx) => (
                  <span
                    key={dIdx}
                    className={`w-2.5 h-2.5 rounded-xs inline-block transition-transform hover:scale-150 cursor-pointer ${getColorByLevel(
                      day
                    )}`}
                    title={`Day activity level: ${day}/4`}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#7F849C] mt-2">
            <span>16 weeks shown</span>
            <div className="flex items-center space-x-1">
              <span>Less</span>
              <span className="w-2 h-2 rounded-xs bg-[#161B22] inline-block" />
              <span className="w-2 h-2 rounded-xs bg-[#0E4429] inline-block" />
              <span className="w-2 h-2 rounded-xs bg-[#006D32] inline-block" />
              <span className="w-2 h-2 rounded-xs bg-[#26A641] inline-block" />
              <span className="w-2 h-2 rounded-xs bg-[#39D353] inline-block" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Commit Log List */}
        <div className="divide-y divide-[#1A1D2C] font-mono text-xs sm:text-sm">
          {GIT_COMMITS.map((commit) => {
            const isExpanded = expandedCommit === commit.hash
            return (
              <div key={commit.hash} className="transition-colors hover:bg-[#141828]/50">
                {/* Commit Summary Line */}
                <div
                  onClick={() => toggleCommit(commit.hash)}
                  className="px-4 py-3 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <span className="text-[#7F849C] group-hover:text-[#8BE9FD] transition-colors">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-[#8BE9FD]" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>

                    <span className="text-[#F9E2AF] font-bold tracking-wider font-mono">
                      {commit.hash}
                    </span>

                    <span className="text-[#D8DEE9] group-hover:text-[#8BE9FD] transition-colors truncate">
                      {commit.message}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-[#7F849C] whitespace-nowrap pl-2">
                    <span className="hidden md:inline text-[#A6E3A1]">
                      +{commit.changes.added}
                    </span>
                    <span className="hidden md:inline text-[#F38BA8]">
                      -{commit.changes.removed}
                    </span>
                    <span className="text-[#585B70] hidden sm:inline">{commit.date}</span>
                  </div>
                </div>

                {/* Expanded Diff Preview */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-4 pt-1 bg-[#090B12] border-t border-[#181B28]">
                    <div className="flex flex-wrap items-center justify-between text-xs text-[#7F849C] mb-2 font-mono">
                      <div>
                        Author: <span className="text-[#89B4FA]">{commit.author}</span>
                      </div>
                      <div>
                        Date: <span className="text-[#D8DEE9]">{commit.date}</span>
                      </div>
                    </div>

                    {/* Diff snippet buffer */}
                    <div className="bg-[#05060A] p-3 rounded border border-[#1E2235] font-mono text-xs overflow-x-auto">
                      <div className="text-[#7F849C] pb-1 mb-1 border-b border-[#1A1D2D]">
                        diff --git a/src/core.ts b/src/core.ts
                      </div>
                      <pre className="text-[#A6E3A1] whitespace-pre-wrap leading-relaxed">
                        {commit.diffSnippet}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Terminal git log footer */}
        <div className="bg-[#181B28] px-4 py-2 border-t border-[#282C3F] flex items-center justify-between font-mono text-xs text-[#7F849C]">
          <span>(END) - Press [q] or click to exit log</span>
          <span className="text-[#8BE9FD]">6 commits displayed</span>
        </div>
      </div>
    </section>
  )
}
