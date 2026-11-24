'use client'

import { useRef, useState } from 'react'
import { personalInfo } from '@/lib/data'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import Magnetic from '@/components/ui/Magnetic'
import RollText from '@/components/ui/RollText'
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiCopy,
  FiCheck,
  FiMessageSquare
} from 'react-icons/fi'
import { SiWhatsapp } from 'react-icons/si'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  useSectionReveal(ref)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formState.name}&body=${encodeURIComponent(
      formState.message
    )}\n\nSender Email: ${formState.email}`
    window.open(mailtoLink)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const cleanPhone = personalInfo.phone1.replace(/\D/g, '')

  return (
    <section id="contact" ref={ref} className="relative py-20 px-6 z-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-12">
          <span data-reveal="left" className="font-mono text-accent-blue text-sm tracking-widest font-semibold">05.</span>
          <h2 data-reveal-title className="font-display font-bold text-3xl sm:text-4xl text-text-primary">Get In Touch</h2>
          <div data-reveal-line className="flex-1 h-px bg-gradient-to-r from-accent-blue/30 to-transparent ml-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column — Contact Information & Quick Actions */}
          <div>
            <h3 data-reveal="left" className="font-display font-bold text-2xl sm:text-3xl text-text-primary mb-4">
              Let&apos;s build scalable, high-performance web applications together.
            </h3>
            <p data-reveal="left" className="text-text-secondary font-body text-base leading-relaxed mb-8">
              I am open to senior frontend engineering opportunities, architectural consultations, and full-stack enterprise projects. Click below to copy or chat directly.
            </p>

            {/* Quick Contact Buttons */}
            <div className="space-y-3.5 mb-8">
              {/* Email */}
              <div data-reveal="left" className="flex items-center justify-between p-4 rounded-xl bg-bg-card border border-fg/10 hover:border-accent-blue/40 shadow-sm transition-all duration-200 group">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3.5 flex-1 min-w-0"
                >
                  <div className="p-2.5 rounded-lg bg-accent-blue/10 text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-colors">
                    <FiMail size={16} />
                  </div>
                  <div className="truncate">
                    <p className="text-text-muted font-mono text-[11px] uppercase tracking-wider">Email Address</p>
                    <p className="text-text-primary font-body text-sm font-medium truncate">{personalInfo.email}</p>
                  </div>
                </a>
                <button
                  onClick={() => handleCopy(personalInfo.email, 'email')}
                  className="p-2 rounded-lg border border-fg/10 hover:border-accent-blue/40 text-text-muted hover:text-accent-blue text-xs font-mono flex items-center gap-1 transition-colors"
                  title="Copy email"
                >
                  {copiedField === 'email' ? (
                    <>
                      <FiCheck size={13} className="text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy size={13} />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone 1 (Primary) */}
              <div data-reveal="left" className="flex items-center justify-between p-4 rounded-xl bg-bg-card border border-fg/10 hover:border-accent-blue/40 shadow-sm transition-all duration-200 group">
                <a href={`tel:${personalInfo.phone1}`} className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="p-2.5 rounded-lg bg-accent-blue/10 text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-colors">
                    <FiPhone size={16} />
                  </div>
                  <div>
                    <p className="text-text-muted font-mono text-[11px] uppercase tracking-wider">Primary Phone</p>
                    <p className="text-text-primary font-body text-sm font-medium">{personalInfo.phone1}</p>
                  </div>
                </a>
                <button
                  onClick={() => handleCopy(personalInfo.phone1, 'phone1')}
                  className="p-2 rounded-lg border border-fg/10 hover:border-accent-blue/40 text-text-muted hover:text-accent-blue text-xs font-mono flex items-center gap-1 transition-colors"
                  title="Copy phone"
                >
                  {copiedField === 'phone1' ? (
                    <>
                      <FiCheck size={13} className="text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy size={13} />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone 2 */}
              <div data-reveal="left" className="flex items-center justify-between p-4 rounded-xl bg-bg-card border border-fg/10 hover:border-accent-blue/40 shadow-sm transition-all duration-200 group">
                <a href={`tel:${personalInfo.phone2}`} className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="p-2.5 rounded-lg bg-accent-blue/10 text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-colors">
                    <FiPhone size={16} />
                  </div>
                  <div>
                    <p className="text-text-muted font-mono text-[11px] uppercase tracking-wider">Secondary Phone</p>
                    <p className="text-text-primary font-body text-sm font-medium">{personalInfo.phone2}</p>
                  </div>
                </a>
                <button
                  onClick={() => handleCopy(personalInfo.phone2, 'phone2')}
                  className="p-2 rounded-lg border border-fg/10 hover:border-accent-blue/40 text-text-muted hover:text-accent-blue text-xs font-mono flex items-center gap-1 transition-colors"
                  title="Copy secondary phone"
                >
                  {copiedField === 'phone2' ? (
                    <>
                      <FiCheck size={13} className="text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy size={13} />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location */}
              <div data-reveal="left" className="flex items-center gap-3.5 p-4 rounded-xl bg-bg-card border border-fg/10">
                <div className="p-2.5 rounded-lg bg-accent-blue/10 text-accent-blue">
                  <FiMapPin size={16} />
                </div>
                <div>
                  <p className="text-text-muted font-mono text-[11px] uppercase tracking-wider">Location</p>
                  <p className="text-text-primary font-body text-sm font-medium">{personalInfo.location} • Available Worldwide (Remote/Hybrid)</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp & Social Bar */}
            <div data-reveal className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${cleanPhone}?text=Hi%20Ahmed,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-body text-xs font-semibold shadow-md hover:shadow-[0_0_24px_rgba(16,185,129,0.4)] transition-[background-color,box-shadow] duration-300"
              >
                <SiWhatsapp size={15} className="nudge-pop" />
                <RollText>Chat on WhatsApp</RollText>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-bg-card border border-fg/10 hover:border-accent-blue/40 text-text-muted hover:text-accent-blue transition-colors"
                title="LinkedIn Profile"
              >
                <FiLinkedin size={18} />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-bg-card border border-fg/10 hover:border-accent-blue/40 text-text-muted hover:text-accent-blue transition-colors"
                title="GitHub Profile"
              >
                <FiGithub size={18} />
              </a>
            </div>
          </div>

          {/* Right Column — Message Form */}
          <div
            data-reveal="right"
            className="p-8 rounded-2xl bg-bg-card border border-fg/10 shadow-card"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
                <FiMessageSquare size={16} />
              </div>
              <h4 className="font-display font-bold text-lg text-text-primary">
                Send a Direct Message
              </h4>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-text-muted tracking-wider uppercase mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Miller"
                  value={formState.name}
                  onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-bg-secondary/70 border border-fg/10 text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:shadow-glow-sm transition-all duration-200"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-text-muted tracking-wider uppercase mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formState.email}
                  onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-bg-secondary/70 border border-fg/10 text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:shadow-glow-sm transition-all duration-200"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-text-muted tracking-wider uppercase mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project, team, or opportunity..."
                  value={formState.message}
                  onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-bg-secondary/70 border border-fg/10 text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:shadow-glow-sm transition-all duration-200 resize-none"
                />
              </div>

              <Magnetic strength={0.12} className="w-full">
              <button
                type="submit"
                className="btn-shine w-full py-3.5 rounded-xl bg-accent-blue text-white font-body font-semibold text-sm flex items-center justify-center gap-2 shadow-glow-sm hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-[transform,box-shadow] duration-200"
              >
                {sent ? (
                  <span className="flex items-center gap-2">
                    <FiCheck size={16} /> Opening Email Client...
                  </span>
                ) : (
                  <>
                    <FiSend size={15} className="nudge-fly" />
                    <RollText>Send Message</RollText>
                  </>
                )}
              </button>
              </Magnetic>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
