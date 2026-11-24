'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/lib/data'
import {
  FiX,
  FiExternalLink,
  FiRefreshCw,
  FiMaximize2,
  FiMinimize2,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiLock,
  FiCopy,
  FiCheck,
  FiLayers,
  FiShield,
  FiCode
} from 'react-icons/fi'

interface ProjectPreviewModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile'

export default function ProjectPreviewModal({ project, isOpen, onClose }: ProjectPreviewModalProps) {
  const [device, setDevice] = useState<DeviceMode>('desktop')
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Reset states when opening a project
  useEffect(() => {
    if (isOpen && project) {
      setIsLoading(true)
      setIframeKey((prev) => prev + 1)
      // Prevent body scrolling
      document.body.style.overflow = 'hidden'

      // Auto-dismiss loading indicator after 1.2s max so it never gets stuck
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1200)

      return () => {
        clearTimeout(timer)
        document.body.style.overflow = 'unset'
      }
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, project])

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false)
        } else {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen, onClose])

  if (!isOpen || !project) return null

  const hasLiveLink = project.link && project.link !== '#'

  const handleCopyLink = () => {
    if (!hasLiveLink) return
    navigator.clipboard.writeText(project.link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReload = () => {
    setIsLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  // Device width mappings
  const deviceWidthClass = {
    desktop: 'w-full max-w-full',
    tablet: 'w-full max-w-[768px]',
    mobile: 'w-full max-w-[390px]',
  }[device]

  // Portal to <body>: inside the Projects section (relative z-10) the modal could never
  // rise above the fixed navbar, which hid the browser header bar.
  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window (Browser Mockup) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative z-10 flex flex-col bg-bg-card border border-fg/15 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'fixed inset-2 sm:inset-4 rounded-xl' : 'w-full max-w-6xl h-[92vh] max-h-[900px]'
          }`}
        >
          {/* Browser Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-bg-secondary/90 border-b border-fg/10 select-none">
            {/* Left: Window controls & project name */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onClose}
                  className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group"
                  title="Close preview (Esc)"
                  aria-label="Close preview"
                >
                  <FiX size={10} className="text-black/70 opacity-0 group-hover:opacity-100" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"
                  title="Toggle Fullscreen"
                  aria-label="Toggle Fullscreen"
                />
                <button
                  onClick={() => setDevice('desktop')}
                  className="w-3.5 h-3.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"
                  title="Reset to Desktop"
                  aria-label="Reset to Desktop"
                />
              </div>

              <div className="h-4 w-px bg-fg/10 hidden sm:block" />

              <div className="hidden sm:flex items-center gap-2">
                <span className="font-display font-semibold text-text-primary text-sm truncate max-w-[200px]">
                  {project.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Middle: Mockup URL / Address Bar */}
            <div className="flex-1 max-w-md mx-auto min-w-[200px]">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-primary/90 border border-fg/10 text-xs font-mono text-text-muted">
                <FiLock size={12} className={hasLiveLink ? 'text-emerald-500' : 'text-amber-500'} />
                <span className="flex-1 truncate text-text-secondary select-all">
                  {hasLiveLink ? project.link : `internal://${project.id}.local/dashboard`}
                </span>
                {hasLiveLink && (
                  <button
                    onClick={handleCopyLink}
                    title="Copy URL"
                    className="p-1 hover:text-accent-blue transition-colors"
                  >
                    {copied ? <FiCheck size={12} className="text-emerald-500" /> : <FiCopy size={12} />}
                  </button>
                )}
              </div>
            </div>

            {/* Right: Device Switcher & Action Controls */}
            <div className="flex items-center gap-2">
              {/* Responsive Device Switcher */}
              {hasLiveLink && (
                <div className="flex items-center bg-bg-primary/80 border border-fg/10 rounded-lg p-0.5">
                  <button
                    onClick={() => setDevice('desktop')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      device === 'desktop'
                        ? 'bg-accent-blue text-white shadow-sm'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                    title="Desktop View (Full Width)"
                    aria-label="Desktop View"
                  >
                    <FiMonitor size={14} />
                  </button>
                  <button
                    onClick={() => setDevice('tablet')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      device === 'tablet'
                        ? 'bg-accent-blue text-white shadow-sm'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                    title="Tablet View (768px)"
                    aria-label="Tablet View"
                  >
                    <FiTablet size={14} />
                  </button>
                  <button
                    onClick={() => setDevice('mobile')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${
                      device === 'mobile'
                        ? 'bg-accent-blue text-white shadow-sm'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                    title="Mobile View (390px)"
                    aria-label="Mobile View"
                  >
                    <FiSmartphone size={14} />
                  </button>
                </div>
              )}

              {/* Reload Button */}
              {hasLiveLink && (
                <button
                  onClick={handleReload}
                  className="p-2 rounded-lg border border-fg/10 hover:border-accent-blue/30 text-text-muted hover:text-accent-blue bg-bg-card transition-colors"
                  title="Reload frame"
                  aria-label="Reload frame"
                >
                  <FiRefreshCw size={13} className={isLoading ? 'animate-spin text-accent-blue' : ''} />
                </button>
              )}

              {/* Open in New Window */}
              {hasLiveLink && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-fg/10 hover:border-accent-blue/30 text-text-muted hover:text-accent-blue bg-bg-card transition-colors"
                  title="Open live site in new tab"
                >
                  <FiExternalLink size={13} />
                </a>
              )}

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg border border-fg/10 hover:border-accent-blue/30 text-text-muted hover:text-accent-blue bg-bg-card transition-colors hidden sm:inline-flex"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? <FiMinimize2 size={13} /> : <FiMaximize2 size={13} />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-fg/5 hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-colors ml-1"
                title="Close (Esc)"
                aria-label="Close"
              >
                <FiX size={15} />
              </button>
            </div>
          </div>

          {/* Subheader / Project Specs Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 bg-bg-card border-b border-fg/5 text-xs text-text-secondary font-body">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-text-muted">{project.period}</span>
              <span className="text-fg/20">•</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full bg-accent-blue/5 border border-accent-blue/15 text-accent-blue font-mono text-[10px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
              {hasLiveLink ? (
                <span className="flex items-center gap-1 text-emerald-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Embedded Iframe ({device})
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-500 font-medium">
                  <FiShield size={12} />
                  Enterprise Internal System (Protected)
                </span>
              )}
            </div>
          </div>

          {/* Main Content Area (Iframe or Fallback) */}
          <div className="relative flex-1 bg-neutral-900/40 flex items-center justify-center overflow-auto p-2 sm:p-4">
            {/* Slim Top Loading Bar */}
            {hasLiveLink && isLoading && (
              <div className="absolute top-0 left-0 right-0 h-1 z-30 overflow-hidden bg-accent-blue/20 pointer-events-none">
                <div className="h-full bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-blue animate-pulse w-full" />
              </div>
            )}

            {/* Non-blocking Subtle Floating Badge */}
            <AnimatePresence>
              {hasLiveLink && isLoading && (
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

            {/* The Live Iframe */}
            {hasLiveLink ? (
              <div
                className={`relative h-full transition-all duration-300 bg-white rounded-xl overflow-hidden shadow-2xl border border-fg/15 flex flex-col ${deviceWidthClass}`}
              >
                <iframe
                  key={iframeKey}
                  ref={iframeRef}
                  src={project.link}
                  title={project.name}
                  onLoad={() => setIsLoading(false)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  className="w-full h-full flex-1 border-0"
                />
              </div>
            ) : (
              /* Enterprise / Private Internal System Showcase */
              <div className="max-w-xl w-full p-8 rounded-2xl bg-bg-card border border-fg/10 shadow-xl text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mx-auto mb-5 text-accent-blue">
                  <FiShield size={28} />
                </div>
                <h3 className="font-display font-bold text-2xl text-text-primary mb-3">
                  {project.name}
                </h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="p-4 rounded-xl bg-bg-secondary/60 border border-fg/5 mb-6 text-left space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent-blue uppercase tracking-wider font-semibold">
                    <FiCode size={14} /> Architecture & Engineering Highlights
                  </div>
                  <ul className="text-xs text-text-secondary space-y-2 font-body">
                    {project.highlights?.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-accent-blue mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    )) || (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-accent-blue">•</span>
                          <span>Role-based routing, authentication guards, and fine-grained permissions.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent-blue">•</span>
                          <span>Scalable state architecture built for high-throughput enterprise workflows.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono text-xs flex items-center gap-1.5">
                    <FiLock size={12} />
                    Internal Enterprise Network Only
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-bg-secondary/90 border-t border-fg/10 text-[11px] font-mono text-text-muted">
            <div className="flex items-center gap-3">
              <span>
                Tip: Use device controls to test responsiveness
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-bg-card border border-fg/15 text-text-primary">Esc</kbd> to close</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  )
}

