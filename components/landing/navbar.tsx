"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Magnetic } from "./animated-elements"

const navLinks = [
  { href: "#beneficios", label: "Beneficios" },
  { href: "#producto", label: "Producto" },
  { href: "#precios", label: "Precios" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setHidden(currentScrollY > lastScrollY && currentScrollY > 100)
      setScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header className={cn("fixed left-0 right-0 top-0 z-50 transition-all duration-500", scrolled ? "border-b border-accent/10 bg-background/72 backdrop-blur-2xl" : "bg-transparent", hidden ? "-translate-y-full" : "translate-y-0")}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Magnetic strength={0.2}>
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent transition-transform duration-300 group-hover:scale-110">
              <Scissors className="h-5 w-5 text-accent-foreground" />
              <div className="absolute inset-0 rounded-xl bg-accent opacity-0 blur-xl transition-opacity group-hover:opacity-50" />
            </div>
            <span className="street-title text-xl tracking-tight">Flowcut</span>
          </Link>
        </Magnetic>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Magnetic key={link.href} strength={0.15}>
              <Link href={link.href} className="street-kicker group relative px-4 py-2 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-accent transition-all duration-300 group-hover:w-1/2" />
              </Link>
            </Magnetic>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Magnetic strength={0.15}>
            <Button variant="ghost" asChild className="text-muted-foreground hover:bg-transparent hover:text-foreground">
              <Link href="/login">Ingresar</Link>
            </Button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Button asChild className="glow-accent rounded-full px-6">
              <Link href="/register">Probar gratis</Link>
            </Button>
          </Magnetic>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /><span className="sr-only">Abrir menu</span></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm border-border/50 bg-background/95 backdrop-blur-2xl">
            <div className="flex flex-col gap-8 pt-12">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-2xl font-medium text-muted-foreground transition-all hover:translate-x-2 hover:text-foreground">
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-3 border-t border-border/50 pt-8">
                <Button variant="outline" asChild className="h-12 w-full rounded-full"><Link href="/login">Ingresar</Link></Button>
                <Button asChild className="h-12 w-full rounded-full"><Link href="/register">Probar gratis</Link></Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
