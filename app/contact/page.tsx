"use client"

import { type FormEvent, useState, useEffect, useRef } from "react"
import { useTypeWriter } from "@/hooks/use-typewriter"
import { SOCIAL_LINKS } from "@/constants/data"

declare global {
  interface Window {
    emailjs: {
      init: (publicKey: string) => void
      sendForm: (
        serviceId: string,
        templateId: string,
        form: HTMLFormElement
      ) => Promise<{ status: number; text: string }>
    }
  }
}

// Success Animation Component
function SuccessAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0)
  const [typedText, setTypedText] = useState("")
  const successMessages = [
    "> INITIALIZING SECURE CHANNEL...",
    "> ENCRYPTING PAYLOAD [AES-256]...",
    "> TRANSMISSION SUCCESSFUL ✓",
    "> MESSAGE DELIVERED TO TARGET",
  ]

  useEffect(() => {
    const phaseTimers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3000),
      setTimeout(() => onComplete(), 4500),
    ]
    return () => phaseTimers.forEach(clearTimeout)
  }, [onComplete])

  useEffect(() => {
    if (phase >= 1 && phase <= 4) {
      const message = successMessages[phase - 1]
      let index = 0
      setTypedText("")
      const typeInterval = setInterval(() => {
        if (index < message.length) {
          setTypedText(message.slice(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
        }
      }, 25)
      return () => clearInterval(typeInterval)
    }
  }, [phase])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Dark overlay with fade in */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        style={{ animation: "fadeIn 0.3s ease-out" }}
      />
      
      {/* Scan lines effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.03) 2px, rgba(34,197,94,0.03) 4px)",
          animation: "scanlines 8s linear infinite",
        }}
      />
      
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "gridPulse 2s ease-in-out infinite",
        }}
      />

      {/* Main content container */}
      <div 
        className="relative z-10 max-w-lg w-full mx-4 p-8 border border-primary/30 rounded-lg bg-black/80"
        style={{ 
          boxShadow: "0 0 60px rgba(34,197,94,0.3), inset 0 0 60px rgba(34,197,94,0.05)",
          animation: "containerGlow 2s ease-in-out infinite alternate",
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/20">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: "0.4s" }} />
          <span className="ml-2 text-xs text-gray-500 font-mono">transmission_status.log</span>
        </div>

        {/* Success icon with glitch effect */}
        {phase >= 3 && (
          <div 
            className="flex justify-center mb-6"
            style={{ animation: "glitchIn 0.5s ease-out" }}
          >
            <div 
              className="relative w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center"
              style={{ 
                boxShadow: "0 0 30px rgba(34,197,94,0.5), inset 0 0 30px rgba(34,197,94,0.2)",
                animation: "iconPulse 1.5s ease-in-out infinite",
              }}
            >
              <svg 
                className="w-12 h-12 text-primary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ animation: "checkDraw 0.6s ease-out forwards" }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7"
                  style={{
                    strokeDasharray: 30,
                    strokeDashoffset: 30,
                    animation: "drawCheck 0.6s ease-out 0.2s forwards",
                  }}
                />
              </svg>
              
              {/* Glitch copies */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-50"
                style={{ animation: "glitchCopy1 0.3s ease-in-out infinite" }}
              />
              <div 
                className="absolute inset-0 rounded-full border-2 border-red-400 opacity-30"
                style={{ animation: "glitchCopy2 0.3s ease-in-out infinite" }}
              />
            </div>
          </div>
        )}

        {/* Terminal output */}
        <div className="font-mono text-sm space-y-2 mb-6">
          {successMessages.slice(0, phase).map((msg, i) => (
            <div 
              key={i} 
              className={`${i === phase - 1 ? "text-primary" : "text-gray-500"}`}
              style={{ animation: i === phase - 1 ? "textGlow 0.5s ease-out" : undefined }}
            >
              {i === phase - 1 ? typedText : msg}
              {i === phase - 1 && <span className="animate-blink">|</span>}
            </div>
          ))}
        </div>

        {/* Success title with glitch */}
        {phase >= 5 && (
          <div className="text-center" style={{ animation: "fadeSlideUp 0.5s ease-out" }}>
            <h2 
              className="text-2xl font-black text-white mb-2 relative inline-block"
              style={{ animation: "glitchText 3s infinite" }}
            >
              TRANSMISSION_COMPLETE
              <span 
                className="absolute inset-0 text-cyan-400 opacity-70"
                style={{ animation: "glitchOffset1 0.3s infinite" }}
              >
                TRANSMISSION_COMPLETE
              </span>
              <span 
                className="absolute inset-0 text-red-400 opacity-50"
                style={{ animation: "glitchOffset2 0.3s infinite" }}
              >
                TRANSMISSION_COMPLETE
              </span>
            </h2>
            <p className="text-gray-400 text-sm">
              Response latency: &lt; 24h
            </p>
          </div>
        )}

        {/* Progress bar */}
        <div className="mt-6 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary via-cyan-400 to-primary rounded-full"
            style={{ 
              width: `${(phase / 5) * 100}%`,
              transition: "width 0.5s ease-out",
              boxShadow: "0 0 10px rgba(34,197,94,0.8)",
            }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `particleFloat ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-primary/50" style={{ animation: "cornerPulse 2s infinite" }} />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-primary/50" style={{ animation: "cornerPulse 2s infinite 0.5s" }} />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-primary/50" style={{ animation: "cornerPulse 2s infinite 1s" }} />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-primary/50" style={{ animation: "cornerPulse 2s infinite 1.5s" }} />

      {/* Inject keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        @keyframes containerGlow {
          from { box-shadow: 0 0 60px rgba(34,197,94,0.2), inset 0 0 60px rgba(34,197,94,0.03); }
          to { box-shadow: 0 0 80px rgba(34,197,94,0.4), inset 0 0 80px rgba(34,197,94,0.08); }
        }
        @keyframes glitchIn {
          0% { transform: scale(0.8) translateX(-10px); opacity: 0; filter: blur(10px); }
          50% { transform: scale(1.05) translateX(5px); filter: blur(2px); }
          100% { transform: scale(1) translateX(0); opacity: 1; filter: blur(0); }
        }
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(34,197,94,0.5), inset 0 0 30px rgba(34,197,94,0.2); }
          50% { transform: scale(1.05); box-shadow: 0 0 50px rgba(34,197,94,0.7), inset 0 0 50px rgba(34,197,94,0.3); }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes glitchCopy1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-2px, 1px); }
          75% { transform: translate(2px, -1px); }
        }
        @keyframes glitchCopy2 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(2px, -1px); }
          75% { transform: translate(-2px, 1px); }
        }
        @keyframes textGlow {
          from { text-shadow: 0 0 20px rgba(34,197,94,0.8); }
          to { text-shadow: 0 0 5px rgba(34,197,94,0.5); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glitchText {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(-2px, 1px); }
          94% { transform: translate(2px, -1px); }
          96% { transform: translate(-1px, -1px); }
          98% { transform: translate(1px, 1px); }
        }
        @keyframes glitchOffset1 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          25% { clip-path: inset(10% 0 60% 0); transform: translate(-2px, 0); }
          50% { clip-path: inset(40% 0 20% 0); transform: translate(2px, 0); }
          75% { clip-path: inset(70% 0 10% 0); transform: translate(-1px, 0); }
        }
        @keyframes glitchOffset2 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          25% { clip-path: inset(60% 0 10% 0); transform: translate(2px, 0); }
          50% { clip-path: inset(20% 0 40% 0); transform: translate(-2px, 0); }
          75% { clip-path: inset(10% 0 70% 0); transform: translate(1px, 0); }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.8; }
        }
        @keyframes cornerPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default function Contact() {
  const [showContent, setShowContent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const headingTyping = useTypeWriter("ESTABLISH_CONNECTION_", 40, 0)

  useEffect(() => {
    if (headingTyping.isComplete) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [headingTyping.isComplete])

  // Initialize EmailJS when component mounts and script is loaded
  useEffect(() => {
    let retryCount = 0
    const maxRetries = 10
    
    const initEmailJS = () => {
      if (typeof window !== "undefined" && window.emailjs) {
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "PUBLIC_KEY_HERE"
        if (publicKey && publicKey !== "PUBLIC_KEY_HERE") {
          try {
            window.emailjs.init(publicKey)
            console.log("EmailJS initialized successfully with public key:", publicKey.substring(0, 10) + "...")
          } catch (error) {
            console.error("Error initializing EmailJS:", error)
          }
        } else {
          console.warn("EmailJS Public Key not configured. Please add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY to your .env.local file")
        }
      } else {
        // Retry if script not loaded yet
        if (retryCount < maxRetries) {
          retryCount++
          setTimeout(initEmailJS, 500)
        } else {
          console.error("EmailJS script failed to load after multiple retries")
        }
      }
    }

    // Start initialization after a short delay to ensure script is loaded
    const timer = setTimeout(initEmailJS, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!formRef.current) {
      alert("Form not found. Please refresh the page.")
      return
    }

    // Check if EmailJS is loaded
    if (typeof window === "undefined" || !window.emailjs) {
      alert("EmailJS is not loaded. Please wait a moment and try again, or refresh the page.")
      return
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "SERVICE_ID_HERE"
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "TEMPLATE_ID_HERE"
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "PUBLIC_KEY_HERE"

    // Validate configuration
    if (serviceId === "SERVICE_ID_HERE" || templateId === "TEMPLATE_ID_HERE" || publicKey === "PUBLIC_KEY_HERE") {
      alert("EmailJS is not configured. Please add your EmailJS credentials to .env.local file.\n\nRequired:\n- NEXT_PUBLIC_EMAILJS_PUBLIC_KEY\n- NEXT_PUBLIC_EMAILJS_SERVICE_ID\n- NEXT_PUBLIC_EMAILJS_TEMPLATE_ID")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Ensure EmailJS is initialized
      if (!window.emailjs || !window.emailjs.init) {
        throw new Error("EmailJS is not loaded. Please refresh the page.")
      }

      // Initialize EmailJS
      window.emailjs.init(publicKey)
      console.log("EmailJS initialized with public key")

      // Log form data for debugging
      const formData = new FormData(formRef.current!)
      console.log("Form data being sent:", {
        from_name: formData.get("from_name"),
        reply_to: formData.get("reply_to"),
        message: formData.get("message"),
        name: formData.get("name"),
        email: formData.get("email"),
      })

      // Send the form
      console.log("Sending form with:", { serviceId, templateId })
      
      // Wrap in explicit promise to catch all errors
      const response = await new Promise<any>((resolve, reject) => {
        try {
          window.emailjs.sendForm(serviceId, templateId, formRef.current!)
            .then((result) => {
              console.log("EmailJS success result:", result)
              resolve(result)
            })
            .catch((error) => {
              console.error("EmailJS sendForm catch - raw error:", error)
              console.error("Error type:", typeof error)
              console.error("Error constructor:", error?.constructor?.name)
              if (error && typeof error === 'object') {
                console.error("Error properties:", Object.getOwnPropertyNames(error))
                console.error("Error values:", Object.values(error))
              }
              reject(error)
            })
        } catch (syncError) {
          console.error("Synchronous error in sendForm:", syncError)
          reject(syncError)
        }
      })
      
      console.log("EmailJS response:", response)
      console.log("Response status:", response?.status)
      console.log("Response text:", response?.text)
      
      // EmailJS v3 returns { status: 200, text: "OK" } on success
      if (response && response.status === 200 && response.text === "OK") {
        setSubmitStatus("success")
        setShowSuccessAnimation(true)
        
        // Reset form
        if (formRef.current) {
          formRef.current.reset()
          // Reset hidden fields
          const hiddenName = document.getElementById('hidden_name') as HTMLInputElement
          const hiddenEmail = document.getElementById('hidden_email') as HTMLInputElement
          if (hiddenName) hiddenName.value = ""
          if (hiddenEmail) hiddenEmail.value = ""
        }
      } else {
        // If response exists but doesn't match success criteria
        const errorMsg = response?.text || `Unexpected response: status ${response?.status}`
        throw new Error(errorMsg)
      }
    } catch (error: any) {
      setSubmitStatus("error")
      
      // Extract error message from different possible formats
      let errorMessage = "Unknown error occurred"
      
      // Try different ways to extract error message
      if (error?.text) {
        errorMessage = error.text
      } else if (error?.message) {
        errorMessage = error.message
      } else if (error?.statusText) {
        errorMessage = error.statusText
      } else if (typeof error === "string") {
        errorMessage = error
      } else if (error?.toString && typeof error.toString === "function") {
        errorMessage = error.toString()
      }
      
      // Try to stringify the error to see its structure
      let errorString = "Could not stringify error"
      try {
        errorString = JSON.stringify(error, Object.getOwnPropertyNames(error))
      } catch (e) {
        errorString = String(error)
      }
      
      // Log full error details
      console.error("EmailJS error details:", {
        error,
        errorType: typeof error,
        errorConstructor: error?.constructor?.name,
        errorKeys: error ? Object.keys(error) : [],
        errorString,
        errorMessage,
        serviceId,
        templateId,
        publicKeyConfigured: publicKey !== "PUBLIC_KEY_HERE",
        emailjsAvailable: !!window.emailjs,
        emailjsInitAvailable: !!(window.emailjs && window.emailjs.init),
        emailjsSendFormAvailable: !!(window.emailjs && window.emailjs.sendForm),
      })
      
      // Show user-friendly error message
      const userMessage = errorMessage !== "Unknown error occurred" 
        ? errorMessage 
        : "Please check your EmailJS configuration and try again."
      
      alert(`Failed to send message: ${userMessage}\n\nPlease check:\n1. Your EmailJS credentials are correct in .env.local\n2. Your EmailJS template Content uses: {{from_name}}, {{reply_to}}, {{message}}\n3. Your EmailJS template Settings uses: {{name}} for From Name, {{email}} for Reply To\n4. Your EmailJS service is active\n5. Restart your dev server after updating .env.local\n\nCheck browser console for detailed error information.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAnimationComplete = () => {
    setShowSuccessAnimation(false)
    setSubmitStatus("idle")
  }

  return (
    <>
    {showSuccessAnimation && <SuccessAnimation onComplete={handleAnimationComplete} />}
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

          <form id="contact-form" ref={formRef} onSubmit={handleSubmit}>
            {/* Hidden fields for EmailJS template settings (From Name and Reply To) */}
            <input type="hidden" name="name" id="hidden_name" />
            <input type="hidden" name="email" id="hidden_email" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form Section */}
              <div className="p-8 border-r border-primary/10">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-mono text-primary uppercase tracking-wider block mb-3">
                      &gt; ENTER_NAME
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      id="from_name"
                      placeholder="$ your_name"
                      className="w-full px-4 py-3 rounded bg-muted border border-primary/20 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
                      required
                      onChange={(e) => {
                        // Sync with hidden field for template settings
                        const hiddenName = document.getElementById('hidden_name') as HTMLInputElement
                        if (hiddenName) hiddenName.value = e.target.value
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-mono text-primary uppercase tracking-wider block mb-3">
                      &gt; ENTER_EMAIL
                    </label>
                    <input
                      type="email"
                      name="reply_to"
                      id="reply_to"
                      placeholder="@ your_email@domain.com"
                      className="w-full px-4 py-3 rounded bg-muted border border-primary/20 text-white font-mono placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
                      required
                      onChange={(e) => {
                        // Sync with hidden field for template settings
                        const hiddenEmail = document.getElementById('hidden_email') as HTMLInputElement
                        if (hiddenEmail) hiddenEmail.value = e.target.value
                      }}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-3">DIRECT_FEED:</p>
                    <div className="flex gap-4">
                      {SOCIAL_LINKS.map((social) => (
                        <a
                          key={social.title}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all group"
                          title={social.title}
                        >
                          <social.icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Editor Section */}
              <div className="p-8 bg-muted/50 font-mono text-sm border-l border-primary/10">
                <div className="mb-4 text-gray-500">
                  <span className="text-primary">&gt;</span> COMPILE_MESSAGE
                </div>

                <textarea
                  name="message"
                  placeholder="// write your message here..."
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
              <div className="text-xs text-gray-500 font-mono">
                STATUS: {isSubmitting ? "TRANSMITTING..." : submitStatus === "success" ? "TRANSMITTED ✓" : submitStatus === "error" ? "ERROR ✗" : "ONLINE"} • ENCRYPTION: AES-256
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded bg-primary text-background font-bold font-mono uppercase tracking-wider hover:scale-105 transition-transform box-glow ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "▶ [ TRANSMITTING... ]" : "▶ [ EXECUTE_TRANSMISSION ]"}
              </button>
            </div>
          </form>
        </div>
        )}
      </div>
    </main>
    </>
  )
}
