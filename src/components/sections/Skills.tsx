'use client'

import { useRef, useState } from 'react'
import { skills } from '@/lib/data'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import SkillsMarquee from '@/components/ui/SkillsMarquee'

// Split every skill into two alternating rows for the marquee
const allSkillItems = skills.flatMap((s) => s.items)
const marqueeRows = [
  allSkillItems.filter((_, i) => i % 2 === 0),
  allSkillItems.filter((_, i) => i % 2 === 1),
]
import { FiSearch, FiCode, FiLayers, FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const lastFilter = useRef('All|')
  useSectionReveal(ref)
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

  // Re-stagger the cards whenever the filter/search changes (skip initial mount — scroll reveal handles that)
  useGSAP(
    () => {
      const key = `${selectedCategory}|${searchTerm}`
      if (lastFilter.current === key) return
      lastFilter.current = key
      if (!window.matchMedia(MOTION_OK).matches || !gridRef.current) return
      gsap.fromTo(
        gridRef.current.children,
        { autoAlpha: 0, y: 24, scale: 0.96, transition: 'none' },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.05, ease: 'power3.out', clearProps: 'transform,transition' }
      )
      gsap.fromTo(
        gridRef.current.querySelectorAll('[data-skill-tag]'),
        { autoAlpha: 0, scale: 0.6 },
        { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.008, delay: 0.15, ease: 'back.out(2)', clearProps: 'transform' }
      )
    },
    { dependencies: [selectedCategory, searchTerm], scope: gridRef }
  )

  return (
    <section id="skills" ref={ref} className="relative py-20 px-6 z-10 overflow-hidden">
      {/* Background accent glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span data-reveal="left" className="font-mono text-accent-blue text-sm tracking-widest font-semibold">02.</span>
              <h2 data-reveal-title className="font-display font-bold text-3xl sm:text-4xl text-text-primary">Technical Expertise</h2>
            </div>
            <p data-reveal className="text-text-secondary font-body text-sm max-w-xl">
              Specialized in scalable frontend architecture, reactive state flows, modern component libraries, and resilient enterprise applications.
            </p>
          </div>

          {/* Quick Search Input */}
          <div data-reveal="right" className="relative w-full md:w-64">
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
          </div>
        </div>

        {/* Infinite skills marquee — reacts to scroll speed & direction */}
        <SkillsMarquee rows={marqueeRows} />

        {/* Category Pills Filter with Sleek Navigation */}
        <div data-reveal className="relative flex items-center gap-2 mb-8">
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
        </div>

        {/* Skills Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.category}
              data-reveal
              className="p-6 rounded-2xl bg-bg-card border border-fg/10 shadow-card hover:-translate-y-1 hover:border-accent-blue/40 hover:shadow-glow-sm transition-all duration-200 group flex flex-col justify-between"
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
                      data-skill-tag
                      className="inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-medium
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
