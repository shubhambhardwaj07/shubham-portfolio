import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './About.css'

const principles = [
  {
    label: 'Architecture',
    title: 'Systems that stay understandable',
    copy: 'I shape frontends around clear ownership, measured boundaries, and code paths a team can keep evolving after launch.',
  },
  {
    label: 'Delivery',
    title: 'Momentum without theatrics',
    copy: 'I like tight feedback loops, deliberate tradeoffs, and small decisions that quietly remove friction for everyone downstream.',
  },
  {
    label: 'Craft',
    title: 'Interfaces with operational grace',
    copy: 'The work should feel calm under pressure: accessible, fast, consistent, and easy to reason about when real users depend on it.',
  },
]

const profileStats = [
  ['7+', 'Years building production software'],
  ['8+', 'Teams supported through platform work'],
  ['3', 'Enterprise environments served'],
]

const links = [
  ['GitHub', 'https://github.com/shubhambhardwaj07'],
  ['LinkedIn', 'https://www.linkedin.com/in/shubham-bhardwaj07/'],
  ['LeetCode', 'https://leetcode.com/u/shubh_bhardwaj07/'],
]

export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: false, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const portraitY = useTransform(scrollYProgress, [0, 1], ['-5%', '7%'])
  const wordY = useTransform(scrollYProgress, [0, 1], ['7%', '-7%'])

  return (
    <section id="about" className="ab-section" ref={sectionRef}>
      <div className="section-grid" />
      <motion.div className="ab-ghost" style={{ y: wordY }} aria-hidden>
        Profile
      </motion.div>

      <div className="ab-inner">
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
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 0.16, duration: 0.68, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="ab-kicker">Frontend developer · UI systems</span>
            <h2>I build frontends for teams that cannot afford confusion.</h2>
            <p>
              My sweet spot is enterprise product engineering: translating messy
              domains into composed interfaces, durable architecture, and delivery
              habits that make complex work feel controlled.
            </p>
          </motion.div>
        </div>

        <div className="ab-showcase">
          <motion.div
            className="ab-portrait-card"
            style={{ y: portraitY }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.22, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="ab-portrait-frame">
              <img src="/profile.png" alt="Shubham Bhardwaj" className="ab-portrait" />
              <div className="ab-portrait-shade" />
            </div>
            <div className="ab-status">
              <span className="ab-status-dot" />
              Available for meaningful frontend platform work
            </div>
          </motion.div>

          <div className="ab-panel">
            <motion.div
              className="ab-statement"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ delay: 0.28, duration: 0.64 }}
            >
              <span>Working style</span>
              <p>
                I pair consulting clarity with hands-on engineering depth: ask better
                questions, reduce accidental complexity, then ship the thing with care.
              </p>
            </motion.div>

            <div className="ab-principles">
              {principles.map((item, index) => (
                <motion.article
                  className="ab-principle"
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.36 + index * 0.08, duration: 0.58 }}
                >
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </motion.article>
              ))}
            </div>

            <motion.div
              className="ab-bottom"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: 0.56, duration: 0.6 }}
            >
              <div className="ab-stats">
                {profileStats.map(([value, label]) => (
                  <div className="ab-stat" key={label}>
                    <span>{value}</span>
                    <p>{label}</p>
                  </div>
                ))}
              </div>

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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
