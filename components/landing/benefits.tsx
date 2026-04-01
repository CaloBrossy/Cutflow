"use client"

import { BarChart3, Calendar, Globe, MessageSquare, Palette, Users } from "lucide-react"
import { GlowingBorder, Reveal, TextReveal } from "./animated-elements"

const benefits = [
  { icon: Calendar, title: "Reservas sin caos", description: "Tus clientes reservan online 24/7. Sin llamadas, sin WhatsApp perdidos, sin confusiones.", gradient: "from-teal-500/20 to-cyan-500/20" },
  { icon: Users, title: "Clientes organizados", description: "Historial completo de cada cliente: servicios, preferencias, notas y frecuencia de visitas.", gradient: "from-blue-500/20 to-indigo-500/20" },
  { icon: MessageSquare, title: "Agenda inteligente", description: "Vista clara de tu día, semana o mes. Bloquea horarios y gestiona cancelaciones.", gradient: "from-violet-500/20 to-purple-500/20" },
  { icon: Palette, title: "Tu marca, tu estilo", description: "Personaliza colores, logo y tema. Tu barbería se ve profesional desde el primer contacto.", gradient: "from-pink-500/20 to-rose-500/20" },
  { icon: Globe, title: "Página pública", description: "Una landing profesional con tu marca donde los clientes ven servicios y reservan.", gradient: "from-orange-500/20 to-amber-500/20" },
  { icon: BarChart3, title: "Métricas claras", description: "Entiende tu negocio: ingresos, servicios más pedidos y horarios pico.", gradient: "from-emerald-500/20 to-green-500/20" },
]

export function Benefits() {
  return (
    <section id="beneficios" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent/5 blur-[150px]" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <Reveal><p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">Funcionalidades</p></Reveal>
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <TextReveal text="Todo lo que necesitas" className="justify-center" as="span" /><br />
            <TextReveal text="para crecer" className="justify-center text-accent" delay={0.3} as="span" />
          </h2>
          <Reveal delay={0.4}><p className="text-xl text-muted-foreground">Deja de perder tiempo con herramientas separadas. <span className="text-foreground">Flowcut centraliza todo en un solo lugar.</span></p></Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={0.1 * i}>
              <GlowingBorder>
                <div className="group relative h-full p-8">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  <div className="relative">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                      <benefit.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{benefit.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </GlowingBorder>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
