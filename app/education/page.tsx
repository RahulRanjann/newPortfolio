"use client"

import { useState, useEffect } from "react"
import { useTypeWriter } from "@/hooks/use-typewriter"

export default function Education() {
  const [showContent, setShowContent] = useState(false)
  const headingTyping = useTypeWriter("//EDUCATION", 40, 0)

  useEffect(() => {
    if (headingTyping.isComplete) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [headingTyping.isComplete])
  const educationItems = [
    {
      icon: "🎓",
      title: "B.Tech. in Computer Science",
      institution: "Manipal Institute of Technology, Manipal",
      period: "2022 - 2025",
      details: `First Class. Focus on Full Stack Development and Machine Learning. Studying advanced algorithms, web technologies, and distributed systems.`,
      tags: ["Full Stack Development", "ML", "Web Technologies"],
    },
    {
      icon: "📚",
      title: "Diploma in ITEMS",
      institution: "Rajokari Institute of Technology, Delhi",
      period: "2019 - 2022",
      details:
        "Strong foundation in mathematics and computer science. Prepared for advanced technical studies with focus on programming fundamentals.",
      tags: ["Programming", "Math", "CS Fundamentals"],
    },
    {
      icon: "💻",
      title: "Full Stack Development",
      institution: "Self-Taught & Industry Experience",
      period: "2023 - Present",
      details:
        "Continuous learning through real-world projects, open-source contributions, and hands-on experience with modern web technologies.",
      tags: ["React", "Node.js", "Cloud Technologies"],
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
            <p className="text-sm font-mono text-primary/70 uppercase tracking-wider">02. SYSTEM_LOG</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 min-h-[60px] md:min-h-[80px]">
            {headingTyping.displayedText ? (
              <>
                {headingTyping.displayedText.includes("//") ? (
                  <>
                    <span className="text-primary">//</span>
                    {headingTyping.displayedText.replace("//", "")}
                    {!headingTyping.isComplete && <span className="animate-blink">|</span>}
                  </>
                ) : (
                  <>
                    {headingTyping.displayedText}
                    {!headingTyping.isComplete && <span className="animate-blink">|</span>}
                  </>
                )}
              </>
            ) : (
              <span className="animate-blink">|</span>
            )}
          </h1>
          {showContent && (
            <p className="text-gray-400 animate-fade-in">
              Compiling academic background and certification history. Initialize timeline sequence.
            </p>
          )}
        </div>

        {/* Timeline */}
        {showContent && (
          <>
          <div className="relative animate-fade-in">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          {/* Items */}
          <div className="space-y-6">
            {educationItems.map((item, idx) => (
              <div key={idx} className="flex gap-6">
                {/* Timeline Dot */}
                <div className="flex flex-col items-center mt-2 flex-shrink-0">
                  <div className="relative z-10 w-12 h-12 rounded-full border-2 border-primary bg-muted flex items-center justify-center text-xl hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8 border border-primary/20 rounded-lg p-6 hover:border-primary/60 transition-all box-glow bg-muted/30">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400 font-mono">📍 {item.institution}</p>
                    </div>
                    <span className="text-sm text-primary font-mono whitespace-nowrap">{item.period}</span>
                  </div>

                  <p className="text-gray-300 text-sm mt-4 mb-4">{item.details}</p>

                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs border border-primary/30 rounded bg-primary/5 text-primary font-mono hover:bg-primary/10 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 border-t border-primary/10 pt-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            <span className="text-primary">//</span> CONNECTION_REQUEST
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Initialize communication sequence. Currently available for new opportunities and freelance projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:don.rahulranjann@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded bg-primary text-background font-bold transition-all hover:scale-105 box-glow"
            >
              <span>📧</span> // CONTACT_ME
            </a>
            <a
              href="https://github.com/rahulranjann"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded border border-primary/50 text-white font-bold transition-all hover:bg-primary/10"
            >
              <span>{"</>"}</span> VIEW_GITHUB
            </a>
          </div>
        </div>
        </>
        )}
      </div>
    </main>
  )
}
