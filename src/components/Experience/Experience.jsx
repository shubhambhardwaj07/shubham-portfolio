import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SplitHeading from '../../utils/SplitHeading'
import './Experience.css'

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
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const inView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['7%', '-7%'])
  const lineScale = useTransform(scrollYProgress, [0.15, 0.78], [0, 1])
  const selected = chapters[active]

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="section-grid" />
      <motion.div className="exp-bg-word" style={{ y: bgY }} aria-hidden>
        Tenure
      </motion.div>

      <div className="exp-inner">
        <div className="exp-top">
          <motion.div
            className="section-label"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label-num">04</span>
            <span>Experience</span>
          </motion.div>

          <div className="exp-heading">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.14, duration: 0.5 }}
            >
              Employer journey
            </motion.p>
            <SplitHeading
              text="Three companies. One craft, sharpened with every platform."
             
              delay={0.04}
              className="exp-heading-h2"
            />
          </div>
        </div>

        <div className="exp-showcase">
          <motion.aside
            className="exp-ledger"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
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
          </motion.aside>

          <div className="exp-main">
            <motion.div
              className="exp-education"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.22, duration: 0.58 }}
            >
              <span>Education</span>
              <div>
                <h3>{education.title}</h3>
                <p>{education.meta}</p>
              </div>
            </motion.div>

            <div className="exp-chapters">
              <div className="exp-line">
                <motion.div className="exp-line-fill" style={{ scaleY: lineScale }} />
              </div>

              {chapters.map((chapter, index) => (
                <motion.article
                  key={chapter.company}
                  className={`exp-chapter${active === index ? ' exp-chapter-active' : ''}`}
                  onMouseEnter={() => setActive(index)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
                  transition={{ delay: 0.28 + index * 0.1, duration: 0.64, ease: [0.76, 0, 0.24, 1] }}
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
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
