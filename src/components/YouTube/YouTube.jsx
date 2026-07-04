import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './YouTube.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { val: '460',  label: 'Subscribers' },
  { val: '220+', label: 'Briefings' },
  { val: '3',    label: 'Pillars' },
]

const pillars = ['Geopolitics', 'Current Affairs', 'Civic Lens']

export default function YouTube() {
  const sectionRef = useRef(null)
  const blockRef   = useRef(null)

  /* ── Label entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.yt-label-row', { y: 14, opacity: 0 })
      gsap.to('.yt-label-row', {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ═══════════════════════════════════════════════
     Block: scroll-scrubbed clipPath reveal (bottom up)
     + scale settle. Replaces Framer Motion spring clip.
     scrub: 0.8 gives a slightly laggy/physics feel.
  ═══════════════════════════════════════════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(blockRef.current,
        { clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
        {
          clipPath: 'inset(0 0 0% 0)', scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: blockRef.current,
            start: 'top 92%',
            end: 'center 48%',
            scrub: 0.8,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ── Image parallax (counter-drift inside block) ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.yt-img',
        { yPercent: -8 },
        {
          yPercent: 8, ease: 'none',
          scrollTrigger: {
            trigger: blockRef.current,
            start: 'top bottom', end: 'bottom top', scrub: 1,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ── Content inside block: animate once block is ~halfway in ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.yt-handle-row', { y: 14, opacity: 0 })
      gsap.set('.yt-title-line', { yPercent: 115 })
      gsap.set('.yt-manifesto', { y: 18, opacity: 0 })
      gsap.set('.yt-stat',      { y: 22, opacity: 0 })
      gsap.set('.yt-pillar',    { x: -14, opacity: 0 })
      gsap.set('.yt-cta',       { y: 14, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: blockRef.current, start: 'top 55%', once: true },
      })

      tl.to('.yt-handle-row', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0)
      tl.to('.yt-title-line', { yPercent: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out' }, 0.1)
      tl.to('.yt-manifesto',  { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.46)
      tl.to('.yt-stat',       { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'expo.out' }, 0.56)
      tl.to('.yt-pillar',     { x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 0.7)
      tl.to('.yt-cta',        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.82)

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="youtube" className="yt-section" ref={sectionRef}>
      <div className="section-grid" />

      <div className="yt-outer">
        <div className="yt-label-row">
          <div className="section-label">
            <span className="section-label-num">05</span>
            <span>Beyond Code</span>
          </div>
          <span className="yt-kicker">Independent Media Desk</span>
        </div>

        {/* Block — clipPath scrub reveals from bottom upward */}
        <div className="yt-block" ref={blockRef}>

          {/* Left column */}
          <div className="yt-block-left">
            <div className="yt-block-left-top">
              <div className="yt-handle-row">
                <span className="yt-badge-mark" aria-hidden>RD</span>
                <span className="yt-handle">@TheRebelDiplomat07</span>
              </div>

              <h2 className="yt-title">
                <span className="yt-title-hline"><span className="yt-title-line">The Rebel</span></span>
                <span className="yt-title-hline"><span className="yt-title-line">Diplomat</span></span>
              </h2>

              <p className="yt-manifesto">
                Calm analysis. Decisive framing. Making complicated world events legible
                without flattening what's actually at stake.
              </p>
            </div>

            <div className="yt-block-left-foot">
              <div className="yt-stats">
                {stats.map(({ val, label }) => (
                  <div className="yt-stat" key={label}>
                    <span className="yt-stat-val">{val}</span>
                    <span className="yt-stat-label">{label}</span>
                  </div>
                ))}
              </div>

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
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right column — image */}
          <div className="yt-block-right">
            <img
              src="/rebel-diplomat-logo.jpg"
              alt="The Rebel Diplomat"
              className="yt-img"
            />
            <div className="yt-img-overlay" />
            <div className="yt-img-dateline" aria-hidden>Field notes for a noisy world</div>
          </div>
        </div>
      </div>
    </section>
  )
}
