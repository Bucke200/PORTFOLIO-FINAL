"use client"

import { useRef } from "react"
import { useScroll } from "framer-motion"
import Scene from "@/components/scene"
import ModernNavbar from "@/components/modern-navbar"
import IntroSection from "@/components/sections/intro-section"
import ProjectsSection from "@/components/sections/projects-section"
import AboutSection from "@/components/sections/about-section"
import ContactSection from "@/components/sections/contact-section"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <main className="relative min-h-screen">
      {/* 3D Scene Background */}
      <div className="fixed inset-0 -z-10">
        <Scene scrollProgress={scrollYProgress} />
      </div>

      {/* Modern Navbar */}
      <ModernNavbar />

      {/* Content Sections */}
      <div ref={containerRef} className="relative z-10">
        <IntroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </div>
    </main>
  )
}
