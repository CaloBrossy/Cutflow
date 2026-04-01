"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  Calendar,
  Check,
  Clock,
  ExternalLink,
  Heart,
  Instagram,
  MapPin,
  Phone,
  Scissors,
  Share2,
  Star,
  Twitter,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { PortfolioPageData } from "@/lib/portfolio-data"
import { useAppState } from "@/providers/app-state-provider"

interface PortfolioPageViewProps {
  page: PortfolioPageData
  mode?: "public" | "preview"
  publicUrl?: string
  bookingHref?: string
  onEditClick?: () => void
}

export function PortfolioPageView({
  page,
  mode = "public",
  publicUrl,
  bookingHref = "/dashboard?view=calendar",
  onEditClick,
}: PortfolioPageViewProps) {
  const { brandSettings } = useAppState()
  const [selectedFilter, setSelectedFilter] = useState<"all" | "featured">("all")
  const [likedImages, setLikedImages] = useState<number[]>([])

  const filteredImages = useMemo(
    () => (selectedFilter === "featured" ? page.images.filter((img) => img.featured) : page.images),
    [page.images, selectedFilter]
  )

  return (
    <div className="min-h-screen bg-background">
      {mode === "preview" && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm text-primary font-medium">Vista previa de pagina publica</span>
            <div className="flex items-center gap-2">
              {publicUrl && (
                <Button asChild variant="outline" size="sm" className="h-7 text-xs">
                  <Link href={publicUrl} target="_blank">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Ver online
                  </Link>
                </Button>
              )}
              {onEditClick && (
                <Button size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onEditClick}>
                  Editar pagina
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <div className="h-48 md:h-64" style={{ backgroundImage: page.coverImage }} />
        <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-xl">
              <AvatarImage src={page.avatar} />
              <AvatarFallback className="text-4xl">{page.initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 pt-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 overflow-hidden">
                  {brandSettings.logo ? <img src={brandSettings.logo} alt={brandSettings.brandName} className="h-full w-full object-cover" /> : <Scissors className="w-5 h-5 text-primary" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{brandSettings.brandName || page.businessName}</p>
                  <p className="text-xs text-muted-foreground">Branding aplicado automaticamente</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{page.displayName}</h1>
                    {page.verified && (
                      <Badge className="bg-primary text-primary-foreground">
                        <Check className="w-3 h-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1 flex items-center gap-2">
                    <Scissors className="w-4 h-4" />
                    {page.businessName}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {page.location}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="font-semibold text-foreground">{page.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground text-sm">({page.reviewsCount} reseñas)</span>
                    </div>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-sm text-muted-foreground">{page.clientsCountLabel}</span>
                  </div>
                </div>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full md:w-auto">
                  <Link href={bookingHref}>
                    <Calendar className="w-4 h-4 mr-2" />
                    {page.ctaText}
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <SocialButton href={page.socialLinks.instagram} icon={<Instagram className="w-4 h-4" />} label="Instagram" />
                <SocialButton href={page.socialLinks.twitter} icon={<Twitter className="w-4 h-4" />} label="Twitter" />
                <SocialButton href={page.socialLinks.phone} icon={<Phone className="w-4 h-4" />} label="Telefono" />
                {publicUrl && <SocialButton href={publicUrl} icon={<Share2 className="w-4 h-4" />} label="Compartir" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <p className="text-foreground leading-relaxed">{page.bio}</p>
          </CardContent>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-4 gap-3">
            <h2 className="text-xl font-bold text-foreground">Portafolio</h2>
            <div className="flex gap-2">
              <Button variant={selectedFilter === "all" ? "default" : "outline"} size="sm" onClick={() => setSelectedFilter("all")}>
                Todo
              </Button>
              <Button variant={selectedFilter === "featured" ? "default" : "outline"} size="sm" onClick={() => setSelectedFilter("featured")}>
                Destacados
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {filteredImages.map((image) => (
              <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                <img src={image.url} alt={image.service} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium truncate">{image.service}</p>
                    <button
                      onClick={() =>
                        setLikedImages((prev) =>
                          prev.includes(image.id) ? prev.filter((id) => id !== image.id) : [...prev, image.id]
                        )
                      }
                      className="mt-1 flex items-center gap-1 text-white/80 hover:text-white transition-colors"
                    >
                      <Heart className={cn("w-4 h-4", likedImages.includes(image.id) && "fill-destructive text-destructive")} />
                      <span className="text-xs">{image.likes + (likedImages.includes(image.id) ? 1 : 0)}</span>
                    </button>
                  </div>
                </div>
                {image.featured && (
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">Destacado</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Scissors className="w-5 h-5 text-primary" />
                Servicios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {page.services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{service.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.duration}
                    </p>
                  </div>
                  <span className="text-lg font-semibold text-primary">${service.price}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Horarios de trabajo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {page.workingHours.map((item) => {
                const isToday = item.day === "Martes"
                return (
                  <div key={item.day} className={cn("flex items-center justify-between py-2 px-3 rounded-lg", isToday && "bg-primary/10 border border-primary/20")}>
                    <span className={cn("text-sm", isToday ? "font-medium text-primary" : "text-foreground")}>
                      {item.day}
                      {isToday && <Badge className="ml-2 bg-primary text-primary-foreground text-xs">Hoy</Badge>}
                    </span>
                    <span className={cn("text-sm", item.hours === "Cerrado" ? "text-muted-foreground" : "text-foreground")}>
                      {item.hours}
                    </span>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Star className="w-5 h-5 text-warning" />
                Reseñas
              </CardTitle>
              <Button variant="link" className="text-primary p-0">
                Ver las {page.reviewsCount} reseñas
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {page.reviews.map((review) => (
              <div key={review.id} className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.author.split(" ").map((name) => name[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{review.author}</p>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className={cn("w-3 h-3", index < review.rating ? "text-warning fill-warning" : "text-muted-foreground")} />
                      ))}
                    </div>
                    <p className="text-sm text-foreground mt-2">{review.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-foreground">Listo para tu proximo corte?</h3>
            <p className="text-muted-foreground mt-2">{page.ctaSubtitle}</p>
            <Button asChild size="lg" className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href={bookingHref}>
                <Calendar className="w-4 h-4 mr-2" />
                Reservar turno
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Button asChild variant="outline" size="icon" className="w-9 h-9">
      <Link href={href} target="_blank" aria-label={label}>
        {icon}
      </Link>
    </Button>
  )
}
