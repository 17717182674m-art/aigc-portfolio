import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import {
  projects,
  categoryLabel,
  type Project,
  type ProjectImage,
} from '../portfolio.config'
import GradientPlaceholder from '../components/GradientPlaceholder'
import ScrollProgress from '../components/ScrollProgress'
import ParallaxImage from '../components/ParallaxImage'
import TextReveal from '../components/TextReveal'
import MagneticButton from '../components/MagneticButton'
import BeforeAfter from '../components/BeforeAfter'
import { cn } from '../lib/utils'

/* ------------------------------------------------------------------ */
/*  图片渲染：无真实 src 时使用生成式渐变占位图                           */
/* ------------------------------------------------------------------ */

function Visual({
  image,
  seed,
  palette,
  glyph,
  className,
}: {
  image?: string
  seed: string
  palette: string[]
  glyph?: string
  className?: string
}) {
  if (image) {
    return (
      <img
        src={image}
        alt={glyph ?? ''}
        loading="lazy"
        className={cn('h-full w-full object-cover', className)}
      />
    )
  }
  return <GradientPlaceholder seed={seed} palette={palette} glyph={glyph} className={className} />
}

/* 单张图片块：宽度节奏（full / wide / 60%）+ 轻微视差 */
function ImageBlock({ img, project, index }: { img: ProjectImage; project: Project; index: number }) {
  const widthCls =
    img.width === 'full'
      ? 'w-full'
      : img.width === 'wide'
        ? 'w-full md:w-[80%] md:mx-auto'
        : img.width === 'half'
          ? 'w-full md:w-[62%] md:mx-auto'
          : 'w-full'

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={widthCls}
    >
      <ParallaxImage className={cn('rounded-2xl', img.aspect)} speed={0.06}>
        <Visual
          image={img.src}
          seed={`${project.seed}-img-${index}`}
          palette={project.palette}
          glyph={img.glyph}
        />
      </ParallaxImage>
      {img.caption && (
        <figcaption className="font-ui mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/35">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-8 bg-white/15" />
          <span>{img.caption}</span>
        </figcaption>
      )}
    </motion.figure>
  )
}

/* 图片画廊：half 两两成双栏，third 三三成三栏，其余独立 */
function Gallery({ project }: { project: Project }) {
  const rows: ProjectImage[][] = []
  let i = 0
  while (i < project.images.length) {
    const img = project.images[i]
    if (img.width === 'half' && project.images[i + 1]?.width === 'half') {
      rows.push([img, project.images[i + 1]])
      i += 2
    } else if (img.width === 'third' && project.images[i + 1]?.width === 'third' && project.images[i + 2]?.width === 'third') {
      rows.push([img, project.images[i + 1], project.images[i + 2]])
      i += 3
    } else {
      rows.push([img])
      i += 1
    }
  }

  return (
    <div className="flex flex-col gap-8 md:gap-14">
      {rows.map((row, r) =>
        row.length === 2 ? (
          <div key={r} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {row.map((img, j) => (
              <ImageBlock key={j} img={img} project={project} index={r * 3 + j} />
            ))}
          </div>
        ) : row.length === 3 ? (
          <div key={r} className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
            {row.map((img, j) => (
              <ImageBlock key={j} img={img} project={project} index={r * 3 + j} />
            ))}
          </div>
        ) : (
          <ImageBlock key={r} img={row[0]} project={project} index={r * 3} />
        ),
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Case Study 小节头                                                   */
/* ------------------------------------------------------------------ */

function SectionHead({ index, en, zh }: { index: string; en: string; zh: string }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8 md:mb-12"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-display text-lg italic text-white/40">{index}</span>
        <span className="font-ui text-xs uppercase tracking-[0.3em] text-white/60">{en}</span>
      </div>
      <h2 className="font-display mt-2 text-3xl text-white md:text-5xl">
        <TextReveal>{zh}</TextReveal>
      </h2>
    </motion.header>
  )
}

/* 正文段落 */
function Body({ children }: { children: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="font-ui max-w-2xl text-[15px] leading-[1.9] text-white/55 md:text-base"
    >
      {children}
    </motion.p>
  )
}

/* ------------------------------------------------------------------ */
/*  AI CREATIVE PROCESS 横向流程                                        */
/* ------------------------------------------------------------------ */

const PROCESS_STEPS = [
  { en: 'Concept', zh: '概念' },
  { en: 'Prompt', zh: '提示词' },
  { en: 'Generation', zh: '生成' },
  { en: 'Selection', zh: '筛选' },
  { en: 'Refinement', zh: '精修' },
  { en: 'Final Visual', zh: '最终视觉' },
]

function AiProcess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-x-auto pb-4"
    >
      <div className="flex min-w-[720px] items-center">
        {PROCESS_STEPS.map((s, i) => (
          <div key={s.en} className="flex items-center">
            <div className="group w-28">
              <div className="font-display text-[10px] italic text-white/30">{String(i + 1).padStart(2, '0')}</div>
              <div className="mt-1 text-sm tracking-wide text-white/80 transition-colors group-hover:text-white">
                {s.en}
              </div>
              <div className="font-ui mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/30">{s.zh}</div>
              <div className="mt-3 h-px w-full bg-gradient-to-r from-white/40 to-white/5" />
            </div>
            {i < PROCESS_STEPS.length - 1 && (
              <span className="mx-3 mb-5 text-white/25">→</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  AI FILM 时间轴（滚动时展示不同镜头）                                 */
/* ------------------------------------------------------------------ */

function FilmTimeline({ project }: { project: Project }) {
  const film = project.film
  if (!film) return null
  return (
    <div className="mt-16">
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-ui mb-8 text-xs uppercase tracking-[0.3em] text-white/60"
      >
        Timeline · 镜头时间轴
      </motion.h3>
      <div className="relative">
        {/* 时间轴主线 */}
        <div className="absolute inset-x-0 top-[calc(50%-1px)] hidden h-px bg-white/10 md:block" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {film.timeline.map((shot, i) => (
            <motion.div
              key={shot.time}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <ParallaxImage className={cn('rounded-xl', shot.aspect)} speed={0.04}>
                <Visual
                  image={shot.src}
                  seed={`${project.seed}-shot-${i}`}
                  palette={project.palette}
                  glyph={shot.glyph}
                />
              </ParallaxImage>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="font-display text-lg italic text-white/70">{shot.time}</span>
                <span className="font-ui text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {shot.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  主页面                                                              */
/* ------------------------------------------------------------------ */

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <div className="font-ui text-[10px] uppercase tracking-[0.3em] text-white/35">{label}</div>
      <div className="font-ui mt-2 text-sm leading-relaxed text-white/75">{value}</div>
    </div>
  )
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = useMemo(() => projects.find((p) => p.id === id), [id])
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  if (!project) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-3xl text-white/70">Project not found</p>
        <Link to="/work" className="font-ui mt-6 text-xs uppercase tracking-[0.3em] text-white/50 underline-offset-4 hover:text-white hover:underline">
          ← Back to Works
        </Link>
      </section>
    )
  }

  const idx = projects.findIndex((p) => p.id === project.id)
  const next = projects[(idx + 1) % projects.length]
  const isFilm = project.category === 'aifilm'
  const isAigc = project.category !== 'aifilm'

  return (
    <section className="px-6 pb-32 pt-20 md:pb-44 md:pt-28 lg:px-16">
      <ScrollProgress />

      <div className="mx-auto max-w-7xl">
        {/* 返回导航 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center justify-between"
        >
          <Link
            to="/work"
            className="font-ui group flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            All Works
          </Link>
          <span className="font-display italic text-white/30">{project.index} / {String(projects.length).padStart(2, '0')}</span>
        </motion.div>

        {/* 标题区 */}
        <header className="mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="flex items-center gap-4 text-white/40"
          >
            <span className="font-ui text-xs tracking-[0.3em]">{project.index}</span>
            <span className="h-px w-12 bg-white/15" />
            <span className="font-ui text-xs uppercase tracking-[0.3em]">{categoryLabel[project.category]}</span>
          </motion.div>

          <h1 className="font-display mt-6 text-5xl leading-[1.02] tracking-tight text-white md:text-7xl lg:text-8xl">
            <TextReveal>{project.title}</TextReveal>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-ui mt-4 text-sm uppercase tracking-[0.2em] text-white/45 md:text-base"
          >
            {project.zh}
          </motion.p>

          {/* 元数据 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 md:mt-14 md:grid-cols-4"
          >
            <MetaItem label="Category" value={categoryLabel[project.category]} />
            <MetaItem label="Year" value={project.year} />
            <MetaItem label="Role" value={project.role} />
            <div className="border-t border-white/10 pt-4">
              <div className="font-ui text-[10px] uppercase tracking-[0.3em] text-white/35">Tools</div>
              <div className="font-ui mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm leading-relaxed text-white/75">
                {project.tools.map((t) => (
                  <span key={t} className="text-white/75">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </header>

        {/* Hero 大图 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <ParallaxImage className={cn('rounded-2xl', project.aspect)} speed={0.08}>
            <Visual image={project.image} seed={project.seed} palette={project.palette} glyph={project.index} />
          </ParallaxImage>
          <div className="font-ui mt-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/35">
            <span>{project.tagline}</span>
          </div>
        </motion.div>

        {/* 01 / OVERVIEW */}
        <div className="mt-20 md:mt-32">
          <SectionHead index="01" en="Project Overview" zh="项目背景" />
          <Body>{project.overview}</Body>
        </div>

        {/* 02 / CONCEPT */}
        <div className="mt-20 md:mt-32">
          <SectionHead index="02" en="Concept" zh="创意概念" />
          <Body>{project.concept}</Body>
        </div>

        {/* AI CREATIVE PROCESS（AIGC 项目） */}
        {isAigc && (
          <div className="mt-20 md:mt-32">
            <SectionHead index="03" en="AI Creative Process" zh="AI 创作流程" />
            <AiProcess />
            <Body>从概念到最终视觉，AI 是工作流的一部分而非终点 —— 每一步都由人工审美判断把关。</Body>
          </div>
        )}

        {/* 03 / VISUAL DIRECTION */}
        {project.visualDirection && (
          <div className="mt-20 md:mt-32">
            <SectionHead index={isAigc ? '04' : '03'} en="Visual Direction" zh="视觉方向" />
            <Body>{project.visualDirection}</Body>
          </div>
        )}

        {/* 图片画廊 — 宽度节奏 */}
        <div className="mt-20 md:mt-28">
          <Gallery project={project} />
        </div>

        {/* 04 / PROCESS */}
        {project.process && (
          <div className="mt-20 md:mt-32">
            <SectionHead index={isAigc ? '05' : '04'} en="Process" zh="设计 / AI 生成过程" />
            <Body>{project.process}</Body>
          </div>
        )}

        {/* Before / After（AIGC 项目） */}
        {project.beforeAfter && (
          <div className="mt-20 md:mt-32">
            <SectionHead index={isAigc ? '06' : '05'} en="Before / After" zh="前后对比" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <BeforeAfter
                beforeSeed={`${project.seed}-before`}
                afterSeed={`${project.seed}-after`}
                beforePalette={project.palette}
                afterPalette={project.palette}
                beforeLabel={project.beforeAfter.beforeLabel}
                afterLabel={project.beforeAfter.afterLabel}
                className="aspect-[16/9]"
              />
              <p className="font-ui mt-3 text-[11px] uppercase tracking-[0.25em] text-white/35">
                按住鼠标左右拖动，查看 AI 原始生成与最终视觉的差异
              </p>
            </motion.div>
          </div>
        )}

        {/* 06 / MOTION（视频区块） */}
        {project.video && (
          <div className="mt-20 md:mt-32">
            <SectionHead index={isAigc ? '07' : '05'} en="Motion" zh="动态 / 影像" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl bg-black"
            >
              <video
                ref={videoRef}
                src={project.video}
                poster={undefined}
                loop
                muted
                playsInline
                preload="metadata"
                onClick={() => {
                  const v = videoRef.current
                  if (!v) return
                  if (videoPlaying) {
                    v.pause()
                  } else {
                    v.muted = false
                    void v.play()
                  }
                  setVideoPlaying(!videoPlaying)
                }}
                className="aspect-video w-full object-cover"
              />
              {/* 播放/暂停提示 */}
              <button
                type="button"
                data-cursor="play"
                onClick={() => videoRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center"
                aria-label="Play / Pause"
              >
                <span
                  className={cn(
                    'font-ui flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-black/30 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-all duration-300',
                    videoPlaying ? 'scale-75 opacity-0' : 'opacity-100 hover:scale-105',
                  )}
                >
                  {videoPlaying ? 'Pause' : 'Play'}
                </span>
              </button>
            </motion.div>
            <p className="font-ui mt-3 text-[11px] uppercase tracking-[0.25em] text-white/35">
              点击播放 / 暂停 · 动态预览
            </p>
          </div>
        )}

        {/* AI FILM：STORY / CHARACTER / STORYBOARD */}
        {isFilm && project.film && (
          <>
            <div className="mt-20 md:mt-32">
              <SectionHead index="06" en="Story" zh="剧情" />
              <Body>{project.film.story}</Body>
            </div>
            <div className="mt-20 md:mt-32">
              <SectionHead index="07" en="Character" zh="角色设定" />
              <Body>{project.film.character}</Body>
            </div>
            <div className="mt-20 md:mt-32">
              <SectionHead index="08" en="Storyboard" zh="分镜" />
              <FilmTimeline project={project} />
            </div>
          </>
        )}

        {/* 08 / RESULT */}
        <div className="mt-24 md:mt-36">
          <SectionHead index="09" en="Result" zh="最终成果" />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <Body>{project.result}</Body>
            {project.metrics && (
              <div className="grid grid-cols-3 gap-6">
                {project.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="border-t border-white/15 pt-4"
                  >
                    <div className="font-display text-3xl text-white md:text-4xl">{m.value}</div>
                    <div className="font-ui mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* NEXT PROJECT */}
        <motion.nav
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="mt-24 flex flex-col items-start gap-6 border-t border-white/10 pt-12 md:mt-32 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div className="font-ui text-[10px] uppercase tracking-[0.3em] text-white/35">Next Project</div>
            <div className="font-display mt-2 text-3xl text-white/90 md:text-5xl">{next.title}</div>
          </div>
          <MagneticButton strength={0.35}>
            <Link
              to={`/work/${next.id}`}
              data-cursor="view"
              className="font-ui group flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-xs uppercase tracking-[0.3em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              View Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </MagneticButton>
        </motion.nav>
      </div>
    </section>
  )
}
