import React from 'react'
import { GraduationCap, Shield, Terminal, BookOpen } from 'lucide-react'

export const AboutSection: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: 'Break to Understand',
      desc: 'The best way to secure or build a system is to understand how it behaves when stressed, overloaded, or provided malformed inputs.',
      color: 'text-[#00F0FF]',
    },
    {
      num: '02',
      title: 'Depth over Surface',
      desc: 'Look beyond high-level abstractions. Trace network packets, examine system calls, and understand how memory is laid out.',
      color: 'text-[#10B981]',
    },
    {
      num: '03',
      title: 'Keyboard-First Ergonomics',
      desc: 'Speed in thought requires speed in execution. Clean terminal setups, vim keybindings, and automated dotfiles keep focus sharp.',
      color: 'text-[#C084FC]',
    },
    {
      num: '04',
      title: 'Defensive Engineering',
      desc: 'Design systems that fail predictably, validate inputs at the perimeter, and operate reliably in adversarial conditions.',
      color: 'text-[#FBBF24]',
    },
  ]

  return (
    <section id="about" className="py-8 scroll-mt-20 font-mono">
      {/* Section Header */}
      <div className="mb-6 pb-3 border-b border-[#1C2030]">
        <div className="text-xs text-[#00F0FF] mb-1">// BACKGROUND & MINDSET</div>
        <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">
          About & Engineering Philosophy
        </h2>
      </div>

      <div className="space-y-5">
        {/* Card 1: The Bio / Mindset */}
        <div className="bg-[#0D0F17] border border-[#1C2030] rounded-lg p-6 shadow-lg shadow-black/20">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#00F0FF] mb-3">
            <Terminal className="w-4 h-4 text-[#00F0FF]" />
            <span>THE MINDSET // SIVA KOWSIK S ("NAGUL")</span>
          </div>
          <p className="text-sm text-[#CBD5E1] leading-relaxed mb-3">
            I'm a Computer Science Engineering student who genuinely loves building things for the
            web, exploring low-level systems, and occasionally breaking functional architectures just
            to discover why they work.
          </p>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            When I'm not writing code, you'll find me tinkering with my Linux workstation, reading
            cyber security writeups, dissecting network packet flows, or analyzing how operating
            systems manage memory and scheduling behind the scenes.
          </p>
        </div>

        {/* Card 2: Academic Background */}
        <div className="bg-[#0D0F17] border border-[#1C2030] rounded-lg p-6 shadow-lg shadow-black/20">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#10B981] mb-4">
            <GraduationCap className="w-4 h-4 text-[#10B981]" />
            <span>ACADEMIC FOUNDATION</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-5">
            <div>
              <div className="text-[#64748B] text-[11px]">INSTITUTION</div>
              <div className="text-sm font-bold text-[#F8FAFC] mt-0.5">
                Sri Sairam Engineering College
              </div>
            </div>

            <div>
              <div className="text-[#64748B] text-[11px]">DEGREE & MAJOR</div>
              <div className="text-sm font-bold text-[#00F0FF] mt-0.5">
                B.E. Computer Science & Engineering
              </div>
            </div>

            <div>
              <div className="text-[#64748B] text-[11px]">STATUS & GRADUATION</div>
              <div className="text-sm font-bold text-[#FBBF24] mt-0.5">
                Second Year (Class of 2029)
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-[#CBD5E1] mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#C084FC]" />
              <span>Core Coursework & Studies:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Cyber Security',
                'Operating Systems Internals',
                'Computer Networks & Protocols',
                'Data Structures & Algorithms',
                'Database Management Systems',
                'Object-Oriented Programming',
              ].map((course, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-[#131624] text-xs text-[#94A3B8] border border-[#22273C]"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Engineering Principles */}
        <div className="bg-[#0D0F17] border border-[#1C2030] rounded-lg p-6 shadow-lg shadow-black/20">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#C084FC] mb-4">
            <Shield className="w-4 h-4 text-[#C084FC]" />
            <span>CORE PRINCIPLES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((item) => (
              <div
                key={item.num}
                className="bg-[#111422] border border-[#1F2538] rounded-md p-4"
              >
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className={`text-xs font-bold ${item.color}`}>{item.num}.</span>
                  <h4 className={`text-xs font-bold ${item.color}`}>{item.title}</h4>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
