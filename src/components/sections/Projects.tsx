'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { projects, Project } from '@/lib/data'
import {
  FiExternalLink,
  FiFolder,
  FiEye,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiRefreshCw,
  FiMaximize2,
  FiLock,
  FiCheck,
  FiShield,
  FiLayers,
  FiGrid,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'
import ProjectPreviewModal from '@/components/ui/ProjectPreviewModal'

const categories = ['All', 'ERP', 'Education', 'Tools', 'E-commerce', 'Logistics', 'Healthcare']

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // State
  const [viewMode, setViewMode] = useState<'showcase' | 'grid'>('showcase')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project>(
    projects.find((p) => p.hasLiveDemo) || projects[0]
  )
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Showcase controls
  const [showcaseDevice, setShowcaseDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [showcaseLoading, setShowcaseLoading] = useState(false)
  const [showcaseKey, setShowcaseKey] = useState(0)
  const tabsContainerRef = useRef<HTMLDivElement>(null)

  const handleScrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({
        left: direction === 'left' ? -260 : 260,
        behavior: 'smooth',
      })
    }
  }

  // Auto-dismiss loading indicator after 1.2s max so it never gets stuck
  useEffect(() => {
    setShowcaseLoading(true)
    const timer = setTimeout(() => {
      setShowcaseLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [selectedProject.id, showcaseKey])

  const filtered =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory)

  const handleSelectShowcaseProject = (project: Project) => {
    setSelectedProject(project)
    setShowcaseLoading(true)
    setShowcaseKey((prev) => prev + 1)
  }

  const handleOpenModal = (project: Project) => {
    setModalProject(project)
    setIsModalOpen(true)
  }

  const showcaseDeviceWidth = {
    desktop: 'w-full',
    tablet: 'w-full max-w-[768px]',
    mobile: 'w-full max-w-[380px]',
  }[showcaseDevice]

  return (
    <section id="projects" className="relative py-20 px-6 z-10 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-accent-blue text-sm tracking-widest font-semibold">04.</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary">Featured Projects</h2>
            </div>
            <p className="text-text-secondary font-body text-sm max-w-xl">
              Production web applications, ERP dashboards, and client portals built with Angular and React. Preview them live inside interactive browser frames.
            </p>
          </motion.div>

          {/* View Mode Toggle (Showcase vs Grid) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center p-1 rounded-xl bg-bg-card border border-fg/10 shadow-card self-start md:self-auto"
          >
            <button
              onClick={() => setViewMode('showcase')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                viewMode === 'showcase'
                  ? 'bg-accent-blue text-white shadow-glow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <FiMonitor size={14} />
              <span>Live Showcase (iframe)</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-accent-blue text-white shadow-glow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <FiGrid size={14} />
              <span>Cards Grid</span>
            </button>
          </motion.div>
        </div>

        {/* ========================================================
            VIEW MODE 1: INTERACTIVE LIVE SHOWCASE (MAC BROWSER FRAME)
           ======================================================== */}
        {viewMode === 'showcase' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Project Picker Tabs with Sleek Navigation */}
            <div className="relative flex items-center gap-2">
              {/* Left Arrow Button */}
              <button
                onClick={() => handleScrollTabs('left')}
                className="hidden sm:flex items-center justify-center w-8 h-8 rounded-xl bg-bg-card border border-fg/10 text-text-muted hover:text-accent-blue hover:border-accent-blue/30 shadow-sm transition-all flex-shrink-0 z-10"
                title="Scroll projects left"
                aria-label="Scroll projects left"
              >
                <FiChevronLeft size={16} />
              </button>

              {/* Scrollable Tabs Container */}
              <div
                ref={tabsContainerRef}
                className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none no-scrollbar scroll-smooth flex-1"
              >
                {projects.map((proj) => {
                  const isSelected = selectedProject.id === proj.id
                  return (
                    <button
                      key={proj.id}
                      onClick={() => handleSelectShowcaseProject(proj)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 border flex-shrink-0 ${
                        isSelected
                          ? 'bg-accent-blue text-white border-accent-blue shadow-glow-sm font-semibold'
                          : 'bg-bg-card border-fg/10 text-text-muted hover:text-text-primary hover:border-accent-blue/30'
                      }`}
                    >
                      {proj.hasLiveDemo ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      ) : (
                        <FiShield size={12} className="text-amber-400" />
                      )}
                      <span>{proj.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-fg/5 text-text-muted'}`}>
                        {proj.category}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={() => handleScrollTabs('right')}
                className="hidden sm:flex items-center justify-center w-8 h-8 rounded-xl bg-bg-card border border-fg/10 text-text-muted hover:text-accent-blue hover:border-accent-blue/30 shadow-sm transition-all flex-shrink-0 z-10"
                title="Scroll projects right"
                aria-label="Scroll projects right"
              >
                <FiChevronRight size={16} />
              </button>
            </div>

            {/* Embedded Live Browser Mockup Container */}
            <div className="rounded-2xl border border-fg/15 bg-bg-card shadow-2xl overflow-hidden transition-all duration-300">
              {/* Browser Mockup Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-bg-secondary/90 border-b border-fg/10 select-none">
                {/* Window Dots & Info */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="h-4 w-px bg-fg/10 hidden sm:block" />
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="font-display font-semibold text-text-primary text-sm">
                      {selectedProject.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>

                {/* Center: Live URL Bar */}
                <div className="flex-1 max-w-md mx-auto min-w-[200px]">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-primary/90 border border-fg/10 text-xs font-mono text-text-muted">
                    <FiLock size={12} className={selectedProject.hasLiveDemo ? 'text-emerald-500' : 'text-amber-500'} />
                    <span className="flex-1 truncate text-text-secondary">
                      {selectedProject.hasLiveDemo ? selectedProject.link : `internal://${selectedProject.id}.local/dashboard`}
                    </span>
                    {selectedProject.hasLiveDemo && (
                      <span className="text-[10px] text-emerald-500 font-sans font-medium px-1.5 py-0.2 rounded bg-emerald-500/10">
                        LIVE
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Device Switcher & Controls */}
                <div className="flex items-center gap-2">
                  {selectedProject.hasLiveDemo && (
                    <div className="flex items-center bg-bg-primary/80 border border-fg/10 rounded-lg p-0.5">
                      <button
                        onClick={() => setShowcaseDevice('desktop')}
                        className={`p-1.5 rounded-md text-xs transition-colors ${
                          showcaseDevice === 'desktop'
                            ? 'bg-accent-blue text-white shadow-sm'
                            : 'text-text-muted hover:text-text-primary'
                        }`}
                        title="Desktop View"
                        aria-label="Desktop View"
                      >
                        <FiMonitor size={14} />
                      </button>
                      <button
                        onClick={() => setShowcaseDevice('tablet')}
                        className={`p-1.5 rounded-md text-xs transition-colors ${
                          showcaseDevice === 'tablet'
                            ? 'bg-accent-blue text-white shadow-sm'
                            : 'text-text-muted hover:text-text-primary'
                        }`}
                        title="Tablet View"
                        aria-label="Tablet View"
                      >
                        <FiTablet size={14} />
                      </button>
                      <button
                        onClick={() => setShowcaseDevice('mobile')}
                        className={`p-1.5 rounded-md text-xs transition-colors ${
                          showcaseDevice === 'mobile'
                            ? 'bg-accent-blue text-white shadow-sm'
                            : 'text-text-muted hover:text-text-primary'
                        }`}
                        title="Mobile View"
                        aria-label="Mobile View"
                      >
                        <FiSmartphone size={14} />
                      </button>
                    </div>
                  )}

                  {selectedProject.hasLiveDemo && (
                    <button
                      onClick={() => {
                        setShowcaseLoading(true)
                        setShowcaseKey((prev) => prev + 1)
                      }}
                      className="p-1.5 rounded-lg border border-fg/10 hover:border-accent-blue/30 text-text-muted hover:text-accent-blue bg-bg-card transition-colors"
                      title="Reload iframe"
                      aria-label="Reload iframe"
                    >
                      <FiRefreshCw size={13} className={showcaseLoading ? 'animate-spin text-accent-blue' : ''} />
                    </button>
                  )}

                  {selectedProject.hasLiveDemo && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-fg/10 hover:border-accent-blue/30 text-text-muted hover:text-accent-blue bg-bg-card transition-colors"
                      title="Open in new tab"
                    >
                      <FiExternalLink size={13} />
                    </a>
                  )}

                  {/* Expand to Fullscreen Modal */}
                  <button
                    onClick={() => handleOpenModal(selectedProject)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-accent-blue/10 border border-accent-blue/20 text-accent-blue hover:bg-accent-blue hover:text-white transition-all text-xs font-mono font-medium"
                    title="Open Fullscreen Preview Modal"
                  >
                    <FiMaximize2 size={12} />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </button>
                </div>
              </div>

              {/* Iframe Viewport Area */}
              <div className="relative h-[550px] sm:h-[620px] bg-neutral-900/50 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                {/* Slim Top Loading Bar */}
                {selectedProject.hasLiveDemo && showcaseLoading && (
                  <div className="absolute top-0 left-0 right-0 h-1 z-30 overflow-hidden bg-accent-blue/20 pointer-events-none">
                    <div className="h-full bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-blue animate-pulse w-full" />
                  </div>
                )}

                {/* Non-blocking Subtle Floating Badge */}
                <AnimatePresence>
                  {selectedProject.hasLiveDemo && showcaseLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-4 right-4 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-card/90 backdrop-blur-md border border-fg/10 shadow-lg text-xs font-mono text-text-secondary"
                    >
                      <span className="w-2 h-2 rounded-full bg-accent-blue animate-ping" />
                      <span>Loading preview...</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actual Live Iframe */}
                {selectedProject.hasLiveDemo ? (
                  <div
                    className={`relative h-full transition-all duration-300 bg-white rounded-xl overflow-hidden shadow-2xl border border-fg/10 flex flex-col mx-auto ${showcaseDeviceWidth}`}
                  >
                    <iframe
                      key={showcaseKey}
                      src={selectedProject.link}
                      title={selectedProject.name}
                      onLoad={() => setShowcaseLoading(false)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                      className="w-full h-full flex-1 border-0"
                    />
                  </div>
                ) : (
                  /* Protected Enterprise Placeholder */
                  <div className="max-w-md w-full p-6 rounded-2xl bg-bg-card border border-fg/10 text-center shadow-xl">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-4">
                      <FiShield size={24} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                      {selectedProject.name}
                    </h3>
                    <p className="font-body text-xs text-text-secondary leading-relaxed mb-4">
                      {selectedProject.description}
                    </p>
                    <div className="p-3 rounded-lg bg-bg-secondary/70 border border-fg/5 text-left mb-4">
                      <p className="font-mono text-[11px] text-accent-blue font-semibold uppercase mb-2">
                        Key Features & Security
                      </p>
                      <ul className="text-xs text-text-secondary space-y-1.5 font-body">
                        {selectedProject.highlights?.map((h, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-accent-blue">✓</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono text-xs">
                      <FiLock size={12} /> Protected Internal Dashboard
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Details Footer */}
              <div className="px-6 py-4 bg-bg-card border-t border-fg/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-text-secondary font-body text-sm leading-relaxed mb-2">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-accent-blue/8 border border-accent-blue/15 text-accent-blue font-mono text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenModal(selectedProject)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-blue text-white font-body text-xs font-medium shadow-glow-sm hover:scale-105 transition-all"
                  >
                    <FiEye size={14} />
                    <span>Open in Live Modal</span>
                  </button>
                  {selectedProject.hasLiveDemo && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-fg/10 hover:border-accent-blue/40 text-text-secondary hover:text-text-primary font-body text-xs transition-colors"
                    >
                      <FiExternalLink size={14} />
                      <span>Visit Live Site</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            VIEW MODE 2: MODERN PROJECT CARDS GRID
           ======================================================== */}
        {viewMode === 'grid' && (
          <div className="space-y-8">
            {/* Filter tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => {
                const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-accent-blue text-white shadow-glow-sm'
                        : 'bg-bg-card border border-fg/10 text-text-muted hover:text-text-primary hover:border-fg/20'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === cat ? 'bg-white/20' : 'bg-fg/5'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </motion.div>

            {/* Grid */}
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  whileHover={{ y: -5 }}
                  className="group relative p-6 rounded-2xl bg-bg-card border border-fg/10 shadow-card hover:border-accent-blue/40 hover:shadow-glow-sm transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-accent-blue/10 border border-accent-blue/20">
                        <FiFolder className="text-accent-blue" size={18} />
                      </div>

                      <div className="flex items-center gap-2">
                        {project.hasLiveDemo ? (
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono text-[11px] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live Iframe
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono text-[11px]">
                            <FiLock size={10} />
                            Internal
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-fg/5 border border-fg/10 text-text-muted font-mono text-xs">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-text-primary mb-1.5 text-lg leading-tight group-hover:text-accent-blue transition-colors">
                      {project.name}
                    </h3>

                    {/* Period */}
                    <p className="font-mono text-text-muted text-xs mb-3 tracking-wide">{project.period}</p>

                    {/* Description */}
                    <p className="text-text-secondary font-body text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Highlights bullet tags */}
                    {project.highlights && (
                      <div className="mb-4 space-y-1">
                        {project.highlights.slice(0, 2).map((h, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs text-text-muted font-body">
                            <span className="text-accent-blue">✓</span>
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-full bg-accent-blue/8 border border-accent-blue/15 text-accent-blue/80 font-mono text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-2 pt-4 border-t border-fg/5">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-accent-blue/10 hover:bg-accent-blue text-accent-blue hover:text-white font-body text-xs font-medium transition-all"
                    >
                      <FiEye size={13} />
                      <span>{project.hasLiveDemo ? 'Live Iframe Preview' : 'View Architecture'}</span>
                    </button>

                    {project.hasLiveDemo && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl border border-fg/10 hover:border-accent-blue/40 text-text-muted hover:text-accent-blue transition-colors"
                        title="Open direct link in new tab"
                      >
                        <FiExternalLink size={14} />
                      </a>
                    )}
                  </div>

                  {/* Hover glow line */}
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* Global Interactive Project Preview Modal */}
      <ProjectPreviewModal
        project={modalProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}
