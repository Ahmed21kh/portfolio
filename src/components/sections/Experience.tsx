'use client'

import { useRef, useState } from 'react'
import { experiences } from '@/lib/data'
import { gsap, ScrollTrigger, useGSAP, REDUCED, navOffset } from '@/lib/gsap'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import { FiCalendar, FiMapPin, FiChevronDown, FiBriefcase, FiCheckCircle } from 'react-icons/fi'

const companyTech: Record<string, string[]> = {
  'ALASI Real Estate': ['Angular 21', 'TypeScript', 'RxJS / Signals', 'Tailwind CSS 4', 'Angular Material', 'SignalR'],
  'MAIDS.CC': ['Angular', 'NgRx', 'RESTful APIs', 'Reactive Forms', 'ERP Systems', 'Remote'],
  'MEGA DEV': ['React.js', 'Angular', 'Node.js', 'Redux', 'WebSocket', 'Cross-browser'],
}

type Exp = (typeof experiences)[number]

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<Set<number>>(() => new Set())
  // The role currently "in focus"
  const [active, setActive] = useState(-1)
  // true when the timeline is pinned and scroll steps through the roles one at a time
  const [pinned, setPinned] = useState(false)
  const pinST = useRef<ScrollTrigger | null>(null)
  useSectionReveal(ref)

  const toggleCard = (i: number) => {
    // Pinned mode: clicking a role scrolls to its step instead of fighting the scroll position
    const st = pinST.current
    if (st) {
      const n = experiences.length
      window.scrollTo({ top: st.start + ((i + 0.1) / n) * (st.end - st.start) })
      return
    }
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  useGSAP(
    () => {
      const timeline = ref.current?.querySelector<HTMLElement>('[data-timeline]')
      if (!timeline) return
      const cards = gsap.utils.toArray<HTMLElement>('[data-exp-card]')
      const bodies = cards.map((c) => c.querySelector<HTMLElement>('[data-exp-body]')!)
      const bars = cards.map((c) => c.querySelector<HTMLElement>('[data-exp-progress]')!)
      const n = cards.length
      const reduced = () => window.matchMedia(REDUCED).matches

      // ---------- Mode A: pinned stepper (one role open at a time) ----------
      const pinnedMode = (h: number) => {
        setPinned(true)
        setOpen(new Set())
        setActive(-1)
        // Reserve room for the tallest state so the layout never jumps while roles swap
        gsap.set(timeline, { minHeight: h })

        let last = -2
        const show = (idx: number) => {
          if (idx === last) return
          last = idx
          setActive(idx)
          setOpen(idx < 0 ? new Set() : new Set([idx]))
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: timeline,
            start: () => `top ${Math.max(navOffset(), (window.innerHeight - h) / 2)}`,
            end: () => `+=${n * window.innerHeight * 0.7}`,
            pin: true,
            scrub: reduced() ? true : 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const step = self.progress * n
              show(self.progress <= 0 ? -1 : Math.min(n - 1, Math.floor(step)))
              // per-role progress line: shows how close you are to the next role
              bars.forEach((bar, i) => gsap.set(bar, { scaleX: gsap.utils.clamp(0, 1, step - i) }))
            },
          },
        })
        tl.fromTo('[data-timeline-fill]', { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top center' }, 0)
          .fromTo('[data-timeline-head]', { top: '0%' }, { top: '100%', ease: 'none' }, 0)
        pinST.current = tl.scrollTrigger ?? null

        return () => {
          pinST.current = null
          setPinned(false)
        }
      }

      // ---------- Mode B: when the stepper doesn't fit — open each role as you reach it.
      // On phones the opened cards also stack: each sticks under the navbar while the
      // next one slides over it (all content stays readable, nothing collapses).
      const flowMode = (stack: boolean) => {
        gsap.set(bars, { scaleX: 0 })

        if (stack && !reduced()) {
          const last = cards[n - 1]
          cards.forEach((card, i) => {
            if (i === n - 1) return
            // height once open — a card taller than the screen would be cut off if it stuck
            const openH = card.offsetHeight - bodies[i].offsetHeight + bodies[i].scrollHeight
            if (openH + navOffset() + 16 > window.innerHeight) return

            ScrollTrigger.create({
              trigger: card,
              start: () => `top ${navOffset() + i * 12}`, // 12px steps so stacked cards peek out
              endTrigger: last,
              end: () => `top ${navOffset() + (n - 1) * 12}`,
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            })
            // shrink slightly as the next card covers it → depth effect
            gsap.to(card, {
              scale: 0.94,
              transformOrigin: 'center top',
              ease: 'none',
              scrollTrigger: {
                trigger: cards[i + 1],
                start: 'top bottom',
                end: () => `top ${navOffset() + (i + 1) * 12}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
          })
        }

        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 72%',
            once: true,
            onEnter: () => {
              if (card.getBoundingClientRect().top < 0) return // jumped past via a nav link
              setOpen((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))
            },
          })
          ScrollTrigger.create({
            trigger: card,
            start: 'top 55%',
            end: 'bottom 55%',
            onToggle: (self) => {
              if (self.isActive) setActive(i)
              else if (i === 0 && self.direction < 0) setActive(-1)
            },
          })
        })
        if (!reduced()) {
          gsap
            .timeline({ scrollTrigger: { trigger: timeline, start: 'top 55%', end: 'bottom 55%', scrub: 0.5 } })
            .fromTo('[data-timeline-fill]', { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top center' }, 0)
            .fromTo('[data-timeline-head]', { top: '0%' }, { top: '100%', ease: 'none' }, 0)
        }
      }

      const mm = gsap.matchMedia()
      mm.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' }, (ctx) => {
        // Height with every role collapsed + the tallest role open
        const collapsed = cards.reduce((sum, c, i) => sum + c.offsetHeight - bodies[i].offsetHeight, 0)
        const gaps = 24 * (n - 1)
        const tallestBody = Math.max(...bodies.map((b) => b.scrollHeight))
        const h = collapsed + gaps + tallestBody
        // Stepper on any screen it fits (big phones in portrait can fit it too)
        if (h + navOffset() + 24 <= window.innerHeight) return pinnedMode(h)
        flowMode(!!ctx.conditions?.mobile)
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section id="experience" ref={ref} className="relative py-20 px-6 z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-12">
          <span data-reveal="left" className="font-mono text-accent-blue text-sm tracking-widest font-semibold">03.</span>
          <h2 data-reveal-title className="font-display font-bold text-3xl sm:text-4xl text-text-primary">Work Experience</h2>
          <div data-reveal-line className="flex-1 h-px bg-gradient-to-r from-accent-blue/30 to-transparent ml-4" />
        </div>

        {/* Stable wrapper so GSAP's pin-spacer never sits between React and its own nodes */}
        <div>
        <div data-timeline className="relative">
          {/* Vertical timeline: faint track + scroll-driven fill + glowing head */}
          <div className="absolute left-0 top-3 bottom-6 w-px ml-6 hidden md:block">
            <div className="absolute inset-0 bg-fg/10" />
            <div
              data-timeline-fill
              className="absolute inset-0 origin-top bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-blue"
            />
            <div
              data-timeline-head
              className="absolute -left-[3px] -mt-[3.5px] w-[7px] h-[7px] rounded-full bg-accent-cyan shadow-[0_0_12px_3px_rgb(var(--accent-cyan)/0.6)]"
            />
          </div>

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <ExperienceCard
                key={exp.company}
                exp={exp}
                index={i}
                isOpen={open.has(i)}
                isActive={active === i}
                isPassed={active > i}
                pinned={pinned}
                onToggle={() => toggleCard(i)}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({
  exp,
  index,
  isOpen,
  isActive,
  isPassed,
  pinned,
  onToggle,
}: {
  exp: Exp
  index: number
  isOpen: boolean
  isActive: boolean
  isPassed: boolean
  pinned: boolean
  onToggle: () => void
}) {
  const pinnedRef = useRef(pinned)
  pinnedRef.current = pinned
  const root = useRef<HTMLDivElement>(null)
  const prevOpen = useRef<boolean | null>(null)
  const techList = companyTech[exp.company] || []

  // Accordion driven by GSAP (height: 'auto' tween), then content staggers in.
  useGSAP(
    () => {
      const body = root.current?.querySelector<HTMLElement>('[data-exp-body]')
      const chevron = root.current?.querySelector<HTMLElement>('[data-exp-chevron]')
      if (!body || !chevron) return

      // First render (and strict-mode re-run): jump straight to the current state
      if (prevOpen.current === null || prevOpen.current === isOpen) {
        gsap.set(body, { height: isOpen ? 'auto' : 0, autoAlpha: isOpen ? 1 : 0 })
        gsap.set(chevron, { rotate: isOpen ? 180 : 0 })
        prevOpen.current = isOpen
        return
      }
      prevOpen.current = isOpen

      const reduced = window.matchMedia(REDUCED).matches
      const d = reduced ? 0 : 1
      // Flow mode: positions below this card change — re-measure once settled.
      // Pinned mode reserves fixed height, so no refresh needed (it would stutter the pin).
      const refresh = () => {
        if (!pinnedRef.current) ScrollTrigger.refresh()
      }

      gsap.to(chevron, { rotate: isOpen ? 180 : 0, duration: 0.5 * d, ease: 'back.out(2)' })

      if (isOpen) {
        gsap.to(body, { height: 'auto', autoAlpha: 1, duration: 0.7 * d, ease: 'power3.inOut', overwrite: true, onComplete: refresh })
        if (!reduced) {
          // fromTo (not from): explicit end values so a re-open mid-animation can never
          // "lock in" a half-transparent state and leave the content invisible
          gsap.fromTo(
            body.querySelectorAll('[data-exp-point]'),
            { x: -24, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, delay: 0.25, ease: 'power3.out', overwrite: true }
          )
          gsap.fromTo(
            body.querySelectorAll('[data-exp-tag]'),
            { y: 10, scale: 0.8, autoAlpha: 0 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 0.45, stagger: 0.04, delay: 0.45, ease: 'back.out(2.5)', overwrite: true }
          )
        }
      } else {
        gsap.to(body, { height: 0, autoAlpha: 0, duration: 0.45 * d, ease: 'power3.inOut', overwrite: true, onComplete: refresh })
      }
    },
    { dependencies: [isOpen], scope: root }
  )

  return (
    // Outer div: React-owned wrapper + scroll reveal. Inner div: may get pinned (stacking on
    // phones) — GSAP wraps it in a pin-spacer, so React must never remove it directly.
    <div data-reveal="left">
    <div ref={root} data-exp-card className="md:pl-16 relative">
      {/* Timeline dot: hollow → filled once passed → glowing while in focus */}
      <div className="hidden md:flex absolute left-0 top-6 w-[52px] justify-center items-center">
        <div className="relative flex items-center justify-center">
          {isActive && (
            <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-accent-blue opacity-50" />
          )}
          <span
            className={`relative rounded-full border-2 transition-all duration-500 ${
              isActive
                ? 'w-4 h-4 bg-accent-blue border-white dark:border-bg-card shadow-glow'
                : isPassed
                  ? 'w-3 h-3 bg-accent-blue/70 border-accent-blue/40'
                  : 'w-3 h-3 bg-bg-card border-text-muted/60'
            }`}
          />
        </div>
      </div>

      {/* Experience Card */}
      <div
        className={`relative rounded-2xl border overflow-hidden transition-[border-color,box-shadow,background-color,transform] duration-500 ${
          isActive
            ? 'border-accent-blue/50 bg-bg-card shadow-glow-sm md:translate-x-1'
            : isOpen
              ? 'border-accent-blue/25 bg-bg-card shadow-card'
              : 'border-fg/10 bg-bg-card/70 hover:border-accent-blue/20'
        }`}
      >
        {/* Step progress: fills while you scroll through this role (pinned mode) */}
        <span
          data-exp-progress
          className="absolute left-0 right-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-accent-blue to-accent-cyan"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Accent bar on the focused card */}
        <span
          className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent-blue to-accent-cyan origin-top transition-transform duration-500 ${
            isActive ? 'scale-y-100' : 'scale-y-0'
          }`}
        />

        {/* Header Button */}
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`exp-body-${index}`}
          className="w-full p-6 sm:p-7 flex items-start justify-between gap-4 text-left group"
        >
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <h3 className="font-display font-bold text-text-primary text-lg sm:text-xl group-hover:text-accent-blue transition-colors">
                {exp.title}
              </h3>
              {exp.current && (
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

          <div className="p-2 rounded-lg bg-fg/5 text-text-muted group-hover:text-accent-blue group-hover:bg-accent-blue/10 transition-colors mt-1 flex-shrink-0">
            <div data-exp-chevron>
              <FiChevronDown size={18} />
            </div>
          </div>
        </button>

        {/* Expandable Body (height animated by GSAP) */}
        <div data-exp-body id={`exp-body-${index}`} className="overflow-hidden" style={{ height: 0 }}>
          <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-4 border-t border-fg/5">
            <ul className="space-y-3 mb-5">
              {exp.points.map((pt, idx) => (
                <li
                  key={idx}
                  data-exp-point
                  className="flex items-start gap-3 text-text-secondary font-body text-sm leading-relaxed"
                >
                  <span className="mt-1 text-accent-blue flex-shrink-0">
                    <FiCheckCircle size={15} />
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {techList.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <span className="font-mono text-xs text-text-muted mr-1">Stack:</span>
                {techList.map((tech) => (
                  <span
                    key={tech}
                    data-exp-tag
                    className="px-2.5 py-0.5 rounded-md bg-accent-blue/8 border border-accent-blue/15 text-accent-blue font-mono text-[11px] hover:bg-accent-blue hover:text-white transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
