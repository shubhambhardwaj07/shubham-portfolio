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
      map = L.map(mapRef.current, {
        center: [12.9716, 77.5946],
        zoom: 11,
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: false,
      })
      L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png').addTo(map)
      const icon = L.divIcon({
        html: `<div style="color:var(--text);width:28px;height:28px;display:flex;align-items:center;justify-content:center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>`,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      })
      L.marker([12.9716, 77.5946], { icon })
        .addTo(map)
        .bindPopup('Bangalore, India 🇮🇳<br/>Want to connect? Use the form! ✉️')
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
              Bangalore, India
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
