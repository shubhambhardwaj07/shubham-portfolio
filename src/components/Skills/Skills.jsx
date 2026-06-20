import { useRef } from 'react'
import {
  motion, useInView, useScroll, useTransform,
  useVelocity, useSpring, useAnimationFrame,
} from 'framer-motion'
import SplitHeading from '../../utils/SplitHeading'
import ScrollRevealText from '../../utils/ScrollRevealText'
import './Skills.css'

/* ── DATA ── */
const skillRows = [
  { name: 'React JS',       tag: 'Frontend',       level: 'Expert',       years: '7 yrs', context: 'Core framework across Goldman Sachs TxB & US Bank platforms' },
  { name: 'TypeScript',     tag: 'Language',       level: 'Expert',       years: '4 yrs', context: 'Strict typing across all production micro-frontends' },
  { name: 'JavaScript',     tag: 'Language',       level: 'Expert',       years: '7 yrs', context: 'Deep engine knowledge — closures, async patterns, event loop' },
  { name: 'Micro Frontend', tag: 'Architecture',   level: 'Expert',       years: '3 yrs', context: 'Module Federation across 8+ independent teams at Thoughtworks' },
  { name: 'GraphQL',        tag: 'API',            level: 'Advanced',     years: '3 yrs', context: 'Real-time data layers for transaction banking dashboards' },
  { name: 'Web Performance',tag: 'Optimisation',   level: 'Advanced',     years: '3 yrs', context: 'Core Web Vitals, lazy loading, bundle splitting at enterprise scale' },
  { name: 'Jest / RTL',     tag: 'Testing',        level: 'Advanced',     years: '4 yrs', context: 'TDD-first culture — 80%+ coverage across all delivered projects' },
  { name: 'Redux',          tag: 'State',          level: 'Advanced',     years: '4 yrs', context: 'Global state architecture with sagas & thunks in banking apps' },
  { name: 'Node.js',        tag: 'Backend',        level: 'Proficient',   years: '3 yrs', context: 'BFF services, proxy layers and build tooling pipelines' },
  { name: 'Webpack / Vite', tag: 'Build',          level: 'Advanced',     years: '4 yrs', context: 'Custom federation configs, code splitting, tree shaking at scale' },
  { name: 'Azure',          tag: 'Cloud',          level: 'Certified',    years: '2 yrs', context: 'AZ-900 & AZ-204 certified — pipelines, functions, app services' },
  { name: 'Design Systems', tag: 'UI Systems',     level: 'Advanced',     years: '3 yrs', context: 'Built and maintained shared component libraries across teams' },
  { name: 'DSA',            tag: 'CS Fundamentals',level: 'Intermediate', years: '5 yrs', context: 'Arrays, trees, graphs, dynamic programming — applied in interviews' },
]

const certs = [
  { badge: 'AZ-900', full: 'Azure Fundamentals',        year: '2023' },
  { badge: 'AZ-204', full: 'Azure Developer Associate', year: '2023' },
  { badge: 'AI-PE',  full: 'AI Prompt Engineering',     year: '2024' },
]

const marqueeRow1 = ['React', 'TypeScript', 'Micro Frontend', 'GraphQL', 'Performance', 'Jest']
const marqueeRow2 = ['Redux', 'Node.js', 'Webpack', 'Azure', 'Design Systems', 'DSA']

const levelColors = {
  Expert:      'sk-level-expert',
  Advanced:    'sk-level-advanced',
  Proficient:  'sk-level-proficient',
  Intermediate:'sk-level-intermediate',
  Certified:   'sk-level-certified',
}

/* ── VELOCITY MARQUEE ── */
function VelocityMarquee({ items, direction = 1, baseSpeed = 55 }) {
  const trackRef = useRef(null)
  const xPos     = useRef(0)

  const { scrollY }     = useScroll()
  const scrollVelocity  = useVelocity(scrollY)
  const smoothVelocity  = useSpring(scrollVelocity, { damping: 50, stiffness: 380 })
  const velocityFactor  = useTransform(
    smoothVelocity,
    [-3000, -600, 0, 600, 3000],
    [5, 2, 1, 2, 5],
    { clamp: false }
  )

  useAnimationFrame((_, delta) => {
    if (!trackRef.current) return
    const el = trackRef.current
    const trackWidth = el.scrollWidth / 2
    const speed = baseSpeed * (delta / 1000) * velocityFactor.get()
    xPos.current -= direction * speed
    if (xPos.current <= -trackWidth) xPos.current += trackWidth
    if (xPos.current > 0)           xPos.current -= trackWidth
    el.style.transform = `translateX(${xPos.current}px)`
  })

  const doubled = [...items, ...items]

  return (
    <div className="sk-marquee-row" aria-hidden>
      <div className="sk-marquee-track" ref={trackRef}>
        {doubled.map((name, i) => (
          <span key={i} className="sk-marquee-item">
            {name}
            <span className="sk-marquee-sep" aria-hidden>/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── SKILL ROW ── */
function SkillRow({ skill, index }) {
  const rowRef   = useRef(null)
  const isInView = useInView(rowRef, { once: true })

  return (
    <div ref={rowRef} className="sk-row">
      <motion.div
        className="sk-row-wipe"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: index * 0.02 }}
      />

      <span className="sk-row-idx">{String(index + 1).padStart(2, '0')}</span>

      <div className="sk-row-main">
        <div className="sk-row-clip">
          <motion.span
            className="sk-row-name"
            initial={{ y: '112%' }}
            animate={isInView ? { y: '0%' } : { y: '112%' }}
            transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1], delay: 0.04 + index * 0.02 }}
          >
            {skill.name}
          </motion.span>
        </div>
        <motion.p
          className="sk-row-context"
          initial={{ opacity: 0, y: 5 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          transition={{ duration: 0.45, delay: 0.12 + index * 0.02 }}
        >
          {skill.context}
        </motion.p>
      </div>

      <motion.span
        className="sk-row-tag"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.38, delay: 0.16 + index * 0.02 }}
      >
        {skill.tag}
      </motion.span>

      <motion.span
        className={`sk-row-level ${levelColors[skill.level]}`}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
        transition={{ duration: 0.36, delay: 0.2 + index * 0.02 }}
      >
        {skill.level}
      </motion.span>

      <motion.span
        className="sk-row-years"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.36, delay: 0.24 + index * 0.02 }}
      >
        {skill.years}
      </motion.span>
    </div>
  )
}

/* ── SECTION ── */
export default function Skills() {
  const sectionRef   = useRef(null)
  const headerRef    = useRef(null)
  const certsRef     = useRef(null)

  const headerInView = useInView(headerRef,  { once: true })
  const inView       = useInView(sectionRef, { once: true })
  const certsInView  = useInView(certsRef,   { once: true })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section id="skills" className="sk-section" ref={sectionRef}>
      <div className="section-grid" />

      <motion.div className="sk-bg-word" style={{ y: bgY }} aria-hidden>Craft</motion.div>

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
              <SplitHeading text="7 years" delay={0.04} className="sk-headline" />
              <SplitHeading text="engineering" delay={0.2} className="sk-headline" />
              <SplitHeading text="at scale." delay={0.36} className="sk-headline" />
            </div>
            <ScrollRevealText
              text="A production toolkit shaped by enterprise banking platforms, shared UI systems, and delivery across distributed teams."
              className="sk-sub"
              delay={0.72}
              wordDelay={0.05}
              duration={0.72}
            />
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <motion.div
          className="sk-capabilities"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: 0.28, duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
        >
          {[['13', 'Production skills'], ['80%+', 'Coverage culture'], ['8+', 'Teams supported']].map(([val, label]) => (
            <div className="sk-capability" key={label}>
              <span className="sk-capability-value">{val}</span>
              <span className="sk-capability-label">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── VELOCITY MARQUEE ── */}
        <motion.div
          className="sk-marquee-section"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
        >
          <VelocityMarquee items={marqueeRow1} direction={1}  baseSpeed={52} />
          <VelocityMarquee items={marqueeRow2} direction={-1} baseSpeed={46} />
        </motion.div>

        {/* ── COLUMN HEADERS ── */}
        <motion.div
          className="sk-col-head"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
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
        <div className="sk-certs-block" ref={certsRef}>
          <motion.p
            className="sk-certs-title"
            initial={{ opacity: 0, y: 10 }}
            animate={certsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            Certifications
          </motion.p>
          <div className="sk-certs">
            {certs.map((c, i) => (
              <motion.div key={c.badge} className="sk-cert"
                initial={{ opacity: 0, y: 20 }}
                animate={certsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
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
