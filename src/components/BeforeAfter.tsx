import { useCallback, useRef, useState } from 'react'
import GradientPlaceholder from './GradientPlaceholder'

type Props = {
  /** 底层 = After（最终视觉），上层 = Before（AI 原始生成） */
  beforeSeed: string
  afterSeed: string
  beforePalette: string[]
  afterPalette: string[]
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

/**
 * Before / After 对比 — 鼠标左右拖动（或悬停）查看 AI 原始生成与最终视觉的差异。
 */
export default function BeforeAfter({
  beforeSeed,
  afterSeed,
  beforePalette,
  afterPalette,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className,
}: Props) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const pct = ((clientX - rect.left) / rect.width) * 100
      setPos(Math.min(96, Math.max(4, pct)))
    },
    [],
  )

  return (
    <div
      ref={containerRef}
      data-cursor="view"
      className={`group relative select-none overflow-hidden rounded-2xl ${className ?? ''}`}
      onPointerDown={(e) => {
        draggingRef.current = true
        ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
        updateFromClientX(e.clientX)
      }}
      onPointerMove={(e) => {
        if (draggingRef.current) updateFromClientX(e.clientX)
      }}
      onPointerUp={() => {
        draggingRef.current = false
      }}
      onPointerLeave={() => {
        draggingRef.current = false
      }}
    >
      {/* After（底层） */}
      <GradientPlaceholder seed={afterSeed} palette={afterPalette} className="absolute inset-0" />
      <span className="font-ui absolute bottom-4 right-4 z-20 rounded-full bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Before（上层，按 pos 裁剪） */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <GradientPlaceholder seed={beforeSeed} palette={beforePalette} className="absolute inset-0" />
        <span className="font-ui absolute bottom-4 left-4 z-20 rounded-full bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm">
          {beforeLabel}
        </span>
      </div>

      {/* 分隔手柄 */}
      <div className="absolute inset-y-0 z-10 w-px bg-white/70" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/40 backdrop-blur-sm">
          <span className="font-ui text-[9px] tracking-[0.2em] text-white">↔</span>
        </div>
      </div>
    </div>
  )
}
