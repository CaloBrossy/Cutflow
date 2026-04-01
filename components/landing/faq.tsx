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
      <div className="absolute inset-0 -z-10"><div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]" /></div>
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Reveal><p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">FAQ</p></Reveal>
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            <TextReveal text="Preguntas" className="justify-center" as="span" />{" "}
            <TextReveal text="frecuentes" className="justify-center text-accent" delay={0.2} as="span" />
          </h2>
          <Reveal delay={0.4}><p className="text-xl text-muted-foreground">¿Tienes dudas? Aquí respondemos las más comunes.</p></Reveal>
        </div>

        <Reveal delay={0.5}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="rounded-2xl border border-border/50 bg-card/30 px-6 backdrop-blur-sm transition-all duration-300 data-[state=open]:border-accent/30 data-[state=open]:bg-card/50">
                <AccordionTrigger className="py-6 text-left text-base font-medium transition-colors hover:text-accent hover:no-underline [&[data-state=open]]:text-accent">{faq.question}</AccordionTrigger>
                <AccordionContent className="pb-6 leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
