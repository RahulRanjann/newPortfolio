"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useTypeWriter } from "@/hooks/use-typewriter"
import { ABOUT_DATA, ABOUT_SKILLS, SOCIAL_LINKS, PAGE_HEADINGS } from "@/constants/data"

export default function About() {
  const [showContent, setShowContent] = useState(false)
  const headingTyping = useTypeWriter(PAGE_HEADINGS.about.title, 40, 0)

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
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 binary-rain opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        {/* Terminal Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <p className="text-sm font-mono text-primary/70">{ABOUT_DATA.systemInfo}</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 min-h-[60px] md:min-h-[80px]">
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
              root@system:~$ cat intro.md | grep -i "rahul"
            </p>
          )}
        </div>

        {/* Main Content - Terminal Container */}
        {showContent && (
          <>
          {/* Profile Section */}
          <div className="border border-primary/20 rounded-lg bg-muted/50 backdrop-blur-sm p-6 md:p-8 box-glow animate-fade-in mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left - Profile Image & Stats */}
              <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
                {/* Profile Image */}
                <div className="relative w-56 h-56 mb-6 rounded-lg overflow-hidden border-2 border-primary/30 hover:border-primary transition-all duration-300 group shadow-[0_0_20px_rgba(0,255,157,0.2)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent z-10" />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                  <Image
                    src={ABOUT_DATA.profileImage}
                    alt="Rahul Profile"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 z-0"
                  />
                  {/* Scan line effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 animate-scan z-30 pointer-events-none" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="border border-primary/20 rounded-lg p-4 text-center hover:bg-primary/5 hover:border-primary/40 transition-all group relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="text-3xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">
                        {ABOUT_DATA.stats.experience.value}
                      </div>
                      <div className="text-xs text-gray-400 uppercase font-mono tracking-wider">{ABOUT_DATA.stats.experience.label}</div>
                    </div>
                  </div>
                  <div className="border border-primary/20 rounded-lg p-4 text-center hover:bg-primary/5 hover:border-primary/40 transition-all group relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="text-3xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">
                        {ABOUT_DATA.stats.projects.value}
                      </div>
                      <div className="text-xs text-gray-400 uppercase font-mono tracking-wider">{ABOUT_DATA.stats.projects.label}</div>
                    </div>
                  </div>
                </div>

                {/* Terminal Command Display */}
                <div className="mt-6 w-full border border-primary/10 rounded p-4 bg-background/50 font-mono text-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary">$</span>
                    <span className="text-gray-400">whoami</span>
                  </div>
                  <div className="text-primary">rahul@developer</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-primary">$</span>
                    <span className="text-gray-400">pwd</span>
                  </div>
                  <div className="text-primary">~/portfolio/about</div>
                </div>
              </div>

              {/* Right - Bio */}
              <div className="lg:col-span-3">
                <div className="mb-6 font-mono text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <p>cat intro.md</p>
                  <span className="text-primary/50">|</span>
                  <span className="text-primary/50">grep -i "developer"</span>
                </div>

                <h2 className="text-3xl font-bold text-white mb-6 text-glow">
                  {ABOUT_DATA.bio.title}
                </h2>

                <div className="space-y-4 mb-8">
                  {ABOUT_DATA.bio.paragraphs.map((paragraph, idx) => (
                    <div key={idx} className="relative pl-4 border-l-2 border-primary/20 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                      <p className="text-gray-300 leading-relaxed">
                        {paragraph}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Skills Grid */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-sm font-mono text-primary uppercase tracking-wider">
                      Known_Vulnerabilities (SKILLS)
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ABOUT_SKILLS.map((skill, idx) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 border border-primary/30 rounded text-sm text-primary hover:bg-primary/10 hover:border-primary/60 transition-all font-mono animate-slide-up hover:scale-105"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={ABOUT_DATA.cta.downloadCV.href}
                    className="group flex items-center justify-center gap-2 px-6 py-3 rounded bg-primary text-background font-bold transition-all hover:scale-105 box-glow relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="relative z-10">{ABOUT_DATA.cta.downloadCV.text}</span>
                  </Link>
                  <Link
                    href={ABOUT_DATA.cta.viewSource.href}
                    className="group flex items-center justify-center gap-2 px-6 py-3 rounded border border-primary/50 text-white font-bold transition-all hover:bg-primary/10 hover:border-primary relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <svg className="w-5 h-5 text-primary relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4m0 6V4m0 0L8 4m0 0l4 4"
                      />
                    </svg>
                    <span className="relative z-10">{ABOUT_DATA.cta.viewSource.text}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-sm font-mono text-primary uppercase tracking-wider">// Social_Uplink</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
              <span className="text-xs text-gray-500 font-mono">[3 connections]</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SOCIAL_LINKS.map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-primary/20 rounded-lg p-6 hover:bg-primary/5 hover:border-primary/60 transition-all box-glow relative overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="mb-4 group-hover:text-primary transition-all duration-300">
                      <social.icon className="w-10 h-10 group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {social.title}
                    </h4>
                    <p className="text-sm text-gray-400 font-mono group-hover:text-gray-300 transition-colors">
                      {social.desc}
                    </p>
                    <div className="mt-4 text-xs text-primary/50 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      → connect
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          </>
        )}
      </div>
    </main>
  )
}
