"use client"

import { MonitorCog, Smartphone, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAppState } from "@/providers/app-state-provider"

export function SettingsView() {
  const { settings, updateSetting } = useAppState()

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuracion</h1>
        <p className="text-muted-foreground mt-1">
          Ajusta alertas, experiencia visual y comportamiento en tiempo real
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Notificaciones en tiempo real
            </CardTitle>
            <CardDescription>
              Controla que eventos disparan alertas y si deben aparecer instantaneamente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SettingRow
              title="Activar tiempo real"
              description="Genera y actualiza alertas automaticamente sin recargar."
              checked={settings.realtimeEnabled}
              onCheckedChange={(checked) => updateSetting("realtimeEnabled", checked)}
            />
            <SettingRow
              title="Alertas visuales"
              description="Muestra avisos emergentes cuando entra una nueva notificacion."
              checked={settings.desktopAlerts}
              onCheckedChange={(checked) => updateSetting("desktopAlerts", checked)}
            />
            <SettingRow
              title="Reservas"
              description="Nuevas reservas, confirmaciones y cambios de agenda."
              checked={settings.bookingAlerts}
              onCheckedChange={(checked) => updateSetting("bookingAlerts", checked)}
            />
            <SettingRow
              title="Clientes"
              description="Avisos de retencion, ausencias y recordatorios."
              checked={settings.clientAlerts}
              onCheckedChange={(checked) => updateSetting("clientAlerts", checked)}
            />
            <SettingRow
              title="Pagos"
              description="Cobros aprobados y movimientos relevantes."
              checked={settings.paymentAlerts}
              onCheckedChange={(checked) => updateSetting("paymentAlerts", checked)}
            />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MonitorCog className="w-5 h-5 text-primary" />
              Preferencias generales
            </CardTitle>
            <CardDescription>
              Datos base del negocio y configuraciones complementarias.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-border p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">Canal de contacto</p>
                  <p className="text-sm text-muted-foreground">Destino sugerido para alertas futuras.</p>
                </div>
                <Badge variant="outline">
                  <Smartphone className="w-3 h-3 mr-1" />
                  WhatsApp
                </Badge>
              </div>
              <Input defaultValue="Marcus Studio" placeholder="Nombre del negocio" />
              <Input defaultValue="+54 11 5555 5555" placeholder="Telefono de alertas" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SettingRow({
  title,
  description,
  checked,
  onCheckedChange,
  icon,
}: {
  title: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border p-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon}
          <p className="font-medium text-foreground">{title}</p>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}
