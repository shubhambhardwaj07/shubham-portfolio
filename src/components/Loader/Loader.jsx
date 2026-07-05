import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Loader.css'

/* ═══════════════════════════════════════════════════════
   LOADER — two-tone box field (lamalama, GRID_SIZE=16)
   No media in the loader — the landing owns the photo.
   While loading: 16px boxes shimmer to life progressively
   WITH the counter — a live two-tone field (their u_theme
   / u_theme_second trick), breathing with noise.
   At 100%: the counter exits and the whole field melts
   box by box into the landing; the hero text rises
   through the clearing boxes.
   onReveal  → ~40% into the melt (hero entrance)
   onComplete → after the last box (unmount)
═══════════════════════════════════════════════════════ */

const CELL = 16 // box size — lamalama's GRID_SIZE

export default function Loader({ onReveal, onComplete }) {
  const rootRef   = useRef(null)
  const canvasRef = useRef(null)
  const firedReveal = useRef(false)
  const firedDone   = useRef(false)

  useEffect(() => {
    const root   = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    const ctx2d = canvas.getContext('2d')

    /* Preload the hero photo so the landing reveals complete */
    const photo = new Image()
    photo.src = '/profile.png'

    let tickFn = null // ticker callback — removed on unmount/complete

    const ctx = gsap.context(() => {
      let W = window.innerWidth
      let H = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

      /* ── Field tones — bg + a near-bg second tone ── */
      const probe = document.createElement('canvas')
      const probeCtx = probe.getContext('2d')

      const parseColor = (css) => {
        probeCtx.fillStyle = '#000'
        probeCtx.fillStyle = css
        const v = probeCtx.fillStyle // normalized: #rrggbb or rgba()
        if (v.startsWith('#')) {
          return [parseInt(v.slice(1, 3), 16), parseInt(v.slice(3, 5), 16), parseInt(v.slice(5, 7), 16)]
        }
        const m = v.match(/[\d.]+/g)
        return m ? [+m[0], +m[1], +m[2]] : [28, 28, 30]
      }

      const clampByte = (v) => (v < 0 ? 0 : v > 255 ? 255 : v)
      let field = 'rgb(28,28,30)'
      let palette = ['rgb(36,36,39)'] // dot shades — static texture, all above field
      const refreshTones = () => {
        const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#1c1c1e'
        const [r, g, b] = parseColor(bg)
        const light = document.documentElement.getAttribute('data-theme') === 'light'
        const shift = light ? -16 : 14 // dot tone: visible, still quiet
        field = `rgb(${r},${g},${b})`
        /* subtle per-cell brightness variation for texture — never dips
           to field, so a lit dot always stays clearly a dot */
        palette = [-5, -1, 3, 7].map((dv) =>
          `rgb(${clampByte(r + shift + dv)},${clampByte(g + shift + dv)},${clampByte(b + shift + dv)})`
        )
      }
      refreshTones()

      /* ── Cell grid ── */
      let cols = 0, rows = 0
      let randIn = null    // activation threshold (build order)
      let randOut = null   // dissolve threshold (the melt)
      let cellShade = null // fixed palette index per cell — static texture

      const seedCells = () => {
        cols = Math.ceil(W / CELL)
        rows = Math.ceil(H / CELL)
        const n = cols * rows
        randIn = new Float32Array(n)
        randOut = new Float32Array(n)
        cellShade = new Uint8Array(n)
        for (let i = 0; i < n; i++) {
          randIn[i] = Math.random()
          randOut[i] = Math.random()
          cellShade[i] = (Math.random() * 4) | 0
        }
      }

      const sizeCanvas = () => {
        W = window.innerWidth
        H = window.innerHeight
        canvas.width = Math.round(W * dpr)
        canvas.height = Math.round(H * dpr)
        ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)
        seedCells()
      }
      sizeCanvas()

      /* ── Render — dots only ever appear, never revert ── */
      const state = { p: 0 }   // counter progress 0..100
      const anim  = { d: 0 }   // dissolve 0..1

      const render = () => {
        ctx2d.clearRect(0, 0, W, H)
        if (anim.d >= 1) return

        const act = state.p / 100 // monotonic — a lit dot stays lit
        const d = anim.d

        for (let i = 0; i < randIn.length; i++) {
          if (randOut[i] < d) continue // melted — landing shows through
          ctx2d.fillStyle = randIn[i] < act ? palette[cellShade[i]] : field
          const x = (i % cols) * CELL
          const y = ((i / cols) | 0) * CELL
          ctx2d.fillRect(x, y, CELL, CELL)
        }
      }

      /* re-render each frame so the melt animates smoothly */
      const tick = () => render()
      tickFn = tick
      gsap.ticker.add(tick)

      const onResize = () => { sizeCanvas(); render() }
      window.addEventListener('resize', onResize)

      /* ── Intro — counter + meta arrive ── */
      gsap.set('.ld-mask > span', { yPercent: 120 })
      gsap.timeline().to('.ld-mask > span', {
        yPercent: 0, duration: 0.85, stagger: 0.06, ease: 'expo.out',
      }, 0.15)

      /* ── Progress: ease to 90, wait for the photo, close to 100 ── */
      const counterEl = root.querySelector('.ld-count-val')
      const renderCount = () => {
        if (counterEl) counterEl.textContent = String(Math.round(state.p)).padStart(3, '0')
      }

      gsap.to(state, {
        p: 90, duration: 1.35, ease: 'power2.out', delay: 0.25,
        onUpdate: renderCount,
        onComplete: waitForImage,
      })

      function waitForImage() {
        if (photo.complete) finishCount()
        else gsap.delayedCall(0.1, waitForImage)
      }

      function finishCount() {
        gsap.to(state, {
          p: 100, duration: 0.32, ease: 'power2.out',
          onUpdate: renderCount,
          onComplete: exit,
        })
      }

      /* ── Exit — the melt ── */
      function exit() {
        window.removeEventListener('resize', onResize)
        refreshTones()

        const tl = gsap.timeline()

        /* Counter + meta leave through their masks — snappy */
        tl.to('.ld-mask > span', {
          yPercent: -120, duration: 0.42, stagger: 0.035, ease: 'power4.in',
        }, 0)

        /* The field melts box by box — quick, even merge.
           Root bg goes transparent so cleared cells reveal
           the landing beneath. */
        tl.set(root, { backgroundColor: 'transparent' }, 0.28)
        tl.to(anim, {
          d: 1, duration: 1.25, ease: 'power2.inOut',
        }, 0.28)

        /* Hero text rises through the clearing boxes —
           ~40% into the melt */
        tl.add(() => {
          if (!firedReveal.current) {
            firedReveal.current = true
            onReveal?.()
          }
        }, 0.78)

        tl.add(() => {
          if (!firedDone.current) {
            firedDone.current = true
            if (tickFn) { gsap.ticker.remove(tickFn); tickFn = null }
            document.documentElement.style.overflow = prevOverflow
            onComplete?.()
          }
        }, 1.65)
      }
    }, root)

    return () => {
      if (tickFn) { gsap.ticker.remove(tickFn); tickFn = null }
      document.documentElement.style.overflow = prevOverflow
      ctx.revert()
    }
    /* Mount-once by design: re-running on parent re-renders would
       kill the exit sequence mid-flight. Callbacks only call setState. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="ld-root" ref={rootRef}>

      {/* The field — two-tone boxes, live from 001% */}
      <canvas ref={canvasRef} className="ld-px" aria-hidden="true" />

      {/* Corner meta */}
      <div className="ld-meta ld-tl">
        <span className="ld-mask"><span>Shubham Bhardwaj</span></span>
      </div>
      <div className="ld-meta ld-tr">
        <span className="ld-mask"><span>Portfolio — ©2026</span></span>
      </div>
      <div className="ld-meta ld-bl">
        <span className="ld-mask"><span>( Loading the good parts )</span></span>
      </div>

      {/* Giant counter */}
      <div className="ld-count">
        <span className="ld-mask">
          <span>
            <span className="ld-count-val">000</span>
            <sup className="ld-count-pct">%</sup>
          </span>
        </span>
      </div>

    </div>
  )
}
