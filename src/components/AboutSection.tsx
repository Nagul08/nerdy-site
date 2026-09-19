import React, { useState } from 'react'
import { FileText } from 'lucide-react'
import { ABOUT_TABS } from '../data/portfolioData'
import { soundFx } from '../utils/audio'

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [showLineNumbers, setShowLineNumbers] = useState(true)

  const currentFileData = ABOUT_TABS[activeTab]

  const handleCopy = () => {
    soundFx.playClick('key')
    navigator.clipboard.writeText(currentFileData.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = currentFileData.content.split('\n')

  return (
    <section id="about" className="py-8 scroll-mt-20">
      {/* Section Terminal Command Title */}
      <div className="flex items-center space-x-2 font-mono text-sm sm:text-base text-[#8BE9FD] mb-3">
        <span className="text-[#CBA6F7]">visitor@portfolio:~$</span>
        <span className="text-[#F9E2AF] font-semibold">&gt; cat {currentFileData.file}</span>
        <span className="w-2 h-4 bg-[#8BE9FD] animate-cursor inline-block" />
      </div>

      {/* Terminal Window Box */}
      <div className="border border-[#282C3F] bg-[#111420]/95 rounded-sm shadow-lg overflow-hidden">
        {/* Terminal Header & Tab Bar */}
        <div className="bg-[#181B28] px-3 pt-2 border-b border-[#282C3F] flex flex-wrap items-center justify-between gap-2">
          {/* File tabs like Neovim or VS Code buffer tabs */}
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
                  className={`px-3 py-1.5 rounded-t text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer border-t-2 ${
                    isActive
                      ? 'bg-[#111420] text-[#8BE9FD] border-t-[#8BE9FD] border-x border-[#282C3F]'
                      : 'text-[#7F849C] hover:text-[#D8DEE9] border-t-transparent hover:bg-[#1E2235]/60'
                  }`}
                >
                  <FileText className="w-3 h-3 text-[#89B4FA]" />
                  <span>{tab.label}</span>
                  {isActive && <span className="text-[10px] text-[#A6E3A1]">●</span>}
                </button>
              )
            })}
          </div>

          {/* Tab Actions */}
          <div className="flex items-center space-x-2 pb-2 sm:pb-0 text-xs font-mono">
            <button
              onClick={() => {
                soundFx.playClick('key')
                setShowLineNumbers(!showLineNumbers)
              }}
              className="text-[#7F849C] hover:text-[#8BE9FD] px-2 py-0.5 rounded border border-[#282C3F] text-[11px] cursor-pointer"
              title="Toggle line numbers"
            >
              {showLineNumbers ? ':set nonu' : ':set nu'}
            </button>
            <button
              onClick={handleCopy}
              className="text-[#7F849C] hover:text-[#A6E3A1] px-2 py-0.5 rounded border border-[#282C3F] text-[11px] cursor-pointer"
              title="Copy file content"
            >
              {copied ? '[ COPIED! ]' : '[ YANK/COPY ]'}
            </button>
          </div>
        </div>

        {/* File Metadata Info Bar */}
        <div className="bg-[#090A10] px-4 py-1.5 border-b border-[#1E2235] text-[11px] font-mono text-[#7F849C] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-[#A6E3A1]">{currentFileData.meta}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span>{lines.length} lines</span>
            <span>utf-8</span>
            <span className="text-[#F9E2AF]">[RO]</span>
          </div>
        </div>

        {/* File Content Buffer */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-[#D8DEE9] bg-[#0C0E17] leading-relaxed overflow-x-auto">
          {lines.map((line, index) => (
            <div key={index} className="flex items-start hover:bg-[#151928]/50 py-0.5 px-1 rounded transition-colors">
              {showLineNumbers && (
                <span className="w-8 text-right pr-4 text-[#4C526E] select-none text-xs tabular-nums">
                  {index + 1}
                </span>
              )}
              <div className="flex-1 whitespace-pre-wrap">
                {/* Syntax highlighters for markdown/json/txt */}
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
                {/* Terminal cursor at the very last line */}
                {index === lines.length - 1 && (
                  <span className="inline-block w-2.5 h-4 bg-[#8BE9FD] ml-1.5 align-middle animate-cursor shadow-sm shadow-[#8BE9FD]" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Status Line at bottom of editor */}
        <div className="bg-[#181B28] px-3 py-1 border-t border-[#282C3F] flex items-center justify-between text-[11px] font-mono text-[#7F849C]">
          <div className="flex items-center space-x-2">
            <span className="bg-[#89B4FA] text-[#0D0F18] font-bold px-1.5 rounded-xs">NORMAL</span>
            <span className="text-[#D8DEE9]">{currentFileData.file}</span>
          </div>
          <div>
            <span>100% Top</span>
          </div>
        </div>
      </div>
    </section>
  )
}
