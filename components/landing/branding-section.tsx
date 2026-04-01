"use client"

import { useState } from "react"
import { Check, Scissors } from "lucide-react"
import { cn } from "@/lib/utils"
import { Parallax, Reveal, TextReveal } from "./animated-elements"
import { useMousePosition } from "@/hooks/use-scroll-reveal"

const themes = [
  { id: "cream", name: "Crema", primary: "bg-[#fff3db]", accent: "text-[#fff3db]", shadow: "shadow-[0_0_30px_rgba(255,243,219,0.22)]" },
  { id: "tobacco", name: "Tabaco", primary: "bg-[#7b3118]", accent: "text-[#dba47e]", shadow: "shadow-[0_0_30px_rgba(123,49,24,0.28)]" },
  { id: "seal", name: "Seal", primary: "bg-[#61210f]", accent: "text-[#b87052]", shadow: "shadow-[0_0_30px_rgba(97,33,15,0.3)]" },
  { id: "ink", name: "Ink", primary: "bg-[#260e01]", accent: "text-[#fff3db]", shadow: "shadow-[0_0_30px_rgba(38,14,1,0.35)]" },
]

export function BrandingSection() {
  const [activeTheme, setActiveTheme] = useState(themes[0])
  const mouse = useMousePosition()

  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10"><div className="absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#61210f]/18 blur-[150px]" /></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Reveal><p className="barber-kicker mb-4 text-[11px]">Personalización</p></Reveal>
            <h2 className="barber-title barber-ink mb-6 text-4xl sm:text-5xl md:text-6xl">
              <TextReveal text="Tu marca," as="span" /><br />
              <TextReveal text="tu estilo" className="barber-accent" delay={0.2} as="span" />
            </h2>
            <Reveal delay={0.4}><p className="barber-muted mb-8 text-xl leading-relaxed">Con Flowcut, personalizas completamente la experiencia visual: <span className="barber-ink">tu logo, tus colores, tu tema.</span></p></Reveal>

            <Reveal delay={0.5}>
              <div className="mb-8">
                <p className="mb-4 text-sm font-medium text-muted-foreground">Elige un tema</p>
                <div className="flex flex-wrap gap-3">
                  {themes.map((theme) => (
                    <button key={theme.id} onClick={() => setActiveTheme(theme)} className={cn("flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300", activeTheme.id === theme.id ? `${theme.primary} border-transparent text-[#260e01] shadow-lg ${theme.shadow}` : "barber-card barber-muted")}>
                      {activeTheme.id !== theme.id && <span className={cn("h-3 w-3 rounded-full", theme.primary)} />}
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <ul className="space-y-4">
                {["Sube tu logo y se aplica automáticamente", "Elige entre temas oscuros y claros", "Colores que combinan con tu identidad", "Tu página pública refleja tu marca"].map((item, i) => (
                  <li key={i} className="barber-muted flex items-center gap-4">
                    <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#260e01] shadow-lg", activeTheme.primary, activeTheme.shadow)}><Check className="h-3.5 w-3.5" /></span>
                    <span className="barber-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <Parallax speed={-0.1}>
              <Reveal direction="right">
                <div className="relative">
                  <div className="absolute -inset-8 rounded-3xl bg-[#61210f]/22 blur-3xl opacity-40 transition-all duration-500" />
                  <div className="barber-card relative overflow-hidden rounded-3xl shadow-2xl" style={{ transform: `perspective(1000px) rotateX(${mouse.y * 3}deg) rotateY(${mouse.x * -3}deg)` }}>
                    <div className="p-8 transition-all duration-500">
                      <div className="flex items-center gap-5">
                        <div className={cn("flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl text-[#260e01]", activeTheme.primary, activeTheme.shadow)}><Scissors className="h-8 w-8" /></div>
                        <div><h3 className="barber-ink text-2xl font-bold">Tu Barbería</h3><p className={cn("text-sm transition-colors duration-300", activeTheme.accent)}>flowcut.io/tu-barberia</p></div>
                      </div>
                    </div>
                    <div className="space-y-6 p-8">
                      {["Corte Signature", "Barba Premium", "Tratamiento VIP"].map((service, i) => (
                        <div key={service} className="flex items-center justify-between border-b border-border/50 py-4 last:border-0">
                          <span className="barber-ink font-medium">{service}</span>
                          <span className={cn("text-lg font-bold", activeTheme.accent)}>{["$30", "$20", "$50"][i]}</span>
                        </div>
                      ))}
                      <button className={cn("w-full rounded-xl py-4 font-semibold text-[#260e01] shadow-xl transition-all duration-500 hover:scale-[1.02]", activeTheme.primary, activeTheme.shadow)}>Reservar cita</button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  )
}
