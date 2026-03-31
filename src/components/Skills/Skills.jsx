import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './Skills.css'

const skillRows = [
  { name: 'React JS',          tag: 'Core',         year: "'19" },
  { name: 'TypeScript',        tag: 'Core',         year: "'20" },
  { name: 'Micro Frontend',    tag: 'Architecture', year: "'21" },
  { name: 'JavaScript',        tag: 'Core',         year: "'19" },
  { name: 'GraphQL',           tag: 'API',          year: "'21" },
  { name: 'Web Performance',   tag: 'Optimisation', year: "'22" },
  { name: 'Jest / RTL',        tag: 'Testing',      year: "'20" },
  { name: 'TDD',               tag: 'Methodology',  year: "'21" },
  { name: 'Node.js',           tag: 'Backend',      year: "'20" },
  { name: 'Redux',             tag: 'State',        year: "'19" },
  { name: 'Webpack / Vite',    tag: 'Build',        year: "'22" },
  { name: 'Azure',             tag: 'Cloud',        year: "'23" },
]

const certs = [
  { badge: 'AZ-900', full: 'Azure Fundamentals',        year: '2023' },
  { badge: 'AZ-204', full: 'Azure Developer Associate', year: '2023' },
  { badge: 'AI-PE',  full: 'AI Prompt Engineering',     year: '2024' },
]

/* Individual skill row — wipes in from left on scroll */
function SkillRow({ skill, index }) {
  const rowRef = useRef(null)
  const isInView = useInView(rowRef, { once: false, margin: '-60px' })

  return (
    <motion.div
      ref={rowRef}
      className="sk-row"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.01, delay: 0 }}
    >
      {/* Wipe line that grows from 0 to 100% width */}
      <motion.div
        className="sk-row-wipe"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1],
          delay: index * 0.04,
        }}
      />

      {/* Index */}
      <span className="sk-row-index">{String(index + 1).padStart(2, '0')}</span>

      {/* Skill name — clips up from below */}
      <div className="sk-row-clip">
        <motion.span
          className="sk-row-name"
          initial={{ y: '110%' }}
          animate={isInView ? { y: '0%' } : { y: '110%' }}
          transition={{
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.06 + index * 0.035,
          }}
        >
          {skill.name}
        </motion.span>
      </div>

      {/* Tag */}
      <motion.span
        className="sk-row-tag"
        initial={{ opacity: 0, x: -8 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        transition={{ duration: 0.5, delay: 0.18 + index * 0.035 }}
      >
        {skill.tag}
      </motion.span>

      {/* Year — right side */}
      <motion.span
        className="sk-row-year"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.22 + index * 0.035 }}
      >
        {skill.year}
      </motion.span>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const inView     = useInView(sectionRef, { once: false, margin: '-80px' })
  const headerInView = useInView(headerRef, { once: false, margin: '-60px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  /* Big background text drifts up as you scroll */
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section id="skills" className="sk-section" ref={sectionRef}>
      <div className="section-grid" />

      {/* Drifting background word */}
      <motion.div className="sk-bg-word" style={{ y: bgTextY }} aria-hidden>
        Craft
      </motion.div>

      <div className="sk-inner">

        {/* ── TOP: label + headline side by side ── */}
        <div className="sk-top" ref={headerRef}>
          <motion.div
            className="section-label"
            initial={{ opacity: 0, x: -18 }}
            animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label-num">02</span>
            <span>Skills</span>
          </motion.div>

          <div className="sk-top-right">
            <div className="sk-headline-wrap">
              {['5+ years', 'engineering', 'at scale.'].map((line, i) => (
                <div key={line} className="sk-headline-clip">
                  <motion.h2
                    className="sk-headline"
                    initial={{ y: '110%' }}
                    animate={headerInView ? { y: '0%' } : { y: '110%' }}
                    transition={{
                      delay: 0.08 + i * 0.1,
                      duration: 0.82,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    {line}
                  </motion.h2>
                </div>
              ))}
            </div>

            <motion.p
              className="sk-sub"
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.45, duration: 0.65 }}
            >
              Senior Consultant UI at Thoughtworks — building enterprise-grade
              micro-frontend platforms for Goldman Sachs TxB.
              Every technology below has been used in production.
            </motion.p>
          </div>
        </div>

        {/* ── COLUMN HEADERS ── */}
        <motion.div
          className="sk-col-headers"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span>#</span>
          <span>Technology</span>
          <span>Domain</span>
          <span>Since</span>
        </motion.div>

        {/* ── SKILL ROWS ── */}
        <div className="sk-rows">
          {skillRows.map((skill, i) => (
            <SkillRow key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* ── CERTIFICATIONS ── */}
        <div className="sk-certs-wrap">
          <motion.p
            className="sk-certs-label"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Certifications
          </motion.p>
          <div className="sk-certs">
            {certs.map((c, i) => (
              <motion.div
                key={c.badge}
                className="sk-cert"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.28 + i * 0.1, duration: 0.6, ease: [0.76,0,0.24,1] }}
              >
                <span className="sk-cert-badge">{c.badge}</span>
                <div className="sk-cert-body">
                  <span className="sk-cert-full">{c.full}</span>
                  <span className="sk-cert-year">{c.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}