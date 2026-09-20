import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * 全局自定义光标
 * - 默认：小圆点 + 极弱的柔和光晕（Cursor Glow）
 * - 悬停 [data-cursor="view"] 区域：放大为圆环并显示 "VIEW"
 * - 悬停 [data-cursor="play"] 区域：显示 "PLAY"
 * - 仅精细指针设备（触摸屏自动隐藏，不影响移动端可用性）
 */
type Mode = 'default' | 'view' | 'play'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<Mode>('default')

  // 小圆点：高刚度，紧贴鼠标
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const dotXSpring = useSpring(dotX, { stiffness: 1400, damping: 70 })
  const dotYSpring = useSpring(dotY, { stiffness: 1400, damping: 70 })

  // 光晕与圆环：低刚度，缓慢跟随形成拖影
  const ringX = useMotionValue(-100)
  const ringY = useMotionValue(-100)
  const ringXSpring = useSpring(ringX, { stiffness: 240, damping: 28, mass: 0.6 })
  const ringYSpring = useSpring(ringY, { stiffness: 240, damping: 28, mass: 0.6 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
      setVisible(true)

      const el = e.target as HTMLElement | null
      const tagged = el?.closest?.('[data-cursor]') as HTMLElement | null
      const next = tagged?.dataset.cursor as Mode | undefined
      setMode(next === 'view' || next === 'play' ? next : 'default')
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [dotX, dotY, ringX, ringY])

  if (!enabled) return null

  const ringActive = mode !== 'default'

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
      {/* Cursor Glow — 极弱柔和光晕 */}
      <motion.div
        className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] mix-blend-screen blur-2xl"
        style={{ left: ringXSpring, top: ringYSpring, opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      {/* VIEW / PLAY 圆环 */}
      <motion.div
        className="absolute flex h-[74px] w-[74px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/20 backdrop-blur-sm"
        style={{ left: ringXSpring, top: ringYSpring, opacity: visible && ringActive ? 1 : 0 }}
        animate={{ scale: ringActive ? 1 : 0.4 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-ui text-[10px] font-medium tracking-[0.35em] text-white">
          {mode === 'view' ? 'VIEW' : 'PLAY'}
        </span>
      </motion.div>

      {/* 中心小圆点 */}
      <motion.div
        className="absolute h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ left: dotXSpring, top: dotYSpring, opacity: visible ? 1 : 0 }}
        animate={{ scale: ringActive ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}
