'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { personalInfo } from '@/lib/data'
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK, REDUCED } from '@/lib/gsap'
import Magnetic from '@/components/ui/Magnetic'
import RollText from '@/components/ui/RollText'
import InteractiveGrid from '@/components/ui/InteractiveGrid'
import { FiGithub, FiLinkedin, FiArrowDown, FiArrowRight, FiDownload, FiPlay } from 'react-icons/fi'
import { SiAngular, SiReact, SiTypescript } from 'react-icons/si'

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(REDUCED, () => {
        gsap.set('[data-hero]', { autoAlpha: 1 })
      })

      mm.add(MOTION_OK, () => {
        // ---------- Intro timeline ----------
        const summary = SplitText.create('[data-hero-summary]', { type: 'words' })

        const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.1 }, delay: 0.15 })
        tl.set('[data-hero]', { autoAlpha: 1 })
          .from('[data-hero-avatar]', { scale: 0.4, rotate: -12, autoAlpha: 0, duration: 1.4, ease: 'back.out(1.6)' })
          .from('[data-hero-aura]', { scale: 0.6, autoAlpha: 0, duration: 1.6 }, '<')
          .from('[data-hero-pill]', { scale: 0, autoAlpha: 0, stagger: 0.12, duration: 0.8, ease: 'back.out(2.5)' }, '-=0.9')
          .from('[data-hero-badge]', { y: 20, autoAlpha: 0, stagger: 0.08 }, '-=0.7')
          .from('[data-hero-name]', { yPercent: 110, duration: 1.3 }, '-=0.8')
          .from('[data-hero-title] > *', { y: 24, autoAlpha: 0, stagger: 0.1 }, '-=0.9')
          .from(summary.words, { y: 14, autoAlpha: 0, filter: 'blur(6px)', stagger: 0.012, duration: 0.7 }, '-=0.8')
          .from('[data-hero-cta]', { y: 30, autoAlpha: 0, scale: 0.9, stagger: 0.08, ease: 'back.out(1.8)' }, '-=0.6')
          .from('[data-hero-stats]', { y: 40, autoAlpha: 0 }, '-=0.7')
          .from('[data-hero-stat]', { y: 16, autoAlpha: 0, stagger: 0.08 }, '-=0.8')
          .from('[data-hero-social]', { y: 16, autoAlpha: 0 }, '-=0.8')
          .from('[data-hero-scroll]', { autoAlpha: 0, y: -10 }, '-=0.5')

        // Stats count up while the strip slides in
        const counters = gsap.utils.toArray<HTMLElement>('[data-hero-count]')
        counters.forEach((el) => {
          const target = parseFloat(el.dataset.heroCount || '0')
          const suffix = el.dataset.suffix ?? ''
          const c = { v: 0 }
          el.textContent = '0' + suffix
          tl.to(
            c,
            {
              v: target,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = Math.round(c.v) + suffix
              },
            },
            '<'
          )
        })

        // ---------- Ambient loops ----------
        gsap.utils.toArray<HTMLElement>('[data-hero-float]').forEach((pill, i) => {
          gsap.to(pill, { y: i % 2 ? 6 : -6, duration: 2 + i * 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        })
        gsap.to('[data-hero-aura]', { rotate: 360, duration: 18, repeat: -1, ease: 'none' })
        gsap.to('[data-hero-arrow]', { y: 8, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' })

        // ---------- Scroll: gentle parallax drift (no fading — content stays crisp) ----------
        const scrub = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('[data-hero-content]', { yPercent: -6, ease: 'none', scrollTrigger: scrub })
        gsap.to('[data-hero-orb]', { yPercent: 50, ease: 'none', scrollTrigger: scrub })

        // ---------- Mouse parallax (pointer devices only) ----------
        const hasHover = window.matchMedia('(hover: hover)').matches
        const layers = gsap.utils.toArray<HTMLElement>('[data-depth]').map((el) => ({
          el,
          depth: parseFloat(el.dataset.depth || '0'),
          x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
        }))
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          layers.forEach((l) => {
            l.x(nx * l.depth)
            l.y(ny * l.depth)
          })
        }
        if (hasHover) {
          window.addEventListener('pointermove', onMove)
        } else {
          // Touch screens: no cursor, so the parallax layers drift gently on their own
          layers.forEach((l, i) => {
            const amp = Math.abs(l.depth) * 0.35
            gsap.to(l.el, {
              x: (i % 2 ? -1 : 1) * amp,
              y: amp * 0.6,
              duration: 5 + i,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            })
          })
        }

        return () => {
          window.removeEventListener('pointermove', onMove)
          counters.forEach((el) => (el.textContent = el.dataset.heroCount + (el.dataset.suffix ?? '')))
        }
      })

      ScrollTrigger.refresh()
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-16 z-10 overflow-hidden"
    >
      {/* Interactive dot grid — reacts to the cursor, ripples on click */}
      <InteractiveGrid />

      {/* Decorative ambient glowing orbs (outer = mouse parallax, inner = scroll parallax) */}
      <div data-depth="-60" className="absolute top-1/4 left-1/4 pointer-events-none">
        <div data-hero-orb className="w-[450px] h-[450px] bg-accent-blue/12 rounded-full blur-[140px] animate-pulse-slow" />
      </div>
      <div data-depth="80" className="absolute bottom-1/4 right-1/4 pointer-events-none">
        <div
          data-hero-orb
          className="w-80 h-80 bg-accent-cyan/10 rounded-full blur-[120px] animate-pulse-slow"
          style={{ animationDelay: '2.5s' }}
        />
      </div>

      <div data-hero-content className="max-w-4xl mx-auto text-center relative z-10">
        {/* Avatar with Floating Tech Pills */}
        <div data-depth="18" className="relative mx-auto mb-8 w-40 h-40 sm:w-48 sm:h-48">
          <div data-hero data-hero-avatar className="relative w-full h-full">
            {/* Glowing Aura Ring */}
            <div
              data-hero-aura
              className="absolute -inset-2 rounded-full bg-gradient-to-tr from-accent-blue via-accent-cyan to-accent-blue opacity-70 blur-md"
            />

            {/* Profile Image Frame */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-bg-primary shadow-2xl bg-bg-card">
              <Image
                src="/profile.jpg"
                alt={personalInfo.name}
                fill
                priority
                sizes="(max-width: 640px) 160px, 192px"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Floating Pill: Angular */}
          <div className="absolute -top-1 -right-3 sm:-right-6">
            <div data-hero data-hero-pill>
              <div
                data-hero-float
                className="px-2.5 py-1 rounded-full bg-bg-card/90 backdrop-blur-md border border-accent-blue/30 shadow-glow-sm flex items-center gap-1.5 text-xs font-mono text-red-500"
              >
                <SiAngular size={13} />
                <span className="text-text-primary text-[11px] font-semibold">Angular</span>
              </div>
            </div>
          </div>

          {/* Floating Pill: React */}
          <div className="absolute -bottom-1 -left-3 sm:-left-6">
            <div data-hero data-hero-pill>
              <div
                data-hero-float
                className="px-2.5 py-1 rounded-full bg-bg-card/90 backdrop-blur-md border border-accent-cyan/30 shadow-glow-sm flex items-center gap-1.5 text-xs font-mono text-cyan-400"
              >
                <SiReact size={13} />
                <span className="text-text-primary text-[11px] font-semibold">React</span>
              </div>
            </div>
          </div>

          {/* Floating Pill: TypeScript */}
          <div className="absolute top-1/2 -left-8 sm:-left-12 -translate-y-1/2 hidden sm:block">
            <div data-hero data-hero-pill>
              <div
                data-hero-float
                className="px-2 py-1 rounded-full bg-bg-card/90 backdrop-blur-md border border-fg/10 shadow-sm flex items-center gap-1 text-[11px] font-mono text-blue-500"
              >
                <SiTypescript size={11} />
                <span className="text-text-primary">TS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Pill Badge */}
        <div
          data-hero
          data-hero-badge
          className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-bg-card/80 border border-accent-cyan/30 backdrop-blur-md shadow-glow-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-cyan" />
          </span>
          <span className="text-accent-cyan font-mono text-xs tracking-wider uppercase font-semibold">
            Available for Senior Frontend Roles
          </span>
        </div>

        {/* Current Position */}
        <p data-hero data-hero-badge className="mb-4 text-text-muted font-mono text-xs tracking-wide">
          Currently @ <span className="text-text-primary font-semibold">ALASI Real Estate</span> • Previously @{' '}
          <span className="text-text-secondary">MAIDS.CC</span>
        </p>

        {/* Name — rises out of a mask */}
        <h1
          data-hero
          className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight mb-6 overflow-hidden pb-2"
        >
          <span data-hero-name className="inline-block text-gradient-animated">
            {personalInfo.name}
          </span>
        </h1>

        {/* Title & Subtitle */}
        <div data-hero data-hero-title className="mb-6 space-y-1">
          <p className="font-display text-2xl sm:text-3xl text-text-primary font-semibold tracking-wide">
            {personalInfo.title}
          </p>
          <p className="font-mono text-accent-blue text-sm sm:text-base tracking-widest">
            {'< '}
            {personalInfo.subtitle} & Architecture{' />'}
          </p>
        </div>

        {/* Professional Summary — words fade in from blur */}
        <p
          data-hero
          data-hero-summary
          className="text-text-secondary font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {personalInfo.summary}
        </p>

        {/* Action Buttons (CTAs) — magnetic */}
        <div data-hero className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
          <Magnetic>
            <a
              data-hero-cta
              href="#projects"
              className="btn-shine flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent-blue text-white font-body font-medium text-sm tracking-wide shadow-glow transition-[transform,box-shadow] duration-300 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(37,99,235,0.45)] active:scale-[0.98]"
            >
              <FiPlay size={14} className="fill-current nudge-pop" />
              <RollText>Interactive Live Demos</RollText>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              data-hero-cta
              href="/Ahmed_Khaled_CV.pdf"
              download="Ahmed_Khaled_CV.pdf"
              className="btn-fill flex items-center gap-2 px-6 py-3.5 rounded-full border border-accent-blue/40 bg-bg-card/80 text-text-primary font-body font-medium text-sm tracking-wide hover:scale-[1.04] active:scale-[0.98] transition-[transform,color,border-color] duration-300 backdrop-blur"
            >
              <FiDownload size={14} className="text-accent-blue nudge-y" />
              <RollText>Download CV</RollText>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              data-hero-cta
              href="#contact"
              className="btn-fill flex items-center gap-2 px-6 py-3.5 rounded-full border border-fg/10 bg-bg-card/50 text-text-muted font-body font-medium text-sm tracking-wide hover:scale-[1.04] active:scale-[0.98] transition-[transform,color,border-color] duration-300 backdrop-blur"
            >
              <RollText>Get In Touch</RollText>
              <FiArrowRight size={14} className="nudge-x" />
            </a>
          </Magnetic>
        </div>

        {/* Quick Stats Strip */}
        <div
          data-hero
          data-hero-stats
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10 p-4 rounded-2xl bg-bg-card/70 border border-fg/10 backdrop-blur-md shadow-card"
        >
          <div data-hero-stat className="text-center p-2">
            <p className="font-display font-extrabold text-2xl text-accent-blue">
              <span data-hero-count="4" data-suffix="+">4+</span> Years
            </p>
            <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">Experience</p>
          </div>
          <div data-hero-stat className="text-center p-2 border-l border-fg/5">
            <p className="font-display font-extrabold text-2xl text-accent-cyan">
              <span data-hero-count="7" data-suffix="+">7+</span> Apps
            </p>
            <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">Delivered</p>
          </div>
          <div data-hero-stat className="text-center p-2 sm:border-l border-fg/5">
            <p className="font-display font-extrabold text-2xl text-text-primary">Angular & React</p>
            <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">Core Focus</p>
          </div>
          <div data-hero-stat className="text-center p-2 border-l border-fg/5">
            <p className="font-display font-extrabold text-2xl text-emerald-500">
              <span data-hero-count="100" data-suffix="%">100%</span>
            </p>
            <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-0.5">Production Ready</p>
          </div>
        </div>

        {/* Social links */}
        <div data-hero data-hero-social className="flex items-center justify-center gap-5">
          {[
            { href: personalInfo.github, icon: FiGithub, label: 'GitHub' },
            { href: personalInfo.linkedin, icon: FiLinkedin, label: 'LinkedIn' },
          ].map(({ href, icon: Icon, label }) => (
            <Magnetic key={label} strength={0.5}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-text-muted hover:text-accent-blue hover:scale-[1.15] transition-all duration-200 p-2"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            </Magnetic>
          ))}
          <div className="w-px h-5 bg-fg/10" />
          <span className="text-text-muted font-mono text-xs">{personalInfo.location}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div data-hero data-hero-scroll className="mt-10 flex flex-col items-center gap-2">
        <span className="text-text-muted font-mono text-xs tracking-widest uppercase">Scroll Down</span>
        <div data-hero-arrow>
          <FiArrowDown className="text-text-muted" size={15} />
        </div>
      </div>
    </section>
  )
}
