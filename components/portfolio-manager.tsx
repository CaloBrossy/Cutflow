"use client"

import Link from "next/link"
import { Copy, ExternalLink, Eye, Globe, PencilLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioEditor } from "@/components/portfolio-editor"
import { PortfolioPageView } from "@/components/portfolio-page-view"
import { useAppState } from "@/providers/app-state-provider"
import { toast } from "@/hooks/use-toast"

export function PortfolioManager() {
  const { portfolioPage, setPortfolioStatus } = useAppState()
  const publicPath = `/${portfolioPage.slug}`
  const bookingHref = `/?view=calendar&bookingFor=${portfolioPage.slug}`

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mi pagina</h1>
          <p className="text-muted-foreground mt-1">
            Edita tu landing publica, comparte tu slug y convierte visitas en reservas.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            Slug: /{portfolioPage.slug}
          </Badge>
          <Badge className={portfolioPage.status === "published" ? "bg-primary text-primary-foreground" : ""} variant={portfolioPage.status === "published" ? "default" : "secondary"}>
            {portfolioPage.status === "published" ? "Publicada" : "Borrador"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Visitas" value={String(portfolioPage.analytics.views)} />
        <StatCard title="Clicks CTA" value={String(portfolioPage.analytics.clicks)} />
        <StatCard title="Conversion" value={portfolioPage.analytics.conversionRate} />
        <Card className="bg-card border-border">
          <CardContent className="p-5 flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">Acciones</p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => copyPublicUrl(publicPath)}>
                <Copy className="w-4 h-4 mr-2" />
                Copiar link
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href={publicPath} target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver online
                </Link>
              </Button>
              <Button size="sm" onClick={() => setPortfolioStatus(portfolioPage.status === "published" ? "draft" : "published")}>
                <Globe className="w-4 h-4 mr-2" />
                {portfolioPage.status === "published" ? "Pasar a borrador" : "Publicar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="preview" className="gap-4">
        <TabsList>
          <TabsTrigger value="preview">
            <Eye className="w-4 h-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="editor">
            <PencilLine className="w-4 h-4" />
            Editor
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <PortfolioPageView
            page={portfolioPage}
            mode="preview"
            publicUrl={publicPath}
            bookingHref={bookingHref}
          />
        </TabsContent>
        <TabsContent value="editor">
          <PortfolioEditor />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  )
}

async function copyPublicUrl(publicPath: string) {
  await navigator.clipboard.writeText(`${window.location.origin}${publicPath}`)
  toast({
    title: "Link copiado",
    description: "La URL publica quedo copiada al portapapeles.",
  })
}
