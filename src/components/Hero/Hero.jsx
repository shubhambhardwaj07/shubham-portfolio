import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ loaderDone }) {
  const ref = useRef(null)

  /* ═══════════════════════════════════════════════
     1. ENTRANCE — fires once loaderDone is true
     All elements start hidden; timeline reveals them
     in a coordinated sequence after the loader curtain opens.
  ═══════════════════════════════════════════════ */
  useEffect(() => {
    if (!loaderDone) return

    gsap.set('.hero-name',        { yPercent: 105 })
    gsap.set('.hero-status',      { y: 14, opacity: 0 })
    gsap.set('.hero-meta',        { y: 20, opacity: 0 })
    gsap.set('.hero-ctas',        { y: 20, opacity: 0 })
    gsap.set('.hero-bg-text',     { opacity: 0 })
    gsap.set('.hero-scroll-hint', { opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.to('.hero-status',  { y: 0, opacity: 1, duration: 0.72 }, 0.08)
    tl.to('.hero-name',    { yPercent: 0, duration: 1.05, stagger: 0.09, ease: 'expo.out' }, 0.14)
    tl.to('.hero-meta',    { y: 0, opacity: 1, duration: 0.72 }, 0.58)
    tl.to('.hero-ctas',    { y: 0, opacity: 1, duration: 0.72 }, 0.70)
    tl.to('.hero-bg-text', { opacity: 0.024, duration: 1.4, ease: 'power2.out' }, 0.22)
    tl.to('.hero-scroll-hint', { opacity: 1, duration: 0.9 }, 1.1)

    return () => tl.kill()
  }, [loaderDone])

  /* ═══════════════════════════════════════════════
     2. SCROLL PARALLAX
     Photo moves slower than scroll, content fades out —
     replaces Framer Motion useScroll/useTransform.
  ═══════════════════════════════════════════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = ref.current

      // Photo: subtle upward drift
      gsap.to('.hero-photo-wrap', {
        y: 36, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })

      // Content: drift + fade out
      gsap.to('.hero-content', {
        y: 80, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: '60% top', scrub: true },
      })
      gsap.to('.hero-content', {
        opacity: 0, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: '55% top', scrub: true },
      })

      // BG text parallax
      gsap.to('.hero-bg-text', {
        y: 52, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="hero" ref={ref}>
      <div className="section-grid hero-grid" />

      {/* Photo */}
      <div className="hero-photo-wrap">
        <img src="/profile.png" alt="Shubham Bhardwaj" className="hero-photo" />
        <div className="hero-photo-vignette" />
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-status">
          <span className="hero-status-dot" />
          <span>Open to senior frontend engagements</span>
        </div>

        <div className="hero-name-wrap">
          {['Shubham', 'Bhardwaj'].map((word) => (
            <div key={word} className="hero-name-line">
              <h1 className="hero-name">{word}</h1>
            </div>
          ))}
        </div>

        <div className="hero-meta">
          <span className="hero-role-label">Senior Frontend Developer</span>
          <span className="hero-sep">·</span>
          <span className="hero-company">Thoughtworks</span>
          <span className="hero-sep hero-sep-hide">·</span>
          <span className="hero-location hero-sep-hide">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Bangalore, India
          </span>
        </div>

        <div className="hero-ctas">
          <a href="#projects" className="btn-primary" data-hover>
            View Work
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
          <a href="#contact" className="btn-outline" data-hover>Contact Me</a>
        </div>
      </div>

      <div className="hero-bg-text" aria-hidden>SB</div>

      <div className="hero-scroll-hint" aria-hidden>
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
