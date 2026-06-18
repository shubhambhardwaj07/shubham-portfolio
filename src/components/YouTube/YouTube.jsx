import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import SplitHeading from '../../utils/SplitHeading'
import './YouTube.css'

const editorialPillars = [
  { area: 'Geopolitics', desc: 'Borderlines, alliances, power shifts.' },
  { area: 'Current Affairs', desc: 'Fast-moving events made legible.' },
  { area: 'Civic Lens', desc: 'Signal without performative outrage.' },
]

const channelStats = [
  ['460', 'Subscribers'],
  ['220+', 'Briefings'],
  ['3', 'Pillars'],
]

export default function YouTube() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="youtube" className="yt-section" ref={ref}>
      <div className="section-grid" />

      <div className="yt-inner">

        {/* ── HEADER BAR ── */}
        <div className="yt-header-bar">
          <motion.div
            className="section-label"
            style={{ marginBottom: 0 }}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-label-num">05</span>
            <span>Beyond Code</span>
          </motion.div>
          <motion.span
            className="yt-kicker"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Independent Media Desk
          </motion.span>
        </div>

        {/* ── CINEMA — full-width image ── */}
        <motion.div
          className="yt-cinema"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ delay: 0.18, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src="/rebel-diplomat-logo.jpg"
            alt="The Rebel Diplomat"
            className="yt-cinema-img"
            style={{ y: imgY }}
          />
          <div className="yt-cinema-overlay" />

          {/* Top-right dateline */}
          <div className="yt-cinema-dateline" aria-hidden>
            Field notes for a noisy world
          </div>

          {/* Bottom badge */}
          <div className="yt-cinema-badge">
            <div className="yt-badge-mark" aria-hidden>RD</div>
            <div className="yt-badge-info">
              <span>The Rebel Diplomat</span>
              <p>@TheRebelDiplomat07</p>
            </div>
          </div>
        </motion.div>

        {/* ── EDITORIAL GRID — 3 columns below image ── */}
        <div className="yt-editorial">

          {/* Col 1 — Channel identity */}
          <div className="yt-col yt-col-id">
            <SplitHeading
              text="The Rebel Diplomat"
              delay={0.04}
              stagger={0.07}
              duration={0.72}
              className="yt-id-heading"
            />
            <motion.p
              className="yt-id-sub"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.5, duration: 0.55 }}
            >
              A research-led briefing channel for world affairs.
            </motion.p>
          </div>

          {/* Col 2 — Brief + stats */}
          <div className="yt-col yt-col-brief">
            <motion.blockquote
              className="yt-manifesto"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: 0.34, duration: 0.62 }}
            >
              Calm analysis. Decisive framing. Making complicated events legible without flattening what's actually at stake.
            </motion.blockquote>

            <motion.div
              className="yt-stats"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.55 }}
            >
              {channelStats.map(([value, label]) => (
                <div className="yt-stat" key={label}>
                  <span>{value}</span>
                  <p>{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Col 3 — Coverage + CTA */}
          <div className="yt-col yt-col-coverage">
            <div className="yt-areas">
              {editorialPillars.map(({ area, desc }, i) => (
                <motion.div
                  className="yt-area"
                  key={area}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                  transition={{ delay: 0.38 + i * 0.08, duration: 0.5 }}
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{area}</h4>
                    <p>{desc}</p>
                  </div>
                </motion.div>
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
              transition={{ delay: 0.7 }}
            >
              Watch the channel
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  )
}
