"use client"

import { useState } from "react"
import { 
  Search, 
  Plus, 
  Phone,
  Mail,
  Calendar,
  Clock,
  Star,
  Heart,
  AlertTriangle,
  Camera,
  ChevronRight,
  Filter,
  TrendingUp
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const clients = [
  {
    id: 1,
    name: "James Wilson",
    phone: "+1 (555) 123-4567",
    email: "james.w@email.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    initials: "JW",
    visits: 24,
    lastVisit: "Hoy",
    totalSpent: 1080,
    preferredService: "Fade + Barba",
    loyaltyPoints: 480,
    riskScore: "low",
    nextSuggested: "En 2 semanas",
    avgFrequency: "Cada 3 semanas",
    notes: "Prefiere low fade, con atencion extra en el perfilado de barba",
    photos: [
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=200&h=200&fit=crop",
    ],
    vip: true
  },
  {
    id: 2,
    name: "Michael Brown",
    phone: "+1 (555) 234-5678",
    email: "m.brown@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    initials: "MB",
    visits: 12,
    lastVisit: "Hace 1 semana",
    totalSpent: 540,
    preferredService: "Corte clasico",
    loyaltyPoints: 240,
    riskScore: "low",
    nextSuggested: "En 1 semana",
    avgFrequency: "Cada 2 semanas",
    notes: "Alergico a ciertos productos para el cabello",
    photos: [
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop",
    ],
    vip: false
  },
  {
    id: 3,
    name: "Kevin Martinez",
    phone: "+1 (555) 345-6789",
    email: "kevin.m@email.com",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
    initials: "KM",
    visits: 5,
    lastVisit: "Hace 3 semanas",
    totalSpent: 200,
    preferredService: "Fade + Perfilado",
    loyaltyPoints: 100,
    riskScore: "high",
    nextSuggested: "Atrasado",
    avgFrequency: "Irregular",
    notes: "Historial de ausencias, requiere sena",
    photos: [],
    vip: false
  },
  {
    id: 4,
    name: "David Chen",
    phone: "+1 (555) 456-7890",
    email: "david.c@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    initials: "DC",
    visits: 18,
    lastVisit: "Hoy",
    totalSpent: 890,
    preferredService: "Skin fade + diseno",
    loyaltyPoints: 380,
    riskScore: "low",
    nextSuggested: "En 3 semanas",
    avgFrequency: "Cada 3 semanas",
    notes: "Le encantan los disenos geometricos, mostrarle patrones nuevos",
    photos: [
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=200&h=200&fit=crop",
    ],
    vip: true
  },
  {
    id: 5,
    name: "Anthony Davis",
    phone: "+1 (555) 567-8901",
    email: "a.davis@email.com",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face",
    initials: "AD",
    visits: 8,
    lastVisit: "Hace 2 semanas",
    totalSpent: 420,
    preferredService: "Corte premium + Barba",
    loyaltyPoints: 180,
    riskScore: "medium",
    nextSuggested: "Esta semana",
    avgFrequency: "Cada 2-3 semanas",
    notes: "Referido por James Wilson",
    photos: [
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop",
    ],
    vip: false
  },
]

export function ClientProfile() {
  const [selectedClient, setSelectedClient] = useState(clients[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground mt-1">{clients.length} clientes en total</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Agregar cliente
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar clientes..." 
              className="pl-10 bg-card border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge variant="outline" className="cursor-pointer bg-primary/10 text-primary border-primary/30 flex-shrink-0">
              Todos
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted flex-shrink-0">
              VIP
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted flex-shrink-0">
              En riesgo
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted flex-shrink-0">
              Nuevos
            </Badge>
          </div>

          {/* Client Cards */}
          <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
            {filteredClients.map((client) => (
              <Card 
                key={client.id}
                className={cn(
                  "cursor-pointer transition-all hover:border-primary/50",
                  selectedClient.id === client.id 
                    ? "border-primary bg-primary/5" 
                    : "bg-card border-border"
                )}
                onClick={() => setSelectedClient(client)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 border-2 border-border">
                        <AvatarImage src={client.avatar} />
                        <AvatarFallback className="bg-muted">{client.initials}</AvatarFallback>
                      </Avatar>
                      {client.vip && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-warning flex items-center justify-center">
                          <Star className="w-3 h-3 text-warning-foreground fill-warning-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground truncate">{client.name}</p>
                        {client.riskScore === "high" && (
                          <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        Ultima visita: {client.lastVisit}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Client Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <Card className="bg-card border-border overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/20 to-primary/5" />
            <CardContent className="p-6 -mt-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-4 border-card">
                    <AvatarImage src={selectedClient.avatar} />
                    <AvatarFallback className="text-2xl">{selectedClient.initials}</AvatarFallback>
                  </Avatar>
                  {selectedClient.vip && (
                    <Badge className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-warning text-warning-foreground">
                      <Star className="w-3 h-3 mr-1 fill-warning-foreground" />
                      VIP
                    </Badge>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{selectedClient.name}</h2>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {selectedClient.phone}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          {selectedClient.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Llamar
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Reservar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{selectedClient.visits}</p>
                <p className="text-xs text-muted-foreground mt-1">Visitas totales</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">${selectedClient.totalSpent}</p>
                <p className="text-xs text-muted-foreground mt-1">Gasto total</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{selectedClient.loyaltyPoints}</p>
                <p className="text-xs text-muted-foreground mt-1">Puntos de fidelidad</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <Badge variant={selectedClient.riskScore === "low" ? "outline" : selectedClient.riskScore === "medium" ? "secondary" : "destructive"} className={cn(
                  selectedClient.riskScore === "low" && "border-success text-success",
                  selectedClient.riskScore === "medium" && "border-warning text-warning",
                  selectedClient.riskScore === "high" && "border-destructive text-destructive"
                )}>
                  {selectedClient.riskScore === "low" ? "riesgo bajo" : selectedClient.riskScore === "medium" ? "riesgo medio" : "riesgo alto"}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">Riesgo de ausencia</p>
              </CardContent>
            </Card>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Preferences */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  Preferencias
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Servicio preferido</span>
                  <span className="text-sm font-medium text-foreground">{selectedClient.preferredService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Frecuencia prom.</span>
                  <span className="text-sm font-medium text-foreground">{selectedClient.avgFrequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Proxima sugerida</span>
                  <span className={cn(
                    "text-sm font-medium",
                    selectedClient.nextSuggested === "Atrasado" ? "text-destructive" : "text-foreground"
                  )}>
                    {selectedClient.nextSuggested}
                  </span>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-1">Notas</p>
                  <p className="text-sm text-foreground">{selectedClient.notes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Photo History */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Camera className="w-4 h-4 text-primary" />
                  Historial de fotos
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedClient.photos.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedClient.photos.map((photo, index) => (
                      <div 
                        key={index}
                        className="aspect-square rounded-lg bg-muted overflow-hidden"
                      >
                        <img 
                          src={photo} 
                          alt={`Corte ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                    <button className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors">
                      <Plus className="w-6 h-6 text-muted-foreground" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Camera className="w-10 h-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Todavia no hay fotos</p>
                    <Button variant="link" size="sm" className="text-primary mt-1">
                      Agregar primera foto
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* AI Suggestion */}
          <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Recomendacion IA: {selectedClient.name} suele reservar {selectedClient.avgFrequency.toLowerCase()}. 
                  {selectedClient.nextSuggested === "Atrasado" 
                    ? " Ya esta pasado para una visita; considera enviarle un recordatorio!"
                    : ` Sugiere programar su proximo turno ${selectedClient.nextSuggested.toLowerCase()}.`
                  }
                </p>
              </div>
              <Button size="sm" variant="outline" className="flex-shrink-0 border-primary/30 text-primary hover:bg-primary/10">
                Enviar recordatorio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
