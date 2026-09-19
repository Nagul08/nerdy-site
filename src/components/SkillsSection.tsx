import React, { useState } from 'react'
import { Terminal } from 'lucide-react'
import { SKILL_PROGRESS, SKILL_BADGES } from '../data/portfolioData'
import { soundFx } from '../utils/audio'

export const SkillsSection: React.FC = () => {
  const [selectedBadgeFilter, setSelectedBadgeFilter] = useState<string>('all')
  const [activeBadge, setActiveBadge] = useState<string | null>(null)

  const badgeCategories = [
    { id: 'all', label: '--all' },
    { id: 'frontend', label: '--frontend' },
    { id: 'backend', label: '--backend' },
    { id: 'database', label: '--database' },
    { id: 'systems', label: '--systems' },
    { id: 'tools', label: '--tools' },
    { id: 'language', label: '--languages' },
  ]

  const filteredBadges =
    selectedBadgeFilter === 'all'
      ? SKILL_BADGES
      : SKILL_BADGES.filter((b) => b.category === selectedBadgeFilter)

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'working with':
        return 'text-[#A6E3A1] bg-[#A6E3A1]/10 border-[#A6E3A1]/30'
      case 'familiar with':
        return 'text-[#89B4FA] bg-[#89B4FA]/10 border-[#89B4FA]/30'
      case 'currently learning':
        return 'text-[#F9E2AF] bg-[#F9E2AF]/10 border-[#F9E2AF]/30'
      default:
        return 'text-[#D8DEE9] bg-[#23283E] border-[#313754]'
    }
  }

  return (
    <section id="skills" className="py-6 sm:py-8 scroll-mt-28">
      {/* Title */}
      <div className="flex items-center space-x-2 font-mono text-sm sm:text-base text-[#8BE9FD] mb-3">
        <span className="text-[#CBA6F7]">visitor@portfolio:~$</span>
        <span className="text-[#F9E2AF] font-semibold">&gt; ./skills.sh --detailed</span>
        <span className="w-2 h-4 bg-[#8BE9FD] animate-cursor inline-block" />
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
            <span className="text-[#8BE9FD] font-bold tracking-wider">MGS2 // TECH TELEMETRY & SPECS</span>
            <span className="text-[#CBA6F7] text-[9px] bg-[#161B2E] px-1.5 py-0.2 rounded border border-[#2B314F]">
              SEC-03
            </span>
          </div>
          <span className="text-[#A6E3A1] font-mono font-bold bg-[#0D151F] px-1.5 py-0.5 rounded border border-[#A6E3A1]/30 text-[9px]">
            140.85 MHz
          </span>
        </div>

        {/* Terminal Header */}
        <div className="bg-[#181B28] px-4 py-2 border-b border-[#282C3F] flex items-center justify-between font-mono text-xs text-[#7F849C]">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#F38BA8]" />
            <span className="w-3 h-3 rounded-full bg-[#F9E2AF]" />
            <span className="w-3 h-3 rounded-full bg-[#A6E3A1]" />
            <span className="ml-2 text-[#D8DEE9]">bash /usr/local/bin/skills.sh</span>
          </div>
          <div className="text-[11px] text-[#A6E3A1]">status: execution_complete (code: 0)</div>
        </div>

        {/* Section 1: Progress Blocks Table */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm">
          <div className="text-xs text-[#7F849C] mb-4 pb-2 border-b border-[#1E2235] flex items-center justify-between">
            <span>[ DOMAIN PROFICIENCY BREAKDOWN ]</span>
            <span className="text-[11px] text-[#89B4FA]">
              Note: Progress bars indicate relative comfort level, not absolute claims.
            </span>
          </div>

          <div className="space-y-3.5">
            {SKILL_PROGRESS.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded hover:bg-[#161927]/60 border border-transparent hover:border-[#23283E] transition-all gap-2 sm:gap-4"
              >
                {/* Domain name */}
                <div className="w-32 sm:w-36 text-[#8BE9FD] font-semibold flex items-center space-x-2">
                  <span className="text-[#CBA6F7] text-xs">&gt;</span>
                  <span>{item.category}</span>
                </div>

                {/* Progress bar blocks (ASCII █ and ░) */}
                <div className="flex-1 flex items-center space-x-3">
                  <span
                    style={{ color: item.color }}
                    className="font-mono text-sm tracking-widest select-none drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"
                  >
                    {item.progressBlocks}
                  </span>
                  <span className="text-xs text-[#7F849C] font-mono tabular-nums">
                    {item.percentage}%
                  </span>
                </div>

                {/* Highlight Tech and Honest Label */}
                <div className="flex items-center space-x-2 justify-end">
                  <span className="text-[#D8DEE9] font-medium text-xs sm:text-[13px]">
                    {item.highlightTech}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getLevelBadgeClass(
                      item.level
                    )}`}
                  >
                    [{item.level}]
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Section 2: Terminal Badges Matrix */}
          <div className="mt-8 pt-6 border-t border-[#23283E]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="text-xs text-[#7F849C] flex items-center gap-1.5 font-mono">
                <Terminal className="w-3.5 h-3.5 text-[#CBA6F7]" />
                <span className="text-[#D8DEE9] font-semibold">SKILLS BADGE MATRIX</span>
                <span>(click to inspect details)</span>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
                {badgeCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      soundFx.playClick('key')
                      setSelectedBadgeFilter(c.id)
                    }}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      selectedBadgeFilter === c.id
                        ? 'bg-[#CBA6F7]/20 text-[#CBA6F7] border border-[#CBA6F7]/40'
                        : 'text-[#7F849C] hover:text-[#D8DEE9]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {filteredBadges.map((badge, idx) => {
                const isSelected = activeBadge === badge.name
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      soundFx.playClick('key')
                      setActiveBadge(isSelected ? null : badge.name)
                    }}
                    className={`p-2.5 rounded text-left font-mono text-xs border transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'bg-[#1C2033] border-[#8BE9FD] shadow-md shadow-[#8BE9FD]/15'
                        : 'bg-[#0E101B] border-[#23283E] hover:border-[#3E4562] hover:bg-[#131624]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#D8DEE9] group-hover:text-[#8BE9FD] transition-colors">
                        {badge.name}
                      </span>
                      <span
                        style={{ backgroundColor: badge.color }}
                        className="w-1.5 h-1.5 rounded-full inline-block"
                      />
                    </div>
                    <div className="text-[10px] text-[#7F849C] mt-1 font-mono truncate">
                      {badge.exp}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Legend Footer */}
        <div className="bg-[#090A10] px-4 py-2 border-t border-[#1E2235] text-[11px] font-mono text-[#7F849C] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#A6E3A1]" /> [working with]
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#89B4FA]" /> [familiar with]
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#F9E2AF]" /> [currently learning]
            </span>
          </div>
          <div>stdout &gt;&gt; /dev/skills</div>
        </div>
      </div>
    </section>
  )
}
