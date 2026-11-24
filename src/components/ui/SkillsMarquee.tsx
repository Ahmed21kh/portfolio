'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from '@/lib/gsap'

/**
 * Two infinite rows of skills drifting in opposite directions.
 * Scroll velocity speeds them up, and scrolling up flips their direction.
 */
export default function SkillsMarquee({ rows }: { rows: string[][] }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const tracks = gsap.utils.toArray<HTMLElement>('[data-marquee-track]')
        // Each track holds its items twice, so moving -50% loops seamlessly
        const loops = tracks.map((track, i) =>
          gsap.fromTo(
            track,
            { xPercent: i % 2 ? -50 : 0 },
            { xPercent: i % 2 ? 0 : -50, duration: 40 + i * 8, ease: 'none', repeat: -1 }
          )
        )
        // start deep inside the repeats so a negative timeScale (scrolling up) never hits time 0
        loops.forEach((loop) => loop.totalTime(loop.duration() * 1000))

        let direction = 1
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            if (self.direction !== direction) direction = self.direction
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6)
            loops.forEach((loop) => {
              gsap.to(loop, { timeScale: boost * direction, duration: 0.2, overwrite: true })
              // ease back to cruising speed once scrolling stops
              gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.2, ease: 'power2.out' })
            })
          },
        })

        // Pause hovered row so people can actually read it
        const pause = (i: number, on: boolean) =>
          gsap.to(loops[i], { timeScale: on ? 0 : direction, duration: 0.5, overwrite: true })
        const handlers = tracks.map((t, i) => {
          const enter = () => pause(i, true)
          const leave = () => pause(i, false)
          t.addEventListener('pointerenter', enter)
          t.addEventListener('pointerleave', leave)
          return () => {
            t.removeEventListener('pointerenter', enter)
            t.removeEventListener('pointerleave', leave)
          }
        })

        return () => {
          st.kill()
          handlers.forEach((off) => off())
        }
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <div ref={root} className="marquee-mask relative -mx-6 mb-10 space-y-3 overflow-hidden py-1" aria-hidden="true">
      {rows.map((items, r) => (
        <div key={r} data-marquee-track className="flex w-max gap-3">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 font-mono text-xs transition-colors duration-200 cursor-default ${
                r % 2
                  ? 'border-accent-cyan/20 bg-accent-cyan/5 text-text-secondary hover:border-accent-cyan/60 hover:text-accent-cyan'
                  : 'border-accent-blue/20 bg-accent-blue/5 text-text-secondary hover:border-accent-blue/60 hover:text-accent-blue'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${r % 2 ? 'bg-accent-cyan' : 'bg-accent-blue'}`} />
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
