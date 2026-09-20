import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const VIDEOS = [
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
    label: 'Golden Hour',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
    label: 'Still Water',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
    label: 'Deep Woods',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
    label: 'Quiet Dawn',
  },
]

const PNG_OVERLAY =
  'https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png'

const NAV_LINKS = ['How It Works', 'Features', 'Pricing', 'Community']

const STATS = [
  '60+ Deep Sessions',
  '12,000+ Creators',
  '4.8 User Satisfaction',
  'Intentional-First Design',
]

/** Cubic-bezier easing shared by mobile-menu animations */
const EASE = [0.4, 0, 0.2, 1] as const

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function App() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState<string | null>(null)

  /** Deep Woods (index 2) triggers the dark-text hero mode */
  const isDark = activeVideo === 2

  /**
   * Switch the active background video.
   * A 1000ms cooldown matches the CSS crossfade so rapid clicks are ignored.
   */
  const handleVideoSwitch = (index: number) => {
    if (index === activeVideo || isTransitioning) return
    setIsTransitioning(true)
    setActiveVideo(index)
    window.setTimeout(() => setIsTransitioning(false), 1000)
  }

  return (
    <>
      {/* ============================================================ */}
      {/*  SECTION CONTAINER                                            */}
      {/* ============================================================ */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* ---------- Background Video Layer (z-0) ---------- */}
        {VIDEOS.map((video, i) => (
          <video
            key={i}
            autoPlay
            muted
            loop
            playsInline
            src={video.url}
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              activeVideo === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* ---------- Transparent PNG Overlay (z-1) ---------- */}
        <img
          src={PNG_OVERLAY}
          alt=""
          aria-hidden="true"
          className="train-bob absolute inset-0 w-full h-full object-cover pointer-events-none z-[1]"
        />

        {/* ---------- Content Layer (z-2) ---------- */}
        <div className="relative z-[2] flex flex-col h-full px-5 sm:px-8 md:px-12 lg:px-16 py-5 sm:py-7">
          {/* ===== Navigation ===== */}
          <nav className="flex items-center justify-between shrink-0">
            {/* Logo */}
            <span className="text-white italic text-xl sm:text-2xl">Lumora</span>

            {/* Desktop nav pill (md+) */}
            <div className="hidden md:flex items-center">
              <div className="liquid-glass rounded-full pl-5 pr-1.5 py-1.5 flex items-center gap-5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveNav(link)
                    }}
                    className={`group relative font-ui text-sm transition-colors duration-200 ${
                      activeNav === link
                        ? 'text-white'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1.5px] rounded-full bg-white transition-all duration-200 ease-out ${
                        activeNav === link
                          ? 'w-full opacity-100'
                          : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                      }`}
                    />
                  </a>
                ))}
                <button className="bg-white text-black font-ui text-sm font-medium px-5 py-2 rounded-full hover:bg-white/90 transition-colors duration-200">
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile spacer — keeps logo left-aligned (hamburger is fixed outside) */}
            <div className="md:hidden w-11 h-11" aria-hidden="true" />
          </nav>

          {/* ===== Hero Content (centered) ===== */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* Badge */}
            <div
              className={`liquid-glass rounded-full px-4 py-2 mb-6 sm:mb-8 transition-colors duration-700 ${
                isDark ? 'text-[#182C41]' : 'text-white'
              }`}
            >
              <span className="font-ui text-xs sm:text-sm">
                Over 10,000 minds already finding their clarity
              </span>
            </div>

            {/* Heading */}
            <h1
              className={`text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl text-balance transition-colors duration-700 ${
                isDark ? 'text-[#182C41]' : 'text-white'
              }`}
            >
              Clarity in an Endlessly
              <br />
              Noisy Universe
            </h1>

            {/* Subtext */}
            <p
              className={`font-ui max-w-xl leading-relaxed text-sm sm:text-base mt-5 sm:mt-6 transition-colors duration-700 ${
                isDark ? 'text-[#182C41]/80' : 'text-white/80'
              }`}
            >
              Rise above the chaos of pings, infinite scrolling, and relentless demands.
              Discover how to protect your presence and create with intention.
            </p>

            {/* Email Input */}
            <div className="liquid-glass rounded-full p-1.5 flex items-center gap-1 mt-7 sm:mt-8 max-w-[320px] sm:max-w-sm w-full">
              <input
                type="email"
                placeholder="Your Best Email"
                className={`font-ui bg-transparent flex-1 px-4 py-2 text-sm outline-none transition-colors duration-700 ${
                  isDark
                    ? 'text-[#182C41] placeholder:text-[#182C41]/50'
                    : 'text-white placeholder:text-white/50'
                }`}
              />
              <button className="bg-white text-black font-ui text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 rounded-full whitespace-nowrap hover:bg-white/90 transition-colors duration-200 shrink-0">
                Get Early Access
              </button>
            </div>

            {/* Video Switcher */}
            <div className="flex items-center gap-3 sm:gap-5 mt-7 sm:mt-8">
              {VIDEOS.map((video, i) => (
                <button
                  key={i}
                  onClick={() => handleVideoSwitch(i)}
                  style={{
                    transition:
                      'opacity 300ms ease, color 700ms ease, border-color 700ms ease',
                  }}
                  className={`font-ui text-xs sm:text-sm pb-1 border-b-2 ${
                    activeVideo === i
                      ? `${
                          isDark
                            ? 'text-[#182C41] border-[#182C41]'
                            : 'text-white border-white'
                        } opacity-100`
                      : `border-transparent ${
                          isDark ? 'text-[#182C41]' : 'text-white'
                        } opacity-50 hover:opacity-80`
                  }`}
                >
                  {video.label}
                </button>
              ))}
            </div>
          </div>

          {/* ===== Bottom Stats ===== */}
          <div className="shrink-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-0 font-ui text-white/70 text-xs sm:text-sm">
            {STATS.map((stat, i) => (
              <div key={stat} className="flex items-center">
                {i > 0 && <span className="hidden sm:inline text-white/30 mx-4">|</span>}
                <span>{stat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Mobile Hamburger (fixed, above overlay) ---------- */}
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden liquid-glass rounded-full w-11 h-11 flex items-center justify-center fixed top-5 right-5 sm:top-7 sm:right-8 z-[60]"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <Menu
            className={`absolute w-5 h-5 text-white transition-all duration-300 ${
              mobileMenuOpen
                ? 'opacity-0 rotate-90 scale-75'
                : 'opacity-100 rotate-0 scale-100'
            }`}
          />
          <X
            className={`absolute w-5 h-5 text-white transition-all duration-300 ${
              mobileMenuOpen
                ? 'opacity-100 rotate-0 scale-100'
                : 'opacity-0 -rotate-90 scale-75'
            }`}
          />
        </button>
      </section>

      {/* ============================================================ */}
      {/*  MOBILE MENU OVERLAY (z-50)                                   */}
      {/* ============================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: EASE }}
                className="font-ui text-white text-3xl py-2"
              >
                {link}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
              className="mt-8 bg-white text-black font-ui text-sm font-medium px-8 py-3 rounded-full"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
