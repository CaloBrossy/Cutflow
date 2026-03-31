"use client"

import { useState } from "react"
import { 
  MapPin, 
  Star,
  Clock,
  Calendar,
  Instagram,
  Twitter,
  Phone,
  Mail,
  ExternalLink,
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  Scissors,
  Check
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const portfolioImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop",
    likes: 234,
    service: "Skin fade",
    featured: true
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop",
    likes: 189,
    service: "Fade + Barba",
    featured: false
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop",
    likes: 312,
    service: "Diseno geometrico",
    featured: true
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop",
    likes: 156,
    service: "Corte clasico",
    featured: false
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop",
    likes: 278,
    service: "Fade premium",
    featured: true
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1593702288056-7927b442d0fa?w=400&h=400&fit=crop",
    likes: 145,
    service: "Rapado",
    featured: false
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400&h=400&fit=crop",
    likes: 423,
    service: "Perfilado",
    featured: true
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=400&fit=crop",
    likes: 198,
    service: "Taper fade",
    featured: false
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=400&h=400&fit=crop",
    likes: 267,
    service: "Pompadour moderno",
    featured: true
  },
]

const services = [
  { name: "Corte clasico", price: 35, duration: "30 min" },
  { name: "Fade + Barba", price: 45, duration: "45 min" },
  { name: "Skin fade", price: 40, duration: "40 min" },
  { name: "Corte premium + Barba", price: 65, duration: "60 min" },
  { name: "Diseno geometrico", price: 55, duration: "45 min" },
  { name: "Rapado", price: 25, duration: "20 min" },
]

const reviews = [
  {
    id: 1,
    author: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "El mejor barbero de la ciudad. Marcus siempre logra exactamente lo que quiero. La atencion al detalle es increible.",
    date: "Hace 2 semanas"
  },
  {
    id: 2,
    author: "David Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Increible nivel con los disenos geometricos. Siempre salgo sintiendome fresco y con confianza.",
    date: "Hace 1 mes"
  },
  {
    id: 3,
    author: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Profesional, puntual y talentoso. Lo recomiendo mucho para cualquiera que busque cortes de calidad.",
    date: "Hace 1 mes"
  },
]

const workingHours = [
  { day: "Lunes", hours: "9:00 AM - 6:00 PM" },
  { day: "Martes", hours: "9:00 AM - 6:00 PM" },
  { day: "Miercoles", hours: "9:00 AM - 6:00 PM" },
  { day: "Jueves", hours: "9:00 AM - 7:00 PM" },
  { day: "Viernes", hours: "9:00 AM - 7:00 PM" },
  { day: "Sabado", hours: "10:00 AM - 5:00 PM" },
  { day: "Domingo", hours: "Cerrado" },
]

export function BarberPortfolio() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "featured">("all")
  const [likedImages, setLikedImages] = useState<number[]>([])

  const filteredImages = selectedFilter === "featured" 
    ? portfolioImages.filter(img => img.featured)
    : portfolioImages

  const toggleLike = (id: number) => {
    setLikedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imgId => imgId !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Preview Banner */}
      <div className="bg-primary/10 border-b border-primary/20 px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm text-primary font-medium">Vista previa de pagina publica</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 text-xs">
              <ExternalLink className="w-3 h-3 mr-1" />
              Ver online
            </Button>
            <Button size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground">
              Editar pagina
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-48 md:h-64 bg-gradient-to-br from-primary/20 via-muted to-background" />
        <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-xl">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" />
              <AvatarFallback className="text-4xl">MJ</AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 pt-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">Marcus Johnson</h1>
                    <Badge className="bg-primary text-primary-foreground">
                      <Check className="w-3 h-3 mr-1" />
                      Verificado
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1 flex items-center gap-2">
                    <Scissors className="w-4 h-4" />
                    Elite Cuts Studio
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Centro de Los Angeles, CA
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="font-semibold text-foreground">4.9</span>
                      <span className="text-muted-foreground text-sm">(127 reseñas)</span>
                    </div>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-sm text-muted-foreground">500+ clientes</span>
                  </div>
                </div>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full md:w-auto">
                  <Calendar className="w-4 h-4 mr-2" />
                  Reservar ahora
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-4">
                <Button variant="outline" size="icon" className="w-9 h-9">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-9 h-9">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-9 h-9">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-9 h-9">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Bio */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <p className="text-foreground leading-relaxed">
              Barbero profesional con mas de 8 anos de experiencia, especializado en fades, arreglo de barba y disenos creativos.
              Creo que cada cliente merece una experiencia premium que lo haga sentirse con confianza y verse impecable.
              Reserva tu turno hoy y nota la diferencia.
            </p>
          </CardContent>
        </Card>

        {/* Portfolio Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Portafolio</h2>
            <div className="flex gap-2">
              <Button 
                variant={selectedFilter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedFilter("all")}
                className={selectedFilter === "all" ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""}
              >
                Todo
              </Button>
              <Button 
                variant={selectedFilter === "featured" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedFilter("featured")}
                className={selectedFilter === "featured" ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""}
              >
                Destacados
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {filteredImages.map((image) => (
              <div 
                key={image.id}
                className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
              >
                <img 
                  src={image.url} 
                  alt={image.service}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium truncate">{image.service}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <button 
                        onClick={() => toggleLike(image.id)}
                        className="flex items-center gap-1 text-white/80 hover:text-white transition-colors"
                      >
                        <Heart 
                          className={cn(
                            "w-4 h-4",
                            likedImages.includes(image.id) && "fill-destructive text-destructive"
                          )} 
                        />
                        <span className="text-xs">{image.likes + (likedImages.includes(image.id) ? 1 : 0)}</span>
                      </button>
                    </div>
                  </div>
                </div>
                {image.featured && (
                  <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">
                    Destacado
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Services & Hours */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Services */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Scissors className="w-5 h-5 text-primary" />
                Servicios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {services.map((service) => (
                <div 
                  key={service.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
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

          {/* Working Hours */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Horarios de trabajo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {workingHours.map((item) => {
                const isToday = item.day === "Martes" // Simulated current day
                return (
                  <div 
                    key={item.day}
                    className={cn(
                      "flex items-center justify-between py-2 px-3 rounded-lg",
                      isToday && "bg-primary/10 border border-primary/20"
                    )}
                  >
                    <span className={cn(
                      "text-sm",
                      isToday ? "font-medium text-primary" : "text-foreground"
                    )}>
                      {item.day}
                      {isToday && <Badge className="ml-2 bg-primary text-primary-foreground text-xs">Hoy</Badge>}
                    </span>
                    <span className={cn(
                      "text-sm",
                      item.hours === "Cerrado" ? "text-muted-foreground" : "text-foreground"
                    )}>
                      {item.hours}
                    </span>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Reviews */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Star className="w-5 h-5 text-warning" />
                Reseñas
              </CardTitle>
              <Button variant="link" className="text-primary p-0">
                Ver las 127 reseñas
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{review.author}</p>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-3 h-3",
                            i < review.rating ? "text-warning fill-warning" : "text-muted-foreground"
                          )} 
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground mt-2">{review.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-foreground">Listo para tu proximo corte?</h3>
            <p className="text-muted-foreground mt-2">
              Reserva tu turno ahora y vive el servicio premium de barberia que mereces.
            </p>
            <Button size="lg" className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              Reservar turno
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
