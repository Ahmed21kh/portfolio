'use client'
import { motion } from 'framer-motion'
import { personalInfo } from '@/lib/data'
import { FiGithub, FiLinkedin, FiArrowDown, FiDownload } from 'react-icons/fi'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-16 z-10">
      {/* Decorative orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-cyan/8 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
          </span>
          <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase">
            Available for work
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-gradient">{personalInfo.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.div variants={item} className="mb-6">
          <p className="font-display text-xl sm:text-2xl md:text-3xl text-text-secondary font-medium tracking-wide">
            {personalInfo.title}
          </p>
          <p className="font-mono text-accent-blue text-base mt-1 tracking-widest">
            {'< '}{personalInfo.subtitle}{' />'}
          </p>
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={item}
          className="text-text-secondary font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {personalInfo.summary}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37,99,235,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full bg-accent-blue text-white font-body font-medium text-sm tracking-wide shadow-glow transition-all"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-full border border-white/15 text-text-primary font-body font-medium text-sm tracking-wide hover:border-accent-blue/50 hover:bg-accent-blue/5 transition-all"
          >
            Get In Touch
          </motion.a>
          <motion.a
            href="/Ahmed_Khaled_CV.pdf"
            download="Ahmed_Khaled_CV.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-accent-blue/40 text-accent-blue font-body font-medium text-sm tracking-wide hover:bg-accent-blue/10 hover:border-accent-blue transition-all"
          >
          <FiDownload size={15} />
          Download CV
        </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={item} className="flex items-center justify-center gap-5">
          {[
            { href: personalInfo.github, icon: FiGithub, label: 'GitHub' },
            { href: personalInfo.linkedin, icon: FiLinkedin, label: 'LinkedIn' },
          ].map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, color: '#2563EB' }}
              className="text-text-muted hover:text-accent-blue transition-colors duration-200 p-2"
              aria-label={label}
            >
              <Icon size={22} />
            </motion.a>
          ))}
          <div className="w-px h-5 bg-white/10" />
          <span className="text-text-muted font-mono text-xs">{personalInfo.location}</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted font-mono text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown className="text-text-muted" size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
