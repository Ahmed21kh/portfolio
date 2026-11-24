'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, REDUCED } from '@/lib/gsap'

type Dot = { ox: number; oy: number; x: number; y: number; vx: number; vy: number }
type Ripple = { x: number; y: number; r: number; life: number }

const SPACING = 34 // px between dots (desktop; tighter on phones)
const RADIUS = 170 // cursor influence radius (desktop; smaller on phones)
const PUSH = 26 // max displacement near the cursor
const SPRING = 0.08 // pull back to rest position
const DAMPING = 0.82 // velocity friction

/**
 * Canvas dot-grid behind the hero. Dots near the cursor are pushed away, glow in the
 * accent colour and link into a small "net"; clicking sends a ripple across the grid.
 * Pauses when the hero is off-screen; static for reduced-motion users.
 */
export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia(REDUCED).matches
    let dots: Dot[] = []
    let cols = 0
    let rows = 0
    let w = 0
    let h = 0
    let spacing = SPACING
    let radius = RADIUS
    const mouse = { x: -9999, y: -9999, active: false }
    const ripples: Ripple[] = []

    // Touch screens have no hover: a "ghost cursor" wanders the grid on its own,
    // and a real finger takes over whenever the user touches/drags.
    const touchOnly = window.matchMedia('(hover: none)').matches
    const ghost = { x: 0, y: 0 }
    let lastTouch = 0

    // Theme colours come from CSS variables ("37 99 235") so light/dark both work
    let accent = '37 99 235'
    let fg = '255 255 255'
    const readColors = () => {
      const css = getComputedStyle(document.documentElement)
      accent = css.getPropertyValue('--accent-blue').trim() || accent
      fg = css.getPropertyValue('--fg').trim() || fg
    }
    readColors()
    const themeObserver = new MutationObserver(() => {
      readColors()
      if (reduced) draw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Phones: denser grid, smaller influence area (a fingertip covers less than a big screen)
      const small = w < 640
      spacing = small ? 28 : SPACING
      radius = small ? 115 : RADIUS

      cols = Math.ceil(w / spacing) + 1
      rows = Math.ceil(h / spacing) + 1
      const offX = (w - (cols - 1) * spacing) / 2
      const offY = (h - (rows - 1) * spacing) / 2
      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offX + c * spacing
          const y = offY + r * spacing
          dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 })
        }
      }
    }

    // 0 → far from cursor, 1 → right under it
    const proximity = (d: Dot) => {
      if (!mouse.active) return 0
      const dist = Math.hypot(d.ox - mouse.x, d.oy - mouse.y)
      return dist < radius ? 1 - dist / radius : 0
    }

    const step = () => {
      // advance ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].r += 9
        ripples[i].life -= 0.018
        if (ripples[i].life <= 0) ripples.splice(i, 1)
      }

      for (const d of dots) {
        let ax = (d.ox - d.x) * SPRING
        let ay = (d.oy - d.y) * SPRING

        if (mouse.active) {
          const dx = d.x - mouse.x
          const dy = d.y - mouse.y
          const dist = Math.hypot(dx, dy) || 1
          if (dist < radius) {
            const f = (1 - dist / radius) ** 2 * PUSH * 0.12
            ax += (dx / dist) * f
            ay += (dy / dist) * f
          }
        }

        for (const rp of ripples) {
          const dx = d.ox - rp.x
          const dy = d.oy - rp.y
          const dist = Math.hypot(dx, dy) || 1
          const band = Math.abs(dist - rp.r)
          if (band < 40) {
            const f = (1 - band / 40) * rp.life * 3
            ax += (dx / dist) * f
            ay += (dy / dist) * f
          }
        }

        d.vx = (d.vx + ax) * DAMPING
        d.vy = (d.vy + ay) * DAMPING
        d.x += d.vx
        d.y += d.vy
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // 1. "net" lines between neighbouring dots near the cursor
      if (mouse.active) {
        ctx.lineWidth = 1
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const d = dots[r * cols + c]
            const p = proximity(d)
            if (p <= 0) continue
            const right = c + 1 < cols ? dots[r * cols + c + 1] : null
            const down = r + 1 < rows ? dots[(r + 1) * cols + c] : null
            ctx.strokeStyle = `rgb(${accent} / ${p * 0.45})`
            ctx.beginPath()
            if (right) {
              ctx.moveTo(d.x, d.y)
              ctx.lineTo(right.x, right.y)
            }
            if (down) {
              ctx.moveTo(d.x, d.y)
              ctx.lineTo(down.x, down.y)
            }
            ctx.stroke()
          }
        }
      }

      // 2. dots — faint everywhere, bright & larger near the cursor / ripple
      for (const d of dots) {
        const p = proximity(d)
        const moved = Math.min(1, Math.hypot(d.x - d.ox, d.y - d.oy) / PUSH)
        const glow = Math.max(p, moved)
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.1 + glow * 1.6, 0, Math.PI * 2)
        ctx.fillStyle = glow > 0.02 ? `rgb(${accent} / ${0.25 + glow * 0.75})` : `rgb(${fg} / 0.12)`
        ctx.fill()
      }
    }

    const tick = () => {
      // idle touch device → let the ghost cursor drive the effect
      if (touchOnly && performance.now() - lastTouch > 1500) {
        mouse.x = ghost.x
        mouse.y = ghost.y
        mouse.active = true
      }
      step()
      draw()
    }

    // Pointer is tracked on window because the hero content sits above the canvas
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= w && mouse.y <= h
      if (e.pointerType !== 'mouse') lastTouch = performance.now()
    }
    const onLeave = () => {
      mouse.active = false
    }
    const onClick = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && y >= 0 && x <= w && y <= h) {
        ripples.push({ x, y, r: 0, life: 1 })
        if (e.pointerType !== 'mouse') {
          // a tap also pulls the effect to the finger
          mouse.x = x
          mouse.y = y
          mouse.active = true
          lastTouch = performance.now()
        }
      }
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        build()
        draw()
      }, 150)
    }

    build()
    draw()
    window.addEventListener('resize', onResize)

    if (reduced) {
      return () => {
        window.removeEventListener('resize', onResize)
        themeObserver.disconnect()
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onClick, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    // Ghost cursor: drifts between random points; every few seconds it drops a ripple
    let ghostTween: gsap.core.Tween | null = null
    let ghostRipples: gsap.core.Tween | null = null
    if (touchOnly) {
      ghost.x = w / 2
      ghost.y = h * 0.4
      const wander = () => {
        ghostTween = gsap.to(ghost, {
          x: gsap.utils.random(w * 0.12, w * 0.88),
          y: gsap.utils.random(h * 0.1, h * 0.8),
          duration: gsap.utils.random(2.2, 3.6),
          ease: 'sine.inOut',
          onComplete: wander,
        })
      }
      wander()
      const autoRipple = () => {
        if (performance.now() - lastTouch > 1500) ripples.push({ x: ghost.x, y: ghost.y, r: 0, life: 0.7 })
        ghostRipples = gsap.delayedCall(gsap.utils.random(3.5, 5.5), autoRipple)
      }
      ghostRipples = gsap.delayedCall(2.5, autoRipple)
    }

    // Only run the animation loop while the hero is on screen
    let running = false
    const start = () => {
      if (!running) gsap.ticker.add(tick)
      running = true
    }
    const stop = () => {
      if (running) gsap.ticker.remove(tick)
      running = false
    }
    const st = ScrollTrigger.create({
      trigger: canvas,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? start() : stop()),
    })
    if (st.isActive) start()

    return () => {
      stop()
      st.kill()
      ghostTween?.kill()
      ghostRipples?.kill()
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onClick)
      document.removeEventListener('pointerleave', onLeave)
      themeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,black_35%,transparent_100%)]"
    />
  )
}
