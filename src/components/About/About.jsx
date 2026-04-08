import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './About.css'

const words = ['Architect.', 'Engineer.', 'Creator.', 'Thinker.']

function SplitText({ text, inView, baseDelay = 0, className }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} className="ab-char-clip" aria-hidden>
          <motion.span
            className="ab-char"
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : { y: '110%' }}
            transition={{
              delay: baseDelay + i * 0.022,
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const lineW  = useTransform(scrollYProgress, [0.05, 0.35], ['0%', '100%'])
  const line2W = useTransform(scrollYProgress, [0.15, 0.55], ['0%', '100%'])
  const subY   = useTransform(scrollYProgress, [0.1, 0.4], [40, 0])
  const subOp  = useTransform(scrollYProgress, [0.1, 0.35], [0, 1])
  const wordX  = useTransform(scrollYProgress, [0.3, 0.8], ['0%', '-35%'])

  return (
    <section id="about" className="ab-section" ref={ref}>
      <div className="section-grid" />

      <div className="ab-inner">

        {/* ── LABEL ── */}
        <motion.div className="section-label"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label-num">01</span>
          <span>About</span>
        </motion.div>

        {/* ── MASSIVE IDENTITY STATEMENT ── */}
        <div className="ab-hero-text">
          <div className="ab-line-wrap">
            <SplitText
              text="Senior"
              inView={inView}
              baseDelay={0.05}
              className="ab-word ab-word-light"
            />
            <SplitText
              text="Consultant"
              inView={inView}
              baseDelay={0.22}
              className="ab-word ab-word-bold"
            />
          </div>
          <div className="ab-line-wrap">
            <SplitText
              text="UI"
              inView={inView}
              baseDelay={0.42}
              className="ab-word ab-word-outlined"
            />
            <SplitText
              text="Engineer"
              inView={inView}
              baseDelay={0.54}
              className="ab-word ab-word-bold"
            />
          </div>
        </div>

        {/* ── SCROLL-DRIVEN WIPE LINE ── */}
        <div className="ab-rule-wrap">
          <motion.div className="ab-rule" style={{ width: lineW }} />
        </div>

        {/* ── MIDDLE ROW: paragraph left, scrolling words right ── */}
        <div className="ab-mid">
          <motion.div className="ab-para-block" style={{ y: subY, opacity: subOp }}>
            <p className="ab-para">
              7 years building the invisible infrastructure
              that powers Goldman Sachs Transaction Banking.
              Micro-frontends, performance budgets, design systems
              at scale — shipped in production across 8+ teams.
            </p>
            <p className="ab-para ab-para-2">
              I care deeply about developer experience,
              clean architecture, and the craft of writing
              code that outlasts the engineer who wrote it.
            </p>
            <div className="ab-links">
              {[
                ['GitHub',   'https://github.com/shubhambhardwaj07'],
                ['LinkedIn', 'https://www.linkedin.com/in/shubham-bhardwaj07/'],
                ['LeetCode', 'https://leetcode.com/u/shubh_bhardwaj07/'],
                ['YouTube',  'https://youtube.com/@TheRebelDiplomat07'],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="ab-link" data-hover>
                  {label}
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
                    stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M2 10L10 2M10 2H4M10 2v6"/>
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* horizontally drifting identity words */}
          <div className="ab-words-track-wrap" aria-hidden>
            <motion.div className="ab-words-track" style={{ x: wordX }}>
              {[...words, ...words].map((w, i) => (
                <motion.span
                  key={i}
                  className="ab-drift-word"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: i % 2 === 0 ? 1 : 0.22 } : { opacity: 0 }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.6 }}
                >
                  {w}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── SECOND WIPE LINE ── */}
        <div className="ab-rule-wrap">
          <motion.div className="ab-rule" style={{ width: line2W }} />
        </div>

        {/* ── BOTTOM ROW: 4 bold facts ── */}
        <div className="ab-facts">
          {[
            { num: '7+',   label: 'Years',     sub: 'of production engineering' },
            { num: '3',    label: 'Companies', sub: 'TCS · Publicis · Thoughtworks' },
            { num: '10+',  label: 'Projects',  sub: 'shipped at enterprise scale' },
            { num: 'GS',   label: 'Goldman',   sub: 'Sachs Transaction Banking' },
          ].map((f, i) => (
            <motion.div key={f.label} className="ab-fact"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ delay: 0.45 + i * 0.09, duration: 0.65, ease: [0.76,0,0.24,1] }}
            >
              <span className="ab-fact-num">{f.num}</span>
              <span className="ab-fact-label">{f.label}</span>
              <span className="ab-fact-sub">{f.sub}</span>
            </motion.div>
          ))}
        </div>

        {/* availability */}
        <motion.div className="ab-avail"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
        >
          <span className="ab-avail-dot" />
          Available for new opportunities
        </motion.div>
      </div>
    </section>
  )
}