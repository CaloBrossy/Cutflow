"use client"

import { useRef } from "react"
import { ImageUp, MonitorCog, RotateCcw, Smartphone, Sparkles, SwatchBook, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/providers/app-state-provider"

export function SettingsView() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const {
    settings,
    brandSettings,
    updateSetting,
    updateBrandLogo,
    updateBrandMode,
    updateBrandName,
    updateBrandPalette,
    resetBrandSettings,
  } = useAppState()

  const handleLogoUpload = async (file: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => {
      await updateBrandLogo(typeof reader.result === "string" ? reader.result : null)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuracion</h1>
        <p className="text-muted-foreground mt-1">
          Ajusta alertas, experiencia visual y comportamiento en tiempo real
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="bg-card border-border xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SwatchBook className="w-5 h-5 text-primary" />
              Marca y tema
            </CardTitle>
            <CardDescription>
              Sube tu logo y deja que Flowcut adapte la app y tu pagina publica a los colores de tu marca.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-4">
              <div className="rounded-xl border border-dashed border-border p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted/40">
                    {brandSettings.logo ? (
                      <img src={brandSettings.logo} alt={brandSettings.brandName} className="h-full w-full object-contain" />
                    ) : (
                      <Sparkles className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Logo de la marca</p>
                    <p className="text-sm text-muted-foreground mt-1">Usamos esta imagen para sacar colores automaticamente y mostrar tu identidad en la app.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => inputRef.current?.click()}>
                      <ImageUp className="w-4 h-4 mr-2" />
                      Subir logo
                    </Button>
                    <Button variant="ghost" onClick={resetBrandSettings}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => void handleLogoUpload(e.target.files?.[0] ?? null)} />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Nombre visible</p>
                  <Input value={brandSettings.brandName} onChange={(e) => updateBrandName(e.target.value)} placeholder="Nombre de la marca" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Paleta automatica</p>
                  <div className="flex items-center justify-between rounded-xl border border-border p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">Auto desde logo</p>
                      <p className="text-xs text-muted-foreground">Si esta activo, el logo define la paleta base.</p>
                    </div>
                    <Switch checked={brandSettings.mode === "auto"} onCheckedChange={(checked) => updateBrandMode(checked ? "auto" : "manual")} />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <ColorField label="Principal" value={brandSettings.palette.primary} onChange={(value) => updateBrandPalette({ primary: value })} />
                <ColorField label="Acento" value={brandSettings.palette.accent} onChange={(value) => updateBrandPalette({ accent: value })} />
                <ColorField label="Surface" value={brandSettings.palette.surface} onChange={(value) => updateBrandPalette({ surface: value })} />
                <ColorField label="Sidebar" value={brandSettings.palette.sidebar} onChange={(value) => updateBrandPalette({ sidebar: value })} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-background p-4">
                <p className="text-sm font-medium text-foreground">Preview rapido</p>
                <div className="mt-4 rounded-2xl border border-border overflow-hidden">
                  <div className="flex items-center justify-between p-4" style={{ backgroundColor: brandSettings.palette.sidebar }}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden" style={{ backgroundColor: brandSettings.palette.primary, color: "#fff" }}>
                        {brandSettings.logo ? <img src={brandSettings.logo} alt="" className="h-full w-full object-cover" /> : "F"}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{brandSettings.brandName || "Tu marca"}</p>
                        <p className="text-xs text-slate-600">Suite Pro</p>
                      </div>
                    </div>
                    <Badge style={{ backgroundColor: brandSettings.palette.primary, color: "#fff" }}>Marca</Badge>
                  </div>
                  <div className="space-y-3 p-4" style={{ backgroundColor: brandSettings.palette.surface }}>
                    <div className="rounded-xl p-4" style={{ backgroundColor: "#ffffff" }}>
                      <p className="text-sm text-slate-500">Principal</p>
                      <div className="mt-2 h-3 rounded-full" style={{ backgroundColor: brandSettings.palette.primary }} />
                    </div>
                    <div className="rounded-xl p-4" style={{ backgroundColor: "#ffffff" }}>
                      <p className="text-sm text-slate-500">Acento</p>
                      <div className="mt-2 h-3 rounded-full" style={{ backgroundColor: brandSettings.palette.accent }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="rounded-xl border border-border p-3 space-y-2">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="flex items-center gap-3">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-14 rounded border border-border bg-transparent" />
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
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
