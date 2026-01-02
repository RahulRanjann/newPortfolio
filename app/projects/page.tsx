"use client"

import { useState } from "react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  status?: string
  category: "all" | "full-stack" | "automation" | "ui-ux"
  links?: {
    source?: string
    demo?: string
  }
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all")

  const projects: Project[] = [
    {
      id: 1,
      title: "GitHub Profile Finder",
      description:
        "React app using GitHub API to surface profiles with bio, repos, and followers. Features dynamic fetching with clean, intuitive UI for discovering developers.",
      image: "/cybersecurity-scan-interface.jpg",
      tags: ["React", "GitHub API", "JavaScript"],
      category: "full-stack",
      links: {
        source: "https://github.com/rahulranjann",
        demo: "#",
      },
    },
    {
      id: 2,
      title: "Go Milestone",
      description:
        "Official company site with Google Maps integration and phone country codes. Hosted on GitHub Pages with responsive design and optimization.",
      image: "/crypto-dashboard.jpg",
      tags: ["HTML5", "CSS3", "JavaScript", "Maps API"],
      category: "ui-ux",
      links: {
        source: "https://github.com/rahulranjann",
        demo: "#",
      },
    },
    {
      id: 3,
      title: "TourTravel",
      description:
        "Travel booking site with authentication and ticketing via Firebase. Real-time chat support integrated with Tawk.to for customer assistance.",
      image: "/secure-messaging-app.jpg",
      tags: ["React", "Firebase", "Tawk.to"],
      category: "full-stack",
      links: {
        source: "https://github.com/rahulranjann",
        demo: "#",
      },
    },
    {
      id: 4,
      title: "E-Commerce Platform",
      description:
        "Full-featured e-commerce application with product management, authentication, and shopping cart. Built with modern React and Firebase.",
      image: "/ai-sentiment-analysis.jpg",
      tags: ["React", "Firebase", "Tailwind CSS"],
      category: "full-stack",
      links: {
        source: "https://github.com/rahulranjann",
        demo: "#",
      },
    },
    {
      id: 5,
      title: "Digital Ads Automation",
      description:
        "Automation system for Google Ads optimization using Google Ads API. Improved digital ad revenue through intelligent workflow automation.",
      image: "/minimalist-portfolio-design.jpg",
      tags: ["Node.js", "Google Ads API", "Python"],
      category: "automation",
      links: {
        source: "https://github.com/rahulranjann",
        demo: "#",
      },
    },
    {
      id: 6,
      title: "Web Scraping Pipeline",
      description:
        "Automated scraping and data upload workflows for Lets Transport. Streamlined data processing with efficient pipeline architecture.",
      image: "/project-management-interface.jpg",
      tags: ["Python", "Web Scraping", "Automation"],
      category: "automation",
      links: {
        source: "https://github.com/rahulranjann",
        demo: "#",
      },
    },
  ]

  const filters = [
    { id: "all", label: "ALL" },
    { id: "full-stack", label: "FULL_STACK" },
    { id: "automation", label: "AUTOMATION" },
    { id: "ui-ux", label: "UI/UX" },
  ]

  const filtered = projects.filter((p) => activeFilter === "all" || p.category === activeFilter)

  return (
    <main className="relative min-h-screen pt-24 pb-12">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block mb-4">
            <p className="text-sm font-mono text-primary/70 uppercase tracking-wider">• SYSTEM_MODULES</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            SELECTED_WORKS<span className="text-primary">_</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            A collection of deployed applications and experiments. Each module represents a specific problem solved
            through code.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded font-mono text-sm font-bold transition-all ${
                activeFilter === filter.id
                  ? "bg-primary text-background box-glow"
                  : "border border-primary/30 text-primary hover:border-primary hover:bg-primary/10"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group border border-primary/20 rounded-lg overflow-hidden hover:border-primary/60 transition-all duration-300 box-glow flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {project.status && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-primary/20 border border-primary text-primary text-xs font-mono rounded">
                    {project.status}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 bg-muted/30">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-400 mb-4 flex-1">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-primary/10 border border-primary/30 text-primary rounded font-mono hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4 border-t border-primary/10">
                  {project.links?.source && (
                    <a
                      href={project.links.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 font-mono font-bold text-sm rounded border border-primary/50 text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{"< >"}</span> SOURCE
                    </a>
                  )}
                  {project.links?.demo && (
                    <button className="flex-1 py-2 px-3 font-mono font-bold text-sm rounded bg-primary/20 border border-primary text-primary hover:bg-primary/30 transition-colors flex items-center justify-center gap-2">
                      <span>▶</span> DEMO
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="font-mono text-primary hover:text-white transition-colors">Load_More_Modules() ↓</button>
        </div>
      </div>
    </main>
  )
}
