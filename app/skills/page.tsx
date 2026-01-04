"use client"

import { useState, useEffect } from "react"
import { useTypeWriter } from "@/hooks/use-typewriter"
import { SKILL_CATEGORIES, PAGE_HEADINGS } from "@/constants/data"

export default function Skills() {
  const [showContent, setShowContent] = useState(false)
  const [animateProgress, setAnimateProgress] = useState(false)
  const headingTyping = useTypeWriter(PAGE_HEADINGS.skills.title, 40, 0)

  useEffect(() => {
    if (headingTyping.isComplete) {
      const timer = setTimeout(() => {
        setShowContent(true)
        // Start progress animations after content is shown
        setTimeout(() => {
          setAnimateProgress(true)
        }, 200)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [headingTyping.isComplete])


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
          <h1 className="text-4xl md:text-6xl font-black text-white min-h-[60px] md:min-h-[80px]">
            {headingTyping.displayedText ? (
              <>
                {headingTyping.displayedText.includes("//") ? (
                  <>
                    {headingTyping.displayedText.split("//")[0]}
                    <span className="text-primary">// {headingTyping.displayedText.split("//")[1] || ""}</span>
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
            <p className="text-gray-400 font-mono text-sm mt-4 animate-fade-in">
              root@user:~$ executing ./show_skills.sh --verbose --visualize
            </p>
          )}
        </div>

        {/* Skills Grid */}
        {showContent && (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div
              key={idx}
              className="border border-primary/20 rounded-lg p-6 bg-muted/50 backdrop-blur-sm hover:border-primary/60 transition-all duration-300 box-glow animate-slide-up"
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
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
                            strokeDasharray="282.7"
                            strokeDashoffset={animateProgress ? `${282.7 - (282.7 * skill.percentage / 100)}` : "282.7"}
                            className="transition-all duration-1000 ease-out"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary transition-opacity duration-500" style={{ opacity: animateProgress ? 1 : 0 }}>
                            {skill.percentage}%
                          </span>
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
                    <div key={i} style={{ animationDelay: `${(idx * 100) + (i * 50)}ms` }}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">{skill.name}</span>
                        <span className="text-xs text-primary font-bold transition-opacity duration-500" style={{ opacity: animateProgress ? 1 : 0 }}>
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded overflow-hidden border border-primary/20">
                        <div
                          className="h-full bg-primary transition-all duration-1000 ease-out"
                          style={{
                            width: animateProgress ? `${skill.percentage}%` : "0%",
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
              // All modules loaded and operational ... Status: All systems online
            </p>
          </div>
          </>
        )}
      </div>
    </main>
  )
}
