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
    <section className="relative overflow-hidden py-24" style={{ background: "linear-gradient(180deg, rgba(18,13,10,0.96), rgba(15,11,9,1))" }}>
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <Reveal className="mb-16">
        <p className="barber-kicker barber-muted mb-8 text-center text-[11px]">Barberías que confían en nosotros</p>
        <Marquee className="py-4">
          {logos.map((logo, i) => (
            <div key={i} className="barber-muted cursor-default px-8 text-xl font-semibold transition-colors hover:text-[#fff3db]">
              <span className="mr-2 text-[#fff3db]">*</span>{logo}
            </div>
          ))}
        </Marquee>
      </Reveal>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-[#fff3db] text-[#fff3db]" />)}</div>
            <p className="barber-muted">Valoración promedio de <span className="barber-ink font-semibold">4.9/5</span> de más de 500 barberías</p>
          </div>
        </Reveal>
        <Marquee reverse>
          {testimonials.map((testimonial, i) => (
            <div key={i} className="barber-card mx-4 w-[350px] shrink-0 rounded-2xl p-6 transition-colors">
              <p className="barber-muted mb-4">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="barber-chip flex h-10 w-10 items-center justify-center rounded-full font-semibold">{testimonial.name.charAt(0)}</div>
                <div><p className="barber-ink text-sm font-medium">{testimonial.name}</p><p className="barber-muted text-xs">{testimonial.role}</p></div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
