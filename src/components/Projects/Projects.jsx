import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './Projects.css'

const work = [
  {
    id: '01',
    employer: 'Thoughtworks',
    client: 'GS',
    clientName: 'Goldman Sachs',
    domain: 'Transaction banking',
    title: 'A banking platform shaped for independent teams.',
    summary: 'Working as a Senior Frontend Developer at Thoughtworks, I contribute to enterprise systems where architecture, delivery discipline, and stakeholder clarity matter every day.',
    highlights: ['Micro-frontends', 'TDD delivery', 'Platform thinking'],
  },
  {
    id: '02',
    employer: 'Publicis Sapient',
    client: 'USBC',
    clientName: 'US Bank Corp',
    domain: 'Partner management',
    title: 'Operational dashboards built for controlled access and scale.',
    summary: 'At Publicis Sapient, I worked on banking interfaces involving accounts, configuration flows, role-based access, versioning, and performance-minded frontend delivery.',
    highlights: ['RBAC', 'Dashboards', 'Responsive frontend'],
  },
  {
    id: '03',
    employer: 'TCS',
    client: 'J&J',
    clientName: 'Johnson & Johnson',
    domain: 'Enterprise applications',
    title: 'The foundation chapter: structured frontend delivery as a fresher.',
    summary: 'At TCS, I learned production discipline on Johnson & Johnson work: building reliable interface pieces, handling forms and documents, and getting the details right.',
    highlights: ['Forms', 'PDF workflows', 'Cross-browser frontend'],
  },
]

export default function Projects() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const inView = useInView(ref, { once: false, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const activeWork = work[active]

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="section-grid" />
      <motion.div className="projects-bg-word" style={{ y: bgY }} aria-hidden>
        Client
      </motion.div>

      <div className="projects-inner">
        <div className="projects-top">
          <motion.div
            className="section-label"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label-num">03</span>
            <span>Work</span>
          </motion.div>

          <motion.div
            className="projects-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 0.16, duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="projects-eyebrow">Client map</p>
            <h2>Enterprise work across consulting chapters.</h2>
            <p>
              Three employers, three client environments, one consistent thread:
              turning complex business workflows into dependable frontend systems.
            </p>
          </motion.div>
        </div>

        <div className="work-atlas">
          <motion.aside
            className="work-dossier"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ delay: 0.22, duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          >
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
          </motion.aside>

          <div className="work-grid">
            {work.map((item, index) => (
              <motion.article
                key={item.clientName}
                className={`work-card${active === index ? ' work-card-active' : ''}`}
                onMouseEnter={() => setActive(index)}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                transition={{ delay: 0.28 + index * 0.09, duration: 0.64, ease: [0.76, 0, 0.24, 1] }}
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
                  {item.highlights.map(highlight => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
