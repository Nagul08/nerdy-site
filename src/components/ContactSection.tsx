import React, { useState } from 'react'
import { Send, Mail, CheckCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons'
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

    // Simulate terminal transmission delay
    setTimeout(() => {
      setIsTransmitting(false)
      setTransmitSuccess(true)
      soundFx.playClick('beep')

      // Pre-fill mailto fallback
      const mailtoLink = `mailto:nagul.dev@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`
      window.open(mailtoLink, '_blank')
    }, 1200)
  }

  return (
    <section id="contact" className="py-8 scroll-mt-20">
      {/* Title */}
      <div className="flex items-center space-x-2 font-mono text-sm sm:text-base text-[#8BE9FD] mb-3">
        <span className="text-[#CBA6F7]">visitor@portfolio:~$</span>
        <span className="text-[#F9E2AF] font-semibold">&gt; echo "Let's build something."</span>
        <span className="w-2 h-4 bg-[#8BE9FD] animate-cursor inline-block" />
      </div>

      {/* Terminal Window Box */}
      <div className="border border-[#282C3F] bg-[#111420]/95 rounded-sm shadow-lg overflow-hidden font-mono">
        {/* Titlebar */}
        <div className="bg-[#181B28] px-4 py-2 border-b border-[#282C3F] flex items-center justify-between text-xs text-[#7F849C]">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#F38BA8]" />
            <span className="w-3 h-3 rounded-full bg-[#F9E2AF]" />
            <span className="w-3 h-3 rounded-full bg-[#A6E3A1]" />
            <span className="text-[#D8DEE9] ml-2">vim ~/transmission/dispatch.sh</span>
          </div>
          <span className="text-[#A6E3A1]">PORT: 587 (SMTP/SECURE)</span>
        </div>

        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Direct channels left column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs text-[#7F849C] pb-2 border-b border-[#1E2235]">
              // DIRECT COMMUNICATION CHANNELS
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Email */}
              <div className="p-3 rounded bg-[#090A10] border border-[#23283E] hover:border-[#8BE9FD]/50 transition-colors">
                <div className="text-[10px] text-[#7F849C] flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#A6E3A1]" />
                  <span>EMAIL DIRECTORY</span>
                </div>
                <a
                  href="mailto:nagul.dev@gmail.com"
                  className="text-sm font-bold text-[#8BE9FD] hover:underline block mt-0.5"
                >
                  nagul.dev@gmail.com
                </a>
              </div>

              {/* GitHub */}
              <div className="p-3 rounded bg-[#090A10] border border-[#23283E] hover:border-[#8BE9FD]/50 transition-colors">
                <div className="text-[10px] text-[#7F849C] flex items-center gap-1">
                  <GithubIcon className="w-3.5 h-3.5 text-[#89B4FA]" />
                  <span>GITHUB HANDLE</span>
                </div>
                <a
                  href="https://github.com/Nagul08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-[#D8DEE9] hover:underline block mt-0.5"
                >
                  github.com/Nagul08
                </a>
              </div>

              {/* LinkedIn */}
              <div className="p-3 rounded bg-[#090A10] border border-[#23283E] hover:border-[#8BE9FD]/50 transition-colors">
                <div className="text-[10px] text-[#7F849C] flex items-center gap-1">
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#CBA6F7]" />
                  <span>LINKEDIN PROFILE</span>
                </div>
                <a
                  href="https://linkedin.com/in/nagul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-[#D8DEE9] hover:underline block mt-0.5"
                >
                  linkedin.com/in/nagul
                </a>
              </div>

              {/* Instagram */}
              <div className="p-3 rounded bg-[#090A10] border border-[#23283E] hover:border-[#8BE9FD]/50 transition-colors">
                <div className="text-[10px] text-[#7F849C] flex items-center gap-1">
                  <InstagramIcon className="w-3.5 h-3.5 text-[#F5C2E7]" />
                  <span>INSTAGRAM UPDATES</span>
                </div>
                <a
                  href="https://instagram.com/nagul_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-[#D8DEE9] hover:underline block mt-0.5"
                >
                  @nagul_dev
                </a>
              </div>
            </div>

            <div className="text-[11px] text-[#585B70] leading-relaxed pt-1">
              Currently open for full-stack engineering internships, research collaborations, open-source projects, and technical discussions.
            </div>
          </div>

          {/* Terminal Input Form right column */}
          <div className="lg:col-span-7 bg-[#090A10] p-4 sm:p-5 rounded border border-[#1E2235]">
            <div className="text-xs text-[#7F849C] mb-3 pb-2 border-b border-[#1E2235] flex items-center justify-between">
              <span>$ ./send-transmission.sh --target=nagul</span>
              <span className="text-[#A6E3A1]">STREAM: READY</span>
            </div>

            {transmitSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="inline-flex p-3 rounded-full bg-[#A6E3A1]/10 border border-[#A6E3A1]/40 text-[#A6E3A1]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="text-sm font-bold text-[#A6E3A1]">
                  [ 200 OK: TRANSMISSION DELIVERED ]
                </div>
                <p className="text-xs text-[#D8DEE9] max-w-sm mx-auto">
                  Thank you! Your message transmission has been staged. Opening mail client for direct verification.
                </p>
                <button
                  onClick={() => {
                    soundFx.playClick('key')
                    setTransmitSuccess(false)
                    setFormData({
                      name: '',
                      email: '',
                      subject: 'Project Collaboration',
                      message: '',
                    })
                  }}
                  className="mt-3 px-3 py-1.5 rounded bg-[#23283E] hover:bg-[#313754] text-xs text-[#8BE9FD] border border-[#3E4562] cursor-pointer"
                >
                  $ ./reset-form.sh
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#7F849C] mb-1">
                    <span className="text-[#8BE9FD]">const</span> name =
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => soundFx.playClick('key')}
                    placeholder='"Your Name / Team"'
                    className="w-full bg-[#111420] border border-[#282C3F] focus:border-[#8BE9FD] rounded px-3 py-2 text-[#D8DEE9] outline-none font-mono transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#7F849C] mb-1">
                    <span className="text-[#8BE9FD]">const</span> email =
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => soundFx.playClick('key')}
                    placeholder='"your.email@organization.com"'
                    className="w-full bg-[#111420] border border-[#282C3F] focus:border-[#8BE9FD] rounded px-3 py-2 text-[#D8DEE9] outline-none font-mono transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#7F849C] mb-1">
                    <span className="text-[#CBA6F7]">const</span> subject =
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    onFocus={() => soundFx.playClick('key')}
                    className="w-full bg-[#111420] border border-[#282C3F] focus:border-[#CBA6F7] rounded px-3 py-2 text-[#D8DEE9] outline-none font-mono transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#7F849C] mb-1">
                    <span className="text-[#F9E2AF]">const</span> message =
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => soundFx.playClick('key')}
                    placeholder="Describe your project, team opportunity, or inquiry..."
                    className="w-full bg-[#111420] border border-[#282C3F] focus:border-[#F9E2AF] rounded px-3 py-2 text-[#D8DEE9] outline-none font-mono transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#585B70] hidden sm:inline">
                    EOF (Ctrl+Enter)
                  </span>

                  <button
                    type="submit"
                    disabled={isTransmitting}
                    className="px-4 py-2 rounded bg-[#8BE9FD]/15 border border-[#8BE9FD]/50 text-[#8BE9FD] hover:bg-[#8BE9FD]/25 font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-[#8BE9FD]/20"
                  >
                    {isTransmitting ? (
                      <>
                        <span className="w-3 h-3 border-2 border-[#8BE9FD] border-t-transparent rounded-full animate-spin" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>[ EXECUTE TRANSMISSION ]</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer status */}
        <div className="bg-[#181B28] px-4 py-1.5 border-t border-[#282C3F] text-[11px] text-[#7F849C] flex items-center justify-between">
          <span>-- INSERT --</span>
          <span className="text-[#8BE9FD]">nagul@portfolio:~/transmission</span>
        </div>
      </div>
    </section>
  )
}
