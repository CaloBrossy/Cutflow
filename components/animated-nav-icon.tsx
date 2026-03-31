"use client"

import { useEffect, useRef } from "react"
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { getNavIconAnimation, type NavIconVariant } from "@/lib/nav-icon-pulse-animation"

interface AnimatedNavIconProps {
  icon: LucideIcon
  variant: NavIconVariant
  isActive?: boolean
  isHovered?: boolean
}

export function AnimatedNavIcon({
  icon: Icon,
  variant,
  isActive = false,
  isHovered = false,
}: AnimatedNavIconProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const animationData = getNavIconAnimation(variant)

  useEffect(() => {
    const instance = lottieRef.current
    if (!instance) return

    if (isHovered || isActive) {
      instance.setSpeed(1)
      instance.play()
      return
    }

    instance.stop()
  }, [isActive, isHovered])

  return (
    <div className="relative flex h-5 w-5 items-center justify-center">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={false}
        className={cn(
          "pointer-events-none absolute -inset-2 opacity-0 transition-opacity duration-200",
          (isHovered || isActive) && "opacity-100"
        )}
      />
      <Icon
        className={cn(
          "relative z-10 h-5 w-5 transition-transform duration-200 ease-out",
          (isHovered || isActive) && "scale-110 -translate-y-0.5",
          isActive && "text-primary"
        )}
      />
    </div>
  )
}
