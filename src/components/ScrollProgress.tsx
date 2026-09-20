import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Scroll Progress — 页面顶部的极细阅读进度条（项目详情页使用）。
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="scroll-progress-bar fixed inset-x-0 top-0 z-[90] h-[2px] bg-white/70"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
