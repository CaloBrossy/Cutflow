"use client"

import { Star } from "lucide-react"
import { Marquee, Reveal } from "./animated-elements"

const testimonials = [
  { name: "Carlos M.", role: "Barber Studio", text: "Desde que uso Flowcut, mis clientes nunca fallan a las citas." },
  { name: "Diego R.", role: "The Gentleman", text: "La página pública me trae clientes nuevos cada semana." },
  { name: "Andrés L.", role: "Urban Cuts", text: "Mi negocio se ve 10 veces más profesional ahora." },
  { name: "Miguel S.", role: "Classic Barber", text: "El CRM de clientes es increíble, sé todo de cada uno." },
  { name: "Roberto F.", role: "Fade Masters", text: "Ya no pierdo tiempo con WhatsApp, todo está organizado." },
]

const logos = ["The Gentleman", "Urban Cuts", "Barber Studio", "Classic Barber", "Fade Masters", "Elite Grooming"]

export function SocialProof() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <Reveal className="mb-16">
        <p className="mb-8 text-center text-sm uppercase tracking-widest text-muted-foreground">Barberías que confían en nosotros</p>
        <Marquee className="py-4">
          {logos.map((logo, i) => (
            <div key={i} className="cursor-default px-8 text-xl font-semibold text-muted-foreground/50 transition-colors hover:text-muted-foreground">
              <span className="mr-2 text-accent">*</span>{logo}
            </div>
          ))}
        </Marquee>
      </Reveal>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-accent text-accent" />)}</div>
            <p className="text-muted-foreground">Valoración promedio de <span className="font-semibold text-foreground">4.9/5</span> de más de 500 barberías</p>
          </div>
        </Reveal>
        <Marquee reverse>
          {testimonials.map((testimonial, i) => (
            <div key={i} className="mx-4 w-[350px] shrink-0 rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-accent/30">
              <p className="mb-4 text-muted-foreground">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 font-semibold text-accent">{testimonial.name.charAt(0)}</div>
                <div><p className="text-sm font-medium">{testimonial.name}</p><p className="text-xs text-muted-foreground">{testimonial.role}</p></div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
