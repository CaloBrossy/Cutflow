"use client"

import Link from "next/link"
import { ArrowRight, Calendar, Palette, Play, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Counter, Magnetic, Parallax, Reveal, TextReveal } from "./animated-elements"
import { useMousePosition } from "@/hooks/use-scroll-reveal"

export function Hero() {
  const mouse = useMousePosition()

  return (
    <section className="barber-page relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-40" poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%231a1a1f' width='100%25' height='100%25'/%3E%3C/svg%3E">
          <source src="https://videos.pexels.com/video-files/7518359/7518359-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay absolute inset-0" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] animate-float rounded-full bg-[#61210f]/28 blur-[120px]" style={{ transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)` }} />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#fff3db]/10 blur-[100px]" style={{ transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)` }} />
      </div>

      <div className="grain-overlay absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-5xl">
          <Reveal delay={0.1}>
            <div className="mb-8 flex justify-center">
              <div className="barber-card relative inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fff3db] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#fff3db]" />
                </span>
                <span className="barber-kicker text-[11px]">Premium barber system</span>
              </div>
            </div>
          </Reveal>

          <div className="text-center">
            <h1 className="barber-title barber-ink text-5xl sm:text-6xl md:text-7xl lg:text-[7rem]">
              <TextReveal text="Cut clean" className="justify-center" delay={0.2} as="span" />
              <br />
              <TextReveal text="move sharp" className="barber-accent justify-center" delay={0.4} as="span" />
            </h1>
          </div>

          <Reveal delay={0.6} className="mt-8 text-center">
            <p className="barber-muted mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
              Reservas, agenda y clientes con presencia de marca.
              <span className="barber-ink"> Menos SaaS frío, más barbería premium con calle.</span>
            </p>
          </Reveal>

          <Reveal delay={0.8} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <Button size="lg" asChild className="barber-chip magnetic-btn h-14 rounded-full px-10 text-lg hover:scale-[1.03]">
                <Link href="/register">Probar gratis<ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="outline" size="lg" asChild className="barber-card magnetic-btn barber-ink h-14 rounded-full px-10 text-lg hover:scale-[1.02]">
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
                  <p className="barber-title barber-accent text-4xl md:text-5xl"><Counter end={stat.value} suffix={stat.suffix} duration={2.6} /></p>
                  <p className="barber-kicker barber-muted mt-3 text-[10px]">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Parallax speed={-0.2} className="mt-24">
          <Reveal delay={1.2}>
            <div className="perspective-1000 relative mx-auto max-w-6xl">
              <div className="absolute -inset-8 rounded-3xl bg-[#61210f]/34 blur-3xl opacity-50" />
              <div className="barber-card panel-glow relative overflow-hidden rounded-[28px] shadow-2xl" style={{ transform: `rotateX(${mouse.y * 2}deg) rotateY(${mouse.x * -2}deg)` }}>
                <div className="flex items-center gap-2 border-b border-border/50 bg-secondary/20 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-[#7b3118]" />
                  </div>
                  <div className="ml-4 flex-1 rounded-md bg-background/30 px-4 py-1.5 font-mono text-xs text-muted-foreground">app.flowcut.io/dashboard</div>
                </div>
                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
                  <div className="space-y-4 md:col-span-1">
                    <div className="barber-soft barber-stroke rounded-2xl border p-4 shadow-lg shadow-black/20">
                      <div className="flex items-center gap-3">
                        <div className="barber-chip flex h-12 w-12 items-center justify-center rounded-xl"><span className="text-xl font-bold">B</span></div>
                        <div><p className="barber-ink font-semibold">Barber Studio</p><p className="barber-muted text-xs">Plan Pro</p></div>
                      </div>
                    </div>
                    <nav className="space-y-1">
                      {[
                        { icon: Calendar, label: "Reservas", active: true },
                        { icon: Users, label: "Clientes", active: false },
                        { icon: Palette, label: "Mi Marca", active: false },
                      ].map((item) => (
                        <div key={item.label} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${item.active ? "barber-chip shadow-lg" : "barber-muted barber-soft hover:text-white"}`}>
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </div>
                      ))}
                    </nav>
                  </div>
                  <div className="space-y-4 md:col-span-2">
                    <div className="flex items-center justify-between"><h3 className="barber-ink text-xl font-semibold">Hoy</h3><span className="barber-muted font-mono text-sm">Martes, 1 Abril</span></div>
                    <div className="space-y-3">
                      {[
                        { time: "10:00", name: "Carlos M.", service: "Corte + Barba", status: "confirmado" },
                        { time: "11:30", name: "Diego R.", service: "Corte clásico", status: "pendiente" },
                        { time: "14:00", name: "Andrés L.", service: "Barba completa", status: "confirmado" },
                      ].map((apt, i) => (
                        <div key={i} className="barber-soft barber-stroke flex items-center justify-between rounded-xl border p-4 backdrop-blur-sm transition-all hover:shadow-[0_0_30px_rgba(255,243,219,0.08)]">
                          <div className="flex items-center gap-4">
                            <span className="rounded-lg bg-black/20 px-3 py-1 font-mono text-sm text-[#fff3db]">{apt.time}</span>
                            <div><p className="barber-ink font-medium">{apt.name}</p><p className="barber-muted text-sm">{apt.service}</p></div>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-medium ${apt.status === "confirmado" ? "barber-chip" : "bg-yellow-500/20 text-yellow-300"}`}>{apt.status}</span>
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
