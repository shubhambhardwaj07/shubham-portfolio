import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

/* ── DATA — three disciplines, stacked ── */
const DECK = [
  {
    id: 'core',
    num: '01',
    title: 'Frontend Core',
    line: 'The daily drivers — where the last seven years live.',
    meta: '04 tools · 23 yrs combined',
    foot: 'Shipped at TCS · Publicis Sapient · Thoughtworks',
    serial: 'SER. SB·26·C01',
    skills: [
      { name: 'React',       role: 'UI framework',   yrs: '7' },
      { name: 'TypeScript',  role: 'Type safety',    yrs: '5' },
      { name: 'JavaScript',  role: 'Core language',  yrs: '7' },
      { name: 'Next.js',     role: 'SSR / SSG',      yrs: '4' },
    ],
  },
  {
    id: 'platform',
    num: '02',
    title: 'Platform & Data',
    line: 'From API contract to cloud — the full delivery surface.',
    meta: '04 tools · 17 yrs combined',
    foot: 'Banking-grade state, APIs and infrastructure',
    serial: 'SER. SB·26·C02',
    skills: [
      { name: 'Node.js',      role: 'Runtime',          yrs: '5' },
      { name: 'GraphQL',      role: 'Data layer',       yrs: '4' },
      { name: 'AWS',          role: 'Cloud & infra',    yrs: '3' },
      { name: 'Redux / MobX', role: 'State management', yrs: '5' },
    ],
  },
  {
    id: 'motion',
    num: '03',
    title: 'Motion & Quality',
    line: 'Where good becomes premium — and stays shipped.',
    meta: '04 tools · 18 yrs combined',
    foot: 'Every animation on this page: GSAP, hand-tuned',
    serial: 'SER. SB·26·C03',
    skills: [
      { name: 'GSAP',          role: 'Motion engine',    yrs: '4' },
      { name: 'Framer Motion', role: 'Component motion', yrs: '3' },
      { name: 'SCSS / CSS',    role: 'Design fidelity',  yrs: '7' },
      { name: 'Vite + Jest',   role: 'Build & test',     yrs: '4' },
    ],
  },
]

/* Char-split for the kinetic heading */
function Chars({ text }) {
  return (
    <span className="skd-chsplit" aria-label={text}>
      {text.split('').map((c, i) => (
        <span className="skd-ch-mask" key={i} aria-hidden="true">
          <span className="skd-ch">{c === ' ' ? ' ' : c}</span>
        </span>
      ))}
    </span>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)

  /* ═══════════════════════════════════════════════
     1. HEADING — char-split kinetic reveal
  ═══════════════════════════════════════════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.skd-ch', { yPercent: 120, rotate: 5 })
      gsap.set('.skd-label-row .section-label', { x: -26, opacity: 0 })
      gsap.set('.skd-note', { opacity: 0 })
      gsap.set('.skd-sub', { y: 20, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
      })

      tl.to('.skd-label-row .section-label', { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0)
      tl.to('.skd-note', { opacity: 1, duration: 0.6 }, 0.28)
      tl.to('.skd-ch', {
        yPercent: 0, rotate: 0,
        duration: 1.05, ease: 'expo.out',
        stagger: { each: 0.022, from: 'start' },
      }, 0.1)
      tl.to('.skd-sub', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.62)

      /* Coda strip after the deck */
      gsap.set('.skd-coda span', { y: 18, opacity: 0 })
      gsap.to('.skd-coda span', {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.skd-coda', start: 'top 92%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ═══════════════════════════════════════════════
     2. THE DECK — sticky cards stack natively. As the
     next card rides up, the previous one sinks: scales
     back and fades toward the page color via a veil
     (theme-safe — works in light and dark).
  ═══════════════════════════════════════════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.skd-card', sectionRef.current)

      cards.forEach((card, i) => {
        /* Card content reveals once as the card arrives */
        const els = card.querySelectorAll('.skd-card-band, .skd-card-head > *, .skd-row, .skd-card-foot')
        gsap.set(els, { y: 30, opacity: 0 })
        gsap.to(els, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 72%', once: true },
        })

        /* Previous card sinks under the incoming one */
        if (i < cards.length - 1) {
          const next = cards[i + 1]
          const veil = card.querySelector('.skd-card-veil')

          gsap.timeline({
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: 'top top+=120',
              scrub: true,
            },
            defaults: { ease: 'none' },
          })
            .fromTo(card, { scale: 1 }, { scale: 0.95, transformOrigin: 'center top' }, 0)
            .fromTo(veil, { opacity: 0 }, { opacity: 0.62 }, 0)
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="skd-section" ref={sectionRef}>
      <div className="section-grid" aria-hidden="true" />

      <div className="skd-wrap">

        {/* ── Label row ── */}
        <div className="skd-label-row">
          <div className="section-label">
            <span className="section-label-num">02</span>
            <span>Expertise</span>
          </div>
          <span className="skd-note">( Three disciplines — twelve tools )</span>
        </div>

        {/* ── Kinetic heading ── */}
        <div className="skd-head">
          <h2 className="skd-heading">
            <span className="skd-hline"><Chars text="THE STACK," /></span>
            <span className="skd-hline"><Chars text="STACKED." /></span>
          </h2>
          <p className="skd-sub">
            Twelve production-grade tools in three disciplines — dealt
            one card at a time, in the order they earn their keep.
          </p>
        </div>

        {/* ── The deck ── */}
        <div className="skd-deck">
          {DECK.map((card, i) => (
            <article
              className="skd-card"
              key={card.id}
              style={{ '--i': i }}
            >
              {/* Card furniture */}
              <span className="skd-card-num" aria-hidden="true">{card.num}</span>
              <span className="skd-spine" aria-hidden="true">
                {card.title} — plate {card.num} · SB/2026
              </span>

              {/* Header band */}
              <header className="skd-card-band">
                <span className="skd-tab">Discipline {card.num} / 03</span>
                <span className="skd-card-meta">{card.meta}</span>
              </header>

              <div className="skd-card-head">
                <h3 className="skd-card-title">{card.title}</h3>
                <p className="skd-card-line">{card.line}</p>
              </div>

              {/* Ledger rows */}
              <div className="skd-rows">
                {card.skills.map((s, j) => (
                  <div className="skd-row" key={s.name} data-hover>
                    <span className="skd-row-idx">{String(j + 1).padStart(2, '0')}</span>
                    <span className="skd-row-name">{s.name}</span>
                    <span className="skd-row-role">{s.role}</span>
                    <span className="skd-row-yrs">
                      {s.yrs}<small>yrs</small>
                    </span>
                    <span className="skd-row-go" aria-hidden="true">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
                        stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 10L10 2M10 2H4M10 2v6" />
                      </svg>
                    </span>
                  </div>
                ))}
              </div>

              {/* Print-finish footer */}
              <footer className="skd-card-foot">
                <span className="skd-foot-note">{card.foot}</span>
                <span className="skd-foot-right">
                  <span className="skd-serial" aria-hidden="true">{card.serial}</span>
                  <span className="skd-barcode" aria-hidden="true" />
                  <span className="skd-foot-count">{card.num} / 03</span>
                </span>
              </footer>

              {/* Theme-safe dim veil — fades card toward page color */}
              <div className="skd-card-veil" aria-hidden="true" />
            </article>
          ))}
        </div>

        {/* ── Coda strip ── */}
        <div className="skd-coda" aria-hidden="true">
          <span>12 tools</span>
          <span className="skd-coda-sep">—</span>
          <span>03 disciplines</span>
          <span className="skd-coda-sep">—</span>
          <span>01 standard</span>
        </div>

      </div>
    </section>
  )
}
