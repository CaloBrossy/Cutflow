"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useMousePosition, useParallax, useScrollReveal } from "@/hooks/use-scroll-reveal"

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
}) {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })
  const directionStyles = {
    up: "translate-y-12",
    down: "-translate-y-12",
    left: "translate-x-12",
    right: "-translate-x-12",
    none: "",
  }

  return (
    <div
      ref={ref}
      className={cn("transition-all ease-out", isInView ? "translate-x-0 translate-y-0 opacity-100" : `opacity-0 ${directionStyles[direction]}`, className)}
      style={{ transitionDuration: `${duration}s`, transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

export function TextReveal({
  text,
  className,
  delay = 0,
  as: Component = "p",
}: {
  text: string
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
}) {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })
  const words = text.split(" ")

  return (
    <div ref={ref} className="overflow-hidden">
      <Component className={cn("flex flex-wrap", className)}>
        {words.map((word, i) => (
          <span key={i} className="mr-[0.25em] overflow-hidden">
            <span className={cn("inline-block transition-transform duration-700 ease-out", isInView ? "translate-y-0" : "translate-y-full")} style={{ transitionDelay: `${delay + i * 0.05}s` }}>
              {word}
            </span>
          </span>
        ))}
      </Component>
    </div>
  )
}

export function Parallax({ children, speed = 0.5, className }: { children: ReactNode; speed?: number; className?: string }) {
  const { ref, offset } = useParallax(speed)
  return <div ref={ref} className={className} style={{ transform: `translateY(${offset}px)` }}>{children}</div>
}

export function Magnetic({ children, className, strength = 0.3 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        setPosition({ x: (e.clientX - centerX) * strength, y: (e.clientY - centerY) * strength })
      }}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      className={cn("cursor-magnetic transition-transform duration-300 ease-out", className)}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </div>
  )
}

export function Counter({ end, duration = 2, suffix = "", prefix = "", className }: { end: number; duration?: number; suffix?: string; prefix?: string; className?: string }) {
  const { ref, isInView } = useScrollReveal<HTMLSpanElement>({ triggerOnce: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [duration, end, isInView])

  return <span ref={ref} className={className}>{prefix}{count}{suffix}</span>
}

export function Marquee({ children, className, reverse = false }: { children: ReactNode; className?: string; reverse?: boolean }) {
  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div className={cn("flex shrink-0 gap-8 animate-marquee", reverse && "[animation-direction:reverse]")}>
        {children}
        {children}
      </div>
    </div>
  )
}

export function GlowingBorder({ children, className }: { children: ReactNode; className?: string }) {
  const mouse = useMousePosition()
  return (
    <div className={cn("relative overflow-hidden rounded-2xl p-[1px]", className)} style={{ background: `radial-gradient(circle at ${50 + mouse.x * 20}% ${50 + mouse.y * 20}%, oklch(0.72 0.11 178 / 0.5), transparent 50%)` }}>
      <div className="relative rounded-2xl bg-card">{children}</div>
    </div>
  )
}
