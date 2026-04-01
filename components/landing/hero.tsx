"use client"

import Link from "next/link"
import { ArrowRight, Calendar, Palette, Play, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Counter, Magnetic, Parallax, Reveal, TextReveal } from "./animated-elements"
import { useMousePosition } from "@/hooks/use-scroll-reveal"

export function Hero() {
  const mouse = useMousePosition()

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-40" poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%231a1a1f' width='100%25' height='100%25'/%3E%3C/svg%3E">
          <source src="https://videos.pexels.com/video-files/7518359/7518359-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay absolute inset-0" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] animate-float rounded-full bg-accent/20 blur-[120px]" style={{ transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)` }} />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" style={{ transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)` }} />
      </div>

      <div className="grain-overlay absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-5xl">
          <Reveal delay={0.1}>
            <div className="mb-8 flex justify-center">
              <div className="glass-street relative inline-flex items-center gap-2 rounded-full border border-accent/15 px-5 py-2 text-sm shadow-lg shadow-black/20 backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="street-kicker text-[11px] text-muted-foreground">Street booking system</span>
              </div>
            </div>
          </Reveal>

          <div className="text-center">
            <h1 className="street-title text-5xl sm:text-6xl md:text-7xl lg:text-[7rem]">
              <TextReveal text="Own the chair" className="justify-center text-foreground" delay={0.2} as="span" />
              <br />
              <TextReveal text="run the shop" className="accent-gradient-text accent-glow-text justify-center" delay={0.4} as="span" />
            </h1>
          </div>

          <Reveal delay={0.6} className="mt-8 text-center">
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Reservas, agenda y clientes en un sistema con presencia.
              <span className="text-foreground"> Flowcut se siente como una marca, no como un admin genérico.</span>
            </p>
          </Reveal>

          <Reveal delay={0.8} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <Button size="lg" asChild className="glow-accent magnetic-btn h-14 rounded-full border border-accent/20 bg-accent px-10 text-lg hover:scale-[1.03] hover:shadow-[0_0_40px_oklch(0.75_0.18_165_/_0.45)]">
                <Link href="/register">Probar gratis<ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="outline" size="lg" asChild className="glass-street magnetic-btn h-14 rounded-full border-border/50 px-10 text-lg hover:scale-[1.02] hover:border-accent/30 hover:bg-background/50">
                <Link href="#producto"><Play className="mr-2 h-5 w-5" />Ver demo</Link>
              </Button>
            </Magnetic>
          </Reveal>

          <Reveal delay={1} className="mt-20">
            <div className="flex flex-wrap justify-center gap-12 md:gap-20">
              {[
                { value: 500, suffix: "+", label: "Barberías activas" },
                { value: 50, suffix: "K+", label: "Reservas gestionadas" },
                { value: 98, suffix: "%", label: "Satisfacción" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="street-title accent-glow-text text-4xl text-foreground md:text-5xl"><Counter end={stat.value} suffix={stat.suffix} duration={2.6} /></p>
                  <p className="street-kicker mt-3 text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Parallax speed={-0.2} className="mt-24">
          <Reveal delay={1.2}>
            <div className="perspective-1000 relative mx-auto max-w-6xl">
              <div className="absolute -inset-8 rounded-3xl bg-accent/30 blur-3xl opacity-50" />
              <div className="glass-street panel-glow relative overflow-hidden rounded-[28px] border border-accent/10 shadow-2xl" style={{ transform: `rotateX(${mouse.y * 2}deg) rotateY(${mouse.x * -2}deg)` }}>
                <div className="flex items-center gap-2 border-b border-border/50 bg-secondary/20 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="ml-4 flex-1 rounded-md bg-background/30 px-4 py-1.5 font-mono text-xs text-muted-foreground">app.flowcut.io/dashboard</div>
                </div>
                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
                  <div className="space-y-4 md:col-span-1">
                    <div className="rounded-2xl border border-accent/10 bg-secondary/40 p-4 shadow-lg shadow-black/20">
                      <div className="flex items-center gap-3">
                        <div className="glow-accent flex h-12 w-12 items-center justify-center rounded-xl bg-accent"><span className="text-xl font-bold text-accent-foreground">B</span></div>
                        <div><p className="font-semibold">Barber Studio</p><p className="text-xs text-muted-foreground">Plan Pro</p></div>
                      </div>
                    </div>
                    <nav className="space-y-1">
                      {[
                        { icon: Calendar, label: "Reservas", active: true },
                        { icon: Users, label: "Clientes", active: false },
                        { icon: Palette, label: "Mi Marca", active: false },
                      ].map((item) => (
                        <div key={item.label} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${item.active ? "glow-accent bg-accent text-accent-foreground shadow-lg shadow-accent/30" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"}`}>
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </div>
                      ))}
                    </nav>
                  </div>
                  <div className="space-y-4 md:col-span-2">
                    <div className="flex items-center justify-between"><h3 className="text-xl font-semibold">Hoy</h3><span className="font-mono text-sm text-muted-foreground">Martes, 1 Abril</span></div>
                    <div className="space-y-3">
                      {[
                        { time: "10:00", name: "Carlos M.", service: "Corte + Barba", status: "confirmado" },
                        { time: "11:30", name: "Diego R.", service: "Corte clásico", status: "pendiente" },
                        { time: "14:00", name: "Andrés L.", service: "Barba completa", status: "confirmado" },
                      ].map((apt, i) => (
                        <div key={i} className="flex items-center justify-between rounded-xl border border-border/50 bg-background/30 p-4 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-background/50 hover:shadow-[0_0_30px_oklch(0.75_0.18_165_/_0.12)]">
                          <div className="flex items-center gap-4">
                            <span className="rounded-lg bg-secondary/50 px-3 py-1 font-mono text-sm text-muted-foreground">{apt.time}</span>
                            <div><p className="font-medium">{apt.name}</p><p className="text-sm text-muted-foreground">{apt.service}</p></div>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${apt.status === "confirmado" ? "bg-accent/20 text-accent" : "bg-yellow-500/20 text-yellow-400"}`}>{apt.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Parallax>
      </div>
    </section>
  )
}
