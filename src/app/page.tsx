import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-primary">
      {/* Global background grid */}
      <div
        className="fixed inset-0 bg-grid-pattern bg-grid pointer-events-none z-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
        style={{ backgroundSize: '60px 60px' }}
      />
      {/* Hero radial glow */}
      <div className="fixed inset-0 bg-hero-gradient pointer-events-none z-0" />

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
