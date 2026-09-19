import React, { useState } from 'react'
import {
  Terminal,
  Cpu,
  GraduationCap,
  Code2,
  FileCode,
  Clock,
  Shield,
  Database,
  ArrowDown,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { SYSTEM_INFO } from '../data/portfolioData'
import { soundFx } from '../utils/audio'
import danteImg from '../assets/danteX.jpg'

interface HeroSystemInfoProps {
  onNavigate: (section: string) => void
  onOpenTerminal: () => void
}

export const HeroSystemInfo: React.FC<HeroSystemInfoProps> = ({ onNavigate, onOpenTerminal }) => {
  const [showRawFastfetch, setShowRawFastfetch] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState(false)

  const iconMap: Record<string, React.ReactNode> = {
    Terminal: <Terminal className="w-3.5 h-3.5 text-[#8BE9FD]" />,
    Cpu: <Cpu className="w-3.5 h-3.5 text-[#CBA6F7]" />,
    GraduationCap: <GraduationCap className="w-3.5 h-3.5 text-[#89B4FA]" />,
    Code2: <Code2 className="w-3.5 h-3.5 text-[#A6E3A1]" />,
    FileCode: <FileCode className="w-3.5 h-3.5 text-[#FAB387]" />,
    Clock: <Clock className="w-3.5 h-3.5 text-[#F9E2AF]" />,
    Shield: <Shield className="w-3.5 h-3.5 text-[#F38BA8]" />,
    Database: <Database className="w-3.5 h-3.5 text-[#F5C2E7]" />,
  }

  const handleCopyNeofetch = () => {
    soundFx.playClick('key')
    const neofetchSummary = `niko-rax@portfolio
Name: Siva Kowsik S (Nagul)
Education: B.E. CSE '29, Sri Sairam Engineering College
Focus: Systems Programming, Linux, Cyber Security, Web
Callsign: niko-rax (140.85 MHz)`
    navigator.clipboard.writeText(neofetchSummary)
    setCopyFeedback(true)
    setTimeout(() => setCopyFeedback(false), 2000)
  }

  const coreSkills = [
    { name: 'Cyber Security', color: 'text-[#8BE9FD] border-[#8BE9FD]/40 bg-[#8BE9FD]/10' },
    { name: 'C / C++', color: 'text-[#CBA6F7] border-[#CBA6F7]/40 bg-[#CBA6F7]/10' },
    { name: 'Linux / POSIX', color: 'text-[#FAB387] border-[#FAB387]/40 bg-[#FAB387]/10' },
    { name: 'Python', color: 'text-[#F9E2AF] border-[#F9E2AF]/40 bg-[#F9E2AF]/10' },
    { name: 'React & TS', color: 'text-[#89B4FA] border-[#89B4FA]/40 bg-[#89B4FA]/10' },
    { name: 'Git / GitHub', color: 'text-[#A6E3A1] border-[#A6E3A1]/40 bg-[#A6E3A1]/10' },
  ]

  return (
    <section id="home" className="pt-2 pb-6 scroll-mt-24">
      {/* Terminal Window Container */}
      <div className="relative border-2 border-[#23283E] bg-[#111420]/95 rounded-sm shadow-2xl shadow-black/50 overflow-hidden">
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

        {/* Terminal Titlebar with MGS2 Codec Accent */}
        <div className="bg-[#181B28] px-4 py-2 border-b border-[#282C3F] flex items-center justify-between font-mono text-xs select-none">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#F38BA8] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#F9E2AF] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#A6E3A1] inline-block" />
            <span className="text-[#8BE9FD] font-mono text-[11px] bg-[#0E1524] px-2 py-0.5 rounded border border-[#8BE9FD]/30 sm:ml-2">
              MGS2 // SOLITON-LINK
            </span>
            <span className="text-[#7F849C] ml-1 font-mono hidden sm:inline text-[11px]">
              niko-rax.profile --interactive
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyNeofetch}
              className="text-[#7F849C] hover:text-[#8BE9FD] transition-colors px-2 py-0.5 rounded border border-[#282C3F] hover:border-[#8BE9FD]/40 text-[11px] cursor-pointer"
              title="Copy system specs"
            >
              {copyFeedback ? '[ COPIED! ]' : '[ COPY INFO ]'}
            </button>
            <span className="text-[#A6E3A1] font-mono text-[10px] bg-[#0A1215] px-1.5 py-0.5 rounded border border-[#A6E3A1]/30">
              140.85 MHz
            </span>
            <span className="text-[#585B70] hidden sm:inline">tty1</span>
          </div>
        </div>

        {/* Inner Content Grid */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Visualizer Column: MGS2 Codec danteX box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#07090F] p-3 sm:p-4 rounded-sm border-2 border-[#1E2438] relative shadow-2xl shadow-black/80 group">
              {/* MGS2 Codec Header Banner */}
              <div className="w-full flex items-center justify-between mb-2.5 pb-2 border-b border-[#1E2438] text-[11px] font-mono select-none">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A6E3A1] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A6E3A1]" />
                  </span>
                  <span className="text-[#A6E3A1] font-bold tracking-wider">CODEC // LINK</span>
                </div>

                <div className="flex items-center space-x-2 text-[10px]">
                  <span className="text-[#7F849C] hidden sm:inline">FREQ</span>
                  <span className="text-[#8BE9FD] font-bold bg-[#0F1424] px-2 py-0.5 rounded border border-[#8BE9FD]/30 font-mono tracking-wider">
                    140.85 MHz
                  </span>
                  <span className="text-[#CBA6F7] text-[9px] px-1 py-0.5 rounded bg-[#1C2035] border border-[#2B314F]">
                    MEM-1
                  </span>
                </div>
              </div>

              {/* MGS2 Tactical Frame with Corner Reticles & DanteX */}
              <div className="relative w-full aspect-square max-w-[300px] sm:max-w-[320px] mx-auto rounded-xs overflow-hidden border border-[#2B334E] bg-[#04060A] shadow-inner group">
                {/* Tactical Corner Brackets (MGS2 Style) */}
                <div className="absolute top-2 left-2 text-[#8BE9FD] text-xs font-mono select-none pointer-events-none z-20 opacity-85 leading-none drop-shadow-[0_0_4px_#8BE9FD]">
                  ┌──
                </div>
                <div className="absolute top-2 right-2 text-[#8BE9FD] text-xs font-mono select-none pointer-events-none z-20 opacity-85 leading-none drop-shadow-[0_0_4px_#8BE9FD]">
                  ──┐
                </div>
                <div className="absolute bottom-9 left-2 text-[#8BE9FD] text-xs font-mono select-none pointer-events-none z-20 opacity-85 leading-none drop-shadow-[0_0_4px_#8BE9FD]">
                  └──
                </div>
                <div className="absolute bottom-9 right-2 text-[#8BE9FD] text-xs font-mono select-none pointer-events-none z-20 opacity-85 leading-none drop-shadow-[0_0_4px_#8BE9FD]">
                  ──┘
                </div>

                {/* Tactical Target Indicator */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 text-[9px] text-[#8BE9FD]/80 font-mono select-none pointer-events-none z-20 tracking-wider">
                  + [ TARGET: NIKO-RAX ] +
                </div>

                {/* DanteX Image */}
                <img
                  src={danteImg}
                  alt="danteX.jpg - MGS2 Codec Operator Avatar"
                  className="w-full h-full object-cover rounded-xs filter contrast-110 saturate-105 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle CRT Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#04060A]/90 via-transparent to-transparent pointer-events-none" />

                {/* MGS2 Voice Transmission & Signal HUD */}
                <div className="absolute bottom-0 inset-x-0 bg-[#080B14]/95 border-t border-[#1E2438] px-2.5 py-1.5 flex items-center justify-between text-[10px] font-mono z-20 backdrop-blur-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#8BE9FD] font-bold">TX:</span>
                    {/* Animated voice transmission bars */}
                    <div className="flex items-end space-x-0.5 h-3">
                      <span className="w-1 bg-[#A6E3A1] h-1.5 animate-pulse" />
                      <span className="w-1 bg-[#A6E3A1] h-3 animate-pulse delay-75" />
                      <span className="w-1 bg-[#A6E3A1] h-2 animate-pulse delay-150" />
                      <span className="w-1 bg-[#A6E3A1] h-3.5 animate-pulse delay-100" />
                      <span className="w-1 bg-[#A6E3A1] h-1.5 animate-pulse delay-200" />
                    </div>
                    <span className="text-[#D8DEE9] text-[10px] font-medium ml-1">TRANSMITTING</span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[#CBA6F7]">
                    <span className="text-[9px] text-[#7F849C]">SIG:</span>
                    <span className="text-[10px] tracking-widest text-[#A6E3A1]">■■■■□</span>
                  </div>
                </div>
              </div>

              {/* MGS2 Tactical Telemetry Footer */}
              <div className="mt-2.5 pt-2 border-t border-[#1E2438] w-full font-mono text-[10px] text-[#7F849C] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#A6E3A1] font-bold">OPERATOR:</span>
                    <span className="text-[#D8DEE9] font-bold">Siva Kowsik S</span>
                  </span>
                  <span className="text-[#8BE9FD] font-semibold">CALLSIGN: niko-rax</span>
                </div>
                <div className="flex items-center justify-between text-[9px] text-[#585B70]">
                  <span>SOLITON RADAR // CH-140.85</span>
                  <span className="text-[#F9E2AF] font-bold">SEC-LEVEL: 05 [ACTIVE]</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact, Scannable Profile */}
            <div className="lg:col-span-7 flex flex-col justify-center font-mono">
              {/* Tactical Classification Strip */}
              <div className="text-[11px] text-[#8BE9FD] flex items-center gap-2 mb-2 select-none">
                <span className="w-2 h-2 rounded-full bg-[#A6E3A1] animate-pulse" />
                <span className="tracking-widest font-semibold">
                  CLASSIFIED // CODEC FREQ 140.85 MHz
                </span>
              </div>

              {/* Prominent Name Header */}
              <div className="mb-3">
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5C2E7] tracking-tight">
                    Siva Kowsik S
                  </h1>
                  <span className="text-sm sm:text-base font-semibold text-[#8BE9FD]">
                    (aka <span className="text-[#F9E2AF] font-bold">"Nagul"</span>)
                  </span>
                </div>

                {/* Subtitle Badges */}
                <div className="text-xs sm:text-sm text-[#7F849C] flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[#8BE9FD] font-bold">niko-rax</span>
                  <span>•</span>
                  <span className="text-[#A6E3A1] bg-[#A6E3A1]/10 px-2 py-0.5 rounded border border-[#A6E3A1]/30 font-semibold">
                    CSE '29 Undergrad
                  </span>
                  <span>•</span>
                  <span className="text-[#D8DEE9]">Sri Sairam Engineering College</span>
                </div>
              </div>

              {/* 2-Sentence Punchy Pitch */}
              <p className="text-xs sm:text-sm text-[#BAC2DE] leading-relaxed mb-4 bg-[#090B12]/80 p-3 rounded border border-[#1E2235]">
                Computer Science Engineering student obsessed with{' '}
                <strong className="text-[#8BE9FD]">low-level systems</strong>,{' '}
                <strong className="text-[#A6E3A1]">Linux internals</strong>,{' '}
                <strong className="text-[#F9E2AF]">network security</strong>, and building fast,
                aesthetic software tools.
              </p>

              {/* Core Skill Arsenal Chips (Instant 2-second scan) */}
              <div className="mb-4">
                <div className="text-[11px] text-[#7F849C] mb-1.5 flex items-center justify-between">
                  <span>CORE ARSENAL:</span>
                  <span className="text-[10px] text-[#585B70]">Systems • Security • Web</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {coreSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded text-xs font-semibold border ${skill.color} transition-transform hover:scale-105 cursor-default`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3 Tactical Quick Telemetry Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
                <div className="bg-[#090A10] p-2.5 rounded border border-[#1E2235]">
                  <div className="text-[10px] text-[#7F849C]">DEGREE & YEAR</div>
                  <div className="text-xs font-bold text-[#89B4FA] mt-0.5">B.E. CSE (2025–29)</div>
                  <div className="text-[10px] text-[#585B70]">Sri Sairam Engg</div>
                </div>

                <div className="bg-[#090A10] p-2.5 rounded border border-[#1E2235]">
                  <div className="text-[10px] text-[#7F849C]">PRIMARY FOCUS</div>
                  <div className="text-xs font-bold text-[#A6E3A1] mt-0.5">Systems & CyberSec</div>
                  <div className="text-[10px] text-[#585B70]">C/C++, Linux, Web</div>
                </div>

                <div className="bg-[#090A10] p-2.5 rounded border border-[#1E2235]">
                  <div className="text-[10px] text-[#7F849C]">AVAILABILITY</div>
                  <div className="text-xs font-bold text-[#F9E2AF] mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A6E3A1] animate-pulse" />
                    Open to Work
                  </div>
                  <div className="text-[10px] text-[#585B70]">Internships & Collabs</div>
                </div>
              </div>

              {/* High-Contrast Primary Call To Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => {
                    soundFx.playClick('enter')
                    onNavigate('projects')
                  }}
                  className="px-4 py-2.5 rounded bg-[#8BE9FD] text-[#0A0C14] hover:bg-[#A6E3A1] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#8BE9FD]/20 hover:shadow-[#A6E3A1]/30 hover:scale-[1.02]"
                >
                  <ArrowDown className="w-4 h-4" />
                  <span>VIEW PROJECTS</span>
                </button>

                <a
                  href="https://github.com/Nagul08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded bg-[#1A1D2D] border border-[#282C3F] hover:border-[#8BE9FD]/60 text-[#D8DEE9] hover:text-[#8BE9FD] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GITHUB ↗</span>
                </a>

                <button
                  onClick={() => {
                    soundFx.playClick('key')
                    onNavigate('contact')
                  }}
                  className="px-3.5 py-2.5 rounded bg-[#CBA6F7]/15 border border-[#CBA6F7]/40 text-[#CBA6F7] hover:bg-[#CBA6F7]/25 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>CONTACT / TRANSMIT</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick('enter')
                    onOpenTerminal()
                  }}
                  className="px-3 py-2.5 rounded bg-[#111420] border border-[#3E4562] text-[#8BE9FD] hover:bg-[#8BE9FD]/15 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Press ~ to toggle CLI"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>&gt;_ CLI (~)</span>
                </button>

                {/* Raw Fastfetch Specs Toggle */}
                <button
                  onClick={() => {
                    soundFx.playClick('tab')
                    setShowRawFastfetch(!showRawFastfetch)
                  }}
                  className="ml-auto text-[11px] text-[#7F849C] hover:text-[#8BE9FD] flex items-center gap-1 px-2 py-1 rounded border border-transparent hover:border-[#282C3F] cursor-pointer"
                  title="Toggle raw fastfetch telemetry table"
                >
                  <span>{showRawFastfetch ? 'HIDE RAW SPECS' : 'RAW FASTFETCH'}</span>
                  {showRawFastfetch ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Collapsible Raw Fastfetch Specs (For deep nerds) */}
              {showRawFastfetch && (
                <div className="mt-4 pt-4 border-t border-[#1E2235] animate-fade-in bg-[#090A10]/90 p-3.5 rounded border">
                  <div className="flex items-center justify-between text-[11px] text-[#7F849C] mb-2 pb-1 border-b border-[#1E2235]">
                    <span>$ fastfetch --config ~/.config/fastfetch/config.jsonc</span>
                    <span className="text-[#A6E3A1]">RAW TELEMETRY</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {SYSTEM_INFO.specs.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-0.5 border-b border-[#151928]"
                      >
                        <div className="flex items-center space-x-2 text-[#89B4FA]">
                          {iconMap[item.icon] || <Terminal className="w-3 h-3 text-[#89B4FA]" />}
                          <span>{item.label}</span>
                        </div>
                        <div className="text-right text-[#BAC2DE]">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Palette Swatches */}
                  <div className="mt-3 pt-2 border-t border-[#1E2235] flex items-center space-x-1.5">
                    <span className="text-[#7F849C] text-[10px] mr-1">PALETTE:</span>
                    {SYSTEM_INFO.neofetchColors.map((c, i) => (
                      <span
                        key={i}
                        style={{ backgroundColor: c.hex }}
                        className="w-3.5 h-3.5 rounded-xs inline-block shadow-sm hover:scale-125 transition-transform cursor-pointer"
                        title={`${c.name}: ${c.hex}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
