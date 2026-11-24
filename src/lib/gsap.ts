'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
  gsap.defaults({ ease: 'power3.out', duration: 0.8 })
  // Mobile browsers resize the viewport when the address bar shows/hides while scrolling.
  // Ignoring those height-only resizes stops pinned sections from jumping on phones.
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const REDUCED = '(prefers-reduced-motion: reduce)'

/** Space taken by the fixed navbar (+ breathing room) — pinned content starts below it. */
export const navOffset = () => (document.querySelector('header')?.offsetHeight ?? 64) + 12

export { gsap, ScrollTrigger, SplitText, useGSAP }
