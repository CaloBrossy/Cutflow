"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Calendar, Eye, EyeOff, Loader2, Palette, Scissors, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  useEffect(() => setMounted(true), [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    if (formData.email && formData.password) {
      router.push("/dashboard")
    } else {
      setError("Por favor completa todos los campos")
    }

    setIsLoading(false)
  }

  return (
    <div className="barber-page relative grid min-h-screen overflow-hidden lg:grid-cols-2">
      <div className="noise absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-[#61210f]/20 blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-[#fff3db]/8 blur-[120px]" />
      </div>

      <div className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex">
        <div className="absolute inset-0 -z-10">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-30">
            <source src="https://videos.pexels.com/video-files/7518359/7518359-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        </div>

        <div className={`transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}>
          <Link href="/" className="group flex items-center gap-3">
            <div className="barber-chip relative flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
              <Scissors className="h-5 w-5 text-[#260e01]" />
              <div className="absolute inset-0 rounded-xl bg-[#fff3db] opacity-0 blur-xl transition-opacity group-hover:opacity-35" />
            </div>
            <span className="barber-title barber-ink text-2xl">Flowcut</span>
          </Link>
        </div>

        <div className="space-y-8">
          <div className={`transition-all duration-700 delay-100 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <h1 className="barber-title barber-ink text-4xl md:text-5xl">
              Back
              <br />
              <span className="barber-accent">on the chair</span>
            </h1>
            <p className="barber-muted mt-4 max-w-md text-lg">
              Accede a tu cuenta para gestionar reservas, clientes y tu marca.
            </p>
          </div>

          <div className={`space-y-4 transition-all duration-700 delay-200 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            {[
              { icon: Calendar, text: "Gestiona tu agenda desde cualquier lugar" },
              { icon: Users, text: "Mantén el contacto con tus clientes" },
              { icon: Palette, text: "Personaliza tu página pública" },
            ].map((item, i) => (
              <div key={i} className="barber-card flex items-center gap-4 rounded-xl p-4 transition-all hover:shadow-[0_0_30px_rgba(255,243,219,0.08)]">
                <div className="barber-chip flex h-12 w-12 items-center justify-center rounded-xl">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="barber-muted">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className={`text-sm text-muted-foreground transition-all duration-700 delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
          © {new Date().getFullYear()} Flowcut. Todos los derechos reservados.
        </p>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className={`w-full max-w-md space-y-8 transition-all duration-700 delay-100 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="lg:hidden">
            <Link href="/" className="flex items-center gap-3">
              <div className="barber-chip flex h-11 w-11 items-center justify-center rounded-xl">
                <Scissors className="h-5 w-5 text-[#260e01]" />
              </div>
            <span className="barber-title barber-ink text-2xl">Flowcut</span>
            </Link>
          </div>

          <div>
            <h2 className="barber-title barber-ink text-3xl">Ingresar</h2>
            <p className="barber-muted mt-2">Ingresa tus credenciales para acceder al panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={isLoading} required className="barber-card h-12 rounded-xl px-4 text-[#fff3db] transition-all focus:border-[#fff3db]/30 focus:shadow-[0_0_0_1px_rgba(255,243,219,0.16),0_0_28px_rgba(255,243,219,0.08)]" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link href="#" className="text-sm text-[#fff3db] transition-colors hover:text-[#d9c0a0]">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} disabled={isLoading} required className="barber-card h-12 rounded-xl px-4 pr-12 text-[#fff3db] transition-all focus:border-[#fff3db]/30 focus:shadow-[0_0_0_1px_rgba(255,243,219,0.16),0_0_28px_rgba(255,243,219,0.08)]" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <Button type="submit" className="barber-chip magnetic-btn h-12 w-full rounded-xl text-base font-semibold transition-all hover:scale-[1.02]" disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Ingresando...</> : <>Ingresar<ArrowRight className="ml-2 h-5 w-5" /></>}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="font-semibold text-[#fff3db] transition-colors hover:text-[#d9c0a0]">
              Crear cuenta gratis
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
