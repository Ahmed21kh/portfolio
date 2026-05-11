'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skills } from '@/lib/data'

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-28 px-6 z-10">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/3 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-accent-blue text-sm tracking-widest">02.</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">Skills</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-blue/30 to-transparent ml-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              whileHover={{ y: -4, borderColor: 'rgba(37,99,235,0.5)' }}
              className="p-6 rounded-2xl bg-bg-card border border-white/5 transition-all duration-100 group"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{skill.icon}</span>
                <h3 className="font-display font-semibold text-text-primary text-sm tracking-wide">
                  {skill.category}
                </h3>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 rounded-full text-xs font-mono font-medium
                      bg-gradient-to-r from-accent-blue/10 to-accent-cyan/5
                      border border-accent-blue/20 text-accent-blue/90
                      hover:border-accent-blue/50 hover:bg-accent-blue/15
                      transition-all duration-200 cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
