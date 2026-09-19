import React, { useState } from 'react'
import {
  MessageSquare,
  Mail,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons'
import { SOCIAL_LINKS } from '../data/portfolioData'
import { soundFx } from '../utils/audio'

export const SocialSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const iconComponents: Record<string, React.ReactNode> = {
    Github: <GithubIcon className="w-4 h-4 text-[#8BE9FD]" />,
    Linkedin: <LinkedinIcon className="w-4 h-4 text-[#89B4FA]" />,
    Instagram: <InstagramIcon className="w-4 h-4 text-[#F5C2E7]" />,
    MessageSquare: <MessageSquare className="w-4 h-4 text-[#CBA6F7]" />,
    Mail: <Mail className="w-4 h-4 text-[#A6E3A1]" />,
  }

  const handleCopy = (id: string, text: string) => {
    soundFx.playClick('key')
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <section id="social" className="py-6 sm:py-8 scroll-mt-28">
      {/* Title */}
      <div className="flex items-center space-x-2 font-mono text-sm sm:text-base text-[#8BE9FD] mb-3">
        <span className="text-[#CBA6F7]">visitor@portfolio:~$</span>
        <span className="text-[#F9E2AF] font-semibold">&gt; ./connect.sh --all</span>
        <span className="w-2 h-4 bg-[#8BE9FD] animate-cursor inline-block" />
      </div>

      {/* Terminal Container */}
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
            <span className="text-[#8BE9FD] font-bold tracking-wider">MGS2 // COMMS ARRAY & SOCKETS</span>
            <span className="text-[#CBA6F7] text-[9px] bg-[#161B2E] px-1.5 py-0.2 rounded border border-[#2B314F]">
              SEC-05
            </span>
          </div>
          <span className="text-[#A6E3A1] font-mono font-bold bg-[#0D151F] px-1.5 py-0.5 rounded border border-[#A6E3A1]/30 text-[9px]">
            140.85 MHz
          </span>
        </div>

        {/* Terminal Titlebar */}
        <div className="bg-[#181B28] px-4 py-2 border-b border-[#282C3F] flex items-center justify-between font-mono text-xs text-[#7F849C]">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#F38BA8]" />
            <span className="w-3 h-3 rounded-full bg-[#F9E2AF]" />
            <span className="w-3 h-3 rounded-full bg-[#A6E3A1]" />
            <span className="text-[#D8DEE9] ml-2">network_sockets // social_endpoints</span>
          </div>
          <span className="text-[#A6E3A1] text-[11px]">STATUS: LISTENING</span>
        </div>

        {/* Social Command Links Grid */}
        <div className="p-4 sm:p-6 space-y-3 font-mono">
          <div className="text-xs text-[#7F849C] mb-2 pb-2 border-b border-[#1E2235]">
            $ Executing remote connection triggers... Click any command to establish link:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SOCIAL_LINKS.map((link) => {
              const isCopied = copiedId === link.id
              return (
                <div
                  key={link.id}
                  className="bg-[#090B12] p-3 rounded border border-[#23283E] hover:border-[#8BE9FD]/50 transition-all flex items-center justify-between group hover:bg-[#121524]"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick('enter')}
                    className="flex items-center space-x-3 flex-1 overflow-hidden"
                  >
                    <div className="p-2 rounded bg-[#181B28] border border-[#282C3F] group-hover:scale-105 transition-transform">
                      {iconComponents[link.icon]}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs sm:text-sm font-bold text-[#8BE9FD] group-hover:underline flex items-center gap-1.5 truncate">
                        <span>{link.command}</span>
                        <ExternalLink className="w-3 h-3 text-[#7F849C] group-hover:text-[#8BE9FD]" />
                      </div>
                      <div className="text-[11px] text-[#7F849C] truncate">
                        {link.handle} • {link.desc}
                      </div>
                    </div>
                  </a>

                  {/* Copy handle button */}
                  <button
                    onClick={() => handleCopy(link.id, link.handle)}
                    className="ml-2 p-1.5 rounded text-[#7F849C] hover:text-[#A6E3A1] hover:bg-[#1E2235] transition-colors cursor-pointer"
                    title={`Copy ${link.platform} address`}
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-[#A6E3A1]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Terminal footer note */}
        <div className="bg-[#090A10] px-4 py-2 border-t border-[#1E2235] text-[11px] font-mono text-[#7F849C] flex items-center justify-between">
          <span>tcp_established: 5 active outbound gateways</span>
          <span className="text-[#CBA6F7]">nagul.dev</span>
        </div>
      </div>
    </section>
  )
}
