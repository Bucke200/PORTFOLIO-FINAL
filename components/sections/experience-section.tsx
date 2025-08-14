"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Trophy,
  GitBranch,
  Heart,
  Target,
  Star,
  FlaskConical,
  Server,
} from "lucide-react";

const experiences = [
  {
    id: 1,
    type: "opensource",
    title: "Open Source Contributor & Mentor",
    company: "Multiple Programs",
    location: "Remote",
    period: "2023 - Present",
    description:
      "Active contributor and mentor across multiple open source programs including GSSoC (Mentor & Contributor), SSoC (Mentor & Contributor), Hacktoberfest (Contributor), and SWoC (Contributor). Mentored 50+ contributors, made 100+ contributions across 20+ projects, and helped maintain project quality standards while fostering collaborative learning environments.",
    technologies: [
      "Open Source",
      "Mentoring",
      "Git",
      "GitHub",
      "Code Review",
      "Community Building",
    ],
    programs: [
      { name: "GSSoC", role: "Mentor & Contributor", year: "2024-2025" },
      { name: "SSoC", role: "Mentor & Contributor", year: "2024-2025" },
      { name: "Hacktoberfest", role: "Contributor", year: "2023-2025" },
      { name: "SWoC", role: "Contributor", year: "2024" },
    ],
    icon: <GitBranch className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  {
    id: 2,
    type: "competitive",
    title: "Competitive Programming Achievements",
    company: "Multiple Platforms",
    location: "Global",
    period: "2023 - Present",
    description:
      "Achieved high ratings across multiple competitive programming platforms, demonstrating strong problem-solving skills and algorithmic thinking. Consistently ranked among top performers with expertise in data structures, algorithms, and mathematical problem solving.",
    technologies: [
      "C++",
      "Python",
      "Data Structures",
      "Algorithms",
      "Mathematics",
      "Problem Solving",
    ],
    achievements: [
      {
        platform: "Codeforces",
        rating: "Master (Max 2107)",
        color: "text-orange-500",
      },
      { platform: "LeetCode", rating: "1800+", color: "text-yellow-500" },
      {
        platform: "CodeChef",
        rating: "5⭐ (Max 2123)",
        color: "text-blue-500",
      },
    ],
    icon: <Target className="h-6 w-6" />,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
  },
  {
    id: 3,
    type: "research",
    title: "Research Intern",
    company: "1M1B (1 Million for 1 Billion)",
    location: "Remote",
    period: "July 2025 - September 2025",
    description:
      "Conducted cutting-edge research on machine learning applications for environmental sustainability. Developed and optimized ML models for weather data analysis and energy consumption prediction, contributing to data-driven solutions for climate change mitigation and energy efficiency optimization.",
    technologies: [
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Weather APIs",
      "Time Series Analysis",
      "Data Visualization",
    ],
    researchAreas: [
      {
        area: "Weather Data ML Models",
        focus: "Predictive modeling for climate patterns",
      },
      {
        area: "Energy Consumption Models",
        focus: "Optimization algorithms for energy efficiency",
      },
    ],
    icon: <FlaskConical className="h-6 w-6" />,
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
  },
  {
    id: 4,
    type: "internship",
    title: "Backend Java Intern",
    company: "Shadowfox",
    location: "Remote",
    period: "April 2025 - May 2025",
    description:
      "Developed and maintained robust banking backend systems using Java and Spring Boot. Implemented secure transaction processing, account management APIs, and database optimization. Worked on critical financial services infrastructure with focus on security, scalability, and performance.",
    technologies: [
      "Java",
      "Spring Boot",
      "MySQL",
      "REST APIs",
      "Banking Systems",
      "Security",
      "Microservices",
    ],
    icon: <Server className="h-6 w-6" />,
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
  },
];

interface Experience {
  id: number;
  type: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  programs?: Array<{ name: string; role: string; year: string }>;
  achievements?: Array<{ platform: string; rating: string; color: string }>;
  researchAreas?: Array<{ area: string; focus: string }>;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
}

const TimelineItem = ({
  experience,
  index,
  isInView,
}: {
  experience: Experience;
  index: number;
  isInView: boolean;
}) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={`flex items-center w-full ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }
      }
      transition={{ duration: 0.8, delay: index * 0.3, ease: "easeOut" }}
    >
      {/* Content Card */}
      <motion.div
        className={`w-5/12 ${isLeft ? "pr-8" : "pl-8"}`}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.8, y: 30 }
        }
        transition={{
          duration: 0.7,
          delay: index * 0.3 + 0.2,
          ease: "easeOut",
        }}
        whileHover={{
          scale: 1.02,
          y: -5,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
      >
        <motion.div
          whileHover={{
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)",
            borderColor: `hsl(var(--primary))`,
          }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className={`${experience.borderColor} ${experience.bgColor} backdrop-blur-sm hover:shadow-xl transition-all duration-500 border-2 overflow-hidden group`}
          >
            {/* Animated background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              initial={{ scale: 0, rotate: 45 }}
              whileHover={{ scale: 1.5, rotate: 0 }}
              transition={{ duration: 0.5 }}
            />

            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-foreground">
                      {experience.title}
                    </h3>
                    {experience.type === "opensource" && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-600 dark:text-green-400 border-green-500/30"
                      >
                        Open Source
                      </Badge>
                    )}
                    {experience.type === "research" && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-600 dark:text-teal-400 border-teal-500/30"
                      >
                        Research
                      </Badge>
                    )}
                    {experience.type === "competitive" && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30"
                      >
                        Competitive Programming
                      </Badge>
                    )}
                    {experience.type === "achievement" && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
                      >
                        Achievement
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-muted-foreground mb-2">
                    {experience.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{experience.location}</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {experience.description}
              </p>

              {/* Show programs for open source experience */}
              {experience.type === "opensource" && experience.programs && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Programs:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {experience.programs.map((program: any, i: number) => (
                      <div
                        key={i}
                        className="text-xs p-2 rounded bg-muted/50 border border-border/50"
                      >
                        <div className="font-medium text-foreground">
                          {program.name}
                        </div>
                        <div className="text-muted-foreground">
                          {program.role} • {program.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Show achievements for competitive programming */}
              {experience.type === "competitive" && experience.achievements && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Platform Ratings:
                  </h4>
                  <div className="space-y-2">
                    {experience.achievements.map(
                      (achievement: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30"
                        >
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium text-foreground">
                              {achievement.platform}
                            </span>
                          </div>
                          <span className={`font-bold ${achievement.color}`}>
                            {achievement.rating}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Show research areas for research experience */}
              {experience.type === "research" && experience.researchAreas && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Research Areas:
                  </h4>
                  <div className="space-y-2">
                    {experience.researchAreas.map((area: any, i: number) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-muted/30 border border-border/30"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <FlaskConical className="h-4 w-4 text-teal-500" />
                          <span className="font-medium text-foreground">
                            {area.area}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">
                          {area.focus}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.5, delay: index * 0.3 + 0.9 }}
              >
                {experience.technologies.map((tech: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{
                      duration: 0.3,
                      delay: index * 0.3 + 1 + i * 0.1,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs hover:bg-primary/20 transition-colors duration-200"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Timeline Node */}
      <div className="relative flex items-center justify-center">
        {/* Outer glow ring */}
        <motion.div
          className={`absolute w-24 h-24 rounded-full bg-gradient-to-br ${experience.color} opacity-20 blur-sm`}
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.2 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.8, delay: index * 0.3 + 0.4 }}
        />

        {/* Main circle */}
        <motion.div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${experience.color} flex items-center justify-center text-white shadow-xl z-10 relative overflow-hidden group cursor-pointer`}
          initial={{ scale: 0, rotate: -180 }}
          animate={
            isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
          }
          transition={{
            duration: 0.8,
            delay: index * 0.3 + 0.5,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Icon with animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 0.5, delay: index * 0.3 + 0.8 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            {experience.icon}
          </motion.div>

          {/* Continuous pulse animation */}
          <motion.div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${experience.color} opacity-40`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Connecting line highlight */}
        <motion.div
          className={`absolute w-1 h-12 bg-gradient-to-b ${experience.color} ${
            isLeft ? "right-8" : "left-8"
          } opacity-60`}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.6, delay: index * 0.3 + 0.7 }}
        />
      </div>

      {/* Empty space for alternating layout */}
      <div className="w-5/12" />
    </motion.div>
  );
};

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Experience & Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            My professional journey and key milestones in software development
          </p>

          {/* Open Source Highlight */}
          <motion.div
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GitBranch className="h-4 w-4 text-green-500" />
            <span>Active Open Source Contributor & Mentor</span>
            <Heart className="h-4 w-4 text-pink-500" />
          </motion.div>

          {/* Open Source Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                4+
              </div>
              <div className="text-xs text-muted-foreground">Programs</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                50+
              </div>
              <div className="text-xs text-muted-foreground">Mentored</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                100+
              </div>
              <div className="text-xs text-muted-foreground">Contributions</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                20+
              </div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 via-green-500 via-orange-500 to-purple-500 rounded-full"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={experience.id}
                experience={experience}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
