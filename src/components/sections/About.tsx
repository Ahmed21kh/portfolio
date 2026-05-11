'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { personalInfo, education, languages } from '@/lib/data'
import { FiMapPin, FiBook, FiGlobe } from 'react-icons/fi'

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '7+', label: 'Projects Delivered' },
  { value: '2', label: 'Companies' },
  { value: '10+', label: 'Technologies' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-28 px-6 z-10">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-accent-blue text-sm tracking-widest">01.</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-blue/30 to-transparent ml-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-text-secondary font-body text-lg leading-relaxed mb-6">
              {personalInfo.summary}
            </p>
            <p className="text-text-secondary font-body leading-relaxed mb-8">
              I specialize in building scalable, maintainable frontend architectures with a strong focus on performance and developer experience. I enjoy bridging the gap between design and engineering, and working closely with backend teams to deliver seamless full-stack solutions.
            </p>

            {/* Info cards */}
            <div className="space-y-3">
              {[
                { icon: FiMapPin, label: 'Location', value: personalInfo.location },
                { icon: FiBook, label: 'Education', value: `${education.degree} — ${education.university}, ${education.graduation}` },
                { icon: FiGlobe, label: 'Languages', value: languages.map(l => `${l.name} (${l.level})`).join(' · ') },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-bg-card/50 border border-white/5">
                  <div className="p-2 rounded-lg bg-accent-blue/10 mt-0.5">
                    <Icon className="text-accent-blue" size={14} />
                  </div>
                  <div>
                    <p className="text-text-muted font-mono text-xs tracking-wider uppercase mb-0.5">{label}</p>
                    <p className="text-text-primary font-body text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i + 0.3 }}
                className="p-6 rounded-2xl bg-bg-card border border-white/5 card-hover"
              >
                <p className="font-display font-extrabold text-4xl sm:text-5xl text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-text-secondary font-body text-sm">{stat.label}</p>
              </motion.div>
            ))}

            {/* Soft skills card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="col-span-2 p-6 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-bg-card border border-accent-blue/20"
            >
              <p className="font-mono text-accent-blue text-xs tracking-widest uppercase mb-3">Core strengths</p>
              <div className="flex flex-wrap gap-2">
                {['Frontend Architecture', 'Performance Optimization', 'Team Mentoring', 'Code Reviews', 'API Integration', 'Remote Collaboration'].map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary text-xs font-body">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
