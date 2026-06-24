import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const techStack = [
  {
    num: '01', name: 'React',
    desc: 'Component-driven UIs at scale — hooks, concurrent rendering, RSC, Suspense',
    role: 'UI Framework', yrs: '7 yrs',
  },
  {
    num: '02', name: 'TypeScript',
    desc: 'Strict type contracts across large codebases — generics, utility types, strict mode',
    role: 'Type Safety', yrs: '5 yrs',
  },
  {
    num: '03', name: 'JavaScript',
    desc: 'Deep runtime knowledge — event loop, closures, async/await, Web Platform APIs',
    role: 'Core Language', yrs: '7 yrs',
  },
  {
    num: '04', name: 'Node.js',
    desc: 'Server-side JS — REST & BFF APIs, Express, streaming, event-driven architecture',
    role: 'Full Stack', yrs: '5 yrs',
  },
  {
    num: '05', name: 'Next.js',
    desc: 'SSR / SSG / ISR — App Router, Server Components, edge deployment, streaming',
    role: 'SSR / SSG', yrs: '4 yrs',
  },
  {
    num: '06', name: 'GraphQL',
    desc: 'Schema-first data layer — Apollo, federation, persisted queries, subscriptions',
    role: 'API / Data', yrs: '4 yrs',
  },
  {
    num: '07', name: 'Redux / MobX',
    desc: 'Predictable state at enterprise scale — RTK, MobX observables, micro frontend state',
    role: 'State Mgmt', yrs: '5 yrs',
  },
  {
    num: '08', name: 'AWS',
    desc: 'Cloud infrastructure — Lambda, S3, CloudFront, Amplify, IAM, CI/CD pipelines',
    role: 'Cloud', yrs: '3 yrs',
  },
  {
    num: '09', name: 'GSAP',
    desc: 'Award-winning motion — ScrollTrigger, timelines, FLIP, SplitText, physics plugins',
    role: 'Motion Engine', yrs: '4 yrs',
  },
  {
    num: '10', name: 'Framer Motion',
    desc: 'Physics-based UI — layout animations, shared element transitions, gesture handlers',
    role: 'Component Motion', yrs: '3 yrs',
  },
  {
    num: '11', name: 'SCSS / CSS',
    desc: 'Design-faithful, accessible, responsive — tokens, custom properties, container queries',
    role: 'Design Fidelity', yrs: '7 yrs',
  },
  {
    num: '12', name: 'Vite',
    desc: 'Sub-second HMR, tree-shaken production bundles, optimised plugin ecosystem',
    role: 'Build Tooling', yrs: '3 yrs',
  },
]

const capabilities = [
  {
    id: 'frontend',   label: '01', note: '7+ yrs',
    title: 'Frontend Engineering',
    summary: 'Scalable, maintainable component systems built for long-term ownership — React 18, TypeScript strict, accessibility-first, design-faithful.',
    items: ['React 18 / RSC', 'TypeScript strict', 'WCAG Accessibility', 'Design systems', 'CSS architecture'],
  },
  {
    id: 'fullstack',  label: '02', note: 'Node · APIs',
    title: 'Full-Stack Development',
    summary: 'End-to-end delivery — Node.js BFF APIs, GraphQL schemas, SSR via Next.js, and cloud-ready deployments on AWS.',
    items: ['Node.js / Express', 'GraphQL / REST', 'Next.js SSR/ISR', 'AWS Lambda / S3', 'BFF pattern'],
  },
  {
    id: 'state',      label: '03', note: 'Redux · MobX',
    title: 'State & Data Layer',
    summary: 'Predictable state management at enterprise scale — Redux Toolkit slices, MobX reactive stores, server state with React Query and Apollo.',
    items: ['Redux Toolkit', 'MobX observables', 'React Query', 'Apollo Client', 'Micro FE state'],
  },
  {
    id: 'animation',  label: '04', note: 'GSAP · Motion',
    title: 'Animation & Motion',
    summary: 'Motion that communicates intent — scroll-driven narratives, physics-based transitions, and FLIP layout morphing.',
    items: ['GSAP ScrollTrigger', 'Framer Motion', 'View Transitions', 'CSS @keyframes', 'FLIP animations'],
  },
  {
    id: 'perf',       label: '05', note: '95+ Lighthouse',
    title: 'Web Performance',
    summary: 'Performance as a product decision. INP, CLS, LCP optimised under real user conditions — not just lab scores.',
    items: ['Core Web Vitals', 'Code splitting', 'Bundle analysis', 'CDN / edge', 'Lazy loading'],
  },
  {
    id: 'arch',       label: '06', note: 'Enterprise',
    title: 'Frontend Architecture',
    summary: 'Systems that teams can move fast within — Module Federation micro frontends, shared design systems, and monorepo discipline.',
    items: ['Micro Frontends', 'Module Federation', 'Monorepo / Nx', 'Design systems', 'Azure DevOps'],
  },
]

const stats = [
  { num: '7',  sup: '+', label: 'Experience',   text: 'Years shipping production frontends for enterprises across fintech, SaaS, and media.' },
  { num: '50', sup: '+', label: 'Delivery',      text: 'Projects shipped end to end — including three Micro Frontend rollouts under live traffic.' },
  { num: '8',  sup: '+', label: 'Collaboration', text: 'Cross-functional teams across timezones — designers, PMs, QA, and backend engineers.' },
  { num: '12', sup: '+', label: 'Technologies',  text: 'Production-grade tools mastered — from component layer to cloud infrastructure.' },
  { num: '95', sup: '+', label: 'Perf Score',    text: 'Lighthouse score maintained consistently across all shipped products and client sites.' },
]

const ecosystemNodes = [
  { label: 'React',         cat: 'Framework',    x: 52, y: 40, size: 'hub' },
  { label: 'Node.js',       cat: 'Runtime',      x: 14, y: 54, size: 'hub' },
  { label: 'TypeScript',    cat: 'Language',     x: 34, y: 14, size: 'hub' },
  { label: 'JavaScript',    cat: 'Language',     x: 73, y: 18, size: 'mid' },
  { label: 'Next.js',       cat: 'SSR / SSG',    x: 22, y: 34, size: 'mid' },
  { label: 'GraphQL',       cat: 'Data Layer',   x: 78, y: 44, size: 'mid' },
  { label: 'AWS',           cat: 'Cloud',        x: 82, y: 62, size: 'mid' },
  { label: 'Redux',         cat: 'State',        x: 34, y: 62, size: 'sm'  },
  { label: 'MobX',          cat: 'State',        x: 14, y: 74, size: 'sm'  },
  { label: 'GSAP',          cat: 'Animation',    x: 62, y: 8,  size: 'sm'  },
  { label: 'Framer Motion', cat: 'Animation',    x: 84, y: 26, size: 'sm'  },
  { label: 'SCSS / CSS',    cat: 'Styling',      x: 50, y: 74, size: 'sm'  },
  { label: 'Vite',          cat: 'Tooling',      x: 68, y: 80, size: 'sm'  },
  { label: 'Jest & RTL',    cat: 'Testing',      x: 50, y: 90, size: 'sm'  },
  { label: 'Micro FE',      cat: 'Architecture', x: 28, y: 82, size: 'sm'  },
]

const connections = [
  // React hub (0)
  [0,2],[0,3],[0,4],[0,5],[0,7],[0,8],[0,9],[0,10],[0,11],[0,14],
  // Node.js hub (1)
  [1,2],[1,3],[1,5],[1,6],[1,7],[1,14],
  // TypeScript hub (2)
  [2,3],[2,4],[2,9],[2,13],
  // JavaScript (3)
  [3,9],[3,10],[3,1],
  // Next.js (4)
  [4,6],[4,2],
  // GraphQL (5)
  [5,6],[5,1],
  // Redux (7)
  [7,8],[7,2],
  // AWS (6)
  [6,12],
  // SCSS (11)
  [11,12],
  // Vite (12)
  [12,13],
  // Jest (13)
  [13,2],
  // Micro FE (14)
  [14,6],
]

const BEAT_NAMES = ['ARRIVAL', 'THE STACK', 'CAPABILITIES', 'IN NUMBERS', 'ECOSYSTEM', 'CLOSE']
const BEAT_THRESHOLDS = [0, 0.155, 0.355, 0.565, 0.755, 0.935]

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef(null)
  const b1Ref = useRef(null)
  const b2Ref = useRef(null)
  const b3Ref = useRef(null)
  const b4Ref = useRef(null)
  const b5Ref = useRef(null)
  const indSegRefs = useRef([])
  const indLabelRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const ctx = gsap.context(() => {

      /* ── Initial states ── */
      gsap.set([b2Ref.current, b3Ref.current, b4Ref.current, b5Ref.current], {
        opacity: 0, y: 28, pointerEvents: 'none',
      })
      gsap.set('.sk-b1-toprow-right', { opacity: 0 })
      gsap.set('.sk-b1-sub',          { opacity: 0, y: 12 })
      gsap.set('.sk-b1-stat',         { opacity: 0, y: 18 })
      gsap.set('.sk-b2-inner',        { yPercent: 110 })
      gsap.set('.sk-b3-card',         { opacity: 0, y: 24 })
      gsap.set('.sk-b4-col',          { opacity: 0, y: -60 })
      gsap.set('.sk5-line',           { strokeDashoffset: 1, opacity: 0 })
      gsap.set('.sk5-ndot',           { scale: 0, opacity: 0, transformOrigin: 'center center' })
      gsap.set('.sk5-nlabel',         { opacity: 0, y: 8 })
      gsap.set('.sk5-sidebar-item',   { opacity: 0, y: 16 })
      gsap.set('.sk5-final',          { opacity: 0, y: 16 })

      /* ── Main timeline ── */
      const out = (extra = {}) => ({ opacity: 0, y: -24, duration: 0.09, pointerEvents: 'none', ...extra })
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.6,
        },
        defaults: { ease: 'power3.out' },
      })

      /* Progress fill */
      tl.to('.sk-progress-fill', { scaleX: 1, duration: 1, ease: 'none' }, 0)

      /* ── Beat 1: Arrival reveal ── */
      tl
        .from('.sk-b1-rule',           { scaleX: 0, transformOrigin: 'left center', stagger: 0.016, duration: 0.08 }, 0)
        .from('.sk-b1-char',           { yPercent: 115, stagger: 0.005, duration: 0.09, ease: 'power4.out' }, 0)
        .to('.sk-b1-toprow-right',     { opacity: 1, duration: 0.06 }, 0.03)
        .to('.sk-b1-sub',              { opacity: 1, y: 0, duration: 0.06 }, 0.05)
        .to('.sk-b1-stat',             { opacity: 1, y: 0, stagger: 0.008, duration: 0.055 }, 0.07)

      /* ── Beat 1 → 2 ── */
      tl
        .to(b1Ref.current, out(), 0.145)
        .to(b2Ref.current, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 }, 0.17)
        .to('.sk-b2-inner', { yPercent: 0, stagger: 0.007, duration: 0.08, ease: 'power4.out' }, 0.19)

      /* ── Beat 2 → 3 ── */
      tl
        .to(b2Ref.current, out(), 0.355)
        .to(b3Ref.current, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 }, 0.38)
        .to('.sk-b3-card', { opacity: 1, y: 0, stagger: 0.011, duration: 0.08 }, 0.40)

      /* ── Beat 3 → 4 ── */
      tl
        .to(b3Ref.current, out(), 0.565)
        .to(b4Ref.current, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 }, 0.59)
        .to('.sk-b4-col', { opacity: 1, y: 0, stagger: 0.011, duration: 0.08, ease: 'back.out(1.5)' }, 0.61)

      /* ── Beat 4 → 5 ── */
      tl
        .to(b4Ref.current, out(), 0.755)
        .to(b5Ref.current, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.07 }, 0.78)
        .to('.sk5-line',   { strokeDashoffset: 0, opacity: 1, stagger: 0.005, duration: 0.065, ease: 'power2.inOut' }, 0.80)
        .to('.sk5-ndot',   { scale: 1, opacity: 1, stagger: 0.006, duration: 0.055, ease: 'back.out(2)' }, 0.84)
        .to('.sk5-nlabel', { opacity: 1, y: 0, stagger: 0.005, duration: 0.04 }, 0.88)
        .to('.sk5-sidebar-item', { opacity: 1, y: 0, stagger: 0.01, duration: 0.05 }, 0.89)
        .to('.sk5-final',  { opacity: 1, y: 0, duration: 0.06 }, 0.95)

      /* ── Phase indicator (real-time, no scrub) ── */
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate(self) {
          const p = self.progress
          const beat = BEAT_THRESHOLDS.filter(t => p >= t).length - 1
          if (indLabelRef.current) {
            indLabelRef.current.textContent =
              `${String(beat + 1).padStart(2, '0')} — ${BEAT_NAMES[beat] || ''}`
          }
          indSegRefs.current.forEach((seg, i) => {
            if (!seg) return
            seg.style.background = i <= beat ? 'var(--text-2)' : 'var(--border)'
          })
        },
      })

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="sk-section" ref={sectionRef}>
      <div className="sk-sticky">
        <div className="section-grid" />

        {/* ── Phase indicator ── */}
        <div className="sk-indicator">
          <div className="sk-ind-segs">
            {BEAT_NAMES.map((_, i) => (
              <div key={i} className="sk-ind-seg" ref={el => (indSegRefs.current[i] = el)} />
            ))}
          </div>
          <span className="sk-ind-label" ref={indLabelRef}>01 — ARRIVAL</span>
        </div>

        {/* ══════════════════════════════════
            BEAT 1 — ARRIVAL
        ══════════════════════════════════ */}
        <div className="sk-beat sk-beat-1" ref={b1Ref}>
          <div className="sk-inner">

            {/* Top identity row */}
            <div className="sk-b1-toprow">
              <div className="section-label sk-b1-label">
                <span className="section-label-num">02</span>
                <span>Expertise</span>
              </div>
              <span className="sk-b1-toprow-right">
                Senior Frontend &amp; Full-Stack Engineer · Thoughtworks
              </span>
            </div>

            <div className="sk-b1-rule" />

            {/* Massive display heading */}
            <h2 className="sk-b1-heading" aria-label="EXPERTISE">
              {'EXPERTISE'.split('').map((char, i) => (
                <span key={i} className="sk-b1-char-wrap">
                  <span className="sk-b1-char">{char}</span>
                </span>
              ))}
            </h2>

            <div className="sk-b1-rule" />

            <p className="sk-b1-sub">
              Precision at every layer — from pixel to cloud.<br />
              Frontend craft with full-stack depth, delivered at enterprise scale.
            </p>

            {/* Stats row */}
            <div className="sk-b1-stats">
              {stats.map((s, i) => (
                <div key={i} className="sk-b1-stat">
                  <span className="sk-b1-stat-num">
                    {s.num}<span className="sk-b1-stat-sup">{s.sup}</span>
                  </span>
                  <span className="sk-b1-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════
            BEAT 2 — THE STACK
        ══════════════════════════════════ */}
        <div className="sk-beat sk-beat-2" ref={b2Ref}>
          <div className="sk-inner sk-inner--wide">

            <div className="sk-b2-header">
              <div className="section-label sk-b2-label">
                <span className="section-label-num">02</span>
                <span>The Stack</span>
              </div>
              <p className="sk-b2-subhead">
                Chosen for longevity, not trend.<br />Each earned its place through production use.
              </p>
            </div>

            <div className="sk-b2-list">
              {techStack.map((tech) => (
                <div key={tech.num} className="sk-b2-row">
                  <div className="sk-b2-inner">
                    <span className="sk-b2-num">{tech.num}</span>
                    <span className="sk-b2-name">{tech.name}</span>
                    <span className="sk-b2-desc">{tech.desc}</span>
                    <span className="sk-b2-meta">{tech.role} · {tech.yrs}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════
            BEAT 3 — CAPABILITIES
        ══════════════════════════════════ */}
        <div className="sk-beat sk-beat-3" ref={b3Ref}>
          <div className="sk-inner sk-inner--wide">

            <div className="sk-b3-header">
              <div className="section-label sk-b3-label">
                <span className="section-label-num">02</span>
                <span>Capabilities</span>
              </div>
              <p className="sk-b3-subhead">
                Six disciplines. One coherent engineering practice.<br />
                Frontend craft amplified by full-stack depth.
              </p>
            </div>

            <div className="sk-b3-grid">
              {capabilities.map((cap) => (
                <div key={cap.id} className="sk-b3-card">
                  <div className="sk-b3-card-top">
                    <span className="sk-b3-card-num">{cap.label}</span>
                    <span className="sk-b3-card-note">{cap.note}</span>
                  </div>
                  <h3 className="sk-b3-card-title">{cap.title}</h3>
                  <p className="sk-b3-card-summary">{cap.summary}</p>
                  <ul className="sk-b3-card-items">
                    {cap.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════
            BEAT 4 — IN NUMBERS
        ══════════════════════════════════ */}
        <div className="sk-beat sk-beat-4" ref={b4Ref}>
          <div className="sk-inner sk-inner--wide">

            <div className="sk-b4-header">
              <div className="section-label sk-b4-label">
                <span className="section-label-num">02</span>
                <span>In Numbers</span>
              </div>
              <p className="sk-b4-subhead">
                Experience measured in decisions made,<br />shipped products, and teams trusted to lead.
              </p>
            </div>

            <div className="sk-b4-grid">
              {stats.map((s, i) => (
                <div key={i} className="sk-b4-col">
                  <span className="sk-b4-col-label">{s.label}</span>
                  <div className="sk-b4-num">
                    {s.num}<span className="sk-b4-num-sup">{s.sup}</span>
                  </div>
                  <p className="sk-b4-text">{s.text}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════
            BEAT 5 — ECOSYSTEM
        ══════════════════════════════════ */}
        <div className="sk-beat sk-beat-5" ref={b5Ref}>
          <div className="sk-inner sk-inner--wide">

            <div className="sk-b5-header">
              <div className="section-label sk-b5-label">
                <span className="section-label-num">02</span>
                <span>Ecosystem</span>
              </div>
              <p className="sk-b5-subhead">
                A connected practice. 15 technologies, one coherent system.
              </p>
            </div>

            <div className="sk-b5-layout">

              {/* Map */}
              <div className="sk5-map">
                <svg
                  className="sk5-svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden
                >
                  {connections.map(([a, b], i) => {
                    const A = ecosystemNodes[a]
                    const B = ecosystemNodes[b]
                    const len = Math.ceil(
                      Math.hypot(B.x - A.x, B.y - A.y) * 1.65
                    )
                    return (
                      <line
                        key={i}
                        className="sk5-line"
                        x1={`${A.x}%`} y1={`${A.y}%`}
                        x2={`${B.x}%`} y2={`${B.y}%`}
                        strokeDasharray={len}
                        strokeDashoffset={len}
                      />
                    )
                  })}
                </svg>

                {ecosystemNodes.map((node) => (
                  <div
                    key={node.label}
                    className={`sk5-node sk5-node--${node.size}`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <div className="sk5-ndot" />
                    <div className="sk5-nlabel">
                      <span className="sk5-nname">{node.label}</span>
                      <span className="sk5-ncat">{node.cat}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="sk5-sidebar">
                <p className="sk5-sidebar-item sk5-sidebar-intro">
                  Full-stack capability rooted in frontend craft. Every layer from component
                  to cloud, connected by the same discipline.
                </p>

                <div className="sk5-sidebar-item sk5-legend">
                  {[
                    { cat: 'Framework',    nodes: 'React, Next.js' },
                    { cat: 'Language',     nodes: 'TypeScript, JS' },
                    { cat: 'Runtime',      nodes: 'Node.js' },
                    { cat: 'State',        nodes: 'Redux, MobX' },
                    { cat: 'Data Layer',   nodes: 'GraphQL' },
                    { cat: 'Cloud',        nodes: 'AWS' },
                    { cat: 'Animation',    nodes: 'GSAP, Framer' },
                    { cat: 'Styling',      nodes: 'SCSS / CSS' },
                    { cat: 'Tooling',      nodes: 'Vite, Jest' },
                    { cat: 'Architecture', nodes: 'Micro FE' },
                  ].map(({ cat, nodes }) => (
                    <div key={cat} className="sk5-legend-row">
                      <div className="sk5-legend-dot" />
                      <span className="sk5-legend-cat">{cat}</span>
                      <span className="sk5-legend-nodes">{nodes}</span>
                    </div>
                  ))}
                </div>

                <div className="sk5-final sk5-sidebar-item">
                  <span className="sk5-final-kicker">The complete picture</span>
                  <strong className="sk5-final-stmt">
                    7 years. 50+ projects.<br />One consistent standard.
                  </strong>
                </div>
              </div>

            </div>

            {/* Mobile-only closing statement */}
            <div className="sk5-close-mobile sk5-final sk5-sidebar-item">
              <span className="sk5-final-kicker">The complete picture</span>
              <strong className="sk5-final-stmt">
                7 years. 50+ projects.<br />One consistent standard.
              </strong>
            </div>

          </div>
        </div>

        {/* ── Scroll progress ── */}
        <div className="sk-progress-track">
          <div className="sk-progress-fill" />
        </div>

      </div>
    </section>
  )
}
