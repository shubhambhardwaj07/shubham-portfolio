import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Skills.css'

const skills = [
  { name: 'React JS', level: 95, tag: 'Core' },
  { name: 'TypeScript', level: 90, tag: 'Core' },
  { name: 'Micro Frontend', level: 92, tag: 'Architecture' },
  { name: 'JavaScript', level: 95, tag: 'Core' },
  { name: 'Redux', level: 85, tag: 'State' },
  { name: 'GraphQL', level: 80, tag: 'API' },
  { name: 'Webpack', level: 82, tag: 'Build' },
  { name: 'Jest / RTL', level: 85, tag: 'Testing' },
  { name: 'Node.js', level: 75, tag: 'Backend' },
  { name: 'Web Performance', level: 88, tag: 'Optimization' },
  { name: 'HTML / CSS', level: 95, tag: 'Core' },
  { name: 'TDD', level: 85, tag: 'Methodology' },
]

const certs = [
  { name: 'AZ-900', full: 'Azure Fundamentals' },
  { name: 'AZ-204', full: 'Azure Developer' },
  { name: 'AI Prompt', full: 'Prompt Engineering' },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="section-grid" />
      <div className="skills-inner">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label-num">02</span>
          <span>Skills</span>
        </motion.div>

        <div className="skills-body">
          <div className="skills-list">
            {skills.map((skill, i) => (
              <motion.div key={skill.name} className="skill-row"
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
                transition={{ delay: 0.04 * i, duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              >
                <div className="skill-top">
                  <div className="skill-left">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-tag">{skill.tag}</span>
                  </div>
                  <span className="skill-pct">{skill.level}%</span>
                </div>
                <div className="skill-bar-track">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: skill.level / 100 } : { scaleX: 0 }}
                    transition={{ delay: 0.08 + 0.04 * i, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="skills-side">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 0.3, duration: 0.65 }}
            >
              <p className="certs-title">Certifications</p>
              {certs.map(c => (
                <div key={c.name} className="cert-item">
                  <span className="cert-badge">{c.name}</span>
                  <span className="cert-full">{c.full}</span>
                </div>
              ))}
            </motion.div>
            <motion.div
              className="skills-big-text"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              React<br />First.
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
