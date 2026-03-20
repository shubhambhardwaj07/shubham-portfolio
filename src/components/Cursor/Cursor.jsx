import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './Cursor.css'

export default function Cursor() {
  const ringRef = useRef(null)
  const mx = useMotionValue(-200), my = useMotionValue(-200)
  const sx = useSpring(mx, { damping: 26, stiffness: 200, mass: 0.6 })
  const sy = useSpring(my, { damping: 26, stiffness: 200, mass: 0.6 })

  useEffect(() => {
    // Only run on pointer-fine devices
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return

    const onMove = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', onMove, { passive: true })

    const expand = () => ringRef.current?.classList.add('expanded')
    const shrink = () => ringRef.current?.classList.remove('expanded')

    const attach = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        if (el.dataset.cursorAttached) return
        el.dataset.cursorAttached = '1'
        el.addEventListener('mouseenter', expand)
        el.addEventListener('mouseleave', shrink)
      })
    }
    attach()
    const mo = new MutationObserver(attach)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <motion.div
        ref={ringRef}
        className="c-ring"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="c-dot"
        style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}
