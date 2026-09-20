# Asme Landing Page — Recreation Overview

## What was done

Recreated (and verified) a single-page landing site for "Asme" per the detailed RECREATION PROMPT. The page is a black-background, glass-morphism, video-driven landing experience built with **React + TypeScript + Vite + Tailwind CSS + framer-motion + lucide-react**.

## Sections built

| # | Section | File | Highlights |
|---|---------|------|------------|
| 1 | Hero | `src/components/Index.tsx` | Full-viewport background video with a custom vanilla-JS `requestAnimationFrame` crossfade loop (fade-in on `canplay`, fade-out at ≤0.55s remaining, seamless reset+replay). Liquid-glass pill navbar ("Asme" + Features/Pricing/About + Sign Up/Login). `Instrument Serif` heading "Know it *all*", glass email-input pill, subtitle, manifesto button, 3 glass social-icon buttons. |
| 2 | About | `src/components/AboutSection.tsx` | `useInView` (once), radial gradient overlay, animated label + large serif heading with italic emphasis words (`text-white/60`). |
| 3 | Featured Video | `src/components/FeaturedVideoSection.tsx` | `aspect-video` glass container, looping video + bottom gradient overlay, glass caption card ("Our Approach") + motion "Explore more" button (`whileHover`/`whileTap` scale). |
| 4 | Philosophy | `src/components/PhilosophySection.tsx` | "Innovation *x* Vision" heading, two-column grid: left video animates `x:-40`, right text blocks split by `h-px bg-white/10` divider, animates `x:+40`. |
| 5 | Services | `src/components/ServicesSection.tsx` | Radial gradient, header row, two liquid-glass cards with `group-hover` video zoom, `ArrowUpRight` glass circle, staggered reveal (0.15s). |

## Design system

- **Font:** `Instrument Serif` (italic + regular) loaded via Google Fonts in `src/index.css`.
- **Glass utility:** reusable `.liquid-glass` class in `@layer components` — near-transparent fill, `backdrop-filter: blur(4px)`, inset highlight, and a `::before` gradient-border mask that gives the signature luminous edge.

## Verification

- **Type check + production build:** `npm run build` (`tsc --noEmit && vite build`) passes cleanly — 1886 modules transformed in ~2.07s, **0 errors**.
- **Bundle:** `dist/assets/index-*.js` ≈ 270 kB (gzip 87 kB), `dist/assets/index-*.css` ≈ 13.6 kB (gzip 3.6 kB).
- **Live preview:** Vite dev server running at `http://localhost:5173` — preview opened successfully.

## Result

No code changes were required: the existing implementation already matched the recreation prompt line-by-line. The work here was a careful spec-vs-code audit, a clean production build, and serving the live page for review.

## Follow-up notes

- The "About" heading's second line uses italic emphasis on "create, build, and inspire." only (symmetric with line 1's italic "ideas"). If you'd prefer the *entire* second line italic (the "(all ...)" reading in the spec), it's a one-line tweak — just say the word.
- All five background videos are loaded from the CloudFront URLs in the spec; playback is muted/autoplay/inline for mobile compatibility.
