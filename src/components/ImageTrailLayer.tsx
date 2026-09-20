import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GradientPlaceholder from './GradientPlaceholder'

type TrailItem = {
  id: number
  x: number
  y: number
  seed: string
  palette: string[]
  rot: number
}

type Props = {
  /** 残影缩略图素材（seed + palette，渲染生成式渐变） */
  items: { seed: string; palette: string[] }[]
}

/**
 * Image Trail — 在标记了 [data-trail] 的区域移动鼠标时，
 * 短暂浮现作品缩略图残影并快速消散。克制版：
 * - 仅精细指针设备（触摸屏不生效）
 * - 最快每 180ms 生成一张，同时最多 4 张
 * - 约 800ms 后淡出
 */
export default function ImageTrailLayer({ items }: Props) {
  const [enabled, setEnabled] = useState(false)
  const [trails, setTrails] = useState<TrailItem[]>([])
  const idRef = useRef(0)
  const lastRef = useRef(0)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target?.closest?.('[data-trail]')) return

      const now = performance.now()
      if (now - lastRef.current < 180) return
      lastRef.current = now

      const id = ++idRef.current
      const material = items[id % items.length]
      setTrails((prev) => {
        const next = [
          ...prev,
          {
            id,
            x: e.clientX,
            y: e.clientY,
            seed: material.seed,
            palette: material.palette,
            rot: (Math.random() - 0.5) * 10,
          },
        ]
        return next.length > 4 ? next.slice(next.length - 4) : next
      })

      const timer = window.setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== id))
      }, 800)
      timersRef.current.push(timer)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      timersRef.current.forEach((t) => window.clearTimeout(t))
    }
  }, [items])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {trails.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, scale: 0.75, rotate: t.rot }}
            animate={{ opacity: 1, scale: 1, rotate: t.rot }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute h-44 w-32 overflow-hidden rounded-lg border border-white/15 shadow-[0_18px_50px_rgba(0,0,0,0.6)]"
            style={{ left: t.x - 64, top: t.y - 88 }}
          >
            <GradientPlaceholder seed={t.seed} palette={t.palette} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
