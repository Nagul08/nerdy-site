import React, { useState } from 'react'
import { FileText, GraduationCap, Shield, Terminal, BookOpen, Compass, Copy, Check } from 'lucide-react'
import { ABOUT_TABS } from '../data/portfolioData'
import { soundFx } from '../utils/audio'

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isRawView, setIsRawView] = useState(false)

  const currentFileData = ABOUT_TABS[activeTab]

  const handleCopy = () => {
    soundFx.playClick('key')
    navigator.clipboard.writeText(currentFileData.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = currentFileData.content.split('\n')

  return (
    <section id="about" className="py-4 scroll-mt-20 font-mono">
      {/* Section Title */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2 text-sm sm:text-base text-[#8BE9FD]">
          <span className="text-[#CBA6F7]">visitor@portfolio:~$</span>
          <span className="text-[#F9E2AF] font-bold">&gt; cat ~/{currentFileData.file}</span>
          <span className="w-2 h-4 bg-[#8BE9FD] animate-cursor inline-block" />
        </div>

        {/* View toggle & Copy buttons */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => {
              soundFx.playClick('tab')
              setIsRawView(!isRawView)
            }}
            className="text-[#7F849C] hover:text-[#8BE9FD] px-2.5 py-1 rounded bg-[#111420] border border-[#23283E] hover:border-[#8BE9FD]/30 transition-colors cursor-pointer"
            title="Toggle between formatted card and raw vim buffer"
          >
            {isRawView ? ':set formatted' : ':set raw'}
          </button>
          <button
            onClick={handleCopy}
            className="text-[#7F849C] hover:text-[#A6E3A1] px-2.5 py-1 rounded bg-[#111420] border border-[#23283E] hover:border-[#A6E3A1]/30 transition-colors cursor-pointer flex items-center gap-1"
            title="Copy buffer content"
          >
            {copied ? <Check className="w-3 h-3 text-[#A6E3A1]" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'COPIED' : 'COPY'}</span>
          </button>
        </div>
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
            <span className="text-[#8BE9FD] font-bold">MGS2 // OPERATOR DOSSIER BUFFER</span>
            <span className="text-[#585B70] hidden sm:inline">|</span>
            <span className="hidden sm:inline text-[11px]">sec-level: 05 [ACTIVE]</span>
          </div>
          <span className="text-[#A6E3A1] text-[10px] bg-[#0D151F] px-1.5 py-0.5 rounded border border-[#A6E3A1]/30">
            140.85 MHz
          </span>
        </div>

        {/* Tab Bar (Buffer tabs) */}
        <div className="bg-[#181B28] px-3 pt-2 border-b border-[#282C3F] flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1">
            {ABOUT_TABS.map((tab, idx) => {
              const isActive = activeTab === idx
              return (
                <button
                  key={tab.file}
                  onClick={() => {
                    soundFx.playClick('tab')
                    setActiveTab(idx)
                  }}
                  className={`px-3 py-1.5 rounded-t text-xs transition-all flex items-center gap-1.5 cursor-pointer border-t-2 ${
                    isActive
                      ? 'bg-[#111420] text-[#8BE9FD] border-t-[#8BE9FD] border-x border-[#282C3F] font-bold'
                      : 'text-[#7F849C] hover:text-[#D8DEE9] border-t-transparent hover:bg-[#1E2235]/60'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#89B4FA]" />
                  <span>{tab.label}</span>
                  {isActive && <span className="text-[10px] text-[#A6E3A1]">●</span>}
                </button>
              )
            })}
          </div>

          <div className="text-[11px] text-[#7F849C] pb-1 sm:pb-0 hidden sm:block">
            {currentFileData.meta.split(' ').slice(0, 4).join(' ')}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 text-sm text-[#D8DEE9] bg-[#0C0E17]">
          {!isRawView ? (
            /* Formatted, High-Impact Dossier Views */
            activeTab === 0 ? (
              /* TAB 0: about.txt */
              <div className="space-y-4">
                <div className="bg-[#111420] p-4 rounded-sm border border-[#23283E]">
                  <div className="flex items-center space-x-2 text-[#8BE9FD] text-xs font-bold mb-2">
                    <Terminal className="w-4 h-4 text-[#8BE9FD]" />
                    <span>WHO I AM // CALLSIGN: niko-rax</span>
                  </div>
                  <p className="text-sm text-[#BAC2DE] leading-relaxed">
                    Hi, I'm <strong className="text-[#F5C2E7]">Siva Kowsik S</strong> (aka{' '}
                    <strong className="text-[#F9E2AF]">"Nagul"</strong>). I'm a Computer Science
                    Engineering student who enjoys building tools for the web, experimenting with
                    emerging technology, and occasionally breaking perfectly functional systems just to
                    understand how and why they tick behind the scenes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-[#111420] p-4 rounded-sm border border-[#23283E]">
                    <div className="flex items-center space-x-2 text-[#A6E3A1] text-xs font-bold mb-2">
                      <Shield className="w-4 h-4 text-[#A6E3A1]" />
                      <span>THE HACKER MINDSET</span>
                    </div>
                    <p className="text-xs text-[#BAC2DE] leading-relaxed">
                      Deeply curious about systems architecture, network packet dissection, memory
                      safety, and penetration testing. I believe true understanding comes from
                      inspecting system calls and network payloads, not just high-level abstractions.
                    </p>
                  </div>

                  <div className="bg-[#111420] p-4 rounded-sm border border-[#23283E]">
                    <div className="flex items-center space-x-2 text-[#CBA6F7] text-xs font-bold mb-2">
                      <Compass className="w-4 h-4 text-[#CBA6F7]" />
                      <span>WORK ENVIRONMENT</span>
                    </div>
                    <p className="text-xs text-[#BAC2DE] leading-relaxed">
                      Customized Linux / WSL2 workstations, Neovim keyboard-driven development,
                      minimalist terminal layouts, and high-energy electronic & lo-fi coding
                      soundtracks.
                    </p>
                  </div>
                </div>
              </div>
            ) : activeTab === 1 ? (
              /* TAB 1: education.json */
              <div className="space-y-4">
                <div className="bg-[#111420] p-4 rounded-sm border border-[#23283E]">
                  <div className="flex items-center space-x-2 text-[#89B4FA] text-xs font-bold mb-3">
                    <GraduationCap className="w-4 h-4 text-[#89B4FA]" />
                    <span>ACADEMIC BACKGROUND</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-[#7F849C] text-[11px]">INSTITUTION</div>
                      <div className="text-sm font-bold text-[#D8DEE9] mt-0.5">
                        Sri Sairam Engineering College
                      </div>
                    </div>

                    <div>
                      <div className="text-[#7F849C] text-[11px]">DEGREE & MAJOR</div>
                      <div className="text-sm font-bold text-[#A6E3A1] mt-0.5">
                        B.E. Computer Science & Engineering
                      </div>
                    </div>

                    <div>
                      <div className="text-[#7F849C] text-[11px]">EXPECTED GRADUATION</div>
                      <div className="text-sm font-bold text-[#F9E2AF] mt-0.5">
                        Class of 2029 (Second Year)
                      </div>
                    </div>

                    <div>
                      <div className="text-[#7F849C] text-[11px]">STUDENT CALLSIGN</div>
                      <div className="text-sm font-bold text-[#8BE9FD] mt-0.5">
                        niko-rax // Siva Kowsik S
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111420] p-4 rounded-sm border border-[#23283E]">
                  <div className="text-xs font-bold text-[#CBA6F7] mb-2.5 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#CBA6F7]" />
                    <span>CORE RELEVANT COURSEWORK</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Cyber Security',
                      'Data Structures & Algorithms',
                      'Operating Systems Internals',
                      'Computer Networks & Protocols',
                      'Database Management Systems',
                      'Object-Oriented Programming',
                    ].map((course, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded bg-[#181B28] text-xs text-[#BAC2DE] border border-[#282C3F]"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 2: philosophy.md */
              <div className="space-y-3">
                {[
                  {
                    num: '01',
                    title: 'Break to Understand',
                    desc: 'The best way to secure or build a system is to understand how it breaks under edge cases, malformed payloads, and resource starvation.',
                    color: 'text-[#8BE9FD]',
                  },
                  {
                    num: '02',
                    title: 'Depth over Surface',
                    desc: 'Inspect the source code, trace network packets, examine system calls, and understand the memory model rather than relying purely on black-box libraries.',
                    color: 'text-[#A6E3A1]',
                  },
                  {
                    num: '03',
                    title: 'Keyboard-First Ergonomics',
                    desc: 'Speed in thought requires speed in execution. Monospace precision, vim keybindings, and automated dotfiles keep cognitive load minimal.',
                    color: 'text-[#CBA6F7]',
                  },
                  {
                    num: '04',
                    title: 'Resilience & Defensive Engineering',
                    desc: 'Build systems that fail safely, log concisely, validate all inputs at the boundary, and operate predictably under pressure.',
                    color: 'text-[#F9E2AF]',
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="bg-[#111420] p-3.5 rounded-sm border border-[#23283E] flex items-start gap-3 hover:border-[#384163] transition-colors"
                  >
                    <span className={`text-sm font-bold ${item.color} tabular-nums`}>{item.num}.</span>
                    <div>
                      <h4 className={`text-xs font-bold ${item.color}`}>{item.title}</h4>
                      <p className="text-xs text-[#BAC2DE] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Raw Buffer View (For terminal purists) */
            <div className="overflow-x-auto space-y-0.5">
              {lines.map((line, index) => (
                <div key={index} className="flex items-start hover:bg-[#151928]/50 py-0.5 px-1 rounded transition-colors text-xs">
                  <span className="w-8 text-right pr-4 text-[#4C526E] select-none tabular-nums">
                    {index + 1}
                  </span>
                  <div className="flex-1 whitespace-pre-wrap font-mono">
                    {line.startsWith('#') ? (
                      <span className="text-[#CBA6F7] font-bold">{line}</span>
                    ) : line.includes('": "') || line.includes('": [') ? (
                      <span>
                        <span className="text-[#8BE9FD]">{line.split(':')[0]}:</span>
                        <span className="text-[#A6E3A1]">{line.substring(line.indexOf(':') + 1)}</span>
                      </span>
                    ) : line.startsWith('[') && line.endsWith(']') ? (
                      <span className="text-[#F9E2AF] font-semibold">{line}</span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vim Statusline Footer */}
        <div className="bg-[#181B28] px-3 py-1 border-t border-[#282C3F] flex items-center justify-between text-[11px] text-[#7F849C]">
          <div className="flex items-center space-x-2">
            <span className="bg-[#89B4FA] text-[#0D0F18] font-bold px-1.5 rounded-xs">
              {isRawView ? 'VIM/BUFFER' : 'NORMAL'}
            </span>
            <span className="text-[#D8DEE9]">{currentFileData.file}</span>
            <span className="text-[#585B70]">•</span>
            <span>utf-8</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{lines.length} lines</span>
            <span className="text-[#A6E3A1]">[RO]</span>
          </div>
        </div>
      </div>
    </section>
  )
}
