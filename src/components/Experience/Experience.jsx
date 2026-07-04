import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Experience.css'

gsap.registerPlugin(ScrollTrigger)

const chapters = [
  {
    code: 'TW',
    company: 'Thoughtworks',
    role: 'Senior Consultant · Frontend & UI',
    period: 'Nov 2023 — Present',
    status: 'Current company',
    headline: 'Consulting craft, platform thinking, and senior ownership.',
    summary: 'I work at the intersection of product engineering and consulting: shaping frontend systems, aligning with stakeholders, and keeping delivery clear for distributed teams.',
    details: ['Micro-frontend architecture', 'TDD-led delivery', 'Stakeholder collaboration'],
    metric: 'Current',
  },
  {
    code: 'PS',
    company: 'Publicis Sapient',
    role: 'Associate Level 2',
    period: 'Oct 2021 — Nov 2023',
    status: 'Previous company',
    headline: 'Enterprise dashboards with scale, access control, and performance in mind.',
    summary: 'This chapter sharpened my ability to build banking products with careful state management, role-based experiences, and responsive interfaces that survive real usage.',
    details: ['Accounts dashboard', 'Configuration portal', 'Performance optimization'],
    metric: '2 yrs',
  },
  {
    code: 'TCS',
    company: 'Tata Consultancy Services',
    role: 'System Engineer',
    period: 'Jun 2019 — Oct 2021',
    status: 'First role',
    headline: 'The foundation: discipline, delivery basics, and production habits.',
    summary: 'I started here as a fresher, learning the practical side of software work: translating requirements, building frontend flows, fixing browser issues, and earning trust through consistency.',
    details: ['HTML/CSS foundations', 'Forms and PDFs', 'Cross-browser frontend'],
    metric: 'Start',
  },
]

const education = {
  title: 'B.Tech — Electronics & Communications',
  meta: 'Guru Nanak Dev University, Amritsar · CGPA 8.48 · 2019',
}

export default function Experience() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const selected = chapters[active]

  /* ── Entry timeline ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.set('.exp-ghost',              { y: 40, opacity: 0 })
      gsap.set('.experience .section-label', { x: -20, opacity: 0 })
      gsap.set('.exp-eyebrow',            { y: 12, opacity: 0 })
      gsap.set('.exp-hw',                 { yPercent: 115 })
      gsap.set('.exp-ledger',             { y: 28, opacity: 0 })
      gsap.set('.exp-education',          { y: 18, opacity: 0 })
      gsap.set('.exp-chapter',            { y: 28, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })

      tl.to('.exp-ghost',                 { y: 0, opacity: 0.018, duration: 2.4, ease: 'power4.out' }, 0)
      tl.to('.experience .section-label', { x: 0, opacity: 1, duration: 0.72, ease: 'power3.out' }, 0.1)
      tl.to('.exp-eyebrow',               { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.18)
      tl.to('.exp-hw',                    { yPercent: 0, duration: 1.25, stagger: 0.08, ease: 'expo.out' }, 0.24)
      tl.to('.exp-ledger',                { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }, 0.58)
      tl.to('.exp-education',             { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }, 0.62)
      tl.to('.exp-chapter',               { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'expo.out' }, 0.72)

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ── Ghost parallax ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.exp-ghost', {
        yPercent: -28, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', end: 'bottom top', scrub: 1.5,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ── Timeline line scaleY scrub ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-line-fill',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.exp-chapters',
            start: 'top 75%',
            end: 'bottom 18%',
            scrub: 1.2,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="section-grid" />
      <span className="exp-ghost" aria-hidden>Tenure</span>

      <div className="exp-inner">
        <div className="exp-top">
          <div className="section-label">
            <span className="section-label-num">04</span>
            <span>Experience</span>
          </div>

          <div className="exp-heading">
            <p className="exp-eyebrow">Employer journey</p>
            <h2 className="exp-heading-h2">
              <span className="exp-hline"><span className="exp-hw">Three companies.</span></span>
              <span className="exp-hline"><span className="exp-hw">One craft, sharpened</span></span>
              <span className="exp-hline"><span className="exp-hw">with every platform.</span></span>
            </h2>
          </div>
        </div>

        <div className="exp-showcase">
          <aside className="exp-ledger">
            <div className="exp-ledger-top">
              <span>{selected.status}</span>
              <strong>{selected.code}</strong>
            </div>
            <div>
              <p>{selected.role}</p>
              <h3>{selected.company}</h3>
            </div>
            <div className="exp-ledger-foot">
              <span>{selected.period}</span>
              <span>{selected.metric}</span>
            </div>
          </aside>

          <div className="exp-main">
            <div className="exp-education">
              <span>Education</span>
              <div>
                <h3>{education.title}</h3>
                <p>{education.meta}</p>
              </div>
            </div>

            <div className="exp-chapters">
              <div className="exp-line">
                <div className="exp-line-fill" />
              </div>

              {chapters.map((chapter, index) => (
                <article
                  key={chapter.company}
                  className={`exp-chapter${active === index ? ' exp-chapter-active' : ''}`}
                  onMouseEnter={() => setActive(index)}
                >
                  <div className="exp-marker">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="exp-card">
                    <div className="exp-card-head">
                      <div>
                        <span className="exp-status">{chapter.status}</span>
                        <h3>{chapter.company}</h3>
                        <p>{chapter.role}</p>
                      </div>
                      <div className="exp-period">
                        <strong>{chapter.metric}</strong>
                        <span>{chapter.period}</span>
                      </div>
                    </div>

                    <p className="exp-headline">{chapter.headline}</p>
                    <p className="exp-summary">{chapter.summary}</p>

                    <div className="exp-tags">
                      {chapter.details.map(detail => (
                        <span key={detail}>{detail}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
