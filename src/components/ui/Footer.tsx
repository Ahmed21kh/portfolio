'use client'
import { motion } from 'framer-motion'
import { personalInfo } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-text-muted font-mono text-xs tracking-wide"
        >
          © {new Date().getFullYear()} <span className="text-accent-blue">{personalInfo.name}</span> — Built with Next.js & Framer Motion
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-text-muted font-mono text-xs"
        >
          {personalInfo.location}
        </motion.p>
      </div>
    </footer>
  )
}
