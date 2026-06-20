import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Lamalama-exact heading reveal.
 * Each word has a clip-path container; the word slides up from Y(110%) → Y(0%).
 * No skew. No opacity. Pure masked Y translate, staggered word by word.
 */
export default function SplitHeading({
  text,
  delay = 0,
  stagger = 0.06,
  duration = 0.78,
  className,
  as: Tag = 'h2',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -48px 0px' })
  const words = text.split(' ')

  return (
    <Tag className={className} ref={ref} aria-label={text}>
      {words.flatMap((word, i) => {
        const el = (
          <span key={i} className="split-word" aria-hidden>
            <motion.span
              className="split-word-inner"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : { y: '110%' }}
              transition={{
                delay: delay + i * stagger,
                duration,
                ease: [0.76, 0, 0.24, 1],
              }}
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
