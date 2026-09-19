import React from 'react'
import { Cpu, Shield, Globe, Wrench } from 'lucide-react'

export const SkillsSection: React.FC = () => {
  const categories = [
    {
      title: 'Systems & Low-Level',
      icon: <Cpu className="w-4 h-4 text-[#C084FC]" />,
      accent: 'border-[#C084FC]/30 text-[#C084FC]',
      skills: [
        'C / C++',
        'Linux Internals',
        'POSIX APIs',
        'Bash Automation',
        'Python',
        'Memory & Data Structures',
      ],
    },
    {
      title: 'Cyber Security & Networks',
      icon: <Shield className="w-4 h-4 text-[#00F0FF]" />,
      accent: 'border-[#00F0FF]/30 text-[#00F0FF]',
      skills: [
        'TCP/IP & UDP Protocols',
        'Raw Sockets',
        'Wireshark',
        'GDB & Binary Debugging',
        'Packet Sniffing',
        'CTF Challenges',
      ],
    },
    {
      title: 'Web & Full-Stack Engineering',
      icon: <Globe className="w-4 h-4 text-[#10B981]" />,
      accent: 'border-[#10B981]/30 text-[#10B981]',
      skills: [
        'React 19 & Next.js',
        'TypeScript (Strict Mode)',
        'Node.js & Express APIs',
        'Tailwind CSS & Glassmorphism',
        'WebSocket Realtime Streams',
        'Web Audio API & Synthesizers',
        'RESTful Services & JSON-RPC',
        'Vite & Production Bundling',
        'State Architecture (Zustand)',
        'HTML5 / CSS3 / DOM APIs',
        'Responsive UI/UX Ergonomics',
        'Browser Performance Profiling',
      ],
    },
    {
      title: 'Developer Tooling',
      icon: <Wrench className="w-4 h-4 text-[#FBBF24]" />,
      accent: 'border-[#FBBF24]/30 text-[#FBBF24]',
      skills: [
        'Git & GitHub',
        'Neovim (NvChad)',
        'VS Code',
        'WSL2 Ubuntu',
        'Linux Administration',
        'Make & Build Scripts',
      ],
    },
  ]

  return (
    <section id="skills" className="py-8 scroll-mt-20 font-mono">
      {/* Section Header */}
      <div className="mb-6 pb-3 border-b border-[#1C2030]">
        <div className="text-xs text-accent mb-1">// TECHNICAL PROFICIENCY</div>
        <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">
          Skills & Arsenal
        </h2>
      </div>

      {/* 4-Domain Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="frosted-glass hover:border-accent/40 rounded-xl p-5 transition-all"
          >
            {/* Category Header */}
            <div className="flex items-center space-x-2.5 mb-4 pb-2 border-b border-[#181C2A]">
              {cat.icon}
              <h3 className="font-bold text-sm text-[#F8FAFC]">{cat.title}</h3>
            </div>

            {/* Skills Badges */}
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3 py-1.5 rounded-md bg-[#101422] text-xs font-medium text-[#CBD5E1] border border-[#1f263d] hover:border-accent hover:text-accent transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
