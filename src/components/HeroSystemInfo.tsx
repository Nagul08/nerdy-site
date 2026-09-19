import React from 'react'
import { ArrowDown, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { soundFx } from '../utils/audio'
import danteImg from '../assets/danteX.jpg'

interface HeroSystemInfoProps {
  onNavigate: (section: string) => void
  onOpenTerminal: () => void
}

export const HeroSystemInfo: React.FC<HeroSystemInfoProps> = ({ onNavigate, onOpenTerminal }) => {
  const coreSkills = [
    'C / C++',
    'Linux Internals',
    'Cyber Security',
    'Python',
    'React & TS',
    'Network Protocols',
    'Git',
  ]

  return (
    <section id="home" className="pt-6 sm:pt-12 pb-8 scroll-mt-20 font-mono">
      <div className="bg-[#0D0F17] border border-[#1C2030] rounded-lg p-6 sm:p-10 shadow-xl shadow-black/40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Clean Dante Avatar */}
          <div className="md:col-span-4 flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-xl overflow-hidden border border-[#2B334E] shadow-2xl bg-[#08090C] transition-all duration-300 group-hover:border-[#00F0FF]/60 group-hover:shadow-[#00F0FF]/10">
                <img
                  src={danteImg}
                  alt="Siva Kowsik S (Nagul) Avatar"
                  className="w-full h-full object-cover filter contrast-105 saturate-105 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Discreet operator tag below image */}
              <div className="mt-3 text-center">
                <span className="text-xs text-[#94A3B8] font-medium tracking-wider">
                  OPERATOR // <span className="text-[#00F0FF] font-bold">niko-rax</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, High-Impact Identity & Statement */}
          <div className="md:col-span-8 flex flex-col justify-center">
            {/* Classification eyebrow */}
            <div className="flex items-center space-x-2 text-xs text-[#00F0FF] mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="tracking-widest uppercase text-[11px] font-semibold">
                Systems & Cyber Security Undergrad
              </span>
            </div>

            {/* Official Name & Nickname */}
            <div className="mb-4">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
                Siva Kowsik S
              </h1>
              <div className="text-sm text-[#94A3B8] flex flex-wrap items-center gap-2 mt-2">
                <span className="text-[#FBBF24] font-semibold">(aka "Nagul")</span>
                <span>•</span>
                <span className="text-[#00F0FF] font-medium">@niko-rax</span>
                <span>•</span>
                <span className="text-[#10B981] font-medium">Class of 2029</span>
                <span>•</span>
                <span className="text-[#CBD5E1]">Sri Sairam Engineering College</span>
              </div>
            </div>

            {/* Genuine, Punchy Statement */}
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed mb-6">
              Second-year Computer Science Engineering student obsessed with{' '}
              <strong className="text-[#00F0FF] font-semibold">low-level systems programming</strong>,{' '}
              <strong className="text-[#10B981] font-semibold">Linux internals</strong>,{' '}
              <strong className="text-[#FBBF24] font-semibold">network security</strong>, and building fast,
              aesthetic software. I take things apart down to their fundamentals to understand how they truly work.
            </p>

            {/* Core Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {coreSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#131624] text-xs text-[#94A3B8] border border-[#22273C] font-medium transition-colors hover:text-[#00F0FF] hover:border-[#00F0FF]/40 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Direct Action Links Row */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  soundFx.playClick('enter')
                  onNavigate('projects')
                }}
                className="px-4 py-2 rounded bg-[#00F0FF] hover:bg-[#38BDF8] text-[#08090C] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00F0FF]/15"
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span>VIEW PROJECTS</span>
              </button>

              <a
                href="https://github.com/Nagul08"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded bg-[#141724] hover:bg-[#1E2336] text-[#F1F5F9] border border-[#252A3E] hover:border-[#00F0FF]/40 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>

              <a
                href="https://www.linkedin.com/in/siva-kowsik-s-b490b437b/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded bg-[#141724] hover:bg-[#1E2336] text-[#F1F5F9] border border-[#252A3E] hover:border-[#00F0FF]/40 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>LINKEDIN</span>
              </a>

              <button
                onClick={() => {
                  soundFx.playClick('key')
                  onNavigate('contact')
                }}
                className="px-3.5 py-2 rounded bg-[#141724] hover:bg-[#1E2336] text-[#94A3B8] hover:text-[#F1F5F9] border border-[#252A3E] hover:border-[#252A3E] text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#10B981]" />
                <span>CONTACT</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick('enter')
                  onOpenTerminal()
                }}
                className="px-3 py-2 rounded text-xs text-[#64748B] hover:text-[#00F0FF] transition-colors cursor-pointer ml-auto hidden sm:block"
                title="Launch Terminal Shell (Ctrl + ~)"
              >
                &gt;_ CLI (~)
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
