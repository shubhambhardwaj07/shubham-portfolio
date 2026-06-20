import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import SplitHeading from '../../utils/SplitHeading'
import ScrollRevealText from '../../utils/ScrollRevealText'
import './YouTube.css'

const stats = [
  { val: '460',  label: 'Subscribers' },
  { val: '220+', label: 'Briefings' },
  { val: '3',    label: 'Pillars' },
]

const pillars = ['Geopolitics', 'Current Affairs', 'Civic Lens']

export default function YouTube() {
  const sectionRef = useRef(null)
  const blockRef   = useRef(null)
  const labelInView = useInView(sectionRef, { once: true })

  /* Scroll-scrubbed block entrance: plays over a long range so the reveal
     feels unhurried — section enters bottom of viewport, finishes once
     the block is settled comfortably in view (~40% from top). */
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ['start end', 'center center'],
  })

  /* ordernchaos: top-down unfold — top edge visible first, bottom reveals as you scroll */
  const rawClip = useTransform(scrollYProgress, [0, 1], [100, 0])
  const springClip = useSpring(rawClip, { stiffness: 55, damping: 18, restDelta: 0.001 })
  const clipPath = useTransform(springClip, v => `inset(0 0 ${v}% 0)`)

  /* Slight scale: feels like block "settles" as it unfolds */
  const rawScale = useTransform(scrollYProgress, [0, 1], [1.06, 1])
  const springScale = useSpring(rawScale, { stiffness: 55, damping: 18 })


  /* Image parallax inside the block (counter-moves slightly) */
  const { scrollYProgress: imgProgress } = useScroll({
    target: blockRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(imgProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="youtube" className="yt-section" ref={sectionRef}>
      <div className="section-grid" />

      {/* Section label — fades in independently above the block */}
      <div className="yt-outer">
        <motion.div
          className="yt-label-row"
          initial={{ opacity: 0, y: 14 }}
          animate={labelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="section-label">
            <span className="section-label-num">05</span>
            <span>Beyond Code</span>
          </div>
          <span className="yt-kicker">Independent Media Desk</span>
        </motion.div>

        {/* ── THE BLOCK — scroll-scrubbed entrance ── */}
        <motion.div
          className="yt-block"
          ref={blockRef}
          style={{ clipPath, scale: springScale }}
        >
          {/* Left column — identity */}
          <div className="yt-block-left">
            <div className="yt-block-left-top">
              <div className="yt-handle-row">
                <span className="yt-badge-mark" aria-hidden>RD</span>
                <span className="yt-handle">@TheRebelDiplomat07</span>
              </div>

              <SplitHeading
                text="The Rebel Diplomat"
                as="h2"
                className="yt-title"
                delay={0.02}
                stagger={0.04}
                duration={0.75}
              />

              <ScrollRevealText
                text="Calm analysis. Decisive framing. Making complicated world events legible without flattening what's actually at stake."
                className="yt-manifesto"
                delay={0.1}
                wordDelay={0.05}
                duration={0.72}
              />
            </div>

            <div className="yt-block-left-foot">
              {/* Stats row */}
              <div className="yt-stats">
                {stats.map(({ val, label }) => (
                  <div className="yt-stat" key={label}>
                    <span className="yt-stat-val">{val}</span>
                    <span className="yt-stat-label">{label}</span>
                  </div>
                ))}
              </div>

              {/* Pillars */}
              <div className="yt-pillars">
                {pillars.map((p, i) => (
                  <span key={p} className="yt-pillar">
                    <span className="yt-pillar-num">{String(i + 1).padStart(2, '0')}</span>
                    {p}
                  </span>
                ))}
              </div>

              <a
                href="https://youtube.com/@TheRebelDiplomat07"
                target="_blank"
                rel="noreferrer"
                className="yt-cta btn-primary"
                data-hover
              >
                Watch the channel
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right column — image */}
          <div className="yt-block-right">
            <motion.img
              src="/rebel-diplomat-logo.jpg"
              alt="The Rebel Diplomat"
              className="yt-img"
              style={{ y: imgY }}
            />
            <div className="yt-img-overlay" />
            <div className="yt-img-dateline" aria-hidden>Field notes for a noisy world</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
