'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { personalInfo } from '@/lib/data'
import { FiGithub, FiLinkedin, FiArrowDown, FiDownload, FiPlay, FiBriefcase, FiLayers, FiShield } from 'react-icons/fi'
import { SiAngular, SiReact, SiTypescript, SiNextdotjs } from 'react-icons/si'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}
const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-16 z-10 overflow-hidden">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-accent-blue/12 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"
        style={{ animationDelay: '2.5s' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Avatar with Floating Tech Pills */}
        <motion.div variants={item} className="relative mx-auto mb-8 w-40 h-40 sm:w-48 sm:h-48">
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-accent-blue via-accent-cyan to-accent-blue opacity-70 blur-md animate-pulse-slow" />

          {/* Profile Image Frame */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-bg-primary shadow-2xl bg-bg-card">
            <Image
              src="/profile.jpg"
              alt={personalInfo.name}
              fill
              priority
              sizes="(max-width: 640px) 160px, 192px"
              className="object-cover object-top"
            />
          </div>

          {/* Floating Pill: Angular */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-1 -right-3 sm:-right-6 px-2.5 py-1 rounded-full bg-bg-card/90 backdrop-blur-md border border-accent-blue/30 shadow-glow-sm flex items-center gap-1.5 text-xs font-mono text-red-500"
          >
            <SiAngular size={13} />
            <span className="text-text-primary text-[11px] font-semibold">Angular</span>
          </motion.div>

          {/* Floating Pill: React */}
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-1 -left-3 sm:-left-6 px-2.5 py-1 rounded-full bg-bg-card/90 backdrop-blur-md border border-accent-cyan/30 shadow-glow-sm flex items-center gap-1.5 text-xs font-mono text-cyan-400"
          >
            <SiReact size={13} />
            <span className="text-text-primary text-[11px] font-semibold">React</span>
          </motion.div>

          {/* Floating Pill: TypeScript */}
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/2 -left-8 sm:-left-12 -translate-y-1/2 px-2 py-1 rounded-full bg-bg-card/90 backdrop-blur-md border border-fg/10 shadow-sm flex items-center gap-1 text-[11px] font-mono text-blue-500 hidden sm:flex"
          >
            <SiTypescript size={11} />
            <span className="text-text-primary">TS</span>
          </motion.div>
        </motion.div>

        {/* Status Pill Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-bg-card/80 border border-accent-cyan/30 backdrop-blur-md shadow-glow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-cyan" />
          </span>
          <span className="text-accent-cyan font-mono text-xs tracking-wider uppercase font-semibold">
            Available for Senior Frontend Roles
          </span>
        </motion.div>

        {/* Current Position */}
        <motion.p variants={item} className="mb-4 text-text-muted font-mono text-xs tracking-wide">
          Currently @ <span className="text-text-primary font-semibold">ALASI Real Estate</span> • Previously @ <span className="text-text-secondary">MAIDS.CC</span>
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-gradient-animated">{personalInfo.name}</span>
        </motion.h1>

        {/* Title & Subtitle */}
        <motion.div variants={item} className="mb-6 space-y-1">
          <p className="font-display text-2xl sm:text-3xl text-text-primary font-semibold tracking-wide">
            {personalInfo.title}
          </p>
          <p className="font-mono text-accent-blue text-sm sm:text-base tracking-widest">
            {'< '}{personalInfo.subtitle} & Architecture{' />'}
          </p>
        </motion.div>

        {/* Professional Summary */}
        <motion.p
          variants={item}
          className="text-text-secondary font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {personalInfo.summary}
        </motion.p>

        {/* Action Buttons (CTAs) */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
          {/* Live Demos with Iframe */}
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(37,99,235,0.45)' }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent-blue text-white font-body font-medium text-sm tracking-wide shadow-glow transition-all"
          >
            <FiPlay size={14} className="fill-current" />
            <span>Interactive Live Demos</span>
          </motion.a>

          {/* Download CV */}
          <motion.a
            href="/Ahmed_Khaled_CV.pdf"
            download="Ahmed_Khaled_CV.pdf"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-accent-blue/40 bg-bg-card/80 text-text-primary font-body font-medium text-sm tracking-wide hover:border-accent-blue hover:text-accent-blue transition-all backdrop-blur"
          >
            <FiDownload size={14} className="text-accent-blue" />
            <span>Download CV</span>
          </motion.a>

          {/* Get In Touch */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3.5 rounded-full border border-fg/10 bg-bg-card/50 text-text-muted hover:text-text-primary font-body font-medium text-sm tracking-wide hover:border-fg/20 transition-all backdrop-blur"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Quick Stats Strip */}
        <motion.div
          variants={item}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10 p-4 rounded-2xl bg-bg-card/70 border border-fg/10 backdrop-blur-md shadow-card"
        >
          <div className="text-center p-2">
            <p className="font-display font-extrabold text-2xl text-accent-blue">4+ Years</p>
            <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">Experience</p>
          </div>
          <div className="text-center p-2 border-l border-fg/5">
            <p className="font-display font-extrabold text-2xl text-accent-cyan">7+ Apps</p>
            <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">Delivered</p>
          </div>
          <div className="text-center p-2 sm:border-l border-fg/5">
            <p className="font-display font-extrabold text-2xl text-text-primary">Angular & React</p>
            <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">Core Focus</p>
          </div>
          <div className="text-center p-2 border-l border-fg/5">
            <p className="font-display font-extrabold text-2xl text-emerald-500">100%</p>
            <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">Production Ready</p>
          </div>
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
              whileHover={{ scale: 1.15 }}
              className="text-text-muted hover:text-accent-blue transition-colors duration-200 p-2"
              aria-label={label}
            >
              <Icon size={20} />
            </motion.a>
          ))}
          <div className="w-px h-5 bg-fg/10" />
          <span className="text-text-muted font-mono text-xs">{personalInfo.location}</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-10 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted font-mono text-xs tracking-widest uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown className="text-text-muted" size={15} />
        </motion.div>
      </motion.div>
    </section>
  )
}
