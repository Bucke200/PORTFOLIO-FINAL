"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Layers, Lightbulb, Rocket, Download } from "lucide-react"

const skills = [
  {
    title: "Frontend Development",
    description: "Creating responsive, accessible, and performant user interfaces with modern frameworks.",
    icon: <Code className="h-8 w-8" />,
    technologies: ["React", "Vue.js", "Bootstrap", "Tailwind CSS"],
  },
  {
    title: "Backend Development",
    description: "Crafting efficient, scalable, and secure backend systems with a focus on clean architecture and robust logic.",
    icon: <Layers className="h-8 w-8" />,
    technologies: ["RESTful APIs", "Microservices", "Spring Boot", "Mern Stack"],
  },
  {
    title: "Machine Learning",
    description: "Proficient in machine learning and data visualization .",
    icon: <Lightbulb className="h-8 w-8" />,
    technologies: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn"],
  },
  {
    title: "Tools & Databases",
    description: "Skilled in using industry-standard tools and databases for efficient development and data management.",
    icon: <Rocket className="h-8 w-8" />,
    technologies: ["Postman", "MySQL", "MongoDB", "Figma"],
  },
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm a creative developer passionate about building innovative digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Hello, I'm Srinjay Panja</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                A passionate full-stack developer skilled in the MERN stack, the Spring Stack, and the Django Stack. On the frontend, I craft sleek, dynamic interfaces using modern tools like React and Vue, styled elegantly with Tailwind CSS and Bootstrap, and powered by lightning-fast builds through Vite—all driven by clean, expressive JavaScript.
              </p>
              <p>
                I also have expertise in machine learning models, be it ensemble methods or deep learning architectures, to build intelligent, data-driven solutions.
              </p>
              <p>
                As an open-source contributor and competitive programmer, I thrive in agile environments, constantly learning and building innovative, scalable software that makes a real impact.
              </p>
            </div>
            
            {/* Resume Download Button */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a
                    href="/Srinjay_Panja_Resume.pdf"
                    download="Srinjay_Panja_Resume.pdf"
                    className="flex items-center gap-3 px-6 py-3"
                  >
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Download className="h-5 w-5" />
                      <span className="font-medium">Download Resume</span>
                    </motion.div>
                    
                    {/* Animated background effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                      animate={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src="/srinjay.png"
                alt="Developer portrait"
                className="object-cover w-full h-full"
                loading="eager"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectPosition: "center",
                  willChange: "transform"
                }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Skills & Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full border-primary/10 bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">{skill.icon}</div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">{skill.title}</h4>
                        <p className="text-muted-foreground mb-4">{skill.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {skill.technologies.map((tech, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
