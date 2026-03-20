import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './About.css'

const stats = [
  { num: '5+', label: 'Years Experience' },
  { num: '3', label: 'Companies' },
  { num: '10+', label: 'Projects Delivered' },
  { num: '2', label: 'Azure Certs' },
]

const lines = [
  "I'm a Senior Consultant UI at Thoughtworks,",
  "working on Goldman Sachs Transaction Banking.",
  "I specialize in React, TypeScript, and Micro",
  "Frontend architectures that scale at enterprise.",
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-90px' })

  return (
    <section id="about" className="about" ref={ref}>
      <div className="section-grid" />
      <div className="about-inner">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label-num">01</span>
          <span>About</span>
        </motion.div>

        <div className="about-body">
          <div className="about-text-wrap">
            {lines.map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.p
                  className="about-line"
                  initial={{ y: '105%' }}
                  animate={inView ? { y: 0 } : { y: '105%' }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
                >
                  {line}
                </motion.p>
              </div>
            ))}

            <motion.p
              className="about-sub"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: 0.52, duration: 0.65 }}
            >
              Beyond the code, I run <strong>The Rebel Diplomat</strong> — a YouTube channel
              covering world affairs and geopolitics with 220+ videos and a growing community.
            </motion.p>

            <motion.div
              className="about-links"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.72, duration: 0.55 }}
            >
              {[
                ['GitHub', 'https://github.com/shubhambhardwaj07'],
                ['LinkedIn', 'https://www.linkedin.com/in/shubham-bhardwaj07/'],
                ['LeetCode', 'https://leetcode.com/u/shubh_bhardwaj07/'],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="about-link" data-hover>
                  {label} ↗
                </a>
              ))}
            </motion.div>
          </div>

          <div className="about-stats">
            {stats.map((s, i) => (
              <motion.div
                key={s.label} className="about-stat"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ delay: 0.24 + i * 0.09, duration: 0.65 }}
              >
                <span className="about-stat-num">{s.num}</span>
                <span className="about-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
