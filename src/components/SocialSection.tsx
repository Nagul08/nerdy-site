import React, { useState } from 'react'
import { MessageSquare, Mail, Copy, Check, ExternalLink } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons'
import { SOCIAL_LINKS } from '../data/portfolioData'
import { soundFx } from '../utils/audio'

export const SocialSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const iconComponents: Record<string, React.ReactNode> = {
    Github: <GithubIcon className="w-4 h-4 text-[#00F0FF]" />,
    Linkedin: <LinkedinIcon className="w-4 h-4 text-[#38BDF8]" />,
    Instagram: <InstagramIcon className="w-4 h-4 text-[#F472B6]" />,
    MessageSquare: <MessageSquare className="w-4 h-4 text-[#C084FC]" />,
    Mail: <Mail className="w-4 h-4 text-[#10B981]" />,
  }

  const handleCopy = (id: string, text: string) => {
    soundFx.playClick('key')
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <section id="social" className="py-8 scroll-mt-20 font-mono">
      {/* Section Header */}
      <div className="mb-6 pb-3 border-b border-[#1C2030]">
        <div className="text-xs text-[#00F0FF] mb-1">// CONNECT & COLLABORATE</div>
        <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">
          Social Channels & Links
        </h2>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SOCIAL_LINKS.map((link) => {
          const isCopied = copiedId === link.id
          return (
            <div
              key={link.id}
              className="bg-[#0D0F17] border border-[#1C2030] hover:border-[#00F0FF]/50 rounded-lg p-4 transition-all duration-200 flex items-center justify-between group shadow-lg shadow-black/20"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick('enter')}
                className="flex items-center space-x-3 flex-1 overflow-hidden"
              >
                <div className="p-2 rounded-md bg-[#131624] border border-[#22273C] group-hover:border-[#00F0FF]/40 transition-colors">
                  {iconComponents[link.icon] || <ExternalLink className="w-4 h-4" />}
                </div>

                <div className="truncate">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                      {link.platform}
                    </span>
                    <span className="text-xs text-[#64748B]">{link.handle}</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] truncate">{link.desc}</p>
                </div>
              </a>

              {/* Quick Actions */}
              <div className="flex items-center space-x-1.5 ml-2">
                <button
                  onClick={() => handleCopy(link.id, link.handle || link.url)}
                  className="p-1.5 text-[#64748B] hover:text-[#00F0FF] hover:bg-[#131624] rounded border border-transparent hover:border-[#22273C] transition-colors cursor-pointer"
                  title="Copy handle"
                >
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-[#64748B] hover:text-[#00F0FF] hover:bg-[#131624] rounded border border-transparent hover:border-[#22273C] transition-colors"
                  title={`Open ${link.platform}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
