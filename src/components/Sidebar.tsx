import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { artist, navItems } from '../portfolio.config'
import { cn } from '../lib/utils'

export default function Sidebar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  // 路由变化时关闭移动端菜单
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      {/* 桌面端左侧导航轨 */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[260px] flex-col justify-between border-r border-white/5 bg-black/40 p-8 backdrop-blur-xl lg:flex">
        <Brand />
        <NavList pathname={pathname} />
        <StatusBlock />
      </aside>

      {/* 移动端顶栏 */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-black/60 px-5 py-4 backdrop-blur-xl lg:hidden">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-display flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white">
            {artist.monogram}
          </span>
          <span className="font-display text-lg text-white">{artist.name}</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="打开菜单"
          className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full text-white"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <AnimatePresence>
        {open && <MobileNav pathname={pathname} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="font-display flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl text-white">
        {artist.monogram}
      </span>
      <div className="leading-tight">
        <div className="font-display text-lg text-white">{artist.name}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">AIGC Portfolio</div>
      </div>
    </Link>
  )
}

function NavList({ pathname }: { pathname: string }) {
  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active = pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'group relative flex items-center gap-4 rounded-xl px-3 py-2.5 transition-colors',
              active ? 'text-white' : 'text-white/45 hover:text-white/90',
            )}
          >
            <span
              className={cn(
                'absolute left-0 top-1/2 h-5 w-px -translate-y-1/2 bg-white transition-opacity',
                active ? 'opacity-100' : 'opacity-0',
              )}
            />
            <span className="text-[10px] tabular-nums tracking-[0.2em] text-white/40">
              {item.index}
            </span>
            <span className="flex flex-col">
              <span className="font-display text-base leading-none">{item.label}</span>
              <span className="mt-0.5 text-[10px] tracking-[0.15em] text-white/30">{item.zh}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

function StatusBlock() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs text-white/50">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Available for work
      </div>
      <div className="flex flex-wrap gap-2">
        {artist.socials.slice(0, 3).map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="liquid-glass rounded-full px-3 py-1.5 text-[10px] tracking-[0.15em] text-white/70 transition-colors hover:text-white"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  )
}

function MobileNav({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-2xl lg:hidden"
    >
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <span className="font-display text-lg text-white">{artist.name}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭菜单"
          className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
        {navItems.map((item, i) => {
          const active = pathname === item.path
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i + 0.1 }}
            >
              <Link
                to={item.path}
                className={cn(
                  'flex items-baseline gap-4 border-b border-white/5 py-4',
                  active ? 'text-white' : 'text-white/50',
                )}
              >
                <span className="text-xs tracking-[0.2em] text-white/30">{item.index}</span>
                <span className="font-display text-4xl">{item.label}</span>
                <span className="ml-auto text-xs text-white/30">{item.zh}</span>
              </Link>
            </motion.div>
          )
        })}
      </nav>
    </motion.div>
  )
}
