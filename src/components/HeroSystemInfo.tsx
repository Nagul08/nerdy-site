import React, { useState } from 'react'
import {
  Terminal,
  Cpu,
  GraduationCap,
  Code2,
  FileCode,
  Clock,
  MapPin,
  Database,
  ArrowRight,
} from 'lucide-react'
import { SYSTEM_INFO } from '../data/portfolioData'
import { soundFx } from '../utils/audio'
import danteImg from '../assets/danteX.jpg'

interface HeroSystemInfoProps {
  onNavigate: (section: string) => void
  onOpenTerminal: () => void
}

export const HeroSystemInfo: React.FC<HeroSystemInfoProps> = ({ onNavigate, onOpenTerminal }) => {
  const [copyFeedback, setCopyFeedback] = useState(false)

  const iconMap: Record<string, React.ReactNode> = {
    Terminal: <Terminal className="w-3.5 h-3.5 text-[#8BE9FD]" />,
    Cpu: <Cpu className="w-3.5 h-3.5 text-[#CBA6F7]" />,
    GraduationCap: <GraduationCap className="w-3.5 h-3.5 text-[#89B4FA]" />,
    Code2: <Code2 className="w-3.5 h-3.5 text-[#A6E3A1]" />,
    FileCode: <FileCode className="w-3.5 h-3.5 text-[#FAB387]" />,
    Clock: <Clock className="w-3.5 h-3.5 text-[#F9E2AF]" />,
    MapPin: <MapPin className="w-3.5 h-3.5 text-[#F38BA8]" />,
    Database: <Database className="w-3.5 h-3.5 text-[#F5C2E7]" />,
  }

  const handleCopyNeofetch = () => {
    soundFx.playClick('key')
    const neofetchSummary = `retr0@portfolio
Name: Siva Kowsik S (Nagul)
OS: Windows 11
Kernel: Developer Mode / WSL2
CPU: Computer Science Engineering (Second Year)
College: Sri Sairam Engineering College
Location: Chennai, India`
    navigator.clipboard.writeText(neofetchSummary)
    setCopyFeedback(true)
    setTimeout(() => setCopyFeedback(false), 2000)
  }

  return (
    <section id="home" className="py-6 sm:py-8">
      {/* Terminal Window Container */}
      <div className="border border-[#282C3F] bg-[#111420]/95 rounded-sm shadow-xl shadow-black/40 overflow-hidden">
        {/* Terminal Titlebar */}
        <div className="bg-[#181B28] px-4 py-2 border-b border-[#282C3F] flex items-center justify-between font-mono text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#F38BA8] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#F9E2AF] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#A6E3A1] inline-block" />
            <span className="text-[#7F849C] ml-2 font-mono">
              fastfetch --load-config ~/.config/fastfetch/config.jsonc
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
            <span className="text-[#585B70]">tty1</span>
          </div>
        </div>

        {/* Inner Content Grid: Left ASCII Art, Right Neofetch System Information */}
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
              <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[340px] mx-auto rounded-xs overflow-hidden border border-[#2B334E] bg-[#04060A] shadow-inner group">
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
                  + [ TARGET: RETR0 ] +
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
                  <span className="text-[#8BE9FD] font-semibold">CALLSIGN: retr0</span>
                </div>
                <div className="flex items-center justify-between text-[9px] text-[#585B70]">
                  <span>SOLITON RADAR // CH-140.85</span>
                  <span className="text-[#F9E2AF] font-bold">SEC-LEVEL: 05 [ACTIVE]</span>
                </div>
              </div>
            </div>

            {/* Right System Information Column (Fastfetch style) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* User@Host Header */}
              <div className="mb-4">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold font-mono text-[#F5C2E7] tracking-tight">
                    Siva Kowsik S
                  </h1>
                  <span className="text-sm font-medium text-[#8BE9FD] font-mono">
                    (aka <span className="text-[#F9E2AF] font-bold">"Nagul"</span>)
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-[#7F849C] flex items-center gap-2 mt-1">
                  <span className="text-[#8BE9FD]">retr0</span>
                  <span>@</span>
                  <span className="text-[#CBA6F7]">portfolio</span>
                  <span>•</span>
                  <span className="text-[#A6E3A1]">B.E. CSE '29</span>
                  <span>•</span>
                  <span>Sri Sairam Engineering College</span>
                </div>
                <div className="font-mono text-xs text-[#585B70] mt-1.5">
                  ─────────────────────────────────────────────────────
                </div>
              </div>

              {/* System Specs List */}
              <div className="space-y-2 font-mono text-xs sm:text-sm">
                {SYSTEM_INFO.specs.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start sm:items-center justify-between py-1 border-b border-[#1A1D2D]/60 hover:bg-[#151928]/40 px-1 rounded transition-colors"
                  >
                    <div className="flex items-center space-x-2 text-[#89B4FA] font-medium min-w-[90px] sm:min-w-[110px]">
                      {iconMap[item.icon] || <Terminal className="w-3.5 h-3.5 text-[#89B4FA]" />}
                      <span>{item.label}</span>
                    </div>
                    <div className="text-right text-[#D8DEE9] font-mono text-xs sm:text-[13px] break-all sm:break-normal">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Fastfetch Color Palette Swatches */}
              <div className="mt-4 pt-2 flex items-center space-x-1.5 font-mono text-xs">
                <span className="text-[#7F849C] text-[11px] mr-2">PALETTE:</span>
                {SYSTEM_INFO.neofetchColors.map((c, i) => (
                  <span
                    key={i}
                    style={{ backgroundColor: c.hex }}
                    className="w-4 h-4 rounded-sm inline-block shadow-sm transition-transform hover:scale-125 cursor-pointer"
                    title={`${c.name}: ${c.hex}`}
                    onClick={() => soundFx.playClick('key')}
                  />
                ))}
              </div>

              {/* Availability & Building Status Badges */}
              <div className="mt-5 pt-3 border-t border-[#23283E] grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SYSTEM_INFO.statuses.map((st, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 bg-[#090A10] px-2.5 py-1.5 rounded border border-[#1E2235] text-xs font-mono"
                  >
                    <span
                      style={{ backgroundColor: st.color }}
                      className="w-2 h-2 rounded-full animate-pulse inline-block"
                    />
                    <span className="text-[#D8DEE9] font-medium">{st.text}</span>
                  </div>
                ))}
              </div>

              {/* Quick CLI Actions */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => {
                    soundFx.playClick('enter')
                    onNavigate('projects')
                  }}
                  className="px-3 py-2 rounded bg-[#8BE9FD]/15 border border-[#8BE9FD]/40 text-[#8BE9FD] hover:bg-[#8BE9FD]/25 font-mono text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-[#8BE9FD]/20"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>$ ls ~/projects</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick('key')
                    onNavigate('about')
                  }}
                  className="px-3 py-2 rounded bg-[#CBA6F7]/15 border border-[#CBA6F7]/40 text-[#CBA6F7] hover:bg-[#CBA6F7]/25 font-mono text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>$ cat about.txt</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick('enter')
                    onOpenTerminal()
                  }}
                  className="px-3 py-2 rounded bg-[#A6E3A1]/15 border border-[#A6E3A1]/40 text-[#A6E3A1] hover:bg-[#A6E3A1]/25 font-mono text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>$ ./launch-cli.sh</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
