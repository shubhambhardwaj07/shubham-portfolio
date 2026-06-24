import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useAnimationFrame } from 'framer-motion'
import SplitHeading from '../../utils/SplitHeading'
import ScrollRevealText from '../../utils/ScrollRevealText'
import CountUp from '../../utils/CountUp'
import './About.css'

/* ── TICKER ── */
function Ticker({ items, speed = 0.52 }) {
  const trackRef = useRef(null)
  const x = useRef(0)

  useAnimationFrame((_, delta) => {
    if (!trackRef.current) return
    const el = trackRef.current
    const w = el.scrollWidth / 2
    x.current -= speed * (delta / 16.67)
    if (x.current <= -w) x.current += w
    el.style.transform = `translateX(${x.current}px)`
  })

  const doubled = [...items, ...items]
  return (
    <div className="ab-ticker" aria-hidden>
      <div className="ab-ticker-track" ref={trackRef}>
        {doubled.map((item, i) => (
          <span key={i} className="ab-ticker-item">
            {item}
            <span className="ab-ticker-sep" aria-hidden>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── DATA ── */
const tickerItems = [
  'React', 'TypeScript', 'Micro Frontend', 'GraphQL', 'Web Performance',
  'Jest / RTL', 'Redux', 'Node.js', 'Azure', 'Design Systems', 'Module Federation', 'TDD',
]

const principles = [
  {
    num: '01',
    label: 'Architecture',
    title: 'Systems with a long shelf life',
    copy: 'I shape frontends around ownership, boundaries, and code paths a team can keep evolving with confidence.',
  },
  {
    num: '02',
    label: 'Delivery',
    title: 'Delivery without noise',
    copy: 'I prefer tight feedback loops, deliberate tradeoffs, and decisions that remove friction before it becomes visible.',
  },
  {
    num: '03',
    label: 'Craft',
    title: 'Interfaces that stay calm',
    copy: 'The experience should remain accessible, fast, and predictable when real users and real workflows depend on it.',
  },
]

const links = [
  ['GitHub',   'https://github.com/shubhambhardwaj07'],
  ['LinkedIn', 'https://www.linkedin.com/in/shubham-bhardwaj07/'],
  ['LeetCode', 'https://leetcode.com/u/shubh_bhardwaj07/'],
]

/* ── SECTION ── */
export default function About() {
  const sectionRef   = useRef(null)
  const principleRef = useRef(null)
  const inView          = useInView(sectionRef,   { once: true })
  const principlesInView = useInView(principleRef, { once: true })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const portraitY = useTransform(scrollYProgress, [0, 1], ['-5%', '7%'])
  const wordY     = useTransform(scrollYProgress, [0, 1], ['7%', '-7%'])
  const lineScale = useTransform(scrollYProgress, [0.04, 0.32], [0, 1])

  return (
    <section id="about" className="ab-section" ref={sectionRef}>
      <div className="section-grid" />
      <motion.div className="ab-ghost" style={{ y: wordY }} aria-hidden>Profile</motion.div>

      <div className="ab-inner">

        {/* ── TOP ── */}
        <div className="ab-top">
          <motion.div
            className="section-label"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label-num">01</span>
            <span>About</span>
          </motion.div>

          <motion.div
            className="ab-intro"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
          >
            <motion.span
              className="ab-kicker"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.14, duration: 0.5 }}
            >
              Frontend developer · UI systems
            </motion.span>
            <SplitHeading
              text="I build frontend systems that make complex work feel clear."
              delay={0.04}
              className="ab-intro-h2"
            />
          </motion.div>
        </div>

        {/* ── ANIMATED RULE ── */}
        <motion.div className="ab-rule" style={{ scaleX: lineScale }} />

        {/* ── TICKER ── */}
        <Ticker items={tickerItems} />

        {/* ── SHOWCASE ── */}
        <div className="ab-showcase">

          {/* PORTRAIT */}
          <motion.div
            className="ab-portrait-card"
            style={{ y: portraitY }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.22, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="ab-portrait-frame">
              <img src="/profile.png" alt="Shubham Bhardwaj" className="ab-portrait" />
              <div className="ab-grain" />
              <div className="ab-portrait-shade" />

              {/* Stats overlay at bottom of photo */}
              <div className="ab-portrait-floats">
                <div className="ab-pfloat">
                  <span><CountUp to={7} suffix="+" duration={1400} /></span>
                  <p>Years</p>
                </div>
                <div className="ab-pfloat">
                  <span><CountUp to={8} suffix="+" duration={1600} /></span>
                  <p>Teams</p>
                </div>
                <div className="ab-pfloat">
                  <span><CountUp to={3} duration={1200} /></span>
                  <p>Clients</p>
                </div>
              </div>
            </div>

            <div className="ab-status">
              <span className="ab-status-dot" />
              Open to senior frontend engagements
            </div>
          </motion.div>

          {/* PANEL */}
          <div className="ab-panel">

            {/* STATEMENT */}
            <motion.div
              className="ab-statement"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ delay: 0.28, duration: 0.64 }}
            >
              <span>Working style</span>
              <ScrollRevealText
                text="I pair consulting clarity with hands-on engineering depth: ask sharper questions, reduce accidental complexity, and ship with restraint."
                delay={0.1}
                wordDelay={0.05}
                duration={0.72}
              />
            </motion.div>

            {/* PRINCIPLES — fill-hover cards */}
            <div className="ab-principles" ref={principleRef}>
              {principles.map((item, index) => (
                <motion.article
                  className="ab-principle"
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={principlesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ delay: 0.08 + index * 0.1, duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
                >
                  <div className="ab-principle-fill" />
                  <span className="ab-principle-num">{item.num}</span>
                  <div className="ab-principle-body">
                    <span className="ab-principle-label">{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* LINKS */}
            <div className="ab-links">
              {links.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="ab-link" data-hover>
                  {label}
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M2 10L10 2M10 2H4M10 2v6"/>
                  </svg>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
