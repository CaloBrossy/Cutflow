"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal, TextReveal } from "./animated-elements"

const faqs = [
  { question: "¿Puedo probar Flowcut antes de pagar?", answer: "Sí, tenemos un plan gratuito que te permite probar las funcionalidades principales." },
  { question: "¿Mis clientes necesitan crear cuenta para reservar?", answer: "No, tus clientes pueden reservar sin crear cuenta." },
  { question: "¿Puedo usar mi propio logo y colores?", answer: "Sí. En Pro y Studio puedes personalizar la apariencia con tu logo, colores y tema visual." },
  { question: "¿Flowcut envía recordatorios a mis clientes?", answer: "Sí, enviamos recordatorios por email. La integración con WhatsApp está en beta/próximamente." },
  { question: "¿Puedo tener varios profesionales en mi barbería?", answer: "Sí, el plan Studio permite múltiples profesionales con agendas independientes." },
]

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10"><div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#61210f]/18 blur-[120px]" /></div>
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Reveal><p className="barber-kicker mb-4 text-[11px]">FAQ</p></Reveal>
          <h2 className="barber-title barber-ink mb-6 text-4xl sm:text-5xl">
            <TextReveal text="No fluff" className="justify-center" as="span" />{" "}
            <TextReveal text="just answers" className="barber-accent justify-center" delay={0.2} as="span" />
          </h2>
          <Reveal delay={0.4}><p className="barber-muted text-xl">¿Tienes dudas? Aquí respondemos las más comunes.</p></Reveal>
        </div>

        <Reveal delay={0.5}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="barber-card rounded-2xl px-6 transition-all duration-300">
                <AccordionTrigger className="barber-ink py-6 text-left text-base font-medium transition-colors hover:no-underline [&[data-state=open]]:text-[#fff3db]">{faq.question}</AccordionTrigger>
                <AccordionContent className="barber-muted pb-6 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
