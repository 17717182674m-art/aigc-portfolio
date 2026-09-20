import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { artist } from '../portfolio.config'
import TextReveal from '../components/TextReveal'

export default function Contact() {
  return (
    <section className="flex min-h-[92vh] flex-col justify-center px-6 py-32 md:py-44 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 text-white/40"
        >
          <span className="font-ui text-xs tracking-[0.3em]">04</span>
          <span className="h-px w-12 bg-white/15" />
          <span className="font-ui text-xs uppercase tracking-[0.3em]">Contact · 联系</span>
        </motion.div>

        {/* 大标题 */}
        <h1 className="font-display mt-10 text-[13vw] leading-[0.98] tracking-tight text-white md:text-8xl lg:text-[7.5rem]">
          <TextReveal>Let's create</TextReveal>
          <TextReveal delay={0.12}>
            <em className="italic text-white/60">something</em>
          </TextReveal>
          <TextReveal delay={0.24}>together.</TextReveal>
        </h1>

        {/* Available for */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 md:mt-20 md:flex-row md:items-baseline md:gap-10"
        >
          <span className="font-ui text-[11px] uppercase tracking-[0.3em] text-white/35">Available for</span>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {['Freelance', 'Collaboration', 'Creative Projects'].map((item) => (
              <span key={item} className="font-display text-2xl text-white/80 md:text-3xl">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 联系方式 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-24 lg:grid-cols-4"
        >
          {artist.socials.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
              className="group border-t border-white/10 pt-5 transition-colors"
            >
              <div className="font-ui text-[10px] uppercase tracking-[0.3em] text-white/35">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-display mt-3 flex items-center gap-2 text-2xl text-white transition-colors group-hover:text-white/70 md:text-3xl">
                {s.label}
                <ArrowUpRight className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
              </div>
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-ui mt-16 text-xs uppercase tracking-[0.25em] text-white/30 md:mt-24"
        >
          {artist.email} · {artist.location}
        </motion.p>
      </div>
    </section>
  )
}
