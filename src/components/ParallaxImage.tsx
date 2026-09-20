import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../lib/utils'

type Props = {
  children: ReactNode
  className?: string
  /** 视差幅度，默认 12% */
  speed?: number
}

/**
 * Parallax Image — 图片略高于容器（10% 上/下余量），随滚动轻微上下位移。
 */
export default function ParallaxImage({ children, className, speed = 0.1 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${Math.round(speed * 100)}%`, `${Math.round(speed * 100)}%`])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] -bottom-[10%] will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
