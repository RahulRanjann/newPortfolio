"use client"

import { useState } from "react"

interface Experience {
  title: string
  company: string
  period: string
  location: string
  status: string
  description: string[]
  skills: string[]
  isActive?: boolean
}

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const experiences: Experience[] = [
    {
      title: "QA Engineer",
      company: "Zinc",
      period: "[2025.01 :: PRESENT]",
      location: "Bangalore",
      status: "ACTIVE_PROCESS",
      description: [
        "Automated testing for ADA platform.",
        "Created AI 'talk to ADA' parent interface.",
        "Focused on quality assurance and automation testing.",
      ],
      skills: ["Testing", "Automation", "QA"],
      isActive: true,
    },
    {
      title: "Digital Ads Automation & Full Stack Developer",
      company: "Lets Transport",
      period: "[2024.12 :: PRESENT]",
      location: "Bangalore",
      status: "ACTIVE_PROCESS",
      description: [
        "Built ad-optimization automations using Google Ads API.",
        "Created scraping pipelines and upload workflows.",
        "Improved digital ad revenue through automation.",
      ],
      skills: ["React", "Node.js", "Google Ads API", "Automation"],
      isActive: true,
    },
    {
      title: "Full Stack Developer",
      company: "Lets Transport",
      period: "[2024.05 :: 2024.08]",
      location: "Bangalore",
      description: [
        "Built website that boosted traffic by 40% and profit by 7%.",
        "Automated scraping and upload workflows.",
        "Implemented responsive design and performance optimization.",
      ],
      skills: ["React", "Next.js", "MongoDB", "Node.js"],
    },
    {
      title: "Full Stack Developer",
      company: "Pine&Lime",
      period: "[2024.03 :: 2024.05]",
      location: "Gurgaon",
      description: [
        "Delivered full-featured e-commerce application.",
        "Implemented authentication and product management systems.",
        "Built responsive UI with Tailwind CSS.",
      ],
      skills: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
    },
    {
      title: "Full Stack Developer",
      company: "GoMilestone",
      period: "[2023.12 :: 2024.01]",
      location: "Gurgaon",
      description: [
        "Developed responsive, scalable company website.",
        "Used HTML, CSS, JavaScript and Bootstrap 5.",
        "Optimized for cross-browser compatibility.",
      ],
      skills: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
    },
  ]

  return (
    <main className="relative min-h-screen pt-24 pb-12">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block mb-4">
            <p className="text-sm font-mono text-primary/70">&gt; SYSTEM_EXECUTION</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white">
            run <span className="text-primary">experience.exe</span> _
          </h1>
          <p className="text-gray-400 font-mono text-sm mt-4">
            Initializing System Logs: Retrieving career history data blocks... Status: Loaded successfully.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

              {/* Experience Items */}
              <div className="space-y-8">
                {experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="cursor-pointer"
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                  >
                    {/* Timeline Dot */}
                    <div className="flex items-start gap-6">
                      <div className="relative mt-1">
                        <div
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                            exp.isActive
                              ? "border-primary bg-primary/20 shadow-[0_0_15px_rgba(0,255,157,0.4)]"
                              : "border-primary/40 bg-muted hover:border-primary"
                          }`}
                        >
                          <span className="text-xl">⬤</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 mt-2 border border-primary/20 rounded-lg p-5 hover:border-primary/60 transition-all hover:bg-muted/50 box-glow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                            <p className="text-sm text-gray-400 font-mono">
                              @ {exp.company} • {exp.location}
                            </p>
                          </div>
                          {exp.isActive && (
                            <span className="px-3 py-1 text-xs bg-primary/20 border border-primary text-primary rounded-full font-mono tracking-wider">
                              ● ACTIVE_PROCESS
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-primary/70 font-mono mb-4">{exp.period}</p>

                        {/* Expandable Content */}
                        {expandedIndex === idx && (
                          <div className="mt-4 pt-4 border-t border-primary/10">
                            <ul className="space-y-2 mb-4">
                              {exp.description.map((desc, i) => (
                                <li key={i} className="text-sm text-gray-300 flex gap-3">
                                  <span className="text-primary flex-shrink-0">›</span>
                                  <span>{desc}</span>
                                </li>
                              ))}
                            </ul>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 text-xs border border-primary/30 rounded bg-primary/5 text-primary font-mono hover:bg-primary/10 transition-colors"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-3 text-xs text-gray-500 font-mono">
                          {expandedIndex === idx ? "$ click to collapse" : "$ click to expand"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-primary/20 rounded-lg p-6 bg-muted/50 backdrop-blur-sm box-glow">
              <h3 className="text-sm font-mono text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                System Stats
              </h3>

              <div className="space-y-6">
                {/* Experience */}
                <div>
                  <p className="text-xs text-gray-500 uppercase font-mono tracking-wider mb-2">EXPERIENCE</p>
                  <p className="text-3xl font-bold text-primary">02</p>
                  <p className="text-xs text-gray-400">years</p>
                </div>

                {/* Projects */}
                <div>
                  <p className="text-xs text-gray-500 uppercase font-mono tracking-wider mb-2">PROJECTS</p>
                  <p className="text-3xl font-bold text-primary">15+</p>
                  <p className="text-xs text-gray-400">deployed</p>
                </div>

                {/* Contributions */}
                <div>
                  <p className="text-xs text-gray-500 uppercase font-mono tracking-wider mb-2">CONTRIBUTIONS</p>
                  <p className="text-3xl font-bold text-primary">100+</p>
                  <p className="text-xs text-gray-400">approx</p>
                </div>

                {/* Skills Breakdown */}
                <div className="pt-6 border-t border-primary/10">
                  <p className="text-xs text-gray-500 uppercase font-mono tracking-wider mb-4">SKILL_MATRIX</p>
                  <div className="space-y-3">
                    {[
                      { name: "TypeScript / React", percent: 98 },
                      { name: "Python / Django", percent: 85 },
                      { name: "System Architecture", percent: 90 },
                    ].map((skill, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-400">{skill.name}</span>
                          <span className="text-xs text-primary font-bold">{skill.percent}%</span>
                        </div>
                        <div className="h-1 bg-muted rounded overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${skill.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Log */}
                <div className="pt-6 border-t border-primary/10">
                  <p className="text-xs text-gray-500 uppercase font-mono tracking-wider mb-4">ACTIVITY_LOG</p>
                  <div className="flex gap-1">
                    {Array(24)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 h-6 bg-muted rounded border border-primary/20 hover:border-primary hover:bg-primary/20 transition-all cursor-pointer"
                          title={`Activity day ${i}`}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
