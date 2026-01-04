"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/experience", label: "Experience" },
    { href: "/education", label: "Education" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-primary/20 bg-background/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,157,0.1)]">
      <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white group cursor-pointer">
          <span className="text-primary font-mono text-xl font-bold opacity-70 group-hover:opacity-100 transition-opacity">
            &lt;
          </span>
          <h2 className="text-white text-lg font-bold tracking-wide group-hover:text-glow transition-all duration-300 font-mono">
            $ ./rahul_ranjan
          </h2>
          <span className="text-primary font-mono text-xl font-bold opacity-70 group-hover:opacity-100 transition-opacity">
            /&gt;
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-all font-mono ${
                pathname === item.href 
                  ? "text-primary text-glow" 
                  : "text-gray-400 hover:text-primary hover:text-glow"
              }`}
            >
              {pathname === item.href ? ">" : ""} {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        {/* <button className="h-9 px-5 rounded bg-primary text-background font-bold text-sm hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,157,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 font-mono box-glow">
          $ ./resume
        </button> */}
      </div>
    </header>
  )
}
