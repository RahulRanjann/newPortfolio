"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

const useTypeWriter = (text: string, speed = 50, delay = 0) => {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        let index = 0
        const interval = setInterval(() => {
          if (index < text.length) {
            setDisplayedText(text.slice(0, index + 1))
            index++
          } else {
            setIsComplete(true)
            clearInterval(interval)
          }
        }, speed)
        return () => clearInterval(interval)
      }, delay)
      return () => clearTimeout(delayTimer)
    } else {
      let index = 0
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }
  }, [text, speed, delay])

  return { displayedText, isComplete }
}

export default function Home() {
  const nameTyping = useTypeWriter("Hi, I'm Rahul", 50, 0)
  const roleTyping = useTypeWriter("> Full Stack Developer | Problem Solver_", 50, 1000)
  const descTyping = useTypeWriter(
    "Blending tech and design to solve real problems. Building scalable web apps, automating workflows, and driving digital innovation. Let's turn lines of code into impactful solutions.",
    30,
    2000,
  )

  return (
    <main className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: "radial-gradient(circle, transparent 20%, #050505 90%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center text-center max-w-4xl">
        {/* Status Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm animate-pulse">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-primary text-xs font-mono font-medium tracking-wider uppercase">System Online</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight min-h-[80px] md:min-h-[120px] lg:min-h-[150px] flex items-center justify-center">
          {nameTyping.displayedText}
          <span className="text-primary">
            {nameTyping.displayedText.includes("Rahul") && nameTyping.isComplete
              ? ""
              : nameTyping.displayedText.includes("I") &&
                !nameTyping.displayedText.includes("Rahul") && <span className="animate-pulse">|</span>}
          </span>
        </h1>

        <div className="h-8 md:h-10 mb-10 flex items-center justify-center min-h-[32px] md:min-h-[40px]">
          <div className="font-mono text-primary text-lg md:text-2xl font-bold bg-muted/50 px-4 py-2 rounded border border-primary/30">
            {roleTyping.displayedText}
            {!roleTyping.isComplete && <span className="animate-pulse">|</span>}
          </div>
        </div>

        <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-12 leading-relaxed min-h-[80px] md:min-h-[100px]">
          {descTyping.displayedText}
          {!descTyping.isComplete && <span className="animate-pulse">|</span>}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5">
          <Link
            href="/projects"
            className="group relative flex items-center justify-center gap-3 h-12 px-8 rounded bg-primary text-background font-bold text-base overflow-hidden transition-all duration-300 box-glow hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12" />
            <span className="relative z-10">View Projects</span>
            <svg
              className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="group relative flex items-center justify-center gap-3 h-12 px-8 rounded border border-primary/50 text-white font-bold text-base overflow-hidden transition-all duration-300 hover:border-primary hover:bg-primary/10"
          >
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Contact Me</span>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 z-10 hidden md:flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-primary/70 font-mono">Scroll</span>
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </main>
  )
}
