import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ThemeProvider } from './context/ThemeContext'

gsap.registerPlugin(ScrollTrigger)
import Cursor from './components/Cursor/Cursor'
import Loader from './components/Loader/Loader'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import YouTube from './components/YouTube/YouTube'
import Contact from './components/Contact/Contact'

function App() {
  const [loaderDone, setLoaderDone] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    })
    // Keep Lenis on its own rAF loop but notify ScrollTrigger on every scroll
    // so GSAP triggers fire at the correct interpolated position (fixes flicker).
    lenis.on('scroll', ScrollTrigger.update)
    let rafId
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(rafId); lenis.destroy() }
  }, [])

  return (
    <ThemeProvider>
      <Cursor />

      {/* Loader covers page with z-index:99000 — page always rendered underneath */}
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}

      {/* NO visibility:hidden — loader covers it anyway, no flash */}
      <Navbar />
      <main>
        <Hero loaderDone={loaderDone} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <YouTube />
        <Contact />
      </main>
    </ThemeProvider>
  )
}

export default App
