import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Hero.css'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacityContent = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const yBgText = useTransform(scrollYProgress, [0, 1], [0, 50])
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section id="hero" className="hero" ref={ref}>
      {/* Grid — full width, always on top of photo */}
      <div className="section-grid hero-grid" />

      {/* Photo — NO background, just the image + vignette */}
      <motion.div className="hero-photo-wrap" style={{ y: yPhoto }}>
        <img
          src="/profile.png"
          alt="Shubham Bhardwaj"
          className="hero-photo"
        />
        {/* Vignette fades photo into bg */}
        <div className="hero-photo-vignette" />
      </motion.div>

      <motion.div
        className="hero-content"
        style={{ y: yContent, opacity: opacityContent }}
      >
        <motion.div
          className="hero-status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="hero-status-dot" />
          <span>Available for opportunities</span>
        </motion.div>

        <div className="hero-name-wrap">
          {['Shubham', 'Bhardwaj'].map((word, i) => (
            <div key={word} className="hero-name-line">
              <motion.h1
                className="hero-name"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.28 + i * 0.1, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.div
          className="hero-meta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="hero-role-label">Senior Consultant UI</span>
          <span className="hero-sep">·</span>
          <span className="hero-company">Thoughtworks</span>
          <span className="hero-sep hero-sep-hide">·</span>
          <span className="hero-location hero-sep-hide">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Bangalore, India
          </span>
        </motion.div>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.82, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <a href="#projects" className="btn-primary" data-hover>
            View Work
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
          <a href="#contact" className="btn-outline" data-hover>Contact Me</a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-bg-text"
        style={{ y: yBgText }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ delay: 0.4, duration: 1.2 }}
      >
        SB
      </motion.div>

      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
