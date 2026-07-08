import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

/* ── DATA — the person, not the résumé.
   Career history lives in 04 Experience, clients in
   03 Work, tools in 02 Expertise, the channel in 05.
   Nothing here repeats them. ── */

const STATS = [
  { num: 7,  suf: '+', label: 'Years' },
  { num: 50, suf: '+', label: 'Projects' },
  { num: 8,  suf: '+', label: 'Teams led' },
  { num: 95, suf: '',  label: 'Lighthouse' },
]

const CHIPS = ['Systems thinker', 'Detail obsessive', 'Calm under deadlines']

const PRINCIPLES = [
  {
    idx: '01',
    title: 'Decouple by default',
    copy: 'Small, independently shippable pieces. Team A should never wait on Team B’s deploy.',
    tag: 'Architecture',
  },
  {
    idx: '02',
    title: 'Tests before trust',
    copy: 'If it isn’t covered, it isn’t done. Banking floors taught me that the hard way.',
    tag: 'Discipline',
  },
  {
    idx: '03',
    title: 'Budget the milliseconds',
    copy: 'Performance is a spec, not a hope — measured, budgeted, defended in review.',
    tag: 'Speed',
  },
  {
    idx: '04',
    title: 'Motion means something',
    copy: 'Animation is information: hierarchy, causality, state. Never garnish.',
    tag: 'Feel',
  },
]

const GUARANTEES = [
  {
    idx: '01',
    title: 'Interfaces that explain themselves',
    note: 'If it needs a tutorial, it isn’t finished. Clarity is the deliverable.',
  },
  {
    idx: '02',
    title: 'Code your next hire can read',
    note: 'Written for the maintainer, not the author. Six-months-later me is a stakeholder too.',
  },
  {
    idx: '03',
    title: 'Boring deploys',
    note: 'Feature-flagged, tested, reversible. Excitement belongs in the UI, not the release.',
  },
  {
    idx: '04',
    title: 'Straight answers',
    note: 'Honest estimates, early red flags — consulting habits that outlive the contract.',
  },
]

const RECORD_COLS = [
  {
    label: 'Credentials',
    rows: [
      { text: 'Azure Fundamentals — AZ-900' },
      { text: 'Azure Developer — AZ-204' },
      { text: 'AI Prompt Engineering' },
    ],
  },
  {
    label: 'Firsts',
    rows: [
      { text: 'First production ship — 2019' },
      { text: 'First MFE migration — 2021' },
      { text: 'First team led — 2022' },
    ],
  },
  {
    label: 'Elsewhere in this site',
    rows: [
      { text: 'The client work', href: '#projects',   num: '03' },
      { text: 'The full history', href: '#experience', num: '04' },
      { text: 'The channel', href: '#youtube',         num: '05' },
    ],
  },
]

/* Split a string into char spans (award-style kinetic type) */
function Chars({ text }) {
  return (
    <span className="abh-chsplit" aria-label={text}>
      {text.split('').map((c, i) => (
        <span className="abh-ch-mask" key={i} aria-hidden="true">
          <span className="abh-ch">{c === ' ' ? ' ' : c}</span>
        </span>
      ))}
    </span>
  )
}

/* ── COMPONENT ── */
export default function About() {
  const sectionRef = useRef(null)
  const stageRef   = useRef(null)   // pinned viewport
  const trackRef   = useRef(null)   // horizontal track
  const counterRef = useRef(null)

  /* Stats countup — guarded per effect run, NOT by a ref:
     StrictMode reverts kill tweens from the first run, so
     the second run must be able to fire again. */
  const runCountup = () => {
    sectionRef.current?.querySelectorAll('.abh-stat-val').forEach((el, i) => {
      const proxy = { n: 0 }
      gsap.to(proxy, {
        n: STATS[i].num, duration: 1.8, ease: 'power3.out', snap: { n: 1 },
        delay: i * 0.08,
        onUpdate() { el.textContent = proxy.n },
      })
    })
  }

  /* ═══════════════════════════════════════════════
     1. HORIZONTAL CINEMA — desktop pins the stage and
     drags the 4-page manual sideways on scroll.
  ═══════════════════════════════════════════════ */
  useEffect(() => {
    const mm = gsap.matchMedia()
    let counted = false
    const fireCountup = () => {
      if (counted) return
      counted = true
      runCountup()
    }

    mm.add('(min-width: 861px)', () => {
      const track = trackRef.current
      const panels = gsap.utils.toArray('.abh-panel', track)
      const shift = -(100 * (panels.length - 1) / panels.length) // -75 for 4

      /* Clear any stale inline styles from a breakpoint crossing */
      panels.forEach(p => gsap.set(p.querySelectorAll('.abh-rev'), { clearProps: 'all' }))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: '+=320%',
          pin: true,
          scrub: 0.75,
          anticipatePin: 1,
          onUpdate(self) {
            const i = Math.min(panels.length, Math.floor(self.progress * panels.length) + 1)
            if (counterRef.current) counterRef.current.textContent = `0${i}`
            if (self.progress > 0.7) fireCountup()
          },
        },
        defaults: { ease: 'none' },
      })

      tl.to(track, { xPercent: shift, duration: 4 }, 0)

      /* Hint hands over to coordinates once the ride starts (scrub-reversible) */
      tl.to('.abh-hint',   { opacity: 0, duration: 0.25 }, 0.22)
      tl.to('.abh-coords', { opacity: 1, duration: 0.25 }, 0.42)

      /* Choreographed to the ride: each arriving page's content
         cascades in while the track carries it to center */
      panels.forEach((panel, i) => {
        if (i === 0) return

        const num = panel.querySelector('.abh-panel-num')
        if (num) {
          tl.fromTo(num, { xPercent: 46 }, { xPercent: -18, duration: 2 }, i - 1)
        }

        tl.fromTo(panel.querySelectorAll('.abh-rev'),
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.42, stagger: 0.05, ease: 'power2.out' },
          i - 1 + 0.42
        )
      })

      /* Progress rail */
      tl.to('.abh-rail-fill', { scaleX: 1, duration: 4 }, 0)

      return () => {}
    })

    mm.add('(max-width: 860px)', () => {
      /* Page 1 is handled by the char-split entrance; reveal pages 2-4 */
      gsap.utils.toArray('.abh-panel:not(.abh-p1)', trackRef.current).forEach((panel) => {
        const els = panel.querySelectorAll('.abh-rev')
        gsap.set(els, { clearProps: 'all' })
        gsap.set(els, { y: 26, opacity: 0 })
        gsap.to(els, {
          y: 0, opacity: 1, duration: 0.75, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 78%', once: true },
        })
      })

      ScrollTrigger.create({
        trigger: '.abh-p4', start: 'top 80%', once: true,
        onEnter: fireCountup,
      })
    })

    return () => mm.revert()
  }, [])

  /* ═══════════════════════════════════════════════
     2. PAGE ONE — char-split kinetic headline
  ═══════════════════════════════════════════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.abh-ch', { yPercent: 120, rotate: 5 })
      gsap.set('.abh-p1 .abh-kicker', { y: 18, opacity: 0 })
      gsap.set('.abh-p1 .abh-sub',    { y: 22, opacity: 0 })
      gsap.set('.abh-chip',           { y: 14, opacity: 0 })
      gsap.set('.abh-spec',           { y: 26, opacity: 0 })
      gsap.set('.abh-hint',           { opacity: 0 })
      gsap.set('.abh-progress',       { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 74%', once: true },
      })

      tl.to('.abh-p1 .abh-kicker', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0)
      tl.to('.abh-ch', {
        yPercent: 0, rotate: 0,
        duration: 1.1, ease: 'expo.out',
        stagger: { each: 0.018, from: 'start' },
      }, 0.12)
      tl.to('.abh-p1 .abh-sub', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.7)
      tl.to('.abh-chip', { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out' }, 0.85)
      tl.to('.abh-spec', { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }, 0.6)
      tl.to('.abh-hint',     { opacity: 1, duration: 0.7 }, 1.05)
      tl.to('.abh-progress', { opacity: 1, duration: 0.7 }, 1.05)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ── RENDER ── */
  return (
    <section id="about" className="abh-section" ref={sectionRef}>

      <div className="abh-stage" ref={stageRef}>
        <div className="section-grid" aria-hidden="true" />

        <div className="abh-track" ref={trackRef}>

          {/* ═══ PAGE 01 — the cover ═══ */}
          <div className="abh-panel abh-p1">
            <div className="abh-panel-in">
              <span className="abh-kicker">
                <span className="section-label-num">01</span>&nbsp;&nbsp;About — the user manual
              </span>

              <h2 className="abh-h1">
                <span className="abh-h1-line"><Chars text="ENGINEER OF" /></span>
                <span className="abh-h1-line"><Chars text="INTERFACES." /></span>
              </h2>

              <p className="abh-sub">
                The résumé lives in the sections below — work, stack, history.
                This page is the part it can&apos;t hold: how I think, what I
                optimize for, and what you get when we work together.
              </p>

              <div className="abh-chips">
                {CHIPS.map((c) => (
                  <span className="abh-chip" key={c}>{c}</span>
                ))}
              </div>
            </div>

            {/* Manual meta card */}
            <aside className="abh-spec">
              <span className="abh-spec-head">
                <span className="abh-spec-dot" aria-hidden="true" />
                User manual
              </span>
              <span className="abh-spec-role">Shubham Bhardwaj — operating notes</span>
              <span className="abh-spec-org">Version 7.1 · 2026 edition</span>
              <span className="abh-spec-loc">Four pages · reads sideways</span>
            </aside>

            <span className="abh-hint" aria-hidden="true">
              The story moves sideways
              <svg width="26" height="10" viewBox="0 0 26 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="0" y1="5" x2="24" y2="5" />
                <polyline points="20 1 24 5 20 9" />
              </svg>
            </span>
            <span className="abh-coords" aria-hidden="true">12.9716° N — 77.5946° E · BLR</span>
          </div>

          {/* ═══ PAGE 02 — how I work ═══ */}
          <div className="abh-panel abh-p2">
            <span className="abh-panel-num" aria-hidden="true">02</span>
            <div className="abh-panel-in abh-p2-grid">
              <div className="abh-p2-left">
                <span className="abh-kicker abh-tab abh-rev">Page 02 — how I work</span>
                <h3 className="abh-h2 abh-rev">Principles,<br />then tools.</h3>
                <p className="abh-p2-note abh-rev">
                  The stack changes every year. These don&apos;t —
                  they&apos;re what the tools are for.
                </p>

                {/* Non-negotiables mini-plate — fills the left column */}
                <div className="abh-mini abh-rev">
                  <div className="abh-mini-head">
                    <span>Non-negotiables</span>
                    <span className="abh-mini-count">04</span>
                  </div>
                  <div className="abh-mini-bar"><i /></div>
                  <p className="abh-mini-note">
                    Every tool choice answers to these four. When they
                    conflict, the principle wins — not the trend.
                  </p>
                </div>
              </div>

              <div className="abh-craft-grid">
                {PRINCIPLES.map((c) => (
                  <div className="abh-craft-card abh-rev" key={c.idx}>
                    <span className="abh-craft-ghost" aria-hidden="true">{c.idx}</span>
                    <div className="abh-craft-top">
                      <span className="abh-craft-idx">{c.idx}</span>
                      <span className="abh-craft-tags">{c.tag}</span>
                    </div>
                    <span className="abh-craft-title">{c.title}</span>
                    <p className="abh-craft-copy">{c.copy}</p>
                    <span className="abh-craft-edge" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ PAGE 03 — what you get ═══ */}
          <div className="abh-panel abh-p3">
            <span className="abh-panel-num" aria-hidden="true">03</span>
            <div className="abh-panel-in abh-p3-wrap">
              <div className="abh-p3-head">
                <span className="abh-kicker abh-tab abh-rev">Page 03 — the guarantees</span>
                <h3 className="abh-h2 abh-h2-wide abh-rev">What you actually get.</h3>
              </div>

              <div className="abh-p3-body">
                <div className="abh-p3-left">
                  <div className="abh-path">
                    {GUARANTEES.map((g) => (
                      <div className="abh-path-stop abh-rev" key={g.idx}>
                        <span className="abh-path-idx">{g.idx}</span>
                        <span className="abh-path-check" aria-hidden="true">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"
                            stroke="currentColor" strokeWidth="1.6">
                            <polyline points="2 7.5 5.5 11 12 3.5" />
                          </svg>
                        </span>
                        <div className="abh-path-main">
                          <span className="abh-path-firm">{g.title}</span>
                          <span className="abh-path-note">{g.note}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="abh-path-foot abh-rev">
                    04 guarantees · 00 asterisks
                  </span>
                </div>

                {/* Service-guarantee seal — fills the right half */}
                <aside className="abh-seal abh-rev" aria-hidden="true">
                <div className="abh-seal-frame">
                  <div className="abh-seal-top">
                    <span>Service</span>
                    <span className="abh-seal-star">✦</span>
                    <span>Warranty</span>
                  </div>
                  <div className="abh-seal-mark">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="13 24.5 21 33 36 16" />
                    </svg>
                  </div>
                  <div className="abh-seal-body">
                    <span className="abh-seal-line">Honoured for the</span>
                    <span className="abh-seal-line abh-seal-strong">life of the engagement</span>
                  </div>
                  <div className="abh-seal-barcode" />
                  <div className="abh-seal-foot">
                    <span>SB · 2026</span>
                    <span>REF · G04</span>
                  </div>
                </div>
                </aside>
              </div>
            </div>
          </div>

          {/* ═══ PAGE 04 — the record ═══ */}
          <div className="abh-panel abh-p4">
            <span className="abh-panel-num" aria-hidden="true">04</span>
            <div className="abh-panel-in">
              <span className="abh-kicker abh-tab abh-rev">Page 04 — the record</span>

              <div className="abh-stats abh-rev">
                {STATS.map((s, i) => (
                  <div className="abh-stat" key={i}>
                    <span className="abh-stat-num">
                      <span className="abh-stat-val">0</span>{s.suf}
                    </span>
                    <span className="abh-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="abh-record-grid">
                {RECORD_COLS.map((col) => (
                  <div className="abh-record-col abh-rev" key={col.label}>
                    <span className="abh-record-label">{col.label}</span>
                    {col.rows.map((r) =>
                      r.href ? (
                        <a className="abh-record-row abh-record-link" href={r.href} key={r.text} data-hover>
                          <span>{r.text}</span>
                          <span className="abh-record-num">{r.num} →</span>
                        </a>
                      ) : (
                        <span className="abh-record-row" key={r.text}>{r.text}</span>
                      )
                    )}
                  </div>
                ))}
              </div>

              <span className="abh-signoff abh-rev">
                — End of manual. Everything below is proof.
              </span>

              <div className="abh-cta-row abh-rev">
                <a href="#contact" className="btn-primary abh-cta" data-hover>
                  Start a conversation
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ═══ PROGRESS — counter + rail ═══ */}
        <div className="abh-progress" aria-hidden="true">
          <span className="abh-counter"><span ref={counterRef}>01</span>&nbsp;/&nbsp;04</span>
          <div className="abh-rail"><div className="abh-rail-fill" /></div>
        </div>
      </div>

    </section>
  )
}
