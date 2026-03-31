"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "@/hooks/use-toast"
import { initialPortfolioPage, type PortfolioImage, type PortfolioPageData, type PortfolioReview, type PortfolioService, type WorkingHour } from "@/lib/portfolio-data"

type NotificationType = "booking" | "client" | "payment" | "system"

export interface AppNotification {
  id: string
  title: string
  description: string
  timeLabel: string
  timestamp: number
  type: NotificationType
  read: boolean
}

interface NotificationSettings {
  realtimeEnabled: boolean
  desktopAlerts: boolean
  bookingAlerts: boolean
  clientAlerts: boolean
  paymentAlerts: boolean
  compactSidebar: boolean
}

interface AppStateContextValue {
  notifications: AppNotification[]
  unreadCount: number
  settings: NotificationSettings
  portfolioPage: PortfolioPageData
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void
  removeNotification: (id: string) => void
  updateSetting: <K extends keyof NotificationSettings>(key: K, value: NotificationSettings[K]) => void
  updatePortfolioPage: (updates: Partial<PortfolioPageData>) => void
  updatePortfolioService: (id: number, updates: Partial<PortfolioService>) => void
  updatePortfolioImage: (id: number, updates: Partial<PortfolioImage>) => void
  updatePortfolioReview: (id: number, updates: Partial<PortfolioReview>) => void
  updateWorkingHour: (day: string, hours: string) => void
  setPortfolioStatus: (status: PortfolioPageData["status"]) => void
}

const initialNotifications: AppNotification[] = [
  {
    id: "n1",
    title: "Reserva confirmada",
    description: "James Wilson confirmo su turno para hoy a las 2:30 PM.",
    timeLabel: "Hace 2 min",
    timestamp: Date.now() - 2 * 60 * 1000,
    type: "booking",
    read: false,
  },
  {
    id: "n2",
    title: "Cliente en riesgo",
    description: "Kevin Martinez sigue con alta probabilidad de ausencia.",
    timeLabel: "Hace 12 min",
    timestamp: Date.now() - 12 * 60 * 1000,
    type: "client",
    read: false,
  },
  {
    id: "n3",
    title: "Pago recibido",
    description: "Se registro un pago de $45 por Fade + Barba.",
    timeLabel: "Hace 28 min",
    timestamp: Date.now() - 28 * 60 * 1000,
    type: "payment",
    read: true,
  },
]

const initialSettings: NotificationSettings = {
  realtimeEnabled: true,
  desktopAlerts: true,
  bookingAlerts: true,
  clientAlerts: true,
  paymentAlerts: true,
  compactSidebar: false,
}

const AppStateContext = createContext<AppStateContextValue | null>(null)

const realtimeTemplates: Array<Omit<AppNotification, "id" | "timestamp" | "timeLabel" | "read">> = [
  {
    title: "Nueva reserva",
    description: "Entró una nueva solicitud para Corte clasico el jueves a las 11:00 AM.",
    type: "booking",
  },
  {
    title: "Recordatorio enviado",
    description: "Se envio un recordatorio automatico a Anthony Davis.",
    type: "client",
  },
  {
    title: "Pago aprobado",
    description: "Mercado Pago confirmo un cobro de $65 por Corte premium + Barba.",
    type: "payment",
  },
  {
    title: "Cambio de agenda",
    description: "Michael Brown pidio mover su turno al viernes.",
    type: "booking",
  },
]

function getRelativeLabel(timestamp: number) {
  const diffInMinutes = Math.max(1, Math.floor((Date.now() - timestamp) / 60000))
  if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `Hace ${diffInHours} h`
  return "Hace 1 dia"
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications)
  const [settings, setSettings] = useState<NotificationSettings>(initialSettings)
  const [portfolioPage, setPortfolioPage] = useState<PortfolioPageData>(initialPortfolioPage)
  const templateIndexRef = useRef(0)

  useEffect(() => {
    const storedPortfolioPage = window.localStorage.getItem("cutflow-portfolio-page")
    if (!storedPortfolioPage) return

    try {
      const parsedPortfolioPage = JSON.parse(storedPortfolioPage) as PortfolioPageData
      setPortfolioPage(parsedPortfolioPage)
    } catch {
      window.localStorage.removeItem("cutflow-portfolio-page")
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("cutflow-portfolio-page", JSON.stringify(portfolioPage))
  }, [portfolioPage])

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  )

  const updateSetting = useCallback(
    <K extends keyof NotificationSettings>(key: K, value: NotificationSettings[K]) => {
      setSettings((current) => ({ ...current, [key]: value }))
    },
    []
  )

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }, [])

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true }))
    )
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id))
  }, [])

  const updatePortfolioPage = useCallback((updates: Partial<PortfolioPageData>) => {
    setPortfolioPage((current) => ({ ...current, ...updates }))
  }, [])

  const updatePortfolioService = useCallback((id: number, updates: Partial<PortfolioService>) => {
    setPortfolioPage((current) => ({
      ...current,
      services: current.services.map((service) => (service.id === id ? { ...service, ...updates } : service)),
    }))
  }, [])

  const updatePortfolioImage = useCallback((id: number, updates: Partial<PortfolioImage>) => {
    setPortfolioPage((current) => ({
      ...current,
      images: current.images.map((image) => (image.id === id ? { ...image, ...updates } : image)),
    }))
  }, [])

  const updatePortfolioReview = useCallback((id: number, updates: Partial<PortfolioReview>) => {
    setPortfolioPage((current) => ({
      ...current,
      reviews: current.reviews.map((review) => (review.id === id ? { ...review, ...updates } : review)),
    }))
  }, [])

  const updateWorkingHour = useCallback((day: string, hours: string) => {
    setPortfolioPage((current) => ({
      ...current,
      workingHours: current.workingHours.map((item) => (item.day === day ? { ...item, hours } : item)),
    }))
  }, [])

  const setPortfolioStatus = useCallback((status: PortfolioPageData["status"]) => {
    setPortfolioPage((current) => ({ ...current, status }))
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          timeLabel: getRelativeLabel(notification.timestamp),
        }))
      )
    }, 60000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!settings.realtimeEnabled) return

    const timer = window.setInterval(() => {
      const template = realtimeTemplates[templateIndexRef.current % realtimeTemplates.length]
      templateIndexRef.current += 1

      const isAllowed =
        (template.type === "booking" && settings.bookingAlerts) ||
        (template.type === "client" && settings.clientAlerts) ||
        (template.type === "payment" && settings.paymentAlerts)

      if (!isAllowed) return

      const notification: AppNotification = {
        ...template,
        id: `${Date.now()}`,
        timestamp: Date.now(),
        timeLabel: "Ahora",
        read: false,
      }

      setNotifications((current) => [notification, ...current].slice(0, 20))

      if (settings.desktopAlerts) {
        toast({
          title: notification.title,
          description: notification.description,
        })
      }
    }, 15000)

    return () => window.clearInterval(timer)
  }, [
    settings.bookingAlerts,
    settings.clientAlerts,
    settings.desktopAlerts,
    settings.paymentAlerts,
    settings.realtimeEnabled,
  ])

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      settings,
      portfolioPage,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      removeNotification,
      updateSetting,
      updatePortfolioPage,
      updatePortfolioService,
      updatePortfolioImage,
      updatePortfolioReview,
      updateWorkingHour,
      setPortfolioStatus,
    }),
    [
      markAllNotificationsAsRead,
      markNotificationAsRead,
      notifications,
      portfolioPage,
      removeNotification,
      setPortfolioStatus,
      settings,
      unreadCount,
      updatePortfolioImage,
      updatePortfolioPage,
      updatePortfolioReview,
      updatePortfolioService,
      updateSetting,
      updateWorkingHour,
    ]
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error("useAppState debe usarse dentro de AppStateProvider")
  }

  return context
}
