import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Hamburger.css'

const links = [
  { name: 'Home',       href: '#hero' },
  { name: 'About',      href: '#about' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Work',       href: '#projects' },
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
    document.body.classList.toggle('menu-open', next)
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') toggle(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    toggle(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 750)
  }

  const portalEl = document.getElementById('portal-root')

  const menu = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="hb-overlay"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="section-grid" />

          <div className="hb-inner">
            {/* Left — big nav links */}
            <nav className="hb-nav">
              {links.map((link, i) => (
                <div key={link.name} className="hb-item">
                  {/* clip mask per item */}
                  <div className="hb-item-clip">
                    <motion.a
                      className="hb-link"
                      href={link.href}
                      onClick={(e) => handleNav(e, link.href)}
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%' }}
                      transition={{
                        delay: 0.18 + i * 0.06,
                        duration: 0.65,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                    >
                      <span className="hb-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="hb-name">{link.name}</span>
                      <span className="hb-arrow" aria-hidden>↗</span>
                    </motion.a>
                  </div>
                  <motion.div
                    className="hb-divider"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ delay: 0.22 + i * 0.06, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  />
                </div>
              ))}
            </nav>

            {/* Right — details column */}
            <motion.aside
              className="hb-aside"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.55 }}
            >
              <div className="hb-aside-block">
                <p className="hb-aside-label">Role</p>
                <p className="hb-aside-val">Senior Frontend Developer</p>
              </div>
              <div className="hb-aside-block">
                <p className="hb-aside-label">Company</p>
                <p className="hb-aside-val">Thoughtworks</p>
              </div>
              <div className="hb-aside-block">
                <p className="hb-aside-label">Based in</p>
                <p className="hb-aside-val">Bangalore, India</p>
              </div>
              <div className="hb-aside-block">
                <p className="hb-aside-label">Status</p>
                <p className="hb-aside-val hb-available">
                  <span className="hb-dot" />
                  Open to senior roles
                </p>
              </div>
            </motion.aside>
          </div>

          {/* Footer */}
          <motion.div
            className="hb-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.65, duration: 0.45 }}
          >
            <span className="hb-footer-name">Shubham Bhardwaj</span>
            <div className="hb-footer-links">
              <a href="https://github.com/shubhambhardwaj07" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/shubham-bhardwaj07/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://leetcode.com/u/shubh_bhardwaj07/" target="_blank" rel="noreferrer">LeetCode</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
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
