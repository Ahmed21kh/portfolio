'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import RollText from '@/components/ui/RollText'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { navLinks, personalInfo } from '@/lib/data'
import Image from 'next/image'
import { FiDownload, FiArrowRight } from 'react-icons/fi'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }, 320)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-bg-primary/85 backdrop-blur-xl border-b border-fg/10 shadow-card'
          : 'py-5'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo & Name Brand */}
        <motion.a
          href="#"
          className="flex items-center gap-2.5 group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-fg/10 bg-bg-card flex items-center justify-center shadow-sm">
            <Image src={'/logo.svg'} alt="Ahmed Khaled" width={32} height={32} className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-text-primary group-hover:text-accent-blue transition-colors">
              {personalInfo.name}
            </span>
            <span className="font-mono text-[10px] text-accent-blue font-medium leading-none">
              Frontend Architect
            </span>
          </div>
        </motion.a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-7 bg-bg-card/60 backdrop-blur-md px-5 py-2 rounded-full border border-fg/10 shadow-sm">
          {navLinks.map((link, i) => {
            const isActive = active === link.href
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.2 }}
              >
                <a
                  href={link.href}
                  onClick={() => setActive(link.href)}
                  className={`relative text-xs font-mono font-medium tracking-wide transition-colors duration-200 py-1 ${
                    isActive ? 'text-accent-blue font-semibold' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-blue rounded-full shadow-glow-sm"
                    />
                  )}
                </a>
              </motion.li>
            )
          })}
        </ul>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {/* Download CV button */}
          <a
            href="/Ahmed_Khaled_CV.pdf"
            download="Ahmed_Khaled_CV.pdf"
            className="btn-fill flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-fg/15 text-text-secondary text-xs font-mono transition-colors"
            title="Download CV"
          >
            <FiDownload size={13} className="nudge-y" />
            <RollText>CV</RollText>
          </a>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            className="btn-shine flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent-blue text-white text-xs font-medium font-body shadow-glow-sm hover:shadow-glow hover:scale-[1.04] active:scale-[0.97] transition-[transform,box-shadow] duration-300"
          >
            <RollText>Hire Me</RollText>
            <FiArrowRight size={12} className="nudge-x" />
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2 rounded-lg bg-bg-card border border-fg/10 text-text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-current origin-center transition-all"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-current"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-current origin-center transition-all"
            />
          </button>
        </div>
      </nav>

      {/* Progress Line */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-blue"
      />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-fg/10 bg-bg-card/95 backdrop-blur-2xl shadow-xl overflow-hidden"
          >
            <div className="px-6 py-5 space-y-4">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(link.href)
                      }}
                      className="block text-text-secondary hover:text-accent-blue py-2 font-mono text-sm tracking-wide transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-fg/10 flex flex-col gap-2.5">
                <a
                  href="/Ahmed_Khaled_CV.pdf"
                  download="Ahmed_Khaled_CV.pdf"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-accent-blue/30 text-accent-blue font-mono text-xs font-semibold text-center"
                >
                  <FiDownload size={13} />
                  <span>Download CV</span>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#contact')
                  }}
                  className="block text-center py-2.5 rounded-xl bg-accent-blue text-white text-xs font-semibold shadow-glow-sm"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
