import React, { useState } from 'react'
import { Send, Mail, CheckCircle } from 'lucide-react'
import { soundFx } from '../utils/audio'

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Collaboration / Internship Opportunity',
    message: '',
  })
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [transmitSuccess, setTransmitSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    soundFx.playClick('enter')
    setIsTransmitting(true)

    setTimeout(() => {
      setIsTransmitting(false)
      setTransmitSuccess(true)
      soundFx.playClick('beep')

      const mailtoLink = `mailto:sivphax08@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`
      window.open(mailtoLink, '_blank')
    }, 600)
  }

  return (
    <section id="contact" className="py-8 scroll-mt-20 font-mono">
      {/* Section Header */}
      <div className="mb-6 pb-3 border-b border-[#1C2030]">
        <div className="text-xs text-[#00F0FF] mb-1">// INBOX & OPPORTUNITIES</div>
        <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">
          Get in Touch
        </h2>
      </div>

      <div className="bg-[#0D0F17] border border-[#1C2030] rounded-lg p-6 sm:p-8 shadow-xl shadow-black/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-[#F8FAFC] mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00F0FF]" />
                <span>Let's Build Something Together</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                I'm actively interested in systems programming internships, cyber security
                collaborations, and open-source software projects. Whether you have an opportunity or
                just want to talk tech, drop me a message.
              </p>

              <div className="space-y-3 text-xs">
                <div className="bg-[#131624] p-3 rounded border border-[#22273C]">
                  <div className="text-[#64748B] text-[11px]">DIRECT EMAIL</div>
                  <a
                    href="mailto:sivphax08@gmail.com"
                    className="text-[#00F0FF] hover:underline font-medium text-sm mt-0.5 inline-block"
                  >
                    sivphax08@gmail.com
                  </a>
                </div>

                <div className="bg-[#131624] p-3 rounded border border-[#22273C]">
                  <div className="text-[#64748B] text-[11px]">LOCATION / AVAILABILITY</div>
                  <div className="text-[#F1F5F9] font-medium mt-0.5">
                    Open to Remote & Hybrid Roles
                  </div>
                </div>

                <div className="bg-[#131624] p-3 rounded border border-[#22273C]">
                  <div className="text-[#64748B] text-[11px]">STATUS</div>
                  <div className="text-[#10B981] font-semibold mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    Available for Projects & Internships
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            {transmitSuccess ? (
              <div className="bg-[#111422] border border-[#10B981]/40 rounded-lg p-6 text-center space-y-3">
                <CheckCircle className="w-8 h-8 text-[#10B981] mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-[#F8FAFC]">Message Prepared</h4>
                <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
                  Your mail client has been opened with the prefilled message to{' '}
                  <strong className="text-[#00F0FF]">sivphax08@gmail.com</strong>.
                </p>
                <button
                  onClick={() => setTransmitSuccess(false)}
                  className="px-4 py-1.5 rounded bg-[#1C2030] text-[#CBD5E1] hover:text-[#F8FAFC] text-xs font-semibold cursor-pointer transition-colors mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#94A3B8] font-medium mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Hunter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#111422] border border-[#22273C] focus:border-[#00F0FF] rounded px-3 py-2.5 text-[#F8FAFC] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#94A3B8] font-medium mb-1.5">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#111422] border border-[#22273C] focus:border-[#00F0FF] rounded px-3 py-2.5 text-[#F8FAFC] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-medium mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#111422] border border-[#22273C] focus:border-[#00F0FF] rounded px-3 py-2.5 text-[#F8FAFC] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-medium mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your idea, role, or proposal..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#111422] border border-[#22273C] focus:border-[#00F0FF] rounded px-3 py-2.5 text-[#F8FAFC] outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isTransmitting}
                  className="w-full py-2.5 rounded bg-[#00F0FF] hover:bg-[#38BDF8] disabled:opacity-50 text-[#08090C] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00F0FF]/15"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isTransmitting ? 'PREPARING TRANSMISSION...' : 'SEND MESSAGE'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
