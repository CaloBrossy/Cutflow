"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Sparkles } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GlowingBorder, Reveal, TextReveal } from "./animated-elements"

const plans = [
  { name: "Gratis", description: "Para probar el sistema y ver si es para ti.", priceMonthly: 0, priceYearly: 0, features: ["Hasta 20 reservas/mes", "1 servicio publicado", "Página pública básica", "Branding con marca Flowcut", "Soporte por email"], cta: "Empezar gratis", highlighted: false },
  { name: "Pro", description: "Para barberos independientes que quieren crecer.", priceMonthly: 19, priceYearly: 15, features: ["Reservas ilimitadas", "Servicios ilimitados", "Página pública personalizada", "Tu logo y colores", "CRM de clientes completo", "Estadísticas básicas", "Soporte prioritario"], cta: "Empezar con Pro", highlighted: true, badge: "Popular" },
  { name: "Studio", description: "Para barberías con equipo y múltiples profesionales.", priceMonthly: 49, priceYearly: 39, features: ["Todo lo de Pro", "Hasta 5 profesionales", "Agendas independientes", "Reportes avanzados", "Roles y permisos", "Integraciones (próximamente)", "Soporte dedicado"], cta: "Contactar ventas", highlighted: false },
]

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="precios" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10"><div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[150px]" /></div>
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Reveal><p className="street-kicker mb-4 text-[11px] font-medium text-accent">Precios</p></Reveal>
          <h2 className="street-title mb-6 text-4xl sm:text-5xl md:text-6xl">
            <TextReveal text="Simple plans" className="justify-center" as="span" /><br />
            <TextReveal text="sharp value" className="accent-gradient-text justify-center" delay={0.2} as="span" />
          </h2>
          <Reveal delay={0.4}><p className="text-xl text-muted-foreground">Empieza gratis, escala cuando quieras. Sin letra pequeña.</p></Reveal>

          <Reveal delay={0.5}>
            <div className="mt-10 flex items-center justify-center gap-4">
              <span className={cn("text-sm font-medium transition-colors", !isYearly ? "text-foreground" : "text-muted-foreground")}>Mensual</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-accent" />
              <span className={cn("text-sm font-medium transition-colors", isYearly ? "text-foreground" : "text-muted-foreground")}>Anual</span>
              {isYearly && <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent"><Sparkles className="h-3 w-3" />Ahorra 20%</span>}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={0.1 * i}>
              <div className="h-full">
                {plan.highlighted ? <GlowingBorder className="h-full"><PlanCard plan={plan} isYearly={isYearly} /></GlowingBorder> : <div className="glass-street h-full rounded-2xl border border-border/50 transition-all duration-300 hover:border-accent/20 hover:shadow-[0_0_35px_oklch(0.75_0.18_165_/_0.08)]"><PlanCard plan={plan} isYearly={isYearly} /></div>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlanCard({ plan, isYearly }: { plan: (typeof plans)[0]; isYearly: boolean }) {
  return (
    <div className="relative flex h-full flex-col p-8">
      {plan.badge && <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground shadow-lg shadow-accent/30"><Sparkles className="h-3 w-3" />{plan.badge}</span>}
      <div className="mb-6"><h3 className={cn("street-title text-2xl", plan.highlighted && "accent-gradient-text")}>{plan.name}</h3><p className="mt-2 text-sm text-muted-foreground">{plan.description}</p></div>
      <div className="mb-8"><div className="flex items-baseline gap-1"><span className="text-5xl font-bold">${isYearly ? plan.priceYearly : plan.priceMonthly}</span><span className="text-muted-foreground">/mes</span></div></div>
      <ul className="mb-8 flex-1 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", plan.highlighted ? "bg-accent/20 text-accent" : "bg-secondary text-muted-foreground")}><Check className="h-3 w-3" /></div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      <Button asChild className={cn("magnetic-btn h-12 w-full rounded-xl font-semibold", plan.highlighted ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30 hover:scale-[1.02] hover:bg-accent/90" : "bg-secondary text-secondary-foreground hover:scale-[1.02] hover:bg-secondary/80")}>
        <Link href="/register">{plan.cta}</Link>
      </Button>
    </div>
  )
}
