import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  /** 磁吸强度 0–1 */
  strength?: number
  onClick?: () => void
}

/**
 * Magnetic Button — 鼠标靠近时按钮轻微吸附移动，离开后回弹。
 * 克制使用：位移不超过 ~14px，用于 VIEW PROJECT / NEXT PROJECT 等主按钮。
 */
export default function MagneticButton({ children, className, strength = 0.3, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.3 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
