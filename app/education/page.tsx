"use client"

import { useState, useEffect } from "react"
import { useTypeWriter } from "@/hooks/use-typewriter"
import { EDUCATION_ITEMS, EDUCATION_STATS, PAGE_HEADINGS } from "@/constants/data"
import { Mail, ExternalLink, Calendar, MapPin, Award, Terminal, ChevronRight } from "lucide-react"

export default function Education() {
  const [showContent, setShowContent] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const headingTyping = useTypeWriter(PAGE_HEADINGS.education.title, 40, 0)

  useEffect(() => {
    if (headingTyping.isComplete) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [headingTyping.isComplete])

  return (
    <main className="relative min-h-screen pt-24 pb-12">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <p className="text-sm font-mono text-primary/70 uppercase tracking-wider">02. SYSTEM_LOG</p>
            </div>
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
            <p className="text-gray-400 animate-fade-in max-w-2xl">
              Compiling academic background and certification history. Initialize timeline sequence.
            </p>
          )}
        </div>

        {/* Education Grid */}
        {showContent && (
          <>
            <div className="grid gap-8 animate-fade-in">
              {EDUCATION_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative"
                  onMouseEnter={() => setActiveCard(idx)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Main Card */}
                  <div 
                    className={`relative border rounded-xl overflow-hidden transition-all duration-500 ${
                      activeCard === idx 
                        ? "border-primary bg-primary/5 shadow-[0_0_40px_rgba(34,197,94,0.15)]" 
                        : "border-primary/20 bg-muted/30 hover:border-primary/40"
                    }`}
                  >
                    {/* Terminal Header */}
                    <div className="flex items-center gap-3 px-6 py-3 border-b border-primary/20 bg-muted/50">
                      <div className="flex gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${activeCard === idx ? "bg-red-500" : "bg-red-500/50"}`} />
                        <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${activeCard === idx ? "bg-yellow-500" : "bg-yellow-500/50"}`} />
                        <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${activeCard === idx ? "bg-green-500" : "bg-green-500/50"}`} />
                      </div>
                      <span className="text-xs text-gray-500 font-mono">education_record_{String(idx + 1).padStart(2, "0")}.log</span>
                      <div className="ml-auto flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider transition-colors duration-300 ${
                          activeCard === idx ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary/60"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${activeCard === idx ? "bg-primary animate-pulse" : "bg-primary/50"}`} />
                          verified
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        {/* Icon Section */}
                        <div className="flex-shrink-0">
                          <div 
                            className={`relative w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ${
                              activeCard === idx 
                                ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(34,197,94,0.3)]" 
                                : "border-primary/30 bg-muted"
                            }`}
                          >
                            <item.icon className={`w-8 h-8 transition-all duration-300 ${
                              activeCard === idx ? "text-primary scale-110" : "text-primary/70"
                            }`} />
                            
                            {/* Corner accents */}
                            <div className={`absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 transition-colors duration-300 ${
                              activeCard === idx ? "border-primary" : "border-primary/30"
                            }`} />
                            <div className={`absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 transition-colors duration-300 ${
                              activeCard === idx ? "border-primary" : "border-primary/30"
                            }`} />
                            <div className={`absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 transition-colors duration-300 ${
                              activeCard === idx ? "border-primary" : "border-primary/30"
                            }`} />
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 transition-colors duration-300 ${
                              activeCard === idx ? "border-primary" : "border-primary/30"
                            }`} />
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {item.title}
                              </h3>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                                <span className="flex items-center gap-1.5 text-gray-400 font-mono">
                                  <MapPin className="w-3.5 h-3.5 text-primary/60" />
                                  {item.institution}
                                </span>
                                <span className="hidden sm:block text-gray-600">|</span>
                                <span className="flex items-center gap-1.5 text-primary font-mono">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {item.period}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="relative mb-6">
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
                            <p className="text-gray-300 text-sm leading-relaxed pl-4 border-l border-transparent">
                              {item.details}
                            </p>
                          </div>

                          {/* Tags */}
                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {item.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className={`px-3 py-1.5 text-xs border rounded-lg font-mono transition-all duration-300 ${
                                    activeCard === idx
                                      ? "border-primary/50 bg-primary/10 text-primary"
                                      : "border-primary/20 bg-primary/5 text-primary/70 hover:border-primary/40"
                                  }`}
                                >
                                  <ChevronRight className="w-3 h-3 inline mr-1 opacity-50" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Index Badge */}
                        <div className="hidden lg:flex flex-col items-end gap-2">
                          <div className={`text-4xl font-black font-mono transition-colors duration-300 ${
                            activeCard === idx ? "text-primary" : "text-primary/20"
                          }`}>
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Progress Bar */}
                    <div className="h-1 bg-muted">
                      <div 
                        className={`h-full bg-gradient-to-r from-primary via-primary/80 to-primary/50 transition-all duration-700 ${
                          activeCard === idx ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Connecting Line (except for last item) */}
                  {idx < EDUCATION_ITEMS.length - 1 && (
                    <div className="flex justify-center py-4">
                      <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {EDUCATION_STATS.map((stat, idx) => (
                <div 
                  key={idx}
                  className="group p-6 border border-primary/20 rounded-xl bg-muted/30 hover:border-primary/40 transition-all duration-300 hover:bg-primary/5"
                >
                  <div className="text-3xl md:text-4xl font-black text-primary mb-1 font-mono">
                    {stat.value}<span className="text-primary/50">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 border border-primary/20 rounded-xl p-8 md:p-12 bg-muted/30 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">Connection Request</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  <span className="text-primary">//</span> READY_TO_COLLABORATE
                </h2>
                <p className="text-gray-400 mb-8 max-w-2xl">
                  Initialize communication sequence. Currently available for new opportunities, 
                  freelance projects, and innovative collaborations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:don.rahulranjann@gmail.com"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary text-background font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="font-mono">CONTACT_ME</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="https://github.com/rahulranjann"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-primary/50 text-white font-bold transition-all hover:bg-primary/10 hover:border-primary"
                  >
                    <ExternalLink className="w-5 h-5 text-primary" />
                    <span className="font-mono">VIEW_GITHUB</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
