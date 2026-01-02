"use client"

import { useState } from "react"

interface Skill {
  name: string
  percentage: number
}

interface SkillCategory {
  title: string
  status: string
  skills: Skill[]
  icon?: string
}

export default function Skills() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const skillCategories: SkillCategory[] = [
    {
      title: "FRONTEND_MODULE",
      status: "OPTIMIZED",
      skills: [
        { name: "React", percentage: 95 },
        { name: "Next.js", percentage: 90 },
        { name: "TypeScript", percentage: 92 },
        { name: "Tailwind CSS", percentage: 95 },
      ],
    },
    {
      title: "BACKEND_SYSTEMS",
      status: "OPERATIONAL",
      skills: [
        { name: "Node.js / Express", percentage: 85 },
        { name: "Python / Django", percentage: 75 },
        { name: "Firebase", percentage: 85 },
        { name: "REST APIs", percentage: 90 },
      ],
    },
    {
      title: "DATA_PERSISTENCE",
      status: "CONNECTED",
      skills: [
        { name: "MongoDB", percentage: 85 },
        { name: "PostgreSQL", percentage: 80 },
        { name: "MySQL", percentage: 75 },
        { name: "Firebase DB", percentage: 85 },
      ],
      icon: "circular",
    },
    {
      title: "DEVOPS_PROTOCOL",
      status: "DEPLOYING",
      skills: [
        { name: "AWS", percentage: 80 },
        { name: "Docker", percentage: 75 },
        { name: "Vercel", percentage: 90 },
        { name: "Nginx", percentage: 70 },
      ],
    },
    {
      title: "LANGUAGES",
      status: "READY",
      skills: [
        { name: "JavaScript", percentage: 95 },
        { name: "TypeScript", percentage: 92 },
        { name: "Python", percentage: 80 },
        { name: "Java", percentage: 75 },
        { name: "Dart", percentage: 70 },
        { name: "Bash", percentage: 80 },
      ],
    },
  ]

  return (
    <main className="relative min-h-screen pt-24 pb-12">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block mb-4 px-3 py-1 border border-primary/30 rounded text-xs text-primary font-mono tracking-wider uppercase">
            • SYSTEM_LOG
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white">
            SYSTEM_CAPABILITIES <span className="text-primary">// SKILLS</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm mt-4">
            root@user:~$ executing ./show_skills.sh --verbose --visualize
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="border border-primary/20 rounded-lg p-6 bg-muted/50 backdrop-blur-sm hover:border-primary/60 transition-all duration-300 box-glow"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white font-mono">{category.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
              </div>

              <p className="text-xs text-gray-500 font-mono mb-6 uppercase tracking-wider">Status: {category.status}</p>

              {/* Circular Progress (for Data Persistence) */}
              {category.icon === "circular" ? (
                <div className="grid grid-cols-2 gap-6 mb-4">
                  {category.skills.map((skill, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="relative w-20 h-20 mb-3">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0, 255, 157, 0.1)" strokeWidth="3" />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#00ff9d"
                            strokeWidth="3"
                            strokeDasharray={`${2.827 * skill.percentage} ${282.7}`}
                            className="transition-all duration-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{skill.percentage}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 text-center">{skill.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                /* Linear Progress Bars */
                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">{skill.name}</span>
                        <span className="text-xs text-primary font-bold">{skill.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded overflow-hidden border border-primary/20">
                        <div
                          className="h-full bg-primary transition-all duration-500 ease-out"
                          style={{
                            width: hoveredCard === idx ? `${skill.percentage}%` : "0%",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 border-t border-primary/10 pt-8">
          <p className="text-sm text-gray-500 font-mono text-center">
            // Hover over items to view detailed diagnostics ... Status: All modules online
          </p>
        </div>
      </div>
    </main>
  )
}
