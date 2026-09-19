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
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { SYSTEM_INFO, ASCII_ARTS } from '../data/portfolioData'
import { soundFx } from '../utils/audio'

interface HeroSystemInfoProps {
  onNavigate: (section: string) => void
  onOpenTerminal: () => void
}

export const HeroSystemInfo: React.FC<HeroSystemInfoProps> = ({ onNavigate, onOpenTerminal }) => {
  const [activeAscii, setActiveAscii] = useState<'cyberRig' | 'developer' | 'abstractBot'>('cyberRig')
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
            
            {/* Left ASCII Art Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#090B12] p-4 sm:p-5 rounded border border-[#1E2235] relative group">
              {/* ASCII switcher tabs */}
              <div className="w-full flex items-center justify-between mb-2 pb-2 border-b border-[#1E2235] text-[11px] font-mono">
                <span className="text-[#7F849C] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#CBA6F7]" />
                  <span>ASCII VISUALIZER</span>
                </span>
                <div className="flex space-x-1">
                  {(['cyberRig', 'developer', 'abstractBot'] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        soundFx.playClick('key')
                        setActiveAscii(key)
                      }}
                      className={`px-1.5 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
                        activeAscii === key
                          ? 'bg-[#8BE9FD]/20 text-[#8BE9FD] border border-[#8BE9FD]/40'
                          : 'text-[#7F849C] hover:text-[#D8DEE9]'
                      }`}
                    >
                      {key === 'cyberRig' ? 'RIG' : key === 'developer' ? 'DEV' : 'BOT'}
                    </button>
                  ))}
                </div>
              </div>

              {/* ASCII Canvas with subtle neon glow */}
              <pre className="font-mono text-xs sm:text-sm text-[#8BE9FD] whitespace-pre select-none transition-all leading-tight drop-shadow-[0_0_8px_rgba(139,233,253,0.35)] overflow-x-auto max-w-full">
                {ASCII_ARTS[activeAscii]}
              </pre>

              {/* Terminal prompt beneath ASCII */}
              <div className="mt-3 pt-2 border-t border-[#1E2235] w-full text-center font-mono text-[11px] text-[#7F849C]">
                <span className="text-[#A6E3A1]">status:</span> active_dev_mode <span className="text-[#585B70]">//</span> <span className="text-[#F9E2AF]">hash:</span> #7f001
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
