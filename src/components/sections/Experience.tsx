'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { experiences } from '@/lib/data'
import { FiCalendar, FiMapPin, FiChevronDown, FiBriefcase, FiCheckCircle } from 'react-icons/fi'

const companyTech: Record<string, string[]> = {
  'ALASI Real Estate': ['Angular 16+', 'TypeScript', 'RxJS', 'Enterprise Dashboards', 'Tailwind CSS'],
  'MAIDS.CC': ['Angular', 'NgRx', 'RESTful APIs', 'Reactive Forms', 'ERP Systems', 'Remote'],
  'MEGA DEV': ['React.js', 'Angular', 'Node.js', 'Redux', 'WebSocket', 'Cross-browser'],
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section id="experience" className="relative py-20 px-6 z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-mono text-accent-blue text-sm tracking-widest font-semibold">03.</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">Work Experience</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-blue/30 to-transparent ml-4" />
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 top-3 bottom-6 w-px bg-gradient-to-b from-accent-blue/60 via-accent-cyan/30 to-transparent hidden md:block ml-6" />

          <div className="space-y-6">
            {experiences.map((exp, i) => {
              const isCurrent = exp.current
              const isOpen = expanded === i
              const techList = companyTech[exp.company] || []

              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="md:pl-16 relative"
                >
                  {/* Timeline Dot Indicator */}
                  <div className="hidden md:flex absolute left-0 top-6 w-[52px] justify-center items-center">
                    {isCurrent ? (
                      <div className="relative flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-accent-blue opacity-50" />
                        <span className="relative w-3.5 h-3.5 rounded-full bg-accent-blue border-2 border-white dark:border-bg-card shadow-glow-sm" />
                      </div>
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-bg-card border-2 border-text-muted/60" />
                    )}
                  </div>

                  {/* Experience Card */}
                  <div
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'border-accent-blue/40 bg-bg-card shadow-card shadow-accent-blue/5'
                        : 'border-fg/10 bg-bg-card/70 hover:border-accent-blue/20'
                    }`}
                  >
                    {/* Header Button */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="w-full p-6 sm:p-7 flex items-start justify-between gap-4 text-left group"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2.5 mb-2">
                          <h3 className="font-display font-bold text-text-primary text-lg sm:text-xl group-hover:text-accent-blue transition-colors">
                            {exp.title}
                          </h3>
                          {isCurrent && (
                            <span className="px-2.5 py-0.5 rounded-full bg-accent-blue/15 border border-accent-blue/30 text-accent-blue font-mono text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                              Current Role
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-text-muted text-xs sm:text-sm font-mono">
                          <span className="font-semibold text-text-primary flex items-center gap-1">
                            <FiBriefcase size={13} className="text-accent-blue" />
                            {exp.company}
                          </span>
                          {exp.type && (
                            <span className="flex items-center gap-1 text-text-secondary">
                              <FiMapPin size={12} />
                              {exp.type}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-text-secondary">
                            <FiCalendar size={12} />
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="p-2 rounded-lg bg-fg/5 text-text-muted group-hover:text-accent-blue group-hover:bg-accent-blue/10 transition-colors mt-1 flex-shrink-0"
                      >
                        <FiChevronDown size={18} />
                      </motion.div>
                    </button>

                    {/* Expandable Body */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-fg/5">
                        {/* Bullet achievements */}
                        <ul className="space-y-3 mb-5">
                          {exp.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-text-secondary font-body text-sm leading-relaxed">
                              <span className="mt-1 text-accent-blue flex-shrink-0">
                                <FiCheckCircle size={15} />
                              </span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags used in this role */}
                        {techList.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-2">
                            <span className="font-mono text-xs text-text-muted mr-1">Stack:</span>
                            {techList.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-0.5 rounded-md bg-accent-blue/8 border border-accent-blue/15 text-accent-blue font-mono text-[11px]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
