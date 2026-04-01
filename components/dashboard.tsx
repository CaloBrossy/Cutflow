"use client"

import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Menu,
  Moon,
  Sun
} from "lucide-react"
import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { useAppState } from "@/providers/app-state-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { PageView } from "@/app/dashboard/page"

interface DashboardProps {
  onNavigate: (view: PageView) => void
}

const todayAppointments = [
  { 
    id: 1, 
    time: "9:00 AM", 
    endTime: "9:45 AM",
    client: "James Wilson", 
    service: "Fade + Barba", 
    price: 45,
    status: "completed",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    initials: "JW"
  },
  { 
    id: 2, 
    time: "10:00 AM", 
    endTime: "10:30 AM",
    client: "Michael Brown", 
    service: "Corte clasico", 
    price: 35,
    status: "completed",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    initials: "MB"
  },
  { 
    id: 3, 
    time: "11:00 AM", 
    endTime: "11:45 AM",
    client: "David Chen", 
    service: "Skin fade + diseno", 
    price: 55,
    status: "in-progress",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    initials: "DC"
  },
  { 
    id: 4, 
    time: "12:30 PM", 
    endTime: "1:00 PM",
    client: "Robert Taylor", 
    service: "Rapado", 
    price: 25,
    status: "upcoming",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    initials: "RT"
  },
  { 
    id: 5, 
    time: "2:00 PM", 
    endTime: "2:45 PM",
    client: "Kevin Martinez", 
    service: "Fade + Perfilado", 
    price: 50,
    status: "upcoming",
    riskScore: "high",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    initials: "KM"
  },
  { 
    id: 6, 
    time: "3:30 PM", 
    endTime: "4:15 PM",
    client: "Anthony Davis", 
    service: "Corte premium + Barba", 
    price: 65,
    status: "upcoming",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
    initials: "AD"
  },
]

const aiSuggestions = [
  { id: 1, message: "Podrias sumar 2 clientes mas hoy entre la 1 y las 2 PM", type: "opportunity" },
  { id: 2, message: "Kevin Martinez tiene un 67% de riesgo de ausencia. Enviar recordatorio?", type: "warning" },
  { id: 3, message: "A James Wilson le toca corte en 3 dias", type: "retention" },
]

export function Dashboard({ onNavigate }: DashboardProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const { brandSettings } = useAppState()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = resolvedTheme !== "light"

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Mobile Header */}
      <div className="flex md:hidden items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Panel</h1>
        </div>
        <Avatar className="w-9 h-9">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
          <AvatarFallback>MJ</AvatarFallback>
        </Avatar>
      </div>

      {/* Header */}
      <div className="hidden md:flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Buen dia, Marcus</h1>
          <p className="text-muted-foreground mt-1">Martes, 31 de marzo de 2026</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 overflow-hidden">
              {brandSettings.logo ? <img src={brandSettings.logo} alt={brandSettings.brandName} className="h-full w-full object-cover" /> : <Sparkles className="w-4 h-4 text-primary" />}
            </div>
            <span className="text-sm font-medium text-foreground">{brandSettings.brandName || "Flowcut"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Cambiar modo oscuro"
            title={isDarkMode ? "Pasar a modo claro" : "Pasar a modo oscuro"}
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          >
            {mounted && isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            Nuevo turno
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ingresos de hoy</p>
                <p className="text-2xl font-bold text-foreground mt-1">$275</p>
                <p className="text-xs text-primary flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% vs. el martes pasado
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Turnos</p>
                <p className="text-2xl font-bold text-foreground mt-1">6 / 8</p>
                <p className="text-xs text-muted-foreground mt-1">2 espacios disponibles</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-chart-2/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Meta semanal</p>
                <p className="text-2xl font-bold text-foreground mt-1">68%</p>
                <Progress value={68} className="h-1.5 mt-2 w-24" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-chart-4/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-chart-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clientes nuevos</p>
                <p className="text-2xl font-bold text-foreground mt-1">4</p>
                <p className="text-xs text-muted-foreground mt-1">esta semana</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule - Timeline */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Agenda de hoy</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">6 turnos programados</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:text-primary/80"
              onClick={() => onNavigate("calendar")}
            >
              Ver todo
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayAppointments.map((apt, index) => (
              <div 
                key={apt.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl transition-all",
                  apt.status === "in-progress" && "bg-primary/10 border border-primary/20",
                  apt.status === "completed" && "opacity-60",
                  apt.status === "upcoming" && "hover:bg-muted/50"
                )}
              >
                {/* Time */}
                <div className="w-16 md:w-20 flex-shrink-0">
                  <p className={cn(
                    "text-sm font-medium",
                    apt.status === "in-progress" ? "text-primary" : "text-foreground"
                  )}>
                    {apt.time}
                  </p>
                  <p className="text-xs text-muted-foreground">{apt.endTime}</p>
                </div>

                {/* Timeline indicator */}
                <div className="flex flex-col items-center gap-1">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    apt.status === "completed" && "bg-success",
                    apt.status === "in-progress" && "bg-primary animate-pulse",
                    apt.status === "upcoming" && "bg-muted-foreground"
                  )} />
                  {index < todayAppointments.length - 1 && (
                    <div className="w-0.5 h-8 bg-border" />
                  )}
                </div>

                {/* Client info */}
                <div className="flex-1 flex items-center gap-3 min-w-0">
                  <Avatar className="w-10 h-10 border border-border">
                    <AvatarImage src={apt.avatar} />
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                      {apt.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{apt.client}</p>
                      {apt.riskScore === "high" && (
                        <Badge variant="outline" className="text-destructive border-destructive/30 text-xs px-1.5 py-0">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Riesgo
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{apt.service}</p>
                  </div>
                </div>

                {/* Price and status */}
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-foreground">${apt.price}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {apt.status === "completed" && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    )}
                    {apt.status === "in-progress" && (
                      <Clock className="w-3.5 h-3.5 text-primary" />
                    )}
                    <span className={cn(
                      "text-xs capitalize",
                      apt.status === "completed" && "text-success",
                      apt.status === "in-progress" && "text-primary",
                      apt.status === "upcoming" && "text-muted-foreground"
                    )}>
                      {apt.status === "in-progress" ? "Ahora" : apt.status === "completed" ? "completado" : "proximo"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Suggestions & Quick Actions */}
        <div className="space-y-6">
          {/* AI Suggestions */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Insights inteligentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSuggestions.map((suggestion) => (
                <div 
                  key={suggestion.id}
                  className={cn(
                    "p-3 rounded-lg border",
                    suggestion.type === "opportunity" && "bg-primary/5 border-primary/20",
                    suggestion.type === "warning" && "bg-destructive/5 border-destructive/20",
                    suggestion.type === "retention" && "bg-chart-2/5 border-chart-2/20"
                  )}
                >
                  <p className="text-sm text-foreground">{suggestion.message}</p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className={cn(
                      "p-0 h-auto mt-2 text-xs",
                      suggestion.type === "opportunity" && "text-primary",
                      suggestion.type === "warning" && "text-destructive",
                      suggestion.type === "retention" && "text-chart-2"
                    )}
                  >
                    {suggestion.type === "opportunity" && "Ver espacios"}
                    {suggestion.type === "warning" && "Enviar recordatorio"}
                    {suggestion.type === "retention" && "Agendar ahora"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Esta semana</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completados</span>
                <span className="text-sm font-medium text-foreground">18 cortes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Ausencias</span>
                <span className="text-sm font-medium text-destructive">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Ticket prom.</span>
                <span className="text-sm font-medium text-foreground">$42</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Ingresos totales</span>
                <span className="text-sm font-semibold text-primary">$756</span>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Gap */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Hueco detectado: 1:00 - 2:00 PM</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Podrias sumar un corte clasico en este espacio
                  </p>
                  <Button size="sm" className="mt-3 h-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Llenar espacio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
