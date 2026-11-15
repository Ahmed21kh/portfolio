'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { personalInfo, education, languages } from '@/lib/data'
import { FiMapPin, FiBook, FiGlobe, FiAward, FiCheck, FiDownload, FiArrowRight } from 'react-icons/fi'

const stats = [
  { value: '4+', label: 'Years Experience', sub: 'Angular & React Enterprise' },
  { value: '7+', label: 'Production Apps', sub: 'Dashboards & E-commerce' },
  { value: '3', label: 'Tech Companies', sub: 'ALASI, MAIDS.CC, MEGA DEV' },
  { value: '10+', label: 'Modern Frameworks', sub: 'TypeScript, NgRx, Redux' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-20 px-6 z-10">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-mono text-accent-blue text-sm tracking-widest font-semibold">01.</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-blue/30 to-transparent ml-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column — Biography & Core Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display font-bold text-2xl text-text-primary mb-4 leading-snug">
                Passionate about building scalable, resilient frontend architectures and user-first digital products.
              </h3>
              <p className="text-text-secondary font-body text-base leading-relaxed mb-4">
                {personalInfo.summary}
              </p>
              <p className="text-text-secondary font-body text-sm leading-relaxed mb-8">
                Currently leading complex dashboard initiatives at <span className="text-text-primary font-semibold">ALASI Real Estate</span>. Previously engineered high-concurrency ERP systems for remote international operations at <span className="text-text-primary font-semibold">MAIDS.CC</span> and responsive full-stack modules at <span className="text-text-primary font-semibold">MEGA DEV</span>.
              </p>

              {/* Personal Info Quick Cards */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: FiMapPin, label: 'Location', value: personalInfo.location },
                  {
                    icon: FiBook,
                    label: 'Education',
                    value: `${education.degree} — ${education.university} (${education.graduation})`,
                  },
                  {
                    icon: FiGlobe,
                    label: 'Languages',
                    value: languages.map((l) => `${l.name} (${l.level})`).join(' • '),
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-bg-card/70 border border-fg/10 hover:border-accent-blue/30 transition-all duration-200"
                  >
                    <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue mt-0.5">
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="text-text-muted font-mono text-[11px] tracking-wider uppercase mb-0.5">{label}</p>
                      <p className="text-text-primary font-body text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume button link */}
            <div className="flex items-center gap-4">
              <a
                href="/Ahmed_Khaled_CV.pdf"
                download="Ahmed_Khaled_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-blue text-white font-body text-xs font-semibold shadow-glow-sm hover:scale-105 transition-all"
              >
                <FiDownload size={14} />
                <span>Download Complete Resume</span>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-accent-blue transition-colors"
              >
                <span>Explore projects</span>
                <FiArrowRight size={12} />
              </a>
            </div>
          </motion.div>

          {/* Right Column — High Impact Stats & Principles */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between gap-5"
          >
            {/* 2x2 Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.12 * i + 0.2 }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-2xl bg-bg-card border border-fg/10 shadow-card hover:border-accent-blue/40 hover:shadow-glow-sm transition-all duration-200 group"
                >
                  <p className="font-display font-extrabold text-4xl sm:text-5xl text-gradient mb-2 group-hover:scale-105 origin-left transition-transform">
                    {stat.value}
                  </p>
                  <p className="text-text-primary font-display font-bold text-sm mb-1">{stat.label}</p>
                  <p className="text-text-muted font-mono text-[11px] leading-tight">{stat.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Core Engineering Principles Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-blue/8 via-bg-card to-bg-card border border-accent-blue/20 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-accent-blue/15 text-accent-blue">
                  <FiAward size={16} />
                </div>
                <h4 className="font-mono text-accent-blue text-xs tracking-wider uppercase font-bold">
                  Core Engineering Strengths
                </h4>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5">
                {[
                  'Scalable Frontend Architecture',
                  'Reactive State (NgRx & Redux)',
                  'Modular & Reusable Components',
                  'CI/CD & Automated Delivery',
                  'Agile / Scrum Sprint Leadership',
                  'Cross-Platform & Hybrid (Ionic)',
                  'Web Performance & Core Web Vitals',
                  'Cross-Browser & Mobile-First UX',
                ].map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-card/80 border border-fg/5 text-text-secondary text-xs font-body font-medium"
                  >
                    <FiCheck className="text-accent-blue flex-shrink-0" size={13} />
                    <span className="truncate">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
