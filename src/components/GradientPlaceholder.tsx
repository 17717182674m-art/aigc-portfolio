import { cn } from '../lib/utils'

/** 简单的字符串哈希，让每个 seed 生成确定但不同的渐变构图 */
function hashSeed(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

type Props = {
  seed: string
  palette: string[]
  className?: string
  glyph?: string
}

/**
 * 生成式渐变占位图：用 seed 哈希驱动多层 radial-gradient + 线性渐变，
 * 叠加胶片噪点与暗角，在没有真实图片时也像一件抽象 AIGC 作品。
 * 替换为真实图片时直接用 <img> 即可。
 */
export default function GradientPlaceholder({ seed, palette, className, glyph }: Props) {
  const h = hashSeed(seed)
  const [c0, c1, c2, c3] = palette
  const p1x = 10 + (h % 50)
  const p1y = 10 + ((h >> 3) % 40)
  const p2x = 40 + ((h >> 6) % 50)
  const p2y = 50 + ((h >> 9) % 40)
  const p3x = 50 - ((h >> 12) % 45)
  const p3y = 20 + ((h >> 15) % 50)
  const angle = h % 360

  const background = [
    `radial-gradient(circle at ${p1x}% ${p1y}%, ${c1} 0%, transparent 45%)`,
    `radial-gradient(circle at ${p2x}% ${p2y}%, ${c2} 0%, transparent 50%)`,
    `radial-gradient(circle at ${p3x}% ${p3y}%, ${c3} 0%, transparent 40%)`,
    `linear-gradient(${angle}deg, ${c0}, #000 75%)`,
  ].join(', ')

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)} style={{ background }}>
      <div className="noise-overlay absolute inset-0 opacity-[0.07] mix-blend-overlay" />
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 140px rgba(0,0,0,0.75)' }} />
      {glyph && (
        <span className="font-display pointer-events-none absolute inset-0 flex items-center justify-center text-[7rem] leading-none text-white/[0.05]">
          {glyph}
        </span>
      )}
    </div>
  )
}
