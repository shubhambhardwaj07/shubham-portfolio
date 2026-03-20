import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './Experience.css'

const jobs = [
  {
    company: 'Thoughtworks', role: 'Senior Consultant UI',
    period: 'Nov 2023 — Present', client: 'Goldman Sachs · Transaction Banking',
    points: ['Led micro-frontend architecture across multiple repos', 'Collaborated with GS stakeholders for project alignment', 'Implemented Test Driven Development throughout codebase', 'Analyzed and improved client processes for efficiency'],
    current: true,
  },
  {
    company: 'Publicis Sapient', role: 'Associate Level 2',
    period: 'Oct 2021 — Nov 2023', client: 'US Bank · Partner Management',
    points: ['Built Accounts Dashboard and Configuration Portal', 'Implemented Role-Based Access Control and versioning', 'Micro Frontend Architecture with latest tech stack', 'Web Performance Optimizations and Responsive designs'],
    current: false,
  },
  {
    company: 'Tata Consultancy Services', role: 'System Engineer',
    period: 'Jun 2019 — Oct 2021', client: 'Multiple Clients',
    points: ['Forms, PDFs, quizzes, PSD-to-HTML conversions', 'Cross-browser layouts and compatibility', 'Business logic proposals and implementations'],
    current: false,
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineH = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="section-grid" />
      <div className="exp-inner">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label-num">04</span>
          <span>Experience</span>
        </motion.div>

        <div className="exp-body">
          <motion.div className="edu-block"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <span className="edu-label">Education</span>
            <p className="edu-name">B.Tech — Electronics &amp; Communications</p>
            <p className="edu-detail">Guru Nanak Dev University, Amritsar · CGPA 8.48 · 2019</p>
          </motion.div>

          <div className="timeline">
            <div className="timeline-track">
              <motion.div className="timeline-line" style={{ height: lineH }} />
            </div>
            <div className="timeline-items">
              {jobs.map((job, i) => (
                <motion.div key={job.company}
                  className={`timeline-item ${job.current ? 'current' : ''}`}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                  transition={{ delay: 0.12 * i + 0.25, duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                >
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <div>
                        <h3 className="timeline-company">{job.company}</h3>
                        <p className="timeline-role">{job.role}</p>
                        {job.client && <p className="timeline-client">{job.client}</p>}
                      </div>
                      <span className="timeline-period">{job.period}</span>
                    </div>
                    <ul className="timeline-points">
                      {job.points.map((pt, j) => <li key={j}>{pt}</li>)}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
