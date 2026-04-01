"use client"

import Link from "next/link"
import { Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Magnetic, Reveal } from "./animated-elements"

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="relative py-32">
        <div className="absolute inset-0 -z-10"><div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[150px]" /></div>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal><h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">¿Listo para hacer crecer<br /><span className="text-accent">tu barbería?</span></h2></Reveal>
          <Reveal delay={0.2}><p className="mb-10 text-xl text-muted-foreground">Únete a barberías que ya gestionan su negocio con Flowcut.</p></Reveal>
          <Reveal delay={0.3}><Magnetic><Button size="lg" asChild className="glow-accent-strong h-14 rounded-full px-10 text-lg"><Link href="/register">Empezar gratis</Link></Button></Magnetic></Reveal>
        </div>
      </div>

      <div className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Reveal>
                <Link href="/" className="group flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-accent transition-transform duration-300 group-hover:scale-110">
                    <Scissors className="h-5 w-5 text-accent-foreground" />
                    <div className="absolute inset-0 rounded-xl bg-accent opacity-0 blur-xl transition-opacity group-hover:opacity-50" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight">Flowcut</span>
                </Link>
              </Reveal>
              <Reveal delay={0.1}><p className="mt-4 max-w-sm text-muted-foreground">La plataforma de gestión para barberías y peluquerías modernas.</p></Reveal>
            </div>
            <FooterColumn title="Producto" links={[["Características", "#beneficios"], ["Precios", "#precios"], ["FAQ", "#faq"]]} />
            <FooterColumn title="Empresa" links={[["Sobre nosotros", "#"], ["Blog", "#"], ["Contacto", "#"]]} />
            <FooterColumn title="Legal" links={[["Privacidad", "#"], ["Términos", "#"], ["Cookies", "#"]]} />
          </div>
          <Reveal delay={0.4}>
            <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Flowcut. Todos los derechos reservados.</p>
              <p className="text-sm text-muted-foreground">Hecho con <span className="text-accent">amor</span> para barberías</p>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <Reveal delay={0.2}>
        <h4 className="mb-4 font-semibold">{title}</h4>
        <ul className="space-y-3">
          {links.map(([label, href]) => (
            <li key={label}>
              <Link href={href} className="text-sm text-muted-foreground transition-colors hover:text-accent">{label}</Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  )
}
