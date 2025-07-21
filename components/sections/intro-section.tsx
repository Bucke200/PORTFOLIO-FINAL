"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, ExternalLink, Github, Code } from "lucide-react"

export default function IntroSection() {
  return (
    <section id="intro" className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Content */}
        <motion.div
          className="space-y-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
              Software Engineer
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Brewing{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500 dark:from-blue-400 dark:to-violet-400">
              Code into
              </span>{" "}
              Digital Magic
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Full-stack wizardry, backend mastery, AI/ML intuition, and pixel-perfect frontend finesse — I blend tech expertise with real-world impact
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap gap-8 justify-center pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
                50%
              </span>
              <span className="text-sm text-foreground/70">Talent</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
                50%
              </span>
              <span className="text-sm text-foreground/70">Tenacity</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
                100%
              </span>
              <span className="text-sm text-foreground/70">Blood, Sweat & Tears</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <a
          href="#projects"
          className="flex flex-col items-center text-foreground/70 hover:text-foreground transition-colors"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </a>
      </motion.div>
    </section>
  )
}
