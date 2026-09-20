import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
}

/**
 * Text Reveal — 整行文本从下方 110% 滑入，配合 overflow-hidden 形成
 * 「编辑排版」式的逐行揭示效果。
 */
export default function TextReveal({ children, className, delay = 0, once = true }: Props) {
  return (
    <span className={cn('block overflow-hidden', className)}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once, margin: '-40px' }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}
