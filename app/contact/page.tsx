"use client"

import { type FormEvent, useState, useEffect } from "react"
import { useTypeWriter } from "@/hooks/use-typewriter"

export default function Contact() {
  const [showContent, setShowContent] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  })
  const headingTyping = useTypeWriter("ESTABLISH_CONNECTION_", 40, 0)

  useEffect(() => {
    if (headingTyping.isComplete) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [headingTyping.isComplete])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:don.rahulranjann@gmail.com?subject=${formState.topic}&body=${formState.message}%0A%0AFrom: ${formState.name} (${formState.email})`
    window.location.href = mailtoLink
  }

  return (
    <main className="relative min-h-screen pt-24 pb-12">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block mb-4">
            <p className="text-sm font-mono text-primary/70 uppercase tracking-wider">ROOT_ACCESS</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 min-h-[60px] md:min-h-[80px]">
            {headingTyping.displayedText ? (
              <>
                {headingTyping.displayedText.includes("CONNECTION") ? (
                  <>
                    {headingTyping.displayedText.split("CONNECTION")[0]}
                    <span className="text-primary">CONNECTION</span>
                    {headingTyping.displayedText.split("CONNECTION")[1]}
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
            <p className="text-gray-400 max-w-2xl animate-fade-in">
              Secure channel open. Input your parameters below to initialize communication protocol. Response latency:
              &lt; 24h.
            </p>
          )}
        </div>

        {/* Contact Container */}
        {showContent && (
          <div className="border border-primary/20 rounded-lg overflow-hidden bg-muted/30 box-glow animate-fade-in">
          {/* Terminal Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-primary/20 bg-muted/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-gray-500 font-mono ml-2">user@guest: ~/contact-form [bash]</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Form Section */}
            <div className="p-8 border-r border-primary/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-mono text-primary uppercase tracking-wider block mb-3">
                    &gt; ENTER_NAME
                  </label>
                  <input
                    type="text"
                    placeholder="$ your_name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-muted border border-primary/20 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-mono text-primary uppercase tracking-wider block mb-3">
                    &gt; ENTER_EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="@ your_email@domain.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-muted border border-primary/20 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-mono text-primary uppercase tracking-wider block mb-3">
                    &gt; SPECIFY_TOPIC
                  </label>
                  <input
                    type="text"
                    placeholder="# project_inquiry"
                    value={formState.topic}
                    onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-muted border border-primary/20 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <p className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-3">DIRECT_FEED:</p>
                  <div className="flex gap-4">
                    {[
                      { icon: "⚙️", label: "GitHub", link: "https://github.com/rahulranjann" },
                      { icon: "💼", label: "LinkedIn", link: "https://www.linkedin.com/in/rahulranjann/" },
                      { icon: "📸", label: "Instagram", link: "https://www.instagram.com/rahulranjann/" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
                        title={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Code Editor Section */}
            <div className="p-8 bg-muted/50 font-mono text-sm border-l border-primary/10">
              <div className="mb-4 text-gray-500">
                <span className="text-primary">&gt;</span> COMPILE_MESSAGE
              </div>

              <textarea
                placeholder="// write your code here..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full h-48 bg-transparent text-gray-300 font-mono placeholder-gray-600 focus:outline-none resize-none"
                required
              />

              {/* Line Numbers */}
              <div className="flex gap-4 text-gray-600 text-xs mt-4">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i}>{String(i + 1).padStart(2, "0")}</div>
                  ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-primary/20 bg-muted/50 flex items-center justify-between">
            <div className="text-xs text-gray-500 font-mono">STATUS: ONLINE • ENCRYPTION: AES-256</div>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded bg-primary text-background font-bold font-mono uppercase tracking-wider hover:scale-105 transition-transform box-glow"
            >
              ▶ [ EXECUTE_TRANSMISSION ]
            </button>
          </div>
        </div>
        )}
      </div>
    </main>
  )
}
