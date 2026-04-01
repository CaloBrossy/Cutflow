"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Check, Eye, EyeOff, Loader2, Scissors, Sparkles } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const plans = [
  { id: "gratis", name: "Gratis", description: "Ideal para probar", price: "$0" },
  { id: "pro", name: "Pro", description: "Para independientes", price: "$19", popular: true },
  { id: "studio", name: "Studio", description: "Para equipos", price: "$49" },
]

const benefits = [
  "Reservas online 24/7 sin llamadas",
  "Agenda clara y organizada",
  "Historial completo de clientes",
  "Tu marca, tu identidad visual",
  "Página pública profesional",
]

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    negocio: "",
    telefono: "",
    email: "",
    password: "",
    confirmPassword: "",
    plan: "pro",
    terms: false,
  })

  useEffect(() => setMounted(true), [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (formData.password !== formData.confirmPassword) return setError("Las contraseñas no coinciden")
    if (!formData.terms) return setError("Debes aceptar los términos y condiciones")
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    router.push("/dashboard")
  }

  return (
    <div className="relative grid min-h-screen overflow-hidden lg:grid-cols-5">
      <div className="noise absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/3 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/3 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative hidden flex-col justify-between overflow-hidden p-12 lg:col-span-2 lg:flex">
        <div className="absolute inset-0 -z-10">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-30">
            <source src="https://videos.pexels.com/video-files/4488154/4488154-hd_1920_1080_24fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        </div>

        <div className={`transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}>
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-accent transition-transform duration-300 group-hover:scale-110">
              <Scissors className="h-5 w-5 text-accent-foreground" />
              <div className="absolute inset-0 rounded-xl bg-accent opacity-0 blur-xl transition-opacity group-hover:opacity-50" />
            </div>
            <span className="street-title text-2xl">Flowcut</span>
          </Link>
        </div>

        <div className="space-y-8">
          <div className={`transition-all duration-700 delay-100 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            <h1 className="street-title text-3xl md:text-4xl">
              Build
              <br />
              your brand
              <br />
              <span className="accent-gradient-text accent-glow-text">from day one</span>
            </h1>
            <p className="mt-4 text-muted-foreground">Únete a barberías que ya usan Flowcut para organizarse mejor y crecer.</p>
          </div>

          <div className={`space-y-3 transition-all duration-700 delay-200 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <p className={`text-sm text-muted-foreground transition-all duration-700 delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}>
          © {new Date().getFullYear()} Flowcut. Todos los derechos reservados.
        </p>
      </div>

      <div className="flex items-center justify-center overflow-y-auto p-6 lg:col-span-3 lg:p-12">
        <div className={`w-full max-w-lg space-y-8 transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="lg:hidden">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                <Scissors className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="street-title text-2xl">Flowcut</span>
            </Link>
          </div>

          <div>
            <h2 className="street-title text-3xl">Crear tu cuenta</h2>
            <p className="mt-2 text-muted-foreground">Completa tus datos para empezar a usar Flowcut</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tu nombre" id="nombre"><Input id="nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="h-12 rounded-xl border-border/50 bg-card/50 transition-all focus:border-accent/40 focus:shadow-[0_0_0_1px_oklch(0.75_0.18_165_/_0.2),0_0_28px_oklch(0.75_0.18_165_/_0.12)]" required /></Field>
              <Field label="Nombre del negocio" id="negocio"><Input id="negocio" value={formData.negocio} onChange={(e) => setFormData({ ...formData, negocio: e.target.value })} className="h-12 rounded-xl border-border/50 bg-card/50 transition-all focus:border-accent/40 focus:shadow-[0_0_0_1px_oklch(0.75_0.18_165_/_0.2),0_0_28px_oklch(0.75_0.18_165_/_0.12)]" required /></Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Teléfono" id="telefono"><Input id="telefono" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="h-12 rounded-xl border-border/50 bg-card/50 transition-all focus:border-accent/40 focus:shadow-[0_0_0_1px_oklch(0.75_0.18_165_/_0.2),0_0_28px_oklch(0.75_0.18_165_/_0.12)]" required /></Field>
              <Field label="Email" id="email"><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-12 rounded-xl border-border/50 bg-card/50 transition-all focus:border-accent/40 focus:shadow-[0_0_0_1px_oklch(0.75_0.18_165_/_0.2),0_0_28px_oklch(0.75_0.18_165_/_0.12)]" required /></Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Contraseña" id="password">
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="h-12 rounded-xl border-border/50 bg-card/50 pr-12 transition-all focus:border-accent/40 focus:shadow-[0_0_0_1px_oklch(0.75_0.18_165_/_0.2),0_0_28px_oklch(0.75_0.18_165_/_0.12)]" required minLength={8} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </Field>
              <Field label="Confirmar contraseña" id="confirmPassword">
                <div className="relative">
                  <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="h-12 rounded-xl border-border/50 bg-card/50 pr-12 transition-all focus:border-accent/40 focus:shadow-[0_0_0_1px_oklch(0.75_0.18_165_/_0.2),0_0_28px_oklch(0.75_0.18_165_/_0.12)]" required minLength={8} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </Field>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Elige tu plan</Label>
              <RadioGroup value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })} className="grid gap-3 sm:grid-cols-3">
                {plans.map((plan) => (
                  <Label key={plan.id} htmlFor={plan.id} className={cn("relative flex cursor-pointer flex-col rounded-2xl border p-5 transition-all duration-300 hover:border-accent/50", formData.plan === plan.id ? "glow-accent border-accent bg-accent/10 shadow-lg shadow-accent/10" : "glass-street border-border/50")}>
                    {plan.popular && <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold text-accent-foreground shadow-lg shadow-accent/30"><Sparkles className="h-3 w-3" />Popular</span>}
                    <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                    <span className="font-semibold">{plan.name}</span>
                    <span className="text-xs text-muted-foreground">{plan.description}</span>
                    <span className={cn("mt-2 text-lg font-bold", formData.plan === plan.id ? "text-accent" : "text-foreground")}>
                      {plan.price}<span className="text-sm font-normal text-muted-foreground">/mes</span>
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="glass-street flex items-start gap-3 rounded-xl border border-border/50 p-4">
              <Checkbox id="terms" checked={formData.terms} onCheckedChange={(checked) => setFormData({ ...formData, terms: checked as boolean })} className="mt-0.5" />
              <Label htmlFor="terms" className="cursor-pointer text-sm font-normal leading-relaxed text-muted-foreground">
                Acepto los <Link href="#" className="font-medium text-accent hover:text-accent/80">términos y condiciones</Link> y la{" "}
                <Link href="#" className="font-medium text-accent hover:text-accent/80">política de privacidad</Link>
              </Label>
            </div>

            <Button type="submit" className="glow-accent magnetic-btn h-12 w-full rounded-xl border border-accent/20 text-base font-semibold transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_oklch(0.75_0.18_165_/_0.35)]" disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Creando cuenta...</> : <>Crear cuenta<ArrowRight className="ml-2 h-5 w-5" /></>}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-semibold text-accent hover:text-accent/80">Ingresar</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  )
}
