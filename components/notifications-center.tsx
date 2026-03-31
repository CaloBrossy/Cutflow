"use client"

import { Bell, Calendar, CheckCheck, CreditCard, Trash2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAppState, type AppNotification } from "@/providers/app-state-provider"

const notificationTypeStyles: Record<AppNotification["type"], { label: string; icon: typeof Bell; className: string }> = {
  booking: { label: "Reserva", icon: Calendar, className: "bg-primary/10 text-primary border-primary/20" },
  client: { label: "Cliente", icon: Users, className: "bg-chart-3/10 text-chart-3 border-chart-3/20" },
  payment: { label: "Pago", icon: CreditCard, className: "bg-chart-2/10 text-chart-2 border-chart-2/20" },
  system: { label: "Sistema", icon: Bell, className: "bg-muted text-foreground border-border" },
}

export function NotificationsCenter() {
  const {
    notifications,
    unreadCount,
    settings,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    removeNotification,
  } = useAppState()

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notificaciones</h1>
          <p className="text-muted-foreground mt-1">
            Actualizaciones en tiempo real del negocio y del sistema
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            {settings.realtimeEnabled ? "Tiempo real activo" : "Tiempo real pausado"}
          </Badge>
          <Button variant="outline" onClick={markAllNotificationsAsRead}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Marcar todo como leido
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Sin leer</p>
            <p className="text-3xl font-bold text-foreground mt-2">{unreadCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-3xl font-bold text-foreground mt-2">{notifications.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Estado</p>
            <p className="text-lg font-semibold text-primary mt-2">
              {settings.desktopAlerts ? "Alertas visibles" : "Solo bandeja interna"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Actividad reciente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((notification) => {
            const config = notificationTypeStyles[notification.type]
            const Icon = config.icon

            return (
              <div
                key={notification.id}
                className={cn(
                  "rounded-xl border p-4 transition-colors",
                  notification.read ? "border-border bg-background" : "border-primary/20 bg-primary/5"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("mt-0.5 rounded-lg border p-2", config.className)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{notification.title}</p>
                        <Badge variant="outline">{config.label}</Badge>
                        {!notification.read && (
                          <Badge className="bg-primary text-primary-foreground">Nuevo</Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{notification.timeLabel}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{notification.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {!notification.read && (
                        <Button size="sm" variant="outline" onClick={() => markNotificationAsRead(notification.id)}>
                          Marcar como leido
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => removeNotification(notification.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
