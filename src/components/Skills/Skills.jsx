import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './Skills.css'

const skillRows = [
  {
    name: 'React JS',
    tag: 'Frontend',
    level: 'Expert',
    years: '7 yrs',
    context: 'Core framework across Goldman Sachs TxB & US Bank platforms',
  },
  {
    name: 'TypeScript',
    tag: 'Language',
    level: 'Expert',
    years: '4 yrs',
    context: 'Strict typing across all production micro-frontends',
  },
  {
    name: 'JavaScript',
    tag: 'Language',
    level: 'Expert',
    years: '7 yrs',
    context: 'Deep engine knowledge — closures, async patterns, event loop',
  },
  {
    name: 'Micro Frontend',
    tag: 'Architecture',
    level: 'Expert',
    years: '3 yrs',
    context: 'Module Federation across 8+ independent teams at Thoughtworks',
  },
  {
    name: 'GraphQL',
    tag: 'API',
    level: 'Advanced',
    years: '3 yrs',
    context: 'Real-time data layers for transaction banking dashboards',
  },
  {
    name: 'Web Performance',
    tag: 'Optimisation',
    level: 'Advanced',
    years: '3 yrs',
    context: 'Core Web Vitals, lazy loading, bundle splitting at enterprise scale',
  },
  {
    name: 'Jest / RTL',
    tag: 'Testing',
    level: 'Advanced',
    years: '4 yrs',
    context: 'TDD-first culture — 80%+ coverage across all delivered projects',
  },
  {
    name: 'Redux',
    tag: 'State',
    level: 'Advanced',
    years: '4 yrs',
    context: 'Global state architecture with sagas & thunks in banking apps',
  },
  {
    name: 'Node.js',
    tag: 'Backend',
    level: 'Proficient',
    years: '3 yrs',
    context: 'BFF services, proxy layers and build tooling pipelines',
  },
  {
    name: 'DSA',
    tag: 'CS Fundamentals',
    level: 'Intermediate',
    years: '5 yrs',
    context: 'Arrays, trees, graphs, dynamic programming — applied in LeetCode & interviews',
  },
  {
    name: 'Webpack / Vite',
    tag: 'Build',
    level: 'Advanced',
    years: '4 yrs',
    context: 'Custom federation configs, code splitting, tree shaking at scale',
  },
  {
    name: 'Azure',
    tag: 'Cloud',
    level: 'Certified',
    years: '2 yrs',
    context: 'AZ-900 & AZ-204 certified — pipelines, functions, app services',
  },
  {
    name: 'Design Systems',
    tag: 'UI Systems',
    level: 'Advanced',
    years: '3 yrs',
    context: 'Built and maintained shared component libraries across teams',
  },
]

const certs = [
  { badge: 'AZ-900', full: 'Azure Fundamentals',        year: '2023' },
  { badge: 'AZ-204', full: 'Azure Developer Associate', year: '2023' },
  { badge: 'AI-PE',  full: 'AI Prompt Engineering',     year: '2024' },
]

const levelColors = {
  Expert:     'sk-level-expert',
  Advanced:   'sk-level-advanced',
  Proficient: 'sk-level-proficient',
  Intermediate:'sk-level-intermediate',
  Certified:  'sk-level-certified',
}

function SkillRow({ skill, index }) {
  const rowRef   = useRef(null)
  const isInView = useInView(rowRef, { once: false, margin: '-48px' })

  return (
    <motion.div
      ref={rowRef}
      className="sk-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.01 }}
    >
      {/* wipe line on border-bottom */}
      <motion.div
        className="sk-row-wipe"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: [0.76,0,0.24,1], delay: index * 0.03 }}
      />

      {/* Index */}
      <span className="sk-row-idx">{String(index + 1).padStart(2, '0')}</span>

      {/* Name + context */}
      <div className="sk-row-main">
        <div className="sk-row-clip">
          <motion.span
            className="sk-row-name"
            initial={{ y: '110%' }}
            animate={isInView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.65, ease: [0.76,0,0.24,1], delay: 0.05 + index * 0.03 }}
          >
            {skill.name}
          </motion.span>
        </div>
        <motion.p
          className="sk-row-context"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.5, delay: 0.14 + index * 0.03 }}
        >
          {skill.context}
        </motion.p>
      </div>

      {/* Domain tag */}
      <motion.span
        className="sk-row-tag"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.45, delay: 0.18 + index * 0.03 }}
      >
        {skill.tag}
      </motion.span>

      {/* Level badge */}
      <motion.span
        className={`sk-row-level ${levelColors[skill.level]}`}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.4, delay: 0.22 + index * 0.03 }}
      >
        {skill.level}
      </motion.span>

      {/* Years */}
      <motion.span
        className="sk-row-years"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.45, delay: 0.26 + index * 0.03 }}
      >
        {skill.years}
      </motion.span>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef   = useRef(null)
  const headerRef    = useRef(null)
  const inView       = useInView(sectionRef,  { once: false, margin: '-80px' })
  const headerInView = useInView(headerRef,   { once: false, margin: '-60px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section id="skills" className="sk-section" ref={sectionRef}>
      <div className="section-grid" />

      <motion.div className="sk-bg-word" style={{ y: bgY }} aria-hidden>
        Craft
      </motion.div>

      <div className="sk-inner">

        {/* ── HEADER ── */}
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
              {['7 years', 'engineering', 'at scale.'].map((line, i) => (
                <div key={line} className="sk-hl-clip">
                  <motion.h2
                    className="sk-headline"
                    initial={{ y: '112%' }}
                    animate={headerInView ? { y: '0%' } : { y: '112%' }}
                    transition={{ delay: 0.08 + i * 0.1, duration: 0.82, ease: [0.76,0,0.24,1] }}
                  >
                    {line}
                  </motion.h2>
                </div>
              ))}
            </div>
            <motion.p
              className="sk-sub"
              initial={{ opacity: 0, y: 14 }}
              animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: 0.44, duration: 0.6 }}
            >
              Senior Consultant UI at Thoughtworks — every technology below
              has shipped in production at Goldman Sachs &amp; US Bank.
            </motion.p>
          </div>
        </div>

        {/* ── LEGEND ── */}
        <motion.div
          className="sk-legend"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="sk-legend-item">
            <span className={`sk-level-dot sk-level-expert`} />Expert
          </span>
          <span className="sk-legend-item">
            <span className={`sk-level-dot sk-level-advanced`} />Advanced
          </span>
          <span className="sk-legend-item">
            <span className={`sk-level-dot sk-level-proficient`} />Proficient
          </span>
          <span className="sk-legend-item">
            <span className={`sk-level-dot sk-level-certified`} />Certified
          </span>
        </motion.div>

        {/* ── COLUMN HEADERS ── */}
        <motion.div
          className="sk-col-head"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.32, duration: 0.5 }}
        >
          <span>#</span>
          <span>Technology &amp; Context</span>
          <span>Domain</span>
          <span>Level</span>
          <span>Exp.</span>
        </motion.div>

        {/* ── ROWS ── */}
        <div className="sk-rows">
          {skillRows.map((s, i) => (
            <SkillRow key={s.name} skill={s} index={i} />
          ))}
        </div>

        {/* ── CERTS ── */}
        <div className="sk-certs-block">
          <motion.p
            className="sk-certs-title"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Certifications
          </motion.p>
          <div className="sk-certs">
            {certs.map((c, i) => (
              <motion.div key={c.badge} className="sk-cert"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.28 + i * 0.1, duration: 0.6, ease: [0.76,0,0.24,1] }}
              >
                <span className="sk-cert-badge">{c.badge}</span>
                <div>
                  <p className="sk-cert-full">{c.full}</p>
                  <p className="sk-cert-year">{c.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}