import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Hamburger.css'

const links = [
  { name: 'Home',       href: '#hero' },
  { name: 'About',      href: '#about' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Projects',   href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'YouTube',    href: '#youtube' },
  { name: 'Contact',    href: '#contact' },
]

export default function Hamburger() {
  const [open, setOpen] = useState(false)

  const toggle = (val) => {
    const next = val !== undefined ? val : !open
    setOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') toggle(false) }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    toggle(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 700)
  }

  const portalEl = document.getElementById('portal-root')

  const menu = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="hb-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => toggle(false)}
          />
          <motion.div
            className="hb-panel"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="section-grid" />
            <nav className="hb-nav">
              {links.map((link, i) => (
                <motion.div key={link.name} className="hb-item"
                  initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.08 + i * 0.055, duration: 0.44, ease: [0.76, 0, 0.24, 1] }}
                >
                  <a className="hb-link" href={link.href} data-hover onClick={(e) => handleNav(e, link.href)}>
                    <span className="hb-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="hb-name">{link.name}</span>
                    <span className="hb-arrow">↗</span>
                  </a>
                  <div className="hb-divider" />
                </motion.div>
              ))}
            </nav>
            <motion.div className="hb-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <p className="hb-footer-name">Shubham Bhardwaj</p>
              <p className="hb-footer-role">Senior Frontend Developer</p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* Hamburger — 3 lines morph to X in place */}
      <button
        className={`hb-btn ${open ? 'is-open' : ''}`}
        onClick={() => toggle()}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span className="hb-line" />
        <span className="hb-line" />
        <span className="hb-line" />
      </button>
      {portalEl && createPortal(menu, portalEl)}
    </>
  )
}
