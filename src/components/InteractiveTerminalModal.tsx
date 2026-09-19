import React, { useState, useEffect, useRef } from 'react'
import {
  Terminal as TerminalIcon,
  X,
  CornerDownLeft,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { soundFx } from '../utils/audio'
import type { ThemeName } from '../types'

interface InteractiveTerminalModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (section: string) => void
  onToggleMatrix: () => void
  onChangeTheme: (theme: ThemeName) => void
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
}) => {
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'init-1',
      output: (
        <div className="text-[#8BE9FD] space-y-1">
          <div>Welcome to Nagul's Interactive Terminal Shell (v2.4.0)</div>
          <div className="text-[#7F849C] text-xs">
            Type <span className="text-[#F9E2AF] font-bold">help</span> to view available commands, or click any suggestion chip below.
          </div>
        </div>
      ),
    },
  ])
  const [isMaximized, setIsMaximized] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const logContainerRef = useRef<HTMLDivElement>(null)

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
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

    // Add to history
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
          <div className="space-y-1.5 text-xs text-[#D8DEE9]">
            <div className="text-[#A6E3A1] font-semibold">Available commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-2">
              <div>
                <span className="text-[#8BE9FD] font-bold">about</span>
                <span className="text-[#7F849C]"> - View bio and background</span>
              </div>
              <div>
                <span className="text-[#8BE9FD] font-bold">projects</span>
                <span className="text-[#7F849C]"> - Jump to project directory</span>
              </div>
              <div>
                <span className="text-[#8BE9FD] font-bold">skills</span>
                <span className="text-[#7F849C]"> - Show technical competencies</span>
              </div>
              <div>
                <span className="text-[#8BE9FD] font-bold">github</span>
                <span className="text-[#7F849C]"> - Display git commits & repo</span>
              </div>
              <div>
                <span className="text-[#8BE9FD] font-bold">social</span>
                <span className="text-[#7F849C]"> - Connect endpoints</span>
              </div>
              <div>
                <span className="text-[#8BE9FD] font-bold">contact</span>
                <span className="text-[#7F849C]"> - Dispatch email transmission</span>
              </div>
              <div>
                <span className="text-[#8BE9FD] font-bold">matrix</span>
                <span className="text-[#7F849C]"> - Toggle digital rain effect</span>
              </div>
              <div>
                <span className="text-[#8BE9FD] font-bold">theme [name]</span>
                <span className="text-[#7F849C]"> - catppuccin | tokyo | cyber | nord</span>
              </div>
              <div>
                <span className="text-[#8BE9FD] font-bold">whoami</span>
                <span className="text-[#7F849C]"> - Display visitor profile</span>
              </div>
              <div>
                <span className="text-[#8BE9FD] font-bold">uptime</span>
                <span className="text-[#7F849C]"> - System operational uptime</span>
              </div>
              <div>
                <span className="text-[#8BE9FD] font-bold">clear</span>
                <span className="text-[#7F849C]"> - Clear terminal screen</span>
              </div>
              <div>
                <span className="text-[#8BE9FD] font-bold">exit</span>
                <span className="text-[#7F849C]"> - Close terminal drawer</span>
              </div>
            </div>
          </div>
        )
        break

      case 'about':
        responseNode = (
          <div className="text-xs space-y-1 text-[#D8DEE9]">
            <div className="text-[#8BE9FD] font-bold">Siva Kowsik S -AKA- Nagul</div>
            <div className="text-xs text-[#CBA6F7]">CSE '29 @ Sri Sairam Engineering College</div>
            <p className="text-[#BAC2DE]">
              Building for the web, cranking Linux setups, diving into cyber security, and breaking systems to understand how they work under the hood.
            </p>
            <div className="text-[#A6E3A1] text-[11px]">&gt; Navigating to #about section...</div>
          </div>
        )
        onNavigate('about')
        break

      case 'projects':
        responseNode = (
          <div className="text-xs space-y-1">
            <div className="text-[#A6E3A1]">&gt; Navigating to ~/projects directory...</div>
            <div className="text-[#7F849C]">
              Found projects: nerdy-site, devpulse-telemetry, bytevibe-interactive-shell, cachecraft-distributed-kv, neuralcanvas-ai, hypr-rice-dotfiles, algotrace-visualizer.
            </div>
          </div>
        )
        onNavigate('projects')
        break

      case 'skills':
        responseNode = (
          <div className="text-xs space-y-1">
            <div className="text-[#A6E3A1]">&gt; Reading skills.sh...</div>
            <div className="text-[#D8DEE9]">
              Frontend (85%), Backend (70%), Python (80%), Database (65%), Git (88%), CyberSec & Linux (72%).
            </div>
          </div>
        )
        onNavigate('skills')
        break

      case 'github':
        responseNode = (
          <div className="text-xs space-y-1">
            <div className="text-[#8BE9FD]">&gt; git log --oneline -n 3:</div>
            <div className="text-[#F9E2AF]">abc1234 feat(nerdy-site): launch customized terminal portfolio</div>
            <div className="text-[#F9E2AF]">91fa221 refactor(terminal): optimize command parser</div>
            <div className="text-[#F9E2AF]">72bc981 perf(cache): achieve O(1) LRU eviction</div>
            <div className="text-[#A6E3A1] pt-1">&gt; Navigating to #github...</div>
          </div>
        )
        onNavigate('github')
        break

      case 'social':
        responseNode = (
          <div className="text-xs space-y-1">
            <div className="text-[#A6E3A1]">&gt; Outbound sockets available:</div>
            <div>GitHub: github.com/Nagul08</div>
            <div>LinkedIn: linkedin.com/in/siva-kowsik-s</div>
            <div>Instagram: @nagul_08_x_</div>
            <div>Discord: itz_nagul_08_</div>
            <div>Email: sivphax08@gmail.com</div>
          </div>
        )
        onNavigate('social')
        break

      case 'contact':
        responseNode = (
          <div className="text-xs space-y-1">
            <div className="text-[#A6E3A1]">&gt; Opening transmission prompt...</div>
            <div className="text-[#D8DEE9]">Email: sivphax08@gmail.com</div>
          </div>
        )
        onNavigate('contact')
        break

      case 'clear':
        setLogs([])
        setInputVal('')
        return

      case 'matrix':
        onToggleMatrix()
        responseNode = (
          <div className="text-xs text-[#A6E3A1]">
            [✓] Matrix digital rain effect toggled!
          </div>
        )
        break

      case 'theme':
        if (args[0] && ['catppuccin', 'tokyo', 'cyber', 'nord'].includes(args[0].toLowerCase())) {
          onChangeTheme(args[0].toLowerCase() as ThemeName)
          responseNode = (
            <div className="text-xs text-[#8BE9FD]">
              [✓] Theme switched to: {args[0].toLowerCase()}
            </div>
          )
        } else {
          responseNode = (
            <div className="text-xs text-[#F38BA8]">
              Usage: theme [catppuccin | tokyo | cyber | nord]
            </div>
          )
          isError = true
        }
        break

      case 'whoami':
        responseNode = (
          <div className="text-xs text-[#D8DEE9] space-y-0.5">
            <div>user: visitor@guest-workstation</div>
            <div>privileges: read-only, guest-interactive</div>
            <div>user-agent: {navigator.userAgent.substring(0, 50)}...</div>
            <div>screen: {window.innerWidth}x{window.innerHeight}</div>
          </div>
        )
        break

      case 'uptime':
        responseNode = (
          <div className="text-xs text-[#F9E2AF]">
            up 42 days, 14 hours, 28 minutes, load average: 0.12, 0.08, 0.04
          </div>
        )
        break

      case 'date':
        responseNode = (
          <div className="text-xs text-[#89B4FA]">
            {new Date().toString()}
          </div>
        )
        break

      case 'sudo':
        responseNode = (
          <div className="text-xs text-[#F38BA8]">
            [PERMISSION DENIED] visitor is not in the sudoers file. This incident has been logged and reported to Nagul.
          </div>
        )
        isError = true
        soundFx.playClick('beep')
        break

      case 'exit':
        onClose()
        return

      default:
        responseNode = (
          <div className="text-xs text-[#F38BA8]">
            bash: {cmd}: command not found. Type <span className="text-[#F9E2AF] underline">help</span> for list of commands.
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
      const available = ['help', 'about', 'projects', 'skills', 'github', 'social', 'contact', 'clear', 'matrix', 'theme', 'whoami', 'uptime']
      const match = available.find((c) => c.startsWith(inputVal.toLowerCase()))
      if (match) {
        soundFx.playClick('tab')
        setInputVal(match)
      }
    } else {
      soundFx.playClick('key')
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          soundFx.playClick('enter')
          onClose() // toggle
        }}
        className="fixed bottom-4 right-4 z-40 px-3.5 py-2 rounded bg-[#111420] hover:bg-[#181B28] text-[#8BE9FD] border border-[#8BE9FD]/40 hover:border-[#8BE9FD] shadow-xl shadow-black/60 font-mono text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer group"
        title="Open Interactive Terminal Shell (Ctrl + ~)"
      >
        <TerminalIcon className="w-4 h-4 text-[#8BE9FD] group-hover:scale-110 transition-transform" />
        <span>&gt;_ TERMINAL</span>
        <span className="text-[10px] text-[#7F849C] bg-[#1E2235] px-1.5 py-0.5 rounded border border-[#282C3F]">
          Ctrl+~
        </span>
      </button>
    )
  }

  const quickCommands = ['help', 'about', 'projects', 'skills', 'github', 'contact', 'matrix', 'clear']

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className={`w-full bg-[#0D0F18] border border-[#8BE9FD]/60 shadow-2xl rounded-t-sm sm:rounded-sm overflow-hidden flex flex-col font-mono transition-all duration-200 ${
          isMaximized
            ? 'h-full sm:h-[95vh] sm:max-w-6xl'
            : 'h-[80vh] sm:h-[550px] sm:max-w-2xl'
        }`}
      >
        {/* Titlebar */}
        <div className="bg-[#181B28] px-4 py-2 border-b border-[#282C3F] flex items-center justify-between text-xs select-none">
          <div className="flex items-center space-x-2">
            <span
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#F38BA8] inline-block cursor-pointer hover:opacity-80"
              title="Close terminal"
            />
            <span
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-[#F9E2AF] inline-block cursor-pointer hover:opacity-80"
              title="Maximize"
            />
            <span
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#A6E3A1] inline-block cursor-pointer hover:opacity-80"
              title="Minimize"
            />
            <span className="text-[#8BE9FD] font-semibold ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>visitor@retr0: ~ (zsh / interactive)</span>
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[#7F849C]">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="hover:text-[#D8DEE9] transition-colors p-1"
              title={isMaximized ? 'Restore window' : 'Maximize window'}
            >
              {isMaximized ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="hover:text-[#F38BA8] transition-colors p-1"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="bg-[#111420] px-3 py-1.5 border-b border-[#1E2235] flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-[#7F849C] shrink-0">Suggestions:</span>
          {quickCommands.map((q) => (
            <button
              key={q}
              onClick={() => executeCommand(q)}
              className="px-2 py-0.5 rounded bg-[#181B28] hover:bg-[#23283E] text-[#8BE9FD] border border-[#282C3F] hover:border-[#8BE9FD]/50 transition-colors cursor-pointer shrink-0"
            >
              ${q}
            </button>
          ))}
        </div>

        {/* Log stream */}
        <div
          ref={logContainerRef}
          className="flex-1 p-4 overflow-y-auto space-y-3 text-xs sm:text-sm bg-[#0A0C14]"
        >
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              {log.command && (
                <div className="flex items-center space-x-2 text-[#7F849C]">
                  <span className="text-[#A6E3A1]">visitor@retr0:~$</span>
                  <span className="text-[#D8DEE9] font-medium">{log.command}</span>
                </div>
              )}
              <div className="pl-2 border-l border-[#282C3F]/60 py-0.5">
                {log.output}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Input Line */}
        <div className="bg-[#111420] p-3 border-t border-[#282C3F] flex items-center space-x-2">
          <span className="text-[#A6E3A1] text-xs font-bold shrink-0">
            visitor@retr0:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'projects', 'about', or click above..."
            className="flex-1 bg-transparent text-[#D8DEE9] text-xs sm:text-sm outline-none font-mono"
            autoFocus
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="p-1.5 rounded bg-[#8BE9FD]/15 text-[#8BE9FD] hover:bg-[#8BE9FD]/25 border border-[#8BE9FD]/30 cursor-pointer"
            title="Execute (Enter)"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
