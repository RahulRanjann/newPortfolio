"use client"

import { useState, useEffect, useRef } from "react"

export const useTypeWriter = (text: string, speed = 50, delay = 0) => {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
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
  }, [text, speed, delay, isMounted])

  // Return empty on server to match initial client state
  if (!isMounted) {
    return { displayedText: "", isComplete: false }
  }

  return { displayedText, isComplete }
}

