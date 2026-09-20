import { useState } from 'react'
import { motion } from 'framer-motion'
import { artist, experience, skills, tools } from '../portfolio.config'
import TextReveal from '../components/TextReveal'
import { cn } from '../lib/utils'

export default function About() {
  const [activeTool, setActiveTool] = useState<string | null>(null)

  return (
    <section className="px-6 pb-32 pt-32 md:pb-44 md:pt-40 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* 标题 */}
        <header className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 text-white/40"
          >
            <span className="font-ui text-xs tracking-[0.3em]">03</span>
            <span className="h-px w-12 bg-white/15" />
            <span className="font-ui text-xs uppercase tracking-[0.3em]">About · 关于</span>
          </motion.div>
          <h1 className="font-display mt-6 text-5xl leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl">
            <TextReveal>About</TextReveal>
            <TextReveal delay={0.12}>
              <em className="italic text-white/60">me</em>
            </TextReveal>
          </h1>
        </header>

        {/* 自我介绍 */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr] md:gap-20">
          <div className="space-y-6">
            {artist.about.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="font-ui text-lg leading-[1.9] text-white/60 md:text-xl"
              >
                {para}
              </motion.p>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-3 pt-2"
            >
              <span className={cn('h-2 w-2 rounded-full', artist.available ? 'bg-white' : 'bg-white/20')} />
              <span className="font-ui text-xs uppercase tracking-[0.25em] text-white/50">
                {artist.available ? 'Available for freelance & collaboration' : 'Currently booked'}
              </span>
            </motion.div>
          </div>

          {/* 侧栏信息 */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 border-t border-white/10 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0"
          >
            <div>
              <div className="font-ui text-[10px] uppercase tracking-[0.3em] text-white/35">Name</div>
              <div className="font-display mt-2 text-2xl text-white">{artist.name}</div>
            </div>
            <div>
              <div className="font-ui text-[10px] uppercase tracking-[0.3em] text-white/35">Role</div>
              <div className="font-ui mt-2 text-sm uppercase tracking-[0.15em] text-white/75">{artist.role}</div>
            </div>
            <div>
              <div className="font-ui text-[10px] uppercase tracking-[0.3em] text-white/35">Location</div>
              <div className="font-ui mt-2 text-sm text-white/75">{artist.location}</div>
            </div>
          </motion.aside>
        </div>

        {/* EXPERIENCE */}
        <div className="mt-24 md:mt-36">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl text-white md:text-6xl"
          >
            <TextReveal>Experience</TextReveal>
          </motion.h2>
          <div className="mt-10 md:mt-14">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-1 gap-2 border-t border-white/10 py-8 md:grid-cols-[180px_1fr_auto] md:items-baseline md:gap-8"
              >
                <div className="font-ui text-[11px] uppercase tracking-[0.25em] text-white/40">{exp.period}</div>
                <div>
                  <div className="font-display text-xl text-white transition-colors group-hover:text-white/85 md:text-2xl">
                    {exp.role}
                  </div>
                  <div className="font-ui mt-1 text-xs uppercase tracking-[0.2em] text-white/40">{exp.org}</div>
                </div>
                <div className="font-ui text-sm leading-relaxed text-white/45 md:max-w-[240px] md:text-right">{exp.note}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <div className="mt-24 md:mt-36">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl text-white md:text-6xl"
          >
            <TextReveal>Skills</TextReveal>
          </motion.h2>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 md:mt-14 lg:grid-cols-5">
            {skills.map((s, i) => (
              <motion.div
                key={s.en}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group bg-black p-6 transition-colors duration-300 hover:bg-white/5"
              >
                <div className="font-ui text-[10px] text-white/25">{String(i + 1).padStart(2, '0')}</div>
                <div className="font-display mt-4 text-lg leading-snug text-white/85 transition-colors group-hover:text-white">
                  {s.en}
                </div>
                <div className="font-ui mt-1 text-[11px] uppercase tracking-[0.2em] text-white/35">{s.zh}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TOOLS I USE */}
        <div className="mt-24 md:mt-36">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl text-white md:text-6xl"
          >
            <TextReveal>Tools I Use</TextReveal>
          </motion.h2>

          {/* 工具网格 — hover 显示用途 */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-14 lg:grid-cols-4">
            {tools.map((t, i) => (
              <motion.button
                key={t.name}
                type="button"
                onMouseEnter={() => setActiveTool(t.name)}
                onMouseLeave={() => setActiveTool(null)}
                onFocus={() => setActiveTool(t.name)}
                onBlur={() => setActiveTool(null)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                className={cn(
                  'group relative overflow-hidden rounded-xl border p-5 text-left transition-all duration-300',
                  activeTool === t.name
                    ? 'border-white/60 bg-white/5'
                    : 'border-white/10 hover:border-white/30',
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-white/90">{t.name}</span>
                  <span
                    className={cn(
                      'font-ui text-[9px] uppercase tracking-[0.2em] transition-opacity duration-300',
                      activeTool === t.name ? 'opacity-100 text-white/60' : 'opacity-0',
                    )}
                  >
                    Use
                  </span>
                </div>
                <div
                  className={cn(
                    'font-ui mt-2 text-xs text-white/45 transition-all duration-300',
                    activeTool === t.name ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
                  )}
                >
                  {t.use}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
