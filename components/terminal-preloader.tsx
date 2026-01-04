"use client"

import { useState, useEffect, useRef } from "react"

const useTypeWriter = (text: string, speed = 50, delay = 0) => {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
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

interface TerminalPreloaderProps {
  commands: string[]
  onComplete: () => void
}

export default function TerminalPreloader({ commands, onComplete }: TerminalPreloaderProps) {
  const typing1 = useTypeWriter(commands[0] || "", 40, 0)
  const typing2 = commands[1] ? useTypeWriter(commands[1], 40, 800) : { displayedText: "", isComplete: true }
  const typing3 = commands[2] ? useTypeWriter(commands[2], 40, 1600) : { displayedText: "", isComplete: true }
  const typing4 = commands[3] ? useTypeWriter(commands[3], 40, 2400) : { displayedText: "", isComplete: true }
  const typing5 = commands[4] ? useTypeWriter(commands[4], 40, 3200) : { displayedText: "", isComplete: true }
  const typing6 = commands[5] ? useTypeWriter(commands[5], 40, 4000) : { displayedText: "", isComplete: true }

  const typingEffects = [typing1, typing2, typing3, typing4, typing5, typing6].slice(0, commands.length)

  useEffect(() => {
    const checkComplete = setInterval(() => {
      const allComplete = typingEffects.every((effect) => effect.isComplete)
      if (allComplete) {
        clearInterval(checkComplete)
        const timer = setTimeout(() => {
          onComplete()
        }, 500)
        return () => clearTimeout(timer)
      }
    }, 100)

    return () => clearInterval(checkComplete)
  }, [typingEffects, onComplete])

  return (
    <div className="relative z-20 w-full flex items-center justify-center min-h-screen">
      <div className="font-mono text-primary text-lg md:text-2xl space-y-4 text-left max-w-2xl px-4">
        {typingEffects.map((typing, index) => (
          <div key={index} className="flex items-center">
            <span className="text-primary/50 mr-2">$</span>
            <span className="text-glow">
              {typing.displayedText}
              {!typing.isComplete && <span className="animate-blink">|</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

