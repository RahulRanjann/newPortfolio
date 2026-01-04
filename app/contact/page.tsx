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

export default function Contact() {
  const [showContent, setShowContent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
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
        alert("Message sent successfully!")
        
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
  )
}
