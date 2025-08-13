"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Code, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeforcesIcon, LeetCodeIcon } from "./icons"

export default function ModernNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "#intro" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Bucke200", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/srinjaypanja", label: "LinkedIn" },
    { icon: <CodeforcesIcon className="h-5 w-5" />, href: "https://codeforces.com/profile/CyntaxError", label: "Codeforces" },
    { icon: <LeetCodeIcon className="h-5 w-5" />, href: "https://leetcode.com/u/ashborn200/", label: "LeetCode" },
  ]

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Fixed to be a regular link, not a theme toggle */}
          <a href="#intro" className="flex items-center gap-2 text-xl font-bold">
            <Code className="h-6 w-6 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">Srinjay Panja</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <a
                    href={link.href}
                    className="text-foreground/80 hover:text-primary transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="p-2 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="rounded-full">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full pt-20 px-6">
              <nav className="flex flex-col gap-6">
                <ul className="flex flex-col gap-4">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        className="text-2xl font-medium hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="flex gap-4 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
