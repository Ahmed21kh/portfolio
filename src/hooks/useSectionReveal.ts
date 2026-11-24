'use client'

import { RefObject } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from '@/lib/gsap'

/**
 * Scroll-driven reveal for a section. Mark elements inside `scope` with:
 *
 *  data-reveal-title          → h2 split into characters, rising from a mask
 *  data-reveal-line           → divider line drawn from left to right
 *  data-reveal="up|left|right|scale"  → fade + move in (batched & staggered)
 *  data-count="4"             → number counts up from 0 (suffix kept from text)
 *
 * Elements are only hidden from JS (never by CSS), so content stays visible
 * if JS fails, and reduced-motion users get the final state immediately.
 */
export function useSectionReveal(scope: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(scope)

        // 1. Section titles — split characters rising out of a mask
        q('[data-reveal-title]').forEach((title: HTMLElement) => {
          SplitText.create(title, {
            type: 'chars,words',
            mask: 'words',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.chars, {
                yPercent: 110,
                rotate: 6,
                duration: 0.9,
                stagger: 0.025,
                ease: 'expo.out',
                scrollTrigger: { trigger: title, start: 'top 85%', once: true },
              }),
          })
        })

        // 2. Divider lines draw in
        q('[data-reveal-line]').forEach((line: HTMLElement) => {
          gsap.from(line, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: line, start: 'top 85%', once: true },
          })
        })

        // 3. Generic reveals, batched so items entering together stagger nicely
        // Shorter travel on phones: less sideways overflow and it feels snappier on small screens
        const small = window.innerWidth < 640
        const offsets: Record<string, gsap.TweenVars> = {
          up: { y: small ? 28 : 40 },
          left: { x: small ? -24 : -50 },
          right: { x: small ? 24 : 50 },
          scale: { scale: small ? 0.96 : 0.92, y: 20 },
        }
        const items = q('[data-reveal]') as HTMLElement[]
        items.forEach((el) => {
          const dir = el.dataset.reveal || 'up'
          // transition:none — Tailwind `transition-all` would otherwise smear every GSAP frame
          gsap.set(el, { autoAlpha: 0, transition: 'none', ...(offsets[dir] ?? offsets.up) })
        })
        ScrollTrigger.batch(items, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.09,
              ease: 'power3.out',
              overwrite: true,
              // hand control back to CSS so hover transforms/transitions work again
              clearProps: 'transform,transition',
            }),
        })

        // 4. Count-up numbers
        const counters: [HTMLElement, string][] = []
        q('[data-count]').forEach((el: HTMLElement) => {
          const target = parseFloat(el.dataset.count || '0')
          const suffix = el.textContent?.replace(/^[\d.]+/, '') ?? ''
          const counter = { val: 0 }
          counters.push([el, target + suffix])
          el.textContent = '0' + suffix
          gsap.to(counter, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => {
              el.textContent = Math.round(counter.val) + suffix
            },
          })
        })

        // text isn't a tracked GSAP prop, so restore final values on revert
        return () => counters.forEach(([el, text]) => (el.textContent = text))
      })

      return () => mm.revert()
    },
    { scope }
  )
}
