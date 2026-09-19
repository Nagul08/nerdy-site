import React, { useState } from 'react'
import { Shield, Cpu, Globe, Wrench, BarChart2 } from 'lucide-react'
import { SKILL_PROGRESS } from '../data/portfolioData'
import { soundFx } from '../utils/audio'

interface SkillItem {
  name: string
  level: 'core' | 'familiar' | 'exploring'
  description: string
  color: string
}

interface SkillCategory {
  id: string
  title: string
  icon: React.ReactNode
  accentColor: string
  skills: SkillItem[]
}

export const SkillsSection: React.FC = () => {
  const [showRawProgress, setShowRawProgress] = useState(false)

  const categories: SkillCategory[] = [
    {
      id: 'systems',
      title: 'Systems & Low-Level',
      icon: <Cpu className="w-4 h-4 text-[#CBA6F7]" />,
      accentColor: '#CBA6F7',
      skills: [
        { name: 'C / C++', level: 'core', description: 'Data structures, memory allocation & systems logic', color: '#CBA6F7' },
        { name: 'Linux / POSIX', level: 'core', description: 'Kernel concepts, IPC, file systems & administration', color: '#FAB387' },
        { name: 'Bash Scripting', level: 'core', description: 'Automation, shell pipelines & dotfile scripting', color: '#A6E3A1' },
        { name: 'Python', level: 'core', description: 'Systems tooling, automation scripts & algorithms', color: '#F9E2AF' },
      ],
    },
    {
      id: 'security',
      title: 'Cyber Security & Networks',
      icon: <Shield className="w-4 h-4 text-[#8BE9FD]" />,
      accentColor: '#8BE9FD',
      skills: [
        { name: 'Network Protocols', level: 'core', description: 'TCP/IP, UDP, ICMP packet structures & sniffing', color: '#8BE9FD' },
        { name: 'Raw Sockets', level: 'familiar', description: 'Low-level frame capture & packet decoding', color: '#89B4FA' },
        { name: 'Wireshark & GDB', level: 'familiar', description: 'Packet analysis & binary debugging exploration', color: '#F5C2E7' },
        { name: 'Security Auditing', level: 'exploring', description: 'Vulnerability assessment & CTF challenges', color: '#F38BA8' },
      ],
    },
    {
      id: 'web',
      title: 'Web & Full-Stack',
      icon: <Globe className="w-4 h-4 text-[#A6E3A1]" />,
      accentColor: '#A6E3A1',
      skills: [
        { name: 'React 19', level: 'core', description: 'Component architecture, hooks & reactive interfaces', color: '#8BE9FD' },
        { name: 'TypeScript', level: 'core', description: 'Strict typing, modern generics & interfaces', color: '#89B4FA' },
        { name: 'Tailwind CSS', level: 'core', description: 'Utility-first styling, cyber themes & responsive UX', color: '#A6E3A1' },
        { name: 'Web Audio API', level: 'familiar', description: 'Audio synthesis, DSP nodes & real-time visualizers', color: '#F9E2AF' },
      ],
    },
    {
      id: 'tools',
      title: 'Developer Tooling',
      icon: <Wrench className="w-4 h-4 text-[#F9E2AF]" />,
      accentColor: '#F9E2AF',
      skills: [
        { name: 'Git & GitHub', level: 'core', description: 'Branch workflows, repository maintenance & CI', color: '#F38BA8' },
        { name: 'Neovim & VS Code', level: 'core', description: 'Vim keybindings, NvChad & keyboard ergonomics', color: '#A6E3A1' },
        { name: 'WSL2 (Ubuntu)', level: 'core', description: 'Cross-platform Linux dev environment', color: '#FAB387' },
        { name: 'Make & Build Tools', level: 'familiar', description: 'Compilation pipelines & script orchestration', color: '#CBA6F7' },
      ],
    },
  ]

  const getLevelBadge = (level: SkillItem['level']) => {
    switch (level) {
      case 'core':
        return (
          <span className="text-[10px] text-[#A6E3A1] bg-[#A6E3A1]/10 px-1.5 py-0.2 rounded border border-[#A6E3A1]/30 font-semibold">
            Core
          </span>
        )
      case 'familiar':
        return (
          <span className="text-[10px] text-[#8BE9FD] bg-[#8BE9FD]/10 px-1.5 py-0.2 rounded border border-[#8BE9FD]/30 font-semibold">
            Active
          </span>
        )
      case 'exploring':
        return (
          <span className="text-[10px] text-[#F9E2AF] bg-[#F9E2AF]/10 px-1.5 py-0.2 rounded border border-[#F9E2AF]/30 font-semibold">
            Exploring
          </span>
        )
    }
  }

  return (
    <section id="skills" className="py-4 scroll-mt-20 font-mono">
      {/* Title with command prompt */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2 text-sm sm:text-base text-[#8BE9FD]">
          <span className="text-[#CBA6F7]">visitor@portfolio:~$</span>
          <span className="text-[#F9E2AF] font-bold">&gt; ./skills.sh --matrix</span>
          <span className="w-2 h-4 bg-[#8BE9FD] animate-cursor inline-block" />
        </div>

        <button
          onClick={() => {
            soundFx.playClick('tab')
            setShowRawProgress(!showRawProgress)
          }}
          className="text-xs text-[#7F849C] hover:text-[#8BE9FD] flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#111420] border border-[#23283E] hover:border-[#8BE9FD]/40 transition-colors cursor-pointer"
          title="Toggle ASCII progress view"
        >
          <BarChart2 className="w-3.5 h-3.5 text-[#CBA6F7]" />
          <span>{showRawProgress ? 'VIEW MATRIX' : 'RAW BARS'}</span>
        </button>
      </div>

      {/* Terminal Window Box */}
      <div className="relative border-2 border-[#23283E] bg-[#111420]/95 rounded-sm shadow-2xl overflow-hidden">
        {/* MGS2 Tactical Corner Reticle Accents */}
        <span className="absolute top-0 left-0 text-[#8BE9FD] text-[11px] select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD]">
          ┌──
        </span>
        <span className="absolute top-0 right-0 text-[#8BE9FD] text-[11px] select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD]">
          ──┐
        </span>
        <span className="absolute bottom-0 left-0 text-[#8BE9FD] text-[11px] select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD]">
          └──
        </span>
        <span className="absolute bottom-0 right-0 text-[#8BE9FD] text-[11px] select-none pointer-events-none z-30 opacity-80 leading-none drop-shadow-[0_0_3px_#8BE9FD]">
          ──┘
        </span>

        {/* Tactical Header Strip */}
        <div className="bg-[#080B14] px-4 py-1.5 border-b border-[#1E2438] flex items-center justify-between text-xs text-[#7F849C] select-none">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#A6E3A1] animate-pulse" />
            <span className="text-[#8BE9FD] font-bold">MGS2 // TECH TELEMETRY & CAPABILITIES</span>
            <span className="text-[#585B70] hidden sm:inline">|</span>
            <span className="hidden sm:inline text-[11px]">sec-level: 05 [ACTIVE]</span>
          </div>
          <span className="text-[#A6E3A1] text-[10px] bg-[#0D151F] px-1.5 py-0.5 rounded border border-[#A6E3A1]/30">
            140.85 MHz
          </span>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6">
          {!showRawProgress ? (
            /* Categorized 4-Domain Grid: Instant Scan */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-[#0A0C14] border border-[#23283E] hover:border-[#384163] rounded-sm p-4 transition-colors relative"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#1A1E2E]">
                    <div className="flex items-center space-x-2">
                      {cat.icon}
                      <span className="font-bold text-sm text-[#D8DEE9]">{cat.title}</span>
                    </div>
                    <span
                      style={{ color: cat.accentColor }}
                      className="text-[10px] uppercase tracking-wider font-semibold opacity-80"
                    >
                      [{cat.id}]
                    </span>
                  </div>

                  {/* Skills in Category */}
                  <div className="space-y-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-start justify-between p-2 rounded bg-[#111420]/80 border border-[#191D2E] hover:border-[#2B324A] transition-colors"
                      >
                        <div className="pr-2">
                          <div className="flex items-center space-x-2">
                            <span
                              style={{ color: skill.color }}
                              className="text-xs font-bold font-mono"
                            >
                              {skill.name}
                            </span>
                            {getLevelBadge(skill.level)}
                          </div>
                          <p className="text-[11px] text-[#7F849C] mt-0.5 leading-snug">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Raw Progress Bars View (For purists) */
            <div className="space-y-3">
              <div className="text-xs text-[#7F849C] mb-3 pb-2 border-b border-[#1E2235] flex items-center justify-between">
                <span>[ RAW PROFICIENCY TELEMETRY ]</span>
                <span className="text-[#8BE9FD] text-[11px]">stdout &gt;&gt; /dev/skills</span>
              </div>
              {SKILL_PROGRESS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded bg-[#0A0C14] border border-[#1E2235] gap-2"
                >
                  <div className="w-36 text-[#8BE9FD] font-semibold text-xs">&gt; {item.category}</div>
                  <div className="flex-1 flex items-center space-x-3">
                    <span style={{ color: item.color }} className="text-xs tracking-wider">
                      {item.progressBlocks}
                    </span>
                    <span className="text-xs text-[#7F849C] tabular-nums">{item.percentage}%</span>
                  </div>
                  <div className="text-xs text-[#BAC2DE] font-mono">{item.highlightTech}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legend Footer */}
        <div className="bg-[#080B14] px-4 py-2 border-t border-[#1E2235] text-[11px] text-[#7F849C] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A6E3A1]" /> [Core Competency]
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8BE9FD]" /> [Active Development]
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F9E2AF]" /> [Continuous Exploration]
            </span>
          </div>
          <div className="text-[10px] text-[#585B70]">verified_sys: 2029.cse</div>
        </div>
      </div>
    </section>
  )
}
