'use client'

import { motion } from 'framer-motion'
import { personalInfo } from '@/lib/data'
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 border-t border-fg/10 py-10 px-6 bg-bg-card/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-sm text-text-primary mb-1">
            {personalInfo.name}
          </p>
          <p className="text-text-muted font-mono text-xs">
            Senior Frontend Developer • {personalInfo.location}
          </p>
        </div>

        {/* Social Icons & Back to top */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-blue transition-colors p-1"
            aria-label="GitHub"
          >
            <FiGithub size={16} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-blue transition-colors p-1"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={16} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-text-muted hover:text-accent-blue transition-colors p-1"
            aria-label="Email"
          >
            <FiMail size={16} />
          </a>

          <div className="h-4 w-px bg-fg/15" />

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-fg/10 bg-bg-card hover:border-accent-blue/40 text-text-muted hover:text-accent-blue text-xs font-mono transition-all"
            title="Scroll to top"
          >
            <span>Top</span>
            <FiArrowUp size={12} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-fg/5 text-center sm:text-left text-text-muted font-mono text-[11px]">
        © {new Date().getFullYear()} {personalInfo.name}. All rights reserved. Crafted with Next.js, TypeScript & Tailwind CSS.
      </div>
    </footer>
  )
}
