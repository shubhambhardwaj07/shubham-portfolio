import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import './Contact.css'

function MapComponent() {
  const mapRef = useRef(null)
  const instanceRef = useRef(null)
  useEffect(() => {
    let map = null
    const init = async () => {
      const L = (await import('leaflet')).default
      if (instanceRef.current || !mapRef.current) return

      // Amritsar coordinates
      const AMRITSAR = [31.6340, 74.8723]

      map = L.map(mapRef.current, {
        center: AMRITSAR,
        zoom: 4,
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: false,
      })

      // Stadia Maps Stamen Toner — same as Project-Alfa, works deployed
      L.tileLayer(
        'https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png?api_key=8523e48c-69a1-4363-a608-2ac1fa9d60ce',
        { maxZoom: 20 }
      ).addTo(map)

      // Exact person SVG pin from Project-Alfa with pulsing rings
      // Dark mode = grey map → dark pin. Light mode = inverted (black) map → light pin
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      const outerColor = isLight ? '#d4d0c8' : '#1c1c1e'
      const innerColor = isLight ? '#9a968f' : '#363638'
      const bodyColor  = isLight ? '#d4d0c8' : '#1c1c1e'

      const svg = `<svg id="mePin" xmlns="http://www.w3.org/2000/svg" width="43.3" height="42.4" viewBox="0 0 43.3 42.4">
        <style>
          .ring_outer { animation: opacityPulse 2s cubic-bezier(1,0.14,1,1) infinite; opacity:0.5; }
          .ring_inner { animation: opacityPulse 2s cubic-bezier(0.4,0.74,0.56,0.82) infinite; opacity:0.8; }
          @keyframes opacityPulse { 0%{opacity:0.1} 50%{opacity:1} 100%{opacity:0.1} }
        </style>
        <path class="ring_outer" fill="${outerColor}" d="M28.6 23c6.1 1.4 10.4 4.4 10.4 8 0 4.7-7.7 8.6-17.3 8.6-9.6 0-17.4-3.9-17.4-8.6 0-3.5 4.2-6.5 10.3-7.9.7-.1-.4-1.5-1.3-1.3C5.5 23.4 0 27.2 0 31.7c0 6 9.7 10.7 21.7 10.7s21.6-4.8 21.6-10.7c0-4.6-5.7-8.4-13.7-10-.8-.2-1.8 1.2-1 1.4z"/>
        <path class="ring_inner" fill="${innerColor}" d="M27 25.8c2 .7 3.3 1.8 3.3 3 0 2.2-3.7 3.9-8.3 3.9-4.6 0-8.3-1.7-8.3-3.8 0-1 .8-1.9 2.2-2.6.6-.3-.3-2-1-1.6-2.8 1-4.6 2.7-4.6 4.6 0 3.2 5.1 5.7 11.4 5.7 6.2 0 11.3-2.5 11.3-5.7 0-2-2.1-3.9-5.4-5-.7-.1-1.2 1.3-.7 1.5z"/>
        <path d="M21.6 8.1a4 4 0 0 0 4-4 4 4 0 0 0-4-4.1 4.1 4.1 0 0 0-4.1 4 4 4 0 0 0 4 4.1zm4.9 8v-3.7c0-1.2-.6-2.2-1.7-2.6-1-.4-1.9-.6-2.8-.6h-.9c-1 0-2 .2-2.8.6-1.2.4-1.8 1.4-1.8 2.6V16c0 .9 0 2 .2 2.8.2.8.8 1.5 1 2.3l.2.3.4 1 .1.8.2.7.6 3.6c-.6.3-.9.7-.9 1.2 0 .9 1.4 1.7 3.2 1.7 1.8 0 3.2-.8 3.2-1.7 0-.5-.3-.9-.8-1.2l.6-3.6.1-.7.2-.8.3-1 .1-.3c.3-.8 1-1.5 1.1-2.3.2-.8.2-2 .2-2.8z" fill="${bodyColor}"/>
      </svg>`

      const icon = L.divIcon({
        className: 'leaflet-data-marker',
        html: svg,
        iconAnchor: [22, 28],
        iconSize: [26, 32],
        popupAnchor: [0, -30],
      })

      L.marker(AMRITSAR, { icon })
        .addTo(map)
        .bindPopup('<strong>Amritsar, Punjab</strong><br/>Shubham\'s hometown 🇮🇳')

      instanceRef.current = map
    }
    init()
    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove()
        instanceRef.current = null
      }
    }
  }, [])

  return <div ref={mapRef} className="contact-map" />
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', message: '' })
    }, 3500)
  }

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="section-grid" />
      <div className="contact-inner">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-label-num">06</span>
          <span>Contact</span>
        </motion.div>

        <div style={{ overflow: 'hidden', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <motion.h2
            className="contact-heading"
            initial={{ y: '105%' }}
            animate={inView ? { y: 0 } : { y: '105%' }}
            transition={{ delay: 0.1, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            Let's build<br />something great.
          </motion.h2>
        </div>

        <div className="contact-body">
          <motion.div
            className="contact-map-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ delay: 0.28, duration: 0.75 }}
          >
            <MapComponent />
            <div className="contact-map-label">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Amritsar, India
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ delay: 0.38, duration: 0.75 }}
          >
            {sent ? (
              <motion.div
                className="contact-success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="contact-success-icon">✓</div>
                <p>Message sent!<br />I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {[
                  { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key} className="form-field">
                    <label className="form-label">{label}</label>
                    <input
                      className="form-input" type={type} required
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    />
                  </div>
                ))}
                <div className="form-field">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-textarea" required rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <button className="form-submit" type="submit" data-hover>
                  Send Message
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
            )}

            <div className="contact-info">
              {[
                { label: 'Email', text: 'Shubham998845@gmail.com', href: 'mailto:Shubham998845@gmail.com' },
                { label: 'GitHub', text: 'shubhambhardwaj07', href: 'https://github.com/shubhambhardwaj07' },
                { label: 'LinkedIn', text: 'shubham-bhardwaj07', href: 'https://www.linkedin.com/in/shubham-bhardwaj07/' },
              ].map(({ label, text, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="contact-info-item" data-hover>
                  <span className="contact-info-label">{label}</span>
                  <span>{text}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="contact-footer">
        <span>© 2025 Shubham Bhardwaj</span>
        <span>Senior Frontend Developer</span>
      </div>
    </section>
  )
}