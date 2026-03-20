import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
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

  return (
    <ThemeProvider>
      <Cursor />

      {/* Loader covers page with z-index:99000 — page always rendered underneath */}
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}

      {/* NO visibility:hidden — loader covers it anyway, no flash */}
      <Navbar />
      <main>
        <Hero />
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
