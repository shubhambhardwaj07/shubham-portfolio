import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Lamalama-exact word-by-word reveal.
 * Each word sits inside an overflow-hidden clip container.
 * The word translates from Y(110%) → Y(0%) with stagger.
 */
export default function ScrollRevealText({
  text,
  className = '',
  as: Tag = 'p',
  delay = 0,
  wordDelay = 0.07,
  duration = 0.78,
  ease = [0.76, 0, 0.24, 1],
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })

  // Split preserving spaces between words
  const words = text.split(' ')

  return (
    <Tag className={`srt-block ${className}`} ref={ref} aria-label={text}>
      {words.flatMap((word, i) => {
        const el = (
          <span key={i} className="srt-word-clip" aria-hidden>
            <motion.span
              className="srt-word"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : { y: '110%' }}
              transition={{ delay: delay + i * wordDelay, duration, ease }}
            >
              {word}
            </motion.span>
          </span>
        )
        return i < words.length - 1 ? [el, ' '] : [el]
      })}
    </Tag>
  )
}
