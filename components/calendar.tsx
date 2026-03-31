"use client"

import { useState } from "react"
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  User,
  MoreHorizontal
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"
]

const appointments = [
  { 
    id: 1, 
    startSlot: 0, 
    duration: 2, 
    client: "James Wilson", 
    service: "Fade + Barba",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    initials: "JW",
    barber: "Marcus"
  },
  { 
    id: 2, 
    startSlot: 2, 
    duration: 1, 
    client: "Michael Brown", 
    service: "Corte clasico",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    initials: "MB",
    barber: "Marcus"
  },
  { 
    id: 3, 
    startSlot: 4, 
    duration: 2, 
    client: "David Chen", 
    service: "Skin fade + diseno",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    initials: "DC",
    barber: "Marcus"
  },
  { 
    id: 4, 
    startSlot: 7, 
    duration: 1, 
    client: "Robert Taylor", 
    service: "Rapado",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    initials: "RT",
    barber: "Marcus"
  },
  { 
    id: 5, 
    startSlot: 10, 
    duration: 2, 
    client: "Kevin Martinez", 
    service: "Fade + Perfilado",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    initials: "KM",
    barber: "Marcus"
  },
  { 
    id: 6, 
    startSlot: 13, 
    duration: 2, 
    client: "Anthony Davis", 
    service: "Corte premium + Barba",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
    initials: "AD",
    barber: "Marcus"
  },
]

const teamMembers = [
  { id: 1, name: "Marcus", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", initials: "MJ", active: true },
  { id: 2, name: "Tyler", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", initials: "TW", active: true },
  { id: 3, name: "Andre", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", initials: "AJ", active: false },
]

const weekDays = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]
const dates = [29, 30, 31, 1, 2, 3, 4]

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState(2) // Index for March 31
  const [selectedBarber, setSelectedBarber] = useState("Marcus")

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground mt-1">Gestiona tus turnos</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo turno
        </Button>
      </div>

      {/* Week Navigation */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-semibold">Marzo - Abril 2026</h2>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <button
                key={day}
                onClick={() => setSelectedDate(index)}
                className={cn(
                  "flex flex-col items-center p-2 md:p-3 rounded-xl transition-all",
                  selectedDate === index 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                )}
              >
                <span className={cn(
                  "text-xs font-medium",
                  selectedDate === index ? "text-primary-foreground" : "text-muted-foreground"
                )}>
                  {day}
                </span>
                <span className={cn(
                  "text-lg font-bold mt-1",
                  selectedDate === index ? "text-primary-foreground" : "text-foreground"
                )}>
                  {dates[index]}
                </span>
                {index === 2 && (
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full mt-1",
                    selectedDate === index ? "bg-primary-foreground" : "bg-primary"
                  )} />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Selector */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        <span className="text-sm text-muted-foreground flex-shrink-0">Equipo:</span>
        <div className="flex gap-2">
          {teamMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedBarber(member.name)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
                selectedBarber === member.name 
                  ? "border-primary bg-primary/10" 
                  : "border-border hover:border-muted-foreground/30",
                !member.active && "opacity-50"
              )}
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
              </Avatar>
              <span className={cn(
                "text-sm font-medium",
                selectedBarber === member.name ? "text-primary" : "text-foreground"
              )}>
                {member.name}
              </span>
              {member.active && (
                <div className="w-2 h-2 rounded-full bg-success" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Grid */}
      <Card className="bg-card border-border overflow-hidden">
        <CardHeader className="pb-0 border-b border-border">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            Martes, 31 de marzo
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            {/* Time slots */}
            <div className="divide-y divide-border">
              {timeSlots.map((time, index) => {
                const appointment = appointments.find(apt => apt.startSlot === index)
                
                return (
                  <div 
                    key={time}
                    className={cn(
                      "flex min-h-[60px] group",
                      appointment ? "" : "hover:bg-muted/30"
                    )}
                  >
                    {/* Time label */}
                    <div className="w-20 md:w-24 px-4 py-3 text-sm text-muted-foreground border-r border-border flex-shrink-0">
                      {time}
                    </div>
                    
                    {/* Appointment slot */}
                    <div className="flex-1 relative">
                      {appointment ? (
                        <div 
                          className="absolute inset-x-2 top-1 bg-primary/10 border border-primary/30 rounded-lg p-3 z-10"
                          style={{ 
                            height: `calc(${appointment.duration * 60}px - 8px)` 
                          }}
                        >
                          <div className="flex items-start justify-between h-full">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8 border border-primary/30">
                                <AvatarImage src={appointment.avatar} />
                                <AvatarFallback className="text-xs bg-primary/20 text-primary">
                                  {appointment.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-foreground">{appointment.client}</p>
                                <p className="text-xs text-muted-foreground">{appointment.service}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <button className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">6</p>
                <p className="text-sm text-muted-foreground">Turnos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5.5h</p>
                <p className="text-sm text-muted-foreground">Tiempo ocupado</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Plus className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">Espacios libres</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
