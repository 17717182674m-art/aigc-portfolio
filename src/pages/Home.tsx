import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { artist, projects, services, categoryLabel, HERO_VIDEO } from '../portfolio.config'
import GradientPlaceholder from '../components/GradientPlaceholder'
import ImageTrailLayer from '../components/ImageTrailLayer'
import TextReveal from '../components/TextReveal'

const featured = projects.slice(0, 6)

/** Image Trail 素材：从项目色板生成缩略图残影 */
const trailMaterials = projects.map((p) => ({ seed: p.seed, palette: p.palette }))

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  // 鼠标微弱响应：视频随光标平移 ±12px
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })

  const onMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window
    mx.set(((e.clientX - innerWidth / 2) / innerWidth) * 24)
    my.set(((e.clientY - innerHeight / 2) / innerHeight) * 24)
  }

  return (
    <section
      onMouseMove={onMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Hero Visual — 全屏视频 + 缓慢缩放 + 鼠标响应 */}
      <motion.video
        className="absolute inset-0 h-full w-full scale-[1.06] object-cover"
        style={{ x: sx, y: sy }}
        src={HERO_VIDEO}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative z-10 flex max-w-5xl flex-col items-center">
        {/* PORTFOLIO 2026 · NAME */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-ui mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/50"
        >
          <span className="h-px w-8 bg-white/30" />
          Portfolio 2026 · {artist.name}
          <span className="h-px w-8 bg-white/30" />
        </motion.div>

        {/* 主标题 */}
        <h1 className="font-display text-[clamp(2.8rem,9.5vw,8rem)] leading-[0.95] tracking-tight text-white">
          <TextReveal>AIGC VISUAL</TextReveal>
          <TextReveal delay={0.12}>
            <em className="italic text-white/60">Designer</em>
          </TextReveal>
        </h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-ui mt-6 text-[11px] uppercase tracking-[0.35em] text-white/60 sm:text-xs"
        >
          Visual Design · AI Image · AI Film · Creative Direction
        </motion.p>

        {/* 辅助文案 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="font-ui mt-4 max-w-md text-sm leading-relaxed text-white/50"
        >
          {artist.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex items-center gap-4"
        >
          <Link
            to="/work"
            data-cursor="view"
            className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            View Selected Works
          </Link>
          <Link
            to="/about"
            className="font-ui group flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            About me
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Selected Works — 大尺寸项目列表                                     */
/* ------------------------------------------------------------------ */

function SelectedWorks() {
  return (
    <section className="px-6 pb-24 pt-10 md:pb-40 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between md:mb-16">
          <div>
            <div className="flex items-center gap-4 text-white/40">
              <span className="font-ui text-xs tracking-[0.3em]">01</span>
              <span className="h-px w-12 bg-white/15" />
              <span className="font-ui text-xs uppercase tracking-[0.3em]">Selected Works · 精选项目</span>
            </div>
            <h2 className="font-display mt-5 text-4xl tracking-tight text-white md:text-6xl">
              Selected <em className="italic text-white/60">works</em>
            </h2>
          </div>
          <Link
            to="/work"
            className="font-ui group hidden items-center gap-2 text-sm text-white/50 transition-colors hover:text-white md:flex"
          >
            All works
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="border-t border-white/10">
          {featured.map((project, i) => {
            const flip = i % 2 === 1
            return (
              <Link
                key={project.id}
                to={`/work/${project.id}`}
                data-cursor="view"
                className="group block border-b border-white/10 py-12 md:py-20"
              >
                <div className="grid items-center gap-8 md:grid-cols-12">
                  {/* 编号 */}
                  <div className="font-display text-5xl text-white/15 transition-colors duration-500 group-hover:text-white/40 md:col-span-2 md:text-7xl">
                    {project.index}
                  </div>

                  {/* 文字信息 */}
                  <div className={`md:col-span-4 ${flip ? 'md:order-3' : 'md:order-2'}`}>
                    <div className="font-ui text-[10px] uppercase tracking-[0.3em] text-white/40">
                      {categoryLabel[project.category]} · {project.year}
                    </div>
                    <h3 className="font-display mt-3 text-3xl tracking-tight text-white transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                      {project.title}
                    </h3>
                    <p className="font-ui mt-4 max-w-sm text-sm leading-relaxed text-white/50">
                      {project.tagline}
                    </p>
                    <div className="font-ui mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/0 transition-colors duration-500 group-hover:text-white/70">
                      View Project <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* 大图 */}
                  <div className={`md:col-span-6 ${flip ? 'md:order-2' : 'md:order-3'}`}>
                    <div className={`${project.aspect} overflow-hidden rounded-xl`}>
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
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  What I Do — 大字号能力列表，hover 出现作品背景图                      */
/* ------------------------------------------------------------------ */

function WhatIDo() {
  const [hovered, setHovered] = useState<number | null>(null)
  const active = hovered !== null ? services[hovered] : null
  const hoverPalette = (i: number) => featured[i % featured.length].palette

  return (
    <section data-trail className="relative px-6 pb-24 md:pb-40 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-4 text-white/40">
          <span className="font-ui text-xs tracking-[0.3em]">02</span>
          <span className="h-px w-12 bg-white/15" />
          <span className="font-ui text-xs uppercase tracking-[0.3em]">What I Do · 个人能力</span>
        </div>

        <div className="relative">
          {/* hover 背景图（弱光渐变 + 项目占位图） */}
          <div className="pointer-events-none absolute -right-10 top-0 hidden h-[70%] w-1/3 lg:block">
            <motion.div
              key={hovered ?? 'none'}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: hovered !== null ? 0.55 : 0, scale: hovered !== null ? 1 : 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full overflow-hidden rounded-xl"
            >
              {active && (
                <GradientPlaceholder seed={`whatido-${hovered}`} palette={hoverPalette(hovered!)} />
              )}
            </motion.div>
          </div>

          <div className="relative">
            {services.map((s, i) => (
              <motion.div
                key={s.en}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-white/10 py-5 transition-colors duration-300 hover:border-white/30 md:py-7"
              >
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-ui text-xs tabular-nums tracking-[0.3em] text-white/30">
                    {s.index}
                  </span>
                  <h3 className="font-display text-4xl tracking-tight text-white/70 transition-all duration-300 group-hover:translate-x-3 group-hover:text-white md:text-6xl">
                    {s.en}
                  </h3>
                </div>
                <span className="font-ui text-xs uppercase tracking-[0.3em] text-white/30 transition-colors duration-300 group-hover:text-white/60">
                  {s.zh}
                </span>
              </motion.div>
            ))}
            <div className="border-b border-white/10" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  底部 CTA                                                            */
/* ------------------------------------------------------------------ */

function FooterCTA() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-16 md:pb-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.95] tracking-tight text-white"
          >
            Let's make
            <br />
            something
            <br />
            <em className="italic text-white/60">unexpected.</em>
          </motion.h2>
        </div>

        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          <Link to="/work" data-cursor="view" className="font-ui text-sm uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white">
            Selected Works
          </Link>
          <Link to="/about" className="font-ui text-sm uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white">
            About
          </Link>
          <Link to="/contact" className="font-ui text-sm uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-white">
            Contact
          </Link>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-center"
        >
          <div className="font-ui text-[11px] uppercase tracking-[0.3em] text-white/40">
            © 2026 {artist.name}
          </div>
          <div className="font-ui text-[11px] uppercase tracking-[0.3em] text-white/25">
            AIGC Visual Designer
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <ImageTrailLayer items={trailMaterials} />
      <Hero />
      <SelectedWorks />
      <WhatIDo />
      <FooterCTA />
    </>
  )
}
