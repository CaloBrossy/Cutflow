"use client"

import { useRef, useState } from "react"
import { Globe, ImagePlus, ImageUp, Star, Store, Upload, UserRound, WandSparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAppState } from "@/providers/app-state-provider"

export function PortfolioEditor() {
  const {
    portfolioPage,
    updatePortfolioImage,
    updatePortfolioPage,
    updatePortfolioReview,
    updatePortfolioService,
    updateWorkingHour,
  } = useAppState()

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="w-5 h-5 text-primary" />
            Datos principales
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="Slug publico">
            <Input value={portfolioPage.slug} onChange={(e) => updatePortfolioPage({ slug: sanitizeSlug(e.target.value) })} />
          </Field>
          <Field label="Nombre visible">
            <Input value={portfolioPage.displayName} onChange={(e) => updatePortfolioPage({ displayName: e.target.value })} />
          </Field>
          <Field label="Negocio">
            <Input value={portfolioPage.businessName} onChange={(e) => updatePortfolioPage({ businessName: e.target.value })} />
          </Field>
          <Field label="Ubicacion">
            <Input value={portfolioPage.location} onChange={(e) => updatePortfolioPage({ location: e.target.value })} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Bio">
              <Textarea value={portfolioPage.bio} onChange={(e) => updatePortfolioPage({ bio: e.target.value })} />
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserRound className="w-5 h-5 text-primary" />
            Imagenes principales
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label="Foto de perfil">
            <ImageDropzone
              value={portfolioPage.avatar}
              label="Arrastra tu foto de perfil o haz click para elegirla"
              onChange={(value) => updatePortfolioPage({ avatar: value })}
            />
          </Field>
          <Field label="Iniciales del avatar">
            <Input value={portfolioPage.initials} onChange={(e) => updatePortfolioPage({ initials: e.target.value.slice(0, 3).toUpperCase() })} />
          </Field>
          <Field label="Portada">
            <ImageDropzone
              value={portfolioPage.coverImage}
              label="Arrastra tu portada o haz click para elegirla"
              isCover
              onChange={(value) => updatePortfolioPage({ coverImage: `url(${value})` })}
            />
          </Field>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WandSparkles className="w-5 h-5 text-primary" />
            CTA y redes
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="Texto del boton">
            <Input value={portfolioPage.ctaText} onChange={(e) => updatePortfolioPage({ ctaText: e.target.value })} />
          </Field>
          <Field label="Texto de cierre">
            <Input value={portfolioPage.ctaSubtitle} onChange={(e) => updatePortfolioPage({ ctaSubtitle: e.target.value })} />
          </Field>
          <Field label="Instagram">
            <Input value={portfolioPage.socialLinks.instagram} onChange={(e) => updatePortfolioPage({ socialLinks: { ...portfolioPage.socialLinks, instagram: e.target.value } })} />
          </Field>
          <Field label="Twitter/X">
            <Input value={portfolioPage.socialLinks.twitter} onChange={(e) => updatePortfolioPage({ socialLinks: { ...portfolioPage.socialLinks, twitter: e.target.value } })} />
          </Field>
          <Field label="Telefono">
            <Input value={portfolioPage.socialLinks.phone} onChange={(e) => updatePortfolioPage({ socialLinks: { ...portfolioPage.socialLinks, phone: e.target.value } })} />
          </Field>
          <Field label="WhatsApp">
            <Input value={portfolioPage.socialLinks.whatsapp} onChange={(e) => updatePortfolioPage({ socialLinks: { ...portfolioPage.socialLinks, whatsapp: e.target.value } })} />
          </Field>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            SEO
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label="Title SEO">
            <Input value={portfolioPage.seo.title} onChange={(e) => updatePortfolioPage({ seo: { ...portfolioPage.seo, title: e.target.value } })} />
          </Field>
          <Field label="Description SEO">
            <Textarea value={portfolioPage.seo.description} onChange={(e) => updatePortfolioPage({ seo: { ...portfolioPage.seo, description: e.target.value } })} />
          </Field>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Servicios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {portfolioPage.services.map((service) => (
            <div key={service.id} className="grid gap-3 rounded-xl border border-border p-4 md:grid-cols-[1.5fr_0.7fr_0.7fr]">
              <Input value={service.name} onChange={(e) => updatePortfolioService(service.id, { name: e.target.value })} />
              <Input value={String(service.price)} onChange={(e) => updatePortfolioService(service.id, { price: Number(e.target.value) || 0 })} />
              <Input value={service.duration} onChange={(e) => updatePortfolioService(service.id, { duration: e.target.value })} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-primary" />
            Feed de fotos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {portfolioPage.images.map((image) => (
            <div key={image.id} className="rounded-xl border border-border p-4 space-y-3">
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                <Badge variant="outline">Foto #{image.id}</Badge>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Likes</span>
                  <Input
                    className="w-24"
                    value={String(image.likes)}
                    onChange={(e) => updatePortfolioImage(image.id, { likes: Number(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <Field label="URL de imagen">
                <Input value={image.url} onChange={(e) => updatePortfolioImage(image.id, { url: e.target.value })} />
              </Field>
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                <Input value={image.service} onChange={(e) => updatePortfolioImage(image.id, { service: e.target.value })} />
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Destacada</span>
                    <Switch checked={image.featured} onCheckedChange={(checked) => updatePortfolioImage(image.id, { featured: checked })} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageUp className="w-5 h-5 text-primary" />
            Textos de presentacion
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="Clientes destacados">
            <Input value={portfolioPage.clientsCountLabel} onChange={(e) => updatePortfolioPage({ clientsCountLabel: e.target.value })} />
          </Field>
          <Field label="Cantidad de reseñas">
            <Input value={String(portfolioPage.reviewsCount)} onChange={(e) => updatePortfolioPage({ reviewsCount: Number(e.target.value) || 0 })} />
          </Field>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Horarios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {portfolioPage.workingHours.map((item) => (
            <div key={item.day} className="grid gap-3 md:grid-cols-[150px_1fr] md:items-center">
              <p className="text-sm font-medium text-foreground">{item.day}</p>
              <Input value={item.hours} onChange={(e) => updateWorkingHour(item.day, e.target.value)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-warning" />
            Reseñas destacadas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {portfolioPage.reviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-border p-4 space-y-3">
              <div className="grid gap-3 md:grid-cols-[1fr_140px]">
                <Input value={review.author} onChange={(e) => updatePortfolioReview(review.id, { author: e.target.value })} />
                <Input value={String(review.rating)} onChange={(e) => updatePortfolioReview(review.id, { rating: Number(e.target.value) || 0 })} />
              </div>
              <Textarea value={review.text} onChange={(e) => updatePortfolioReview(review.id, { text: e.target.value })} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  )
}

function sanitizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function ImageDropzone({
  value,
  label,
  onChange,
  isCover = false,
}: {
  value: string
  label: string
  onChange: (value: string) => void
  isCover?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const previewValue = isCover ? extractUrl(value) : value

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) void handleFile(file)
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          const file = e.dataTransfer.files?.[0]
          if (file) void handleFile(file)
        }}
        className={cn(
          "w-full rounded-xl border-2 border-dashed p-4 text-left transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Upload className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">PNG, JPG o WEBP</p>
          </div>
        </div>
      </button>
      {previewValue && (
        <div className="rounded-xl border border-border p-3 space-y-3">
          <div
            className={cn(
              "overflow-hidden rounded-lg bg-muted",
              isCover ? "h-32 w-full" : "h-24 w-24"
            )}
          >
            <img src={previewValue} alt="Preview" className="h-full w-full object-cover" />
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
              Cambiar
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
              Quitar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function extractUrl(value: string) {
  const match = value.match(/^url\((.*)\)$/)
  return match ? match[1] : value
}
