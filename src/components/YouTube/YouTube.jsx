import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './YouTube.css'

export default function YouTube() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="youtube" className="youtube" ref={ref}>
      <div className="section-grid" />

      {/* Full-bleed cinematic image with overlay — same bg tone */}
      <div className="yt-scene">
        <motion.div className="yt-scene-img-wrap" style={{ y: imgY }}>
          <img
            src="/rebel-diplomat-thumb.png"
            alt=""
            className="yt-scene-img"
            aria-hidden
          />
        </motion.div>
        {/* Three-layer overlay to pull it into 2-tone */}
        <div className="yt-scene-overlay-base" />
        <div className="yt-scene-overlay-gradient" />
        <div className="yt-scene-overlay-top" />
      </div>

      <div className="yt-inner">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label-num">05</span>
          <span>Beyond Code</span>
        </motion.div>

        <div className="yt-body">
          {/* Left col — all text */}
          <div className="yt-text">
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="yt-title"
                initial={{ y: '105%' }}
                animate={inView ? { y: 0 } : { y: '105%' }}
                transition={{ delay: 0.15, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
              >
                The Rebel<br />Diplomat
              </motion.h2>
            </div>

            <motion.p
              className="yt-desc"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: 0.42, duration: 0.65 }}
            >
              World affairs, geopolitics and current events —
              cutting through the noise with sharp perspective and insight.
            </motion.p>

            <motion.div
              className="yt-stats"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: 0.54, duration: 0.65 }}
            >
              {[['220+', 'Videos'], ['417', 'Subscribers'], ['∞', 'Growing']].map(([n, l], i) => (
                <div key={l} style={{ display: 'contents' }}>
                  {i > 0 && <div className="yt-stat-div" />}
                  <div className="yt-stat">
                    <span className="yt-stat-num">{n}</span>
                    <span className="yt-stat-label">{l}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="https://youtube.com/@TheRebelDiplomat07"
              target="_blank" rel="noreferrer"
              className="yt-cta btn-primary" data-hover
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.72 }}
            >
              Visit Channel
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </motion.a>
          </div>

          {/* Right col — channel handle + logo mark */}
          <motion.div
            className="yt-right"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <div className="yt-handle">@TheRebelDiplomat07</div>
            <div className="yt-channel-meta">
              <span>YouTube · World Affairs</span>
              <span>Geopolitics · Current Events</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
