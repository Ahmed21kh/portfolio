'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { projects } from '@/lib/data'
import { FiExternalLink, FiFolder } from 'react-icons/fi'

const categories = ['All', 'ERP', 'Education', 'Logistics', 'E-commerce', 'Healthcare']

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="relative py-28 px-6 z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/3 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-mono text-accent-blue text-sm tracking-widest">04.</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">Projects</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-accent-blue/30 to-transparent ml-4" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-accent-blue text-white shadow-glow-sm'
                  : 'bg-bg-card border border-white/10 text-text-muted hover:text-text-primary hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <motion.div
              key={project.name}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-2xl bg-bg-card border border-white/5 hover:border-accent-blue/30 hover:shadow-glow-sm transition-all duration-100 flex flex-col"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-accent-blue/10 border border-accent-blue/20">
                  <FiFolder className="text-accent-blue" size={18} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-text-muted font-mono text-xs">
                    {project.category}
                  </span>
                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent-blue transition-colors p-1"
                    >
                      <FiExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-text-primary mb-2 text-base leading-tight">
                {project.name}
              </h3>

              {/* Period */}
              <p className="font-mono text-text-muted text-xs mb-3 tracking-wide">{project.period}</p>

              {/* Description */}
              <p className="text-text-secondary font-body text-sm leading-relaxed flex-1 mb-5">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full bg-accent-blue/8 border border-accent-blue/15 text-accent-blue/80 font-mono text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Hover glow line */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
