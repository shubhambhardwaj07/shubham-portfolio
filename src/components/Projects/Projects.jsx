import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const work = [
  {
    id: '01',
    employer: 'Thoughtworks',
    client: 'GS',
    clientName: 'Goldman Sachs',
    domain: 'Transaction banking',
    title: 'Platform work for independent banking teams.',
    summary: 'At Thoughtworks, I contribute to enterprise systems where architecture, delivery discipline, and stakeholder clarity matter every day.',
    highlights: ['Micro-frontends', 'TDD delivery', 'Platform thinking'],
  },
  {
    id: '02',
    employer: 'Publicis Sapient',
    client: 'USBC',
    clientName: 'US Bank Corp',
    domain: 'Partner management',
    title: 'Controlled banking workflows with clean operational surfaces.',
    summary: 'At Publicis Sapient, I worked on accounts, configuration flows, role-based access, versioning, and performance-minded frontend delivery.',
    highlights: ['RBAC', 'Dashboards', 'Responsive frontend'],
  },
  {
    id: '03',
    employer: 'TCS',
    client: 'J&J',
    clientName: 'Johnson & Johnson',
    domain: 'Enterprise applications',
    title: 'Foundational enterprise delivery with detail discipline.',
    summary: 'At TCS, I learned production habits on Johnson & Johnson work: building reliable interface pieces, handling forms and documents, and getting the details right.',
    highlights: ['Forms', 'PDF workflows', 'Cross-browser frontend'],
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const descRef    = useRef(null)
  const [active, setActive] = useState(0)
  const activeWork = work[active]

  /* ── Entry timeline ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.set('.pr-ghost',              { y: 40, opacity: 0 })
      gsap.set('.projects .section-label', { x: -20, opacity: 0 })
      gsap.set('.pr-eyebrow',            { y: 12, opacity: 0 })
      gsap.set('.pr-hw',                 { yPercent: 115 })
      gsap.set('.pr-dossier',            { y: 28, opacity: 0 })
      gsap.set('.work-card',             { y: 32, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })

      tl.to('.pr-ghost',               { y: 0, opacity: 0.018, duration: 2.4, ease: 'power4.out' }, 0)
      tl.to('.projects .section-label',{ x: 0, opacity: 1, duration: 0.72, ease: 'power3.out' }, 0.1)
      tl.to('.pr-eyebrow',             { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.2)
      tl.to('.pr-hw',                  { yPercent: 0, duration: 1.25, stagger: 0.08, ease: 'expo.out' }, 0.26)
      tl.to('.pr-dossier',             { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }, 0.6)
      tl.to('.work-card',              { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'expo.out' }, 0.7)

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ── Ghost word parallax ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.pr-ghost', {
        yPercent: -28, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', end: 'bottom top', scrub: 1.5,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ── Word scrub on description ── */
  useEffect(() => {
    const el = descRef.current
    if (!el) return

    const text = el.textContent.trim()
    el.innerHTML = text.split(/\s+/).map(w => `<span class="pr-word">${w}</span>`).join(' ')
    const words = el.querySelectorAll('.pr-word')
    gsap.set(words, { opacity: 0.12 })
    gsap.to(words, {
      opacity: 1, stagger: 0.08, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 30%', scrub: 1.5 },
    })
  }, [])

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="section-grid" />
      <span className="pr-ghost" aria-hidden>Client</span>

      <div className="projects-inner">
        <div className="projects-top">
          <div className="section-label">
            <span className="section-label-num">03</span>
            <span>Work</span>
          </div>

          <div className="projects-copy">
            <p className="pr-eyebrow">Client map</p>

            <h2 className="pr-heading">
              <span className="pr-hline"><span className="pr-hw">Three clients.</span></span>
              <span className="pr-hline"><span className="pr-hw">Real scale.</span></span>
              <span className="pr-hline"><span className="pr-hw">Durable frontend systems.</span></span>
            </h2>

            <p className="projects-desc" ref={descRef}>
              A map of the environments I've delivered in — and what each one asked me
              to solve at platform level.
            </p>
          </div>
        </div>

        <div className="work-atlas">
          <aside className="work-dossier pr-dossier">
            <div className="work-dossier-head">
              <span>Active dossier</span>
              <strong>{activeWork.client}</strong>
            </div>
            <div className="work-dossier-main">
              <p>{activeWork.employer}</p>
              <h3>{activeWork.clientName}</h3>
            </div>
            <div className="work-dossier-foot">
              <span>{activeWork.domain}</span>
              <span>{activeWork.id}</span>
            </div>
          </aside>

          <div className="work-grid">
            {work.map((item, index) => (
              <article
                key={item.clientName}
                className={`work-card${active === index ? ' work-card-active' : ''}`}
                onMouseEnter={() => setActive(index)}
              >
                <div className="work-card-top">
                  <span>{item.id}</span>
                  <strong>{item.client}</strong>
                </div>
                <div className="work-card-client">
                  <p>{item.employer}</p>
                  <h3>{item.clientName}</h3>
                  <span>{item.domain}</span>
                </div>
                <div className="work-card-body">
                  <h4>{item.title}</h4>
                  <p>{item.summary}</p>
                </div>
                <div className="work-tags">
                  {item.highlights.map(h => <span key={h}>{h}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
