"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useRef, useState } from "react"

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: React.ReactNode
}

export function Marquee({ className, reverse, pauseOnHover = false, children }: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!marqueeRef.current) return

    const calculateWidth = () => {
      if (!marqueeRef.current) return
      const firstItem = marqueeRef.current.querySelector(".marquee-item") as HTMLElement
      if (firstItem) {
        setContentWidth(firstItem.offsetWidth)
      }
    }

    calculateWidth()
    window.addEventListener("resize", calculateWidth)

    return () => {
      window.removeEventListener("resize", calculateWidth)
    }
  }, [children])

  return (
    <div
      className={cn("flex w-full overflow-hidden [--duration:40s] [--gap:1rem]", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        ref={marqueeRef}
        className={cn(
          "flex min-w-full shrink-0 gap-[--gap] [--play-state:running] [--direction:normal]",
          reverse && "[--direction:reverse]",
          isPaused && "[--play-state:paused]",
          contentWidth > 0 && "animate-[marquee_var(--duration)_linear_infinite]",
          "motion-reduce:overflow-auto motion-reduce:animate-none",
        )}
        style={{
          animationPlayState: "var(--play-state)",
          animationDirection: "var(--direction)",
        }}
      >
        {React.Children.map(children, (child, i) => (
          <div key={i} className="marquee-item flex-shrink-0 px-[--gap]" style={{ paddingLeft: "var(--gap)" }}>
            {child}
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex min-w-full shrink-0 gap-[--gap] [--play-state:running] [--direction:normal]",
          reverse && "[--direction:reverse]",
          isPaused && "[--play-state:paused]",
          contentWidth > 0 && "animate-[marquee_var(--duration)_linear_infinite]",
          "motion-reduce:hidden",
        )}
        style={{
          animationPlayState: "var(--play-state)",
          animationDirection: "var(--direction)",
        }}
      >
        {React.Children.map(children, (child, i) => (
          <div key={i} className="marquee-item flex-shrink-0 px-[--gap]" style={{ paddingLeft: "var(--gap)" }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
