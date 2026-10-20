'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { personalInfo } from '@/lib/data'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Wire up to your preferred email service (EmailJS, Formspree, etc.)
    const mailtoLink = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formState.name}&body=${encodeURIComponent(formState.message)}\n\nFrom: ${formState.email}`
    window.open(mailtoLink)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative py-14 px-6 z-10">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-accent-blue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-mono text-accent-blue text-sm tracking-widest">05.</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">Contact</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-blue/30 to-transparent ml-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-display font-bold text-2xl text-text-primary mb-4">
              Let&apos;s build something great together.
            </h3>
            <p className="text-text-secondary font-body leading-relaxed mb-8">
              I&apos;m currently open to new opportunities — whether it&apos;s a full-time role, freelance project, or a technical consultation. Feel free to reach out!
            </p>

            <div className="space-y-4">
              {[
                { icon: FiMail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: FiPhone, label: 'Phone', value: personalInfo.phone1, href: `tel:${personalInfo.phone1}` },
                { icon: FiMapPin, label: 'Location', value: personalInfo.location, href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-fg/5 hover:border-accent-blue/30 transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-accent-blue/10 group-hover:bg-accent-blue/20 transition-colors">
                    <Icon className="text-accent-blue" size={16} />
                  </div>
                  <div>
                    <p className="text-text-muted font-mono text-xs tracking-wider uppercase">{label}</p>
                    <p className="text-text-primary font-body text-sm">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              {[
                { href: personalInfo.github, icon: FiGithub },
                { href: personalInfo.linkedin, icon: FiLinkedin },
              ].map(({ href, icon: Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 rounded-xl bg-bg-card border border-fg/5 hover:border-accent-blue/30 text-text-muted hover:text-accent-blue transition-all duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Ahmed Mohamed' },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'ahmed@example.com' },
              ].map(field => (
                <div key={field.name}>
                  <label className="block font-mono text-xs text-text-muted tracking-wider uppercase mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={formState[field.name as keyof typeof formState]}
                    onChange={e => setFormState(prev => ({ ...prev, [field.name]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-bg-card border border-fg/10 text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:shadow-glow-sm transition-all duration-200"
                  />
                </div>
              ))}

              <div>
                <label className="block font-mono text-xs text-text-muted tracking-wider uppercase mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-bg-card border border-fg/10 text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:shadow-glow-sm transition-all duration-200 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(37,99,235,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-accent-blue text-white font-body font-medium text-sm flex items-center justify-center gap-2 shadow-glow-sm transition-all duration-200"
              >
                {sent ? (
                  '✓ Message sent!'
                ) : (
                  <>
                    <FiSend size={14} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
