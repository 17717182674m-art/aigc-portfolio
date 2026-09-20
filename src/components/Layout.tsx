import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AmbientBackground from './AmbientBackground'
import Sidebar from './Sidebar'
import PageTransition from './PageTransition'
import CustomCursor from './CustomCursor'
import Home from '../pages/Home'
import Work from '../pages/Work'
import ProjectDetail from '../pages/ProjectDetail'
import About from '../pages/About'
import Contact from '../pages/Contact'

export default function Layout() {
  const location = useLocation()

  // 切换页面时回到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="relative min-h-screen bg-black text-white">
      <AmbientBackground />
      <CustomCursor />
      <Sidebar />
      <div className="relative z-10 lg:pl-[260px]">
        <main className="min-h-screen pt-16 lg:pt-0">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
              <Route path="/work/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="*" element={<PageTransition><Home /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
