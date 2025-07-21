"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Layers, Lightbulb, Rocket } from "lucide-react"

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
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                With over 5 years of experience in web development, I've worked on a diverse range of projects from
                interactive websites to complex web applications.
              </p>
              <p>
                My passion lies at the intersection of technology and creativity, where I strive to create digital
                experiences that are not only functional but also visually engaging and intuitive.
              </p>
              <p>
                I'm constantly exploring new technologies and techniques to push the boundaries of what's possible on
                the web, with a particular focus on 3D graphics, animations, and interactive experiences.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Developer portrait"
                className="object-cover w-full h-full"
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
