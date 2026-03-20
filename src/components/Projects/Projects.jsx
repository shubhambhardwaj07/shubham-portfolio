import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Projects.css'

const projects = [
  {
    num: '01',
    name: 'Goldman Sachs TxB',
    desc: 'Transaction Banking micro-frontend platform at Thoughtworks. Multiple micro repos, stakeholder collaboration, TDD-first development approach.',
    tags: ['React', 'Micro Frontend', 'TypeScript', 'TDD'],
    type: 'Enterprise', company: 'Thoughtworks',
  },
  {
    num: '02',
    name: 'US Bank Dashboard',
    desc: 'Accounts Dashboard and Config Portal for US Bank. Role-based access, versioning, micro frontend architecture, responsive design.',
    tags: ['React', 'Redux', 'MFE', 'Web Performance'],
    type: 'Enterprise', company: 'Publicis Sapient',
  },
  {
    num: '03',
    name: 'The Rebel Diplomat',
    desc: 'YouTube channel covering world affairs, geopolitics and current events. 220+ videos and a growing community of informed citizens.',
    tags: ['Content', 'Geopolitics', 'YouTube'],
    type: 'Personal', company: '@TheRebelDiplomat07',
    link: 'https://youtube.com/@TheRebelDiplomat07',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="section-grid" />
      <div className="projects-inner">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label-num">03</span>
          <span>Projects</span>
        </motion.div>

        <div className="projects-list">
          {projects.map((p, i) => (
            <motion.div key={p.num} className="project-row"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ delay: 0.1 * i, duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="project-num">{p.num}</div>
              <div className="project-body">
                <div className="project-header">
                  <h3 className="project-name">{p.name}</h3>
                  <div className="project-meta">
                    <span className="project-type">{p.type}</span>
                    <span className="project-company">{p.company}</span>
                  </div>
                </div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </div>
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer" className="project-link" data-hover>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
