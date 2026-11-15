'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { skills } from '@/lib/data'
import { FiSearch, FiCode, FiLayers, FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const skillsTabsRef = useRef<HTMLDivElement>(null)

  const handleScrollSkills = (direction: 'left' | 'right') => {
    if (skillsTabsRef.current) {
      skillsTabsRef.current.scrollBy({
        left: direction === 'left' ? -240 : 240,
        behavior: 'smooth',
      })
    }
  }

  // Filter skills by search query and category
  const filteredSkills = skills
    .filter((cat) => (selectedCategory === 'All' ? true : cat.category === selectedCategory))
    .map((cat) => {
      if (!searchTerm.trim()) return cat
      const matchingItems = cat.items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
      return { ...cat, items: matchingItems }
    })
    .filter((cat) => cat.items.length > 0)

  return (
    <section id="skills" className="relative py-20 px-6 z-10 overflow-hidden">
      {/* Background accent glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-accent-blue text-sm tracking-widest font-semibold">02.</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">Technical Expertise</h2>
            </div>
            <p className="text-text-secondary font-body text-sm max-w-xl">
              Specialized in scalable frontend architecture, reactive state flows, modern component libraries, and resilient enterprise applications.
            </p>
          </motion.div>

          {/* Quick Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative w-full md:w-64"
          >
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
            <input
              type="text"
              placeholder="Search skills (e.g. Angular, NgRx)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-bg-card border border-fg/10 text-xs font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue/50 focus:shadow-glow-sm transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-text-primary"
              >
                ✕
              </button>
            )}
          </motion.div>
        </div>

        {/* Category Pills Filter with Sleek Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="relative flex items-center gap-2 mb-8"
        >
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScrollSkills('left')}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-xl bg-bg-card border border-fg/10 text-text-muted hover:text-accent-blue hover:border-accent-blue/30 shadow-sm transition-all flex-shrink-0 z-10"
            title="Scroll categories left"
            aria-label="Scroll categories left"
          >
            <FiChevronLeft size={16} />
          </button>

          {/* Scrollable Pills Container */}
          <div
            ref={skillsTabsRef}
            className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none no-scrollbar scroll-smooth flex-1"
          >
            <button
              onClick={(e) => {
                setSelectedCategory('All')
                e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all flex-shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-accent-blue text-white shadow-glow-sm font-semibold'
                  : 'bg-bg-card border border-fg/10 text-text-muted hover:text-text-primary hover:border-accent-blue/30'
              }`}
            >
              All Categories ({skills.length})
            </button>
            {skills.map((c) => {
              const isSelected = selectedCategory === c.category
              return (
                <button
                  key={c.category}
                  onClick={(e) => {
                    setSelectedCategory(c.category)
                    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all flex-shrink-0 ${
                    isSelected
                      ? 'bg-accent-blue text-white shadow-glow-sm font-semibold'
                      : 'bg-bg-card border border-fg/10 text-text-muted hover:text-text-primary hover:border-accent-blue/30'
                  }`}
                >
                  {c.category}
                </button>
              )
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScrollSkills('right')}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-xl bg-bg-card border border-fg/10 text-text-muted hover:text-accent-blue hover:border-accent-blue/30 shadow-sm transition-all flex-shrink-0 z-10"
            title="Scroll categories right"
            aria-label="Scroll categories right"
          >
            <FiChevronRight size={16} />
          </button>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-bg-card border border-fg/10 shadow-card hover:border-accent-blue/40 hover:shadow-glow-sm transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-xl bg-accent-blue/8 border border-accent-blue/15">
                      {skill.icon}
                    </span>
                    <h3 className="font-display font-bold text-text-primary text-sm tracking-wide group-hover:text-accent-blue transition-colors">
                      {skill.category}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-text-muted">
                    {skill.items.length}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium
                        bg-bg-secondary/80 border border-fg/10 text-text-secondary
                        hover:border-accent-blue/50 hover:bg-accent-blue/10 hover:text-accent-blue
                        transition-all duration-200 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="mt-5 pt-3 border-t border-fg/5 flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span className="flex items-center gap-1 text-accent-blue">
                  <FiCheckCircle size={11} /> Verified Expertise
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
