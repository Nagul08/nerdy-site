import React, { useState, useEffect, useRef } from 'react'
import {
  Terminal as TerminalIcon,
  X,
  CornerDownLeft,
  Maximize2,
  Minimize2,
  ExternalLink,
  Palette,
  Check,
} from 'lucide-react'
import { soundFx } from '../utils/audio'
import type { ThemeName } from '../types'
import { THEMES, THEME_KEYS, getRandomTheme } from '../utils/themeConfig'
import { PROJECTS } from '../data/portfolioData'

interface InteractiveTerminalModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (section: string) => void
  onToggleMatrix: () => void
  onChangeTheme: (theme: ThemeName) => void
  onReplayIntro?: () => void
  crtEnabled?: boolean
  onToggleCrt?: (force?: boolean) => void
}

interface LogEntry {
  id: string
  command?: string
  output: React.ReactNode
  isError?: boolean
}

export const InteractiveTerminalModal: React.FC<InteractiveTerminalModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onToggleMatrix,
  onChangeTheme,
  onReplayIntro,
  crtEnabled = true,
  onToggleCrt,
}) => {
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [isMaximized, setIsMaximized] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const logContainerRef = useRef<HTMLDivElement>(null)

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'init-1',
      output: (
        <div className="space-y-1 text-xs text-[#CBD5E1]">
          <div className="font-bold text-accent">
            niko-rax interactive shell v2.5.0 (x86_64-pc-linux-gnu)
          </div>
          <div className="text-[#94A3B8]">
            Type <span className="text-accent font-semibold underline">help</span> to list commands, or click any chip above.
          </div>
        </div>
      ),
    },
  ])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [isOpen])

  // Scroll to bottom on new log
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim()
    if (!trimmed) return

    soundFx.playClick('enter')

    setHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    const parts = trimmed.split(' ')
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    const entryId = `cmd-${Date.now()}`
    let responseNode: React.ReactNode = null
    let isError = false

    switch (cmd) {
      case 'help':
        responseNode = (
          <div className="space-y-2 text-xs text-[#CBD5E1]">
            <div className="text-accent font-bold tracking-wider">// AVAILABLE COMMANDS</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-1">
              <div>
                <span className="text-accent font-bold font-mono">theme [name]</span>
                <span className="text-[#94A3B8]"> - sunset | dusk | crimson | noir | random</span>
              </div>
              <div>
                <span className="text-accent font-bold font-mono">crt [on|off]</span>
                <span className="text-[#94A3B8]"> - Toggle vintage CRT glow & scanlines</span>
              </div>
              <div>
                <span className="text-accent font-bold font-mono">projects</span>
                <span className="text-[#94A3B8]"> - View featured work & code repos</span>
              </div>
              <div>
                <span className="text-accent font-bold font-mono">skills</span>
                <span className="text-[#94A3B8]"> - Low-level & cyber security stack</span>
              </div>
              <div>
                <span className="text-accent font-bold font-mono">about</span>
                <span className="text-[#94A3B8]"> - Background & engineering mindset</span>
              </div>
              <div>
                <span className="text-accent font-bold font-mono">radio</span>
                <span className="text-[#94A3B8]"> - Tune Lo-Fi & Synthwave audio streamer</span>
              </div>
              <div>
                <span className="text-accent font-bold font-mono">social</span>
                <span className="text-[#94A3B8]"> - GitHub, LinkedIn, contact channels</span>
              </div>
              <div>
                <span className="text-accent font-bold font-mono">contact</span>
                <span className="text-[#94A3B8]"> - Dispatch collaboration transmission</span>
              </div>
              <div>
                <span className="text-accent font-bold font-mono">matrix</span>
                <span className="text-[#94A3B8]"> - Toggle digital rain effect</span>
              </div>
              <div>
                <span className="text-accent font-bold font-mono">whoami</span>
                <span className="text-[#94A3B8]"> - Operator credentials & system info</span>
              </div>
              <div>
                <span className="text-accent font-bold font-mono">intro</span>
                <span className="text-[#94A3B8]"> - Replay crypto glyph opening sequence</span>
              </div>
              <div>
                <span className="text-accent font-bold font-mono">clear</span>
                <span className="text-[#94A3B8]"> - Clear terminal screen</span>
              </div>
              <div>
                <span className="text-accent font-bold font-mono">exit</span>
                <span className="text-[#94A3B8]"> - Close terminal drawer (Esc)</span>
              </div>
            </div>
          </div>
        )
        break

      case 'theme': {
        const requested = args[0]?.toLowerCase()
        if (requested === 'random') {
          const rand = getRandomTheme()
          onChangeTheme(rand)
          const info = THEMES[rand]
          responseNode = (
            <div className="text-xs space-y-1">
              <div className="text-[#10B981] font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Random theme selected: {info.name}</span>
              </div>
              <div className="text-[#94A3B8]">Wallpaper: {info.wallpaperName} • {info.tagline}</div>
            </div>
          )
        } else if (requested && THEME_KEYS.includes(requested as ThemeName)) {
          const tName = requested as ThemeName
          onChangeTheme(tName)
          const info = THEMES[tName]
          responseNode = (
            <div className="text-xs space-y-1">
              <div className="text-[#10B981] font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Theme switched to: {info.name}</span>
              </div>
              <div className="text-[#94A3B8]">Wallpaper: {info.wallpaperName} • {info.tagline}</div>
            </div>
          )
        } else {
          responseNode = (
            <div className="text-xs space-y-2.5">
              <div className="text-accent font-bold flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                <span>SELECT WALLPAPER & ACCENT THEME:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
                {THEME_KEYS.map((key) => {
                  const item = THEMES[key]
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        soundFx.playClick('key')
                        onChangeTheme(key)
                      }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          style={{ backgroundColor: item.primaryHex }}
                          className="w-3 h-3 rounded-full shadow-sm"
                        />
                        <span className="font-bold text-[#F8FAFC] group-hover:text-accent transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#64748B]">{item.wallpaperName}</span>
                    </button>
                  )
                })}
              </div>
              <div className="pt-1">
                <button
                  onClick={() => {
                    soundFx.playClick('key')
                    onChangeTheme(getRandomTheme())
                  }}
                  className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-[#10B981] font-bold border border-[#10B981]/30 text-xs transition-colors cursor-pointer"
                >
                  ⚡ Shuffle Random Theme
                </button>
              </div>
            </div>
          )
        }
        break
      }

      case 'crt':
      case 'tv': {
        const subArg = args[0]?.toLowerCase()
        let nextState: boolean
        if (subArg === 'on' || subArg === 'enable' || subArg === '1') {
          nextState = true
        } else if (subArg === 'off' || subArg === 'disable' || subArg === '0') {
          nextState = false
        } else {
          nextState = !crtEnabled
        }

        if (onToggleCrt) {
          onToggleCrt(nextState)
        }

        responseNode = (
          <div className="text-xs space-y-1">
            <div className="text-[#10B981] font-bold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Vintage CRT Glow & Scanlines: {nextState ? 'ENABLED' : 'DISABLED'}</span>
            </div>
            <div className="text-[#94A3B8]">
              {nextState
                ? 'Cathode tube phosphor bloom, curvature vignette, and rolling raster active.'
                : 'CRT effect bypassed. Rendering sharp digital display.'}
            </div>
          </div>
        )
        break
      }

      case 'projects':
        responseNode = (
          <div className="text-xs space-y-2">
            <div className="text-[#10B981] font-bold">&gt; Navigating to #projects directory...</div>
            <div className="space-y-2 pl-2 border-l border-white/10">
              {PROJECTS.map((p) => (
                <div key={p.id}>
                  <div className="flex items-center space-x-2">
                    <span className="text-accent font-bold">{p.name}</span>
                    <span className="text-[10px] text-[#64748B]">[{p.stats.language}]</span>
                  </div>
                  <div className="text-[#94A3B8] text-[11px]">{p.tagline}</div>
                  <div className="flex items-center space-x-2 mt-0.5 text-[11px]">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline flex items-center gap-1"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#10B981] underline flex items-center gap-1"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
        onNavigate('projects')
        break

      case 'skills':
        responseNode = (
          <div className="text-xs space-y-2">
            <div className="text-accent font-bold">&gt; TECHNICAL COMPETENCY MATRIX:</div>
            <div className="space-y-1.5 text-[#CBD5E1] pl-1">
              <div>
                <span className="text-[#C084FC] font-semibold">Systems & Low-Level:</span>{' '}
                <span className="text-[#94A3B8]">C, C++, Linux Internals, POSIX APIs, Bash Automation, Memory Layout</span>
              </div>
              <div>
                <span className="text-accent font-semibold">Cyber Security & Networks:</span>{' '}
                <span className="text-[#94A3B8]">TCP/IP, Raw Sockets, Wireshark, GDB Binary Debugging, Packet Sniffing</span>
              </div>
              <div>
                <span className="text-[#10B981] font-semibold">Web & Full-Stack:</span>{' '}
                <span className="text-[#94A3B8]">React 19, TypeScript (Strict), Node.js, Express, WebSocket, Web Audio API, Tailwind CSS, Vite</span>
              </div>
              <div>
                <span className="text-[#FBBF24] font-semibold">Developer Tooling:</span>{' '}
                <span className="text-[#94A3B8]">Git & GitHub, Neovim (NvChad), VS Code, WSL2 Ubuntu 24.04</span>
              </div>
            </div>
          </div>
        )
        onNavigate('skills')
        break

      case 'about':
        responseNode = (
          <div className="text-xs space-y-1.5 text-[#CBD5E1]">
            <div className="text-accent font-bold">Siva Kowsik S (@niko-rax)</div>
            <div className="text-[#94A3B8]">
              Second-year Computer Science Engineering student @ Sri Sairam Engineering College (Class of 2029).
            </div>
            <p className="text-[#94A3B8]">
              Passionate about systems programming, kernel internals, network security, and crafting fast, aesthetic web software.
            </p>
            <div className="text-[#10B981] text-[11px]">&gt; Jumped to #about section</div>
          </div>
        )
        onNavigate('about')
        break

      case 'radio':
      case 'audio':
      case 'cliamp':
      case 'music':
        responseNode = (
          <div className="text-xs space-y-1 text-[#CBD5E1]">
            <div className="text-accent font-bold">&gt; AUDIO SUBSYSTEM LOCKED</div>
            <div className="text-[#94A3B8]">
              Tuned to Lo-Fi Coding Beats & Synthwave streams. Spinning vinyl turntable is active!
            </div>
            <div className="text-[#10B981] text-[11px]">&gt; Jumped to #audio player</div>
          </div>
        )
        onNavigate('audio')
        break

      case 'social':
        responseNode = (
          <div className="text-xs space-y-1.5">
            <div className="text-accent font-bold">&gt; OUTBOUND CHANNELS & ENDPOINTS:</div>
            <div className="space-y-1 pl-1 text-[#CBD5E1]">
              <div>
                GitHub:{' '}
                <a href="https://github.com/Nagul08" target="_blank" rel="noopener noreferrer" className="text-accent underline">
                  github.com/Nagul08
                </a>
              </div>
              <div>
                LinkedIn:{' '}
                <a href="https://www.linkedin.com/in/siva-kowsik-s-b490b437b/" target="_blank" rel="noopener noreferrer" className="text-accent underline">
                  linkedin.com/in/siva-kowsik-s
                </a>
              </div>
              <div>
                Direct Email:{' '}
                <a href="mailto:sivphax08@gmail.com" className="text-accent underline">
                  sivphax08@gmail.com
                </a>
              </div>
            </div>
          </div>
        )
        onNavigate('social')
        break

      case 'contact':
        responseNode = (
          <div className="text-xs space-y-1">
            <div className="text-[#10B981] font-bold">&gt; Opening contact transmission panel...</div>
            <div className="text-[#94A3B8]">Direct Email: sivphax08@gmail.com</div>
          </div>
        )
        onNavigate('contact')
        break

      case 'whoami':
        responseNode = (
          <div className="text-xs text-[#CBD5E1] space-y-1">
            <div>operator: <span className="text-accent font-bold">niko-rax</span> (Siva Kowsik S)</div>
            <div>institution: Sri Sairam Engineering College (CSE '29)</div>
            <div>client: guest@browser ({window.innerWidth}x{window.innerHeight})</div>
            <div>session: interactive-pty-0 (read/execute)</div>
          </div>
        )
        break

      case 'uptime':
        responseNode = (
          <div className="text-xs text-accent">
            system up 42 days, 14 hours, load average: 0.08, 0.04, 0.02
          </div>
        )
        break

      case 'matrix':
        onToggleMatrix()
        responseNode = (
          <div className="text-xs text-[#10B981]">
            [✓] Matrix digital rain effect toggled!
          </div>
        )
        break

      case 'intro':
      case 'cipher':
        if (onReplayIntro) {
          responseNode = (
            <div className="text-xs text-accent">
              [✓] Launching crypto glyph opening sequence...
            </div>
          )
          setTimeout(() => {
            onClose()
            onReplayIntro()
          }, 350)
        }
        break

      case 'clear':
        setLogs([])
        setInputVal('')
        return

      case 'exit':
        onClose()
        return

      default:
        responseNode = (
          <div className="text-xs text-[#EF4444]">
            zsh: command not found: {cmd}. Type <span className="text-accent underline font-semibold">help</span> for available commands.
          </div>
        )
        isError = true
        soundFx.playClick('beep')
        break
    }

    setLogs((prev) => [
      ...prev,
      {
        id: entryId,
        command: trimmed,
        output: responseNode,
        isError,
      },
    ])

    setInputVal('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(nextIndex)
        setInputVal(history[nextIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1
        if (nextIndex >= history.length) {
          setHistoryIndex(-1)
          setInputVal('')
        } else {
          setHistoryIndex(nextIndex)
          setInputVal(history[nextIndex])
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const available = ['help', 'theme', 'crt', 'projects', 'skills', 'about', 'radio', 'social', 'contact', 'clear', 'whoami', 'uptime', 'matrix', 'intro']
      const match = available.find((c) => c.startsWith(inputVal.toLowerCase()))
      if (match) {
        soundFx.playClick('tab')
        setInputVal(match)
      }
    } else {
      soundFx.playClick('key')
    }
  }

  if (!isOpen) return null

  const quickCommands = ['help', 'theme', 'crt', 'projects', 'skills', 'about', 'radio', 'social', 'contact', 'clear']

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-mono">
      {/* Frosted Glass Shell Window */}
      <div
        className={`relative w-full frosted-glass rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 border border-white/15 ${
          isMaximized
            ? 'h-full sm:h-[95vh] sm:max-w-6xl'
            : 'h-[80vh] sm:h-[540px] sm:max-w-2xl'
        }`}
      >
        {/* Clean Modern Titlebar */}
        <div className="bg-[#060810]/90 px-4 py-3 border-b border-white/10 flex items-center justify-between text-xs select-none">
          {/* Left: Window Controls + Callsign */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#EF4444] inline-block cursor-pointer hover:opacity-80 transition-opacity"
                title="Close (Esc)"
              />
              <span
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-[#F59E0B] inline-block cursor-pointer hover:opacity-80 transition-opacity"
                title="Toggle Maximize"
              />
              <span
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#10B981] inline-block cursor-pointer hover:opacity-80 transition-opacity"
                title="Minimize"
              />
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold">
              <TerminalIcon className="w-3.5 h-3.5 text-accent" />
              <span className="text-[#F8FAFC]">niko-rax@workstation</span>
              <span className="text-[#64748B] text-[11px]">:~ (zsh)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </div>
          </div>

          {/* Right: Window Action Buttons */}
          <div className="flex items-center space-x-2 text-[#94A3B8]">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="hover:text-[#F8FAFC] transition-colors p-1 cursor-pointer"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="hover:text-[#EF4444] transition-colors p-1 cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Streamlined Quick Command Chips */}
        <div className="bg-[#05070E]/80 px-3.5 py-2 border-b border-white/10 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider shrink-0">
            Chips:
          </span>
          {quickCommands.map((q) => (
            <button
              key={q}
              onClick={() => executeCommand(q)}
              className="px-2.5 py-0.5 rounded-md bg-white/5 hover:bg-white/15 text-accent border border-accent-subtle hover:border-accent transition-all cursor-pointer shrink-0 font-medium text-[11px]"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Main Terminal Buffer Log */}
        <div
          ref={logContainerRef}
          className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs sm:text-sm bg-transparent"
        >
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              {log.command && (
                <div className="flex items-center space-x-2 text-[#64748B] font-medium">
                  <span className="text-accent font-bold">niko-rax:~$</span>
                  <span className="text-[#F8FAFC]">{log.command}</span>
                </div>
              )}
              <div className="pl-3 border-l-2 border-accent-subtle py-0.5">
                {log.output}
              </div>
            </div>
          ))}
        </div>

        {/* Input Command Line */}
        <div className="bg-[#060810]/95 p-3.5 border-t border-white/10 flex items-center space-x-2.5">
          <span className="text-accent text-xs font-bold shrink-0">
            niko-rax:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'theme', 'projects', 'about'..."
            className="flex-1 bg-transparent text-[#F8FAFC] text-xs sm:text-sm outline-none font-mono"
            autoFocus
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="px-3 py-1.5 rounded-lg bg-accent text-[#08090C] hover:opacity-90 font-bold text-xs flex items-center gap-1 cursor-pointer transition-opacity"
            title="Execute (Enter)"
          >
            <span>Run</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
