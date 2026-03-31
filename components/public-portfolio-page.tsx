"use client"

import { useEffect, useState } from "react"
import { PortfolioPageView } from "@/components/portfolio-page-view"
import { useAppState } from "@/providers/app-state-provider"
import type { PortfolioPageData } from "@/lib/portfolio-data"

export function PublicPortfolioPage({
  slug,
  initialPage,
}: {
  slug: string
  initialPage: PortfolioPageData | null
}) {
  const { portfolioPage } = useAppState()
  const [storedPage, setStoredPage] = useState<PortfolioPageData | null>(null)

  useEffect(() => {
    const storedPortfolioPage = window.localStorage.getItem("cutflow-portfolio-page")
    if (!storedPortfolioPage) return

    try {
      const parsedPortfolioPage = JSON.parse(storedPortfolioPage) as PortfolioPageData
      setStoredPage(parsedPortfolioPage)
    } catch {
      window.localStorage.removeItem("cutflow-portfolio-page")
    }
  }, [])

  const page =
    portfolioPage.slug === slug
      ? portfolioPage
      : storedPage?.slug === slug
        ? storedPage
        : initialPage

  if (!page) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <p className="text-sm font-medium text-primary">Pagina publica no encontrada</p>
          <h1 className="text-3xl font-bold text-foreground">Ese perfil no existe</h1>
          <p className="text-muted-foreground">
            El slug no coincide con una pagina publicada en este navegador.
          </p>
        </div>
      </div>
    )
  }

  return (
    <PortfolioPageView
      page={page}
      mode="public"
      publicUrl={`/${page.slug}`}
      bookingHref={`/?view=calendar&bookingFor=${page.slug}`}
    />
  )
}
