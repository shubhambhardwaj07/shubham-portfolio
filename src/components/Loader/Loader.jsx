import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Loader.css'

const greetings = [
  { word: 'Namaste', lang: 'Hindi' },
  { word: 'Hola',    lang: 'Spanish' },
  { word: 'Bonjour', lang: 'French' },
  { word: 'Ciao',    lang: 'Italian' },
  { word: 'こんにちは', lang: 'Japanese' },
  { word: 'Hello',   lang: 'English' },
]

const WORD_HOLD = 900
const WORD_EXIT = 420

export default function Loader({ onComplete }) {
  const [index,       setIndex]       = useState(0)
  const [exiting,     setExiting]     = useState(false)
  const [curtainOpen, setCurtainOpen] = useState(false)
  const [done,        setDone]        = useState(false)
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return

    if (index < greetings.length - 1) {
      const t = setTimeout(() => setIndex(i => i + 1), WORD_HOLD + WORD_EXIT)
      return () => clearTimeout(t)
    }

    const t1 = setTimeout(() => setExiting(true),     WORD_HOLD)
    const t2 = setTimeout(() => setCurtainOpen(true), WORD_HOLD + 350)
    const t3 = setTimeout(() => {
      fired.current = true
      onComplete()
      setTimeout(() => setDone(true), 50)
    }, WORD_HOLD + 350 + 1000)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [index])

  if (done) return null

  return (
    <div
      className="ldr-root"
      style={{
        /* Once curtains start opening, make loader bg transparent
           so the REAL page content shows through behind the curtains */
        background: curtainOpen ? 'transparent' : 'var(--bg)',
        transition: 'background 0s',
        pointerEvents: curtainOpen ? 'none' : 'all',
      }}
    >
      {/* Grid + face only visible while curtains are still closed */}
      {!curtainOpen && (
        <>
          <div className="section-grid" />
          <div className="ldr-face" aria-hidden>
            <img src="/rebel-diplomat-channel.png" alt="" className="ldr-face-img" />
            <div className="ldr-face-vignette" />
          </div>
        </>
      )}

      {/* Left curtain */}
      <motion.div
        className="ldr-curtain ldr-cl"
        animate={{ scaleX: curtainOpen ? 0 : 1 }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: 0 }}
      />
      {/* Right curtain */}
      <motion.div
        className="ldr-curtain ldr-cr"
        animate={{ scaleX: curtainOpen ? 0 : 1 }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />

      {/* Text content */}
      <motion.div
        className="ldr-body"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="ldr-clip">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              className="ldr-word"
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-105%' }}
              transition={{ duration: WORD_EXIT / 1000, ease: [0.76, 0, 0.24, 1] }}
            >
              {greetings[index].word}
            </motion.span>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={`lang-${index}`}
            className="ldr-lang"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.18 }}
          >
            {greetings[index].lang}
          </motion.p>
        </AnimatePresence>

        <div className="ldr-bar-track">
          <motion.div
            className="ldr-bar"
            animate={{ scaleX: (index + 1) / greetings.length }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      <motion.p
        className="ldr-counter"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        {String(index + 1).padStart(2, '0')} / {String(greetings.length).padStart(2, '0')}
      </motion.p>
    </div>
  )
}
