"use client"

import { useState } from "react"
import { Calendar, Globe, MessageSquare, Palette, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Parallax, Reveal, TextReveal } from "./animated-elements"
import { useMousePosition } from "@/hooks/use-scroll-reveal"

const features = [
  { id: "reservas", icon: MessageSquare, title: "Inbox de reservas", description: "Todas las solicitudes en un solo lugar. Confirma, reagenda o cancela con un clic." },
  { id: "agenda", icon: Calendar, title: "Agenda visual", description: "Vista clara de tu día, semana o mes. Nunca más reservas superpuestas." },
  { id: "clientes", icon: Users, title: "CRM de clientes", description: "Historial completo: servicios, notas, preferencias y frecuencia de visitas." },
  { id: "branding", icon: Palette, title: "Branding dinámico", description: "Personaliza colores, logo y tema. Tu barbería, tu identidad." },
  { id: "pagina", icon: Globe, title: "Tu página pública", description: "Landing profesional donde tus clientes ven servicios, precios y reservan." },
]

export function Product() {
  const [activeFeature, setActiveFeature] = useState(features[0].id)
  const currentFeature = features.find((f) => f.id === activeFeature) || features[0]
  const mouse = useMousePosition()

  return (
    <section id="producto" className="relative overflow-hidden py-32">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <Reveal><p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">Producto</p></Reveal>
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <TextReveal text="Un producto pensado" className="justify-center" as="span" /><br />
            <TextReveal text="para ti" className="justify-center text-accent" delay={0.3} as="span" />
          </h2>
          <Reveal delay={0.4}><p className="text-xl text-muted-foreground">Cada funcionalidad diseñada para ahorrar tiempo y hacer crecer tu negocio.</p></Reveal>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <div className="space-y-3">
              {features.map((feature) => (
                <button key={feature.id} onClick={() => setActiveFeature(feature.id)} className={cn("flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300", activeFeature === feature.id ? "border-accent/50 bg-accent/10 shadow-lg shadow-accent/10" : "border-border/30 hover:border-border hover:bg-card/50")}>
                  <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300", activeFeature === feature.id ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30" : "bg-secondary text-muted-foreground")}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className={cn("text-lg font-semibold transition-colors", activeFeature === feature.id && "text-accent")}>{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="sticky top-32">
              <Parallax speed={-0.1}>
                <div className="relative rounded-3xl border border-border/50 bg-card/50 p-8 shadow-2xl backdrop-blur-xl" style={{ transform: `perspective(1000px) rotateX(${mouse.y * 2}deg) rotateY(${mouse.x * -2}deg)` }}>
                  <div className="absolute -inset-4 rounded-3xl bg-accent/20 blur-3xl opacity-30" />
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent"><currentFeature.icon className="h-5 w-5" /></div>
                      <h4 className="text-lg font-semibold">{currentFeature.title}</h4>
                    </div>
                    <FeaturePreview id={currentFeature.id} />
                  </div>
                </div>
              </Parallax>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function FeaturePreview({ id }: { id: string }) {
  if (id === "agenda") {
    return <div className="space-y-2">{["09:00 - Carlos M.", "10:30 - Diego R.", "11:30 - Disponible", "14:00 - Andrés L."].map((slot) => <div key={slot} className="rounded-xl border border-border/50 bg-background/30 p-3 text-sm backdrop-blur-sm">{slot}</div>)}</div>
  }
  if (id === "clientes") {
    return <div className="space-y-4"><div className="rounded-xl border border-border/50 bg-background/30 p-4">Carlos Martínez · Cliente desde Enero 2024</div><div className="grid grid-cols-3 gap-3">{["12 visitas", "$25 promedio", "2 sem."].map((stat) => <div key={stat} className="rounded-xl border border-border/50 bg-background/30 p-4 text-center text-sm">{stat}</div>)}</div></div>
  }
  if (id === "branding") {
    return <div className="space-y-4"><div className="rounded-xl border border-border/50 bg-background/30 p-4">Logo + colores + preview de marca</div><div className="grid grid-cols-2 gap-3"><div className="rounded-xl border border-border/50 bg-background/30 p-4">Color principal</div><div className="rounded-xl border border-border/50 bg-background/30 p-4">Tema</div></div></div>
  }
  if (id === "pagina") {
    return <div className="space-y-4 rounded-xl border border-border/50 bg-background/30 p-4"><div>flowcut.io/tu-barberia</div><div className="space-y-2">{["Corte clásico · $15", "Corte + Barba · $25", "Barba completa · $12"].map((service) => <div key={service} className="rounded-lg bg-secondary/50 px-4 py-3 text-sm">{service}</div>)}</div><div className="rounded-xl bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground">Reservar ahora</div></div>
  }
  return <div className="space-y-3">{["Carlos M. · nueva solicitud", "Diego R. · confirmado", "Andrés L. · reagendado"].map((item) => <div key={item} className="rounded-xl border border-border/50 bg-background/30 p-4 text-sm backdrop-blur-sm">{item}</div>)}</div>
}
