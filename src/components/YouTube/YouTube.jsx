import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './YouTube.css'

const editorialPillars = [
  ['Geopolitics', 'Borderlines, alliances, power shifts, and the decisions behind them.'],
  ['Current Affairs', 'Fast-moving events translated into clear, watchable context.'],
  ['Civic Lens', 'A grounded view for people who want signal without performative outrage.'],
]

const channelStats = [
  ['220+', 'Published briefings'],
  ['417', 'Early subscribers'],
  ['07', 'Rebel signature'],
]

export default function YouTube() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '6%'])
  const markY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section id="youtube" className="youtube" ref={ref}>
      <div className="section-grid" />
      <motion.div className="yt-bg-type" style={{ y: markY }} aria-hidden>
        Briefing
      </motion.div>

      <div className="yt-inner">
        <div className="yt-top">
          <motion.div
            className="section-label"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label-num">05</span>
            <span>Beyond Code</span>
          </motion.div>

          <motion.div
            className="yt-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: 0.14, duration: 0.66, ease: [0.76, 0, 0.24, 1] }}
          >
            <span>Independent media desk</span>
            <h2>The Rebel Diplomat</h2>
            <p>
              A sharp, research-led channel for world affairs: built to make complicated
              events easier to follow without flattening the stakes.
            </p>
          </motion.div>
        </div>

        <div className="yt-stage">
          <motion.div
            className="yt-media"
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ delay: 0.22, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <img src="/rebel-diplomat-thumb.png" alt="The Rebel Diplomat channel artwork" className="yt-thumb" />
            <div className="yt-media-overlay" />
            <div className="yt-media-caption">
              <span>Field notes for a noisy world</span>
              <strong>@TheRebelDiplomat07</strong>
            </div>
          </motion.div>

          <div className="yt-console">
            <motion.div
              className="yt-brand-card"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ delay: 0.3, duration: 0.64 }}
            >
              <img src="/rebel-diplomat-logo.jpg" alt="" aria-hidden className="yt-logo" />
              <div>
                <span>Channel identity</span>
                <h3>Calm analysis, decisive framing.</h3>
              </div>
            </motion.div>

            <motion.div
              className="yt-stats"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: 0.38, duration: 0.62 }}
            >
              {channelStats.map(([value, label]) => (
                <div className="yt-stat" key={label}>
                  <span>{value}</span>
                  <p>{label}</p>
                </div>
              ))}
            </motion.div>

            <div className="yt-pillars">
              {editorialPillars.map(([title, copy], index) => (
                <motion.article
                  className="yt-pillar"
                  key={title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.46 + index * 0.08, duration: 0.56 }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{title}</h4>
                    <p>{copy}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.a
              href="https://youtube.com/@TheRebelDiplomat07"
              target="_blank"
              rel="noreferrer"
              className="yt-cta btn-primary"
              data-hover
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.74 }}
            >
              Visit Channel
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
