"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { HOME_DATA } from "@/constants/data"

const useTypeWriter = (text: string, speed = 50, delay = 0) => {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText("")
    setIsComplete(false)

    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        let index = 0
        intervalRef.current = setInterval(() => {
          if (index < text.length) {
            setDisplayedText(text.slice(0, index + 1))
            index++
          } else {
            setIsComplete(true)
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
          }
        }, speed)
      }, delay)
      return () => {
        clearTimeout(delayTimer)
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    } else {
      let index = 0
      intervalRef.current = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          setIsComplete(true)
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        }
      }, speed)
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }
  }, [text, speed, delay])

  return { displayedText, isComplete }
}

export default function Home() {
  const nameTyping = useTypeWriter(HOME_DATA.name, HOME_DATA.typingSpeed.name, HOME_DATA.typingDelay.name)
  const roleTyping = useTypeWriter(HOME_DATA.role, HOME_DATA.typingSpeed.role, HOME_DATA.typingDelay.role)
  const descTyping = useTypeWriter(
    HOME_DATA.description,
    HOME_DATA.typingSpeed.description,
    HOME_DATA.typingDelay.description,
  )

  return (
    <main className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />
        <div className="absolute inset-0 matrix-rain opacity-20 pointer-events-none" />
        <div className="absolute inset-0 binary-rain opacity-10 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: "radial-gradient(circle, transparent 20%, #050505 90%)",
          }}
        />
        {/* Terminal scan lines */}
        <div className="absolute inset-0 scanlines pointer-events-none" />
        {/* Animated border lines */}
        <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse" />
        <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse" />
        {/* Corner brackets with glow */}
        <div className="absolute top-20 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/30 corner-glow" />
        <div className="absolute top-20 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/30 corner-glow" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/30 corner-glow" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/30 corner-glow" />
        {/* Terminal command lines in background */}
        <div className="absolute top-32 left-8 font-mono text-xs text-primary/20 pointer-events-none space-y-2">
          <div className="animate-terminal-line">$ sudo access --grant</div>
          <div className="animate-terminal-line" style={{ animationDelay: "1s" }}>root@system:~$ ./init.sh</div>
          <div className="animate-terminal-line" style={{ animationDelay: "2s" }}>[INFO] System initialized...</div>
        </div>
        <div className="absolute bottom-32 right-8 font-mono text-xs text-primary/20 pointer-events-none space-y-2 text-right">
          <div className="animate-terminal-line">$ npm run deploy</div>
          <div className="animate-terminal-line" style={{ animationDelay: "1.5s" }}>Building for production...</div>
          <div className="animate-terminal-line" style={{ animationDelay: "3s" }}>✓ Compiled successfully</div>
        </div>
        {/* Hex code display */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 font-mono text-[8px] text-primary/10 pointer-events-none leading-tight">
          <div>0x00FF9D</div>
          <div>0x050505</div>
          <div>0xFFFFFF</div>
          <div>0x1A1A1A</div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center text-center max-w-4xl">
        {/* Status Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded border border-primary/40 bg-primary/10 backdrop-blur-sm shadow-[0_0_10px_rgba(0,255,157,0.3)] relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 animate-shimmer" />
          <span className="relative flex h-2 w-2 z-10">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_8px_rgba(0,255,157,0.8)] animate-pulse" />
          </span>
          <span className="text-primary text-xs font-mono font-bold tracking-wider uppercase text-glow relative z-10">[SYSTEM ONLINE]</span>
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scan" />
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight min-h-[80px] md:min-h-[120px] lg:min-h-[150px] flex items-center justify-center text-glow">
          {nameTyping.displayedText}
          <span className="text-primary">
            {nameTyping.displayedText.includes("Rahul") && nameTyping.isComplete
              ? ""
              : nameTyping.displayedText.includes("I") &&
                !nameTyping.displayedText.includes("Rahul") && <span className="animate-blink">|</span>}
          </span>
        </h1>

        <div className="h-8 md:h-10 mb-10 flex items-center justify-center min-h-[32px] md:min-h-[40px]">
          <div className="font-mono text-primary text-lg md:text-2xl font-bold px-4 py-2 text-glow">
            {roleTyping.displayedText}
            {!roleTyping.isComplete && <span className="animate-blink">|</span>}
          </div>
        </div>

        <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-12 leading-relaxed min-h-[80px] md:min-h-[100px] font-mono">
          <span className="text-primary/70">// </span>
          {descTyping.displayedText}
          {!descTyping.isComplete && <span className="animate-blink text-primary">|</span>}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5">
          <Link
            href="/projects"
            className="group relative flex items-center justify-center gap-3 h-12 px-8 rounded bg-primary text-background font-bold text-base overflow-hidden transition-all duration-300 box-glow hover:scale-105 font-mono"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12" />
            <span className="relative z-10">$ ./view_projects</span>
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
            className="group relative flex items-center justify-center gap-3 h-12 px-8 rounded border-2 border-primary/60 text-white font-bold text-base overflow-hidden transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] font-mono"
          >
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>$ ./contact</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
