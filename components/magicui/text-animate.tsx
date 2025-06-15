"use client"

import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

type AnimationType = "fadeIn" | "blurIn" | "blurInUp" | "slideUp"
type AnimationBy = "letter" | "word" | "character"

interface TextAnimateProps {
  children: string
  className?: string
  animation?: AnimationType
  by?: AnimationBy
  delay?: number
  duration?: number
  once?: boolean
}

export function TextAnimate({
  children,
  className,
  animation = "fadeIn",
  by = "word",
  delay = 0,
  duration = 0.2,
  once = false,
}: TextAnimateProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once })

  const getAnimationVariants = () => {
    switch (animation) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      case "blurIn":
        return {
          hidden: { opacity: 0, filter: "blur(10px)" },
          visible: { opacity: 1, filter: "blur(0px)" },
        }
      case "blurInUp":
        return {
          hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
          visible: { opacity: 1, filter: "blur(0px)", y: 0 },
        }
      case "slideUp":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  const splitText = () => {
    if (by === "letter" || by === "character") {
      return children.split("")
    } else if (by === "word") {
      return children.split(" ")
    }
    return [children]
  }

  const elements = splitText()
  const variants = getAnimationVariants()

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      <span className="sr-only">{children}</span>
      <motion.span
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block aria-hidden"
        aria-hidden="true"
      >
        {elements.map((element, i) => (
          <motion.span
            key={i}
            variants={variants}
            transition={{
              duration,
              delay: delay + i * 0.05,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className="inline-block"
          >
            {element}
            {by === "word" && i < elements.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </div>
  )
}
