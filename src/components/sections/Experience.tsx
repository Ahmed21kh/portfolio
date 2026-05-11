'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { experiences } from '@/lib/data'
import { FiCalendar, FiMapPin, FiChevronDown } from 'react-icons/fi'

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section id="experience" className="relative py-28 px-6 z-10">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-accent-blue text-sm tracking-widest">03.</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">Experience</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-blue/30 to-transparent ml-4" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/50 via-accent-blue/20 to-transparent hidden md:block ml-6" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="md:pl-16 relative"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-0 top-6 w-[52px] justify-center">
                  <motion.div
                    animate={exp.current ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-3 h-3 rounded-full border-2 ${
                      exp.current
                        ? 'bg-accent-blue border-accent-blue shadow-glow-sm'
                        : 'bg-bg-primary border-text-muted'
                    }`}
                  />
                </div>

                {/* Card */}
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    expanded === i
                      ? 'border-accent-blue/30 bg-bg-card shadow-glow-sm'
                      : 'border-white/5 bg-bg-card/60 hover:border-white/10'
                  }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full p-6 flex items-start justify-between gap-4 text-left"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="font-display font-bold text-text-primary text-lg">
                          {exp.title}
                        </h3>
                        {exp.current && (
                          <span className="px-2.5 py-0.5 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-accent-blue font-mono text-xs">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-text-muted text-sm">
                        <span className="font-semibold text-text-secondary">{exp.company}</span>
                        <span className="flex items-center gap-1">
                          <FiMapPin size={12} />
                          {exp.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiCalendar size={12} />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-text-muted mt-1 flex-shrink-0"
                    >
                      <FiChevronDown size={18} />
                    </motion.div>
                  </button>

                  {/* Expandable body */}
                  <motion.div
                    initial={false}
                    animate={{ height: expanded === i ? 'auto' : 0, opacity: expanded === i ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <ul className="px-6 pb-6 space-y-2.5">
                      {exp.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed font-body">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
