import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SplitHeading({
  text,
  delay = 0.04,
  stagger = 0.05,
  duration = 0.7,
  className,
  as: Tag = 'h2',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -48px 0px' })

  const words = text.split(' ')

  return (
    <Tag className={className} ref={ref}>
      {words.flatMap((word, i) => {
        const el = (
          <span key={i} className="split-word">
            <motion.span
              className="split-word-inner"
              initial={{ y: '112%', skewY: 4 }}
              animate={inView ? { y: '0%', skewY: 0 } : { y: '112%', skewY: 4 }}
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
