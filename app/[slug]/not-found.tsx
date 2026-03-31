import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PortfolioNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-4">
        <p className="text-sm font-medium text-primary">Pagina publica no encontrada</p>
        <h1 className="text-3xl font-bold text-foreground">Ese perfil no existe</h1>
        <p className="text-muted-foreground">
          Revisa el enlace o vuelve al panel principal para continuar navegando.
        </p>
        <Button asChild>
          <Link href="/">Ir al panel</Link>
        </Button>
      </div>
    </div>
  )
}
