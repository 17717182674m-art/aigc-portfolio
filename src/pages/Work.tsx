import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { categories, projects, categoryLabel, type CategoryId } from '../portfolio.config'
import GradientPlaceholder from '../components/GradientPlaceholder'
import ImageTrailLayer from '../components/ImageTrailLayer'
import { cn } from '../lib/utils'

type Filter = 'all' | CategoryId

/** Image Trail 素材 */
const trailMaterials = projects.map((p) => ({ seed: p.seed, palette: p.palette }))

export default function Work() {
  const [filter, setFilter] = useState<Filter>('all')
  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section data-trail className="px-6 pb-28 pt-32 md:pb-40 md:pt-40 lg:px-16">
      <ImageTrailLayer items={trailMaterials} />
      <div className="mx-auto max-w-7xl">
        {/* 标题 */}
        <header className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 text-white/40"
          >
            <span className="font-ui text-xs tracking-[0.3em]">02</span>
            <span className="h-px w-12 bg-white/15" />
            <span className="font-ui text-xs uppercase tracking-[0.3em]">Work · 作品</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-6 text-5xl leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Works, <em className="italic text-white/60">by category</em>
          </motion.h1>
        </header>

        {/* 分类筛选 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap gap-x-2 gap-y-3 border-b border-white/10 pb-6"
        >
          {categories.map((c) => {
            const active = filter === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id as Filter)}
                className={cn(
                  'group flex items-baseline gap-1.5 rounded-full border px-4 py-1.5 font-ui text-xs transition-all duration-300',
                  active
                    ? 'border-white bg-white text-black'
                    : 'border-white/15 text-white/55 hover:border-white/40 hover:text-white',
                )}
              >
                {c.label}
                <span className={cn('text-[9px] tracking-[0.15em]', active ? 'text-black/50' : 'text-white/25')}>
                  {c.zh}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* 作品网格 — 淡入淡出 + 位移动画切换 */}
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/work/${project.id}`}
                  data-cursor="view"
                  className="group block"
                >
                  <div className={cn('relative overflow-hidden rounded-xl', project.aspect)}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="h-full w-full grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0">
                        <GradientPlaceholder seed={project.seed} palette={project.palette} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* 悬停指示 */}
                    <div className="font-ui absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/60 bg-black/30 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="font-ui text-[10px] uppercase tracking-[0.25em] text-white/50">
                        {categoryLabel[project.category]} · {project.year}
                      </div>
                      <div className="font-display mt-1 text-2xl text-white md:text-3xl">
                        {project.title}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-ui mt-12 text-xs uppercase tracking-[0.25em] text-white/30"
        >
          {filtered.length} projects · {filter === 'all' ? 'All categories' : categories.find((c) => c.id === filter)?.label}
        </motion.p>
      </div>
    </section>
  )
}
