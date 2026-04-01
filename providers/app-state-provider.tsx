 "use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "@/hooks/use-toast"
import {
  bookingClients,
  bookingTimeSlots,
  initialAppointments,
  initialBookingOffers,
  initialConversations,
  initialMessages,
  type Appointment,
  type BookingClient,
  type BookingConversation,
  type BookingMessage,
  type BookingOffer,
} from "@/lib/booking-data"
import {
  defaultBrandSettings,
  extractPaletteFromImage,
  safePalette,
  type BrandMode,
  type BrandPalette,
  type BrandSettings,
} from "@/lib/brand-theme"
import { initialPortfolioPage, type PortfolioImage, type PortfolioPageData, type PortfolioReview, type PortfolioService } from "@/lib/portfolio-data"

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

interface BookingDraftInput {
  service: string
  date: string
  dateKey: string
  time: string
  endTime: string
  startSlot: number
  duration: number
  price: number
}

interface AppStateContextValue {
  notifications: AppNotification[]
  unreadCount: number
  settings: NotificationSettings
  brandSettings: BrandSettings
  portfolioPage: PortfolioPageData
  clients: BookingClient[]
  conversations: BookingConversation[]
  messages: BookingMessage[]
  bookingOffers: BookingOffer[]
  appointments: Appointment[]
  selectedConversationId: string
  selectedClientId: string | null
  unreadInboxCount: number
  todayAppointments: Appointment[]
  bookingSlots: string[]
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void
  removeNotification: (id: string) => void
  updateSetting: <K extends keyof NotificationSettings>(key: K, value: NotificationSettings[K]) => void
  updateBrandName: (brandName: string) => void
  updateBrandMode: (mode: BrandMode) => void
  updateBrandPalette: (palette: Partial<BrandPalette>) => void
  updateBrandLogo: (logo: string | null) => Promise<void>
  resetBrandSettings: () => void
  selectConversation: (conversationId: string) => void
  selectClient: (clientId: string | null) => void
  sendMessage: (conversationId: string, text: string, sender?: BookingMessage["sender"]) => void
  createBookingOffer: (conversationId: string, draft: BookingDraftInput) => string
  confirmBookingOffer: (offerId: string) => void
  rescheduleBookingOffer: (offerId: string, draft: BookingDraftInput) => void
  cancelBookingOffer: (offerId: string) => void
  markConversationRead: (conversationId: string) => void
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

function nowTimeLabel() {
  return new Intl.DateTimeFormat("es-AR", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date())
}

function buildClientLookup(clients: BookingClient[]) {
  return clients.reduce<Record<string, BookingClient>>((acc, client) => {
    acc[client.id] = client
    return acc
  }, {})
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications)
  const [settings, setSettings] = useState<NotificationSettings>(initialSettings)
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(defaultBrandSettings)
  const [portfolioPage, setPortfolioPage] = useState<PortfolioPageData>(initialPortfolioPage)
  const [clients, setClients] = useState<BookingClient[]>(bookingClients)
  const [conversations, setConversations] = useState<BookingConversation[]>(initialConversations)
  const [messages, setMessages] = useState<BookingMessage[]>(initialMessages)
  const [bookingOffers, setBookingOffers] = useState<BookingOffer[]>(initialBookingOffers)
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [selectedConversationId, setSelectedConversationId] = useState(initialConversations[0]?.id ?? "")
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const templateIndexRef = useRef(0)
  const clientsRef = useRef(clients)

  useEffect(() => {
    clientsRef.current = clients
  }, [clients])

  useEffect(() => {
    const storedBrandSettings = window.localStorage.getItem("cutflow-brand-settings")
    if (!storedBrandSettings) return

    try {
      const parsedBrandSettings = JSON.parse(storedBrandSettings) as BrandSettings
      setBrandSettings({
        ...defaultBrandSettings,
        ...parsedBrandSettings,
        palette: safePalette(parsedBrandSettings.palette ?? defaultBrandSettings.palette),
      })
    } catch {
      window.localStorage.removeItem("cutflow-brand-settings")
    }
  }, [])

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
    window.localStorage.setItem("cutflow-brand-settings", JSON.stringify(brandSettings))
  }, [brandSettings])

  useEffect(() => {
    window.localStorage.setItem("cutflow-portfolio-page", JSON.stringify(portfolioPage))
  }, [portfolioPage])

  useEffect(() => {
    const storedBookings = window.localStorage.getItem("cutflow-booking-state")
    if (!storedBookings) return

    try {
      const parsed = JSON.parse(storedBookings) as {
        clients?: BookingClient[]
        conversations?: BookingConversation[]
        messages?: BookingMessage[]
        bookingOffers?: BookingOffer[]
        appointments?: Appointment[]
        selectedConversationId?: string
        selectedClientId?: string | null
      }
      if (parsed.clients) setClients(parsed.clients)
      if (parsed.conversations) setConversations(parsed.conversations)
      if (parsed.messages) setMessages(parsed.messages)
      if (parsed.bookingOffers) setBookingOffers(parsed.bookingOffers)
      if (parsed.appointments) setAppointments(parsed.appointments)
      if (parsed.selectedConversationId) setSelectedConversationId(parsed.selectedConversationId)
      if ("selectedClientId" in parsed) setSelectedClientId(parsed.selectedClientId ?? null)
    } catch {
      window.localStorage.removeItem("cutflow-booking-state")
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      "cutflow-booking-state",
      JSON.stringify({
        clients,
        conversations,
        messages,
        bookingOffers,
        appointments,
        selectedConversationId,
        selectedClientId,
      })
    )
  }, [appointments, bookingOffers, clients, conversations, messages, selectedClientId, selectedConversationId])

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  )

  const unreadInboxCount = useMemo(
    () => conversations.reduce((sum, conversation) => sum + conversation.unread, 0),
    [conversations]
  )

  const todayAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.dateKey === "2026-03-31" && appointment.status !== "cancelled"),
    [appointments]
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

  const updateBrandName = useCallback((brandName: string) => {
    setBrandSettings((current) => ({ ...current, brandName }))
  }, [])

  const updateBrandMode = useCallback((mode: BrandMode) => {
    setBrandSettings((current) => ({ ...current, mode }))
  }, [])

  const updateBrandPalette = useCallback((palette: Partial<BrandPalette>) => {
    setBrandSettings((current) => ({
      ...current,
      mode: "manual",
      palette: safePalette({ ...current.palette, ...palette }),
    }))
  }, [])

  const updateBrandLogo = useCallback(async (logo: string | null) => {
    if (!logo) {
      setBrandSettings(defaultBrandSettings)
      return
    }

    let extractedPalette = defaultBrandSettings.palette

    try {
      extractedPalette = await extractPaletteFromImage(logo)
    } catch {
      extractedPalette = defaultBrandSettings.palette
    }

    setBrandSettings((current) => ({
      ...current,
      logo,
      palette: current.mode === "auto" ? extractedPalette : current.palette,
    }))
  }, [])

  const resetBrandSettings = useCallback(() => {
    setBrandSettings(defaultBrandSettings)
  }, [])

  const pushNotification = useCallback(
    (type: NotificationType, title: string, description: string) => {
      const isAllowed =
        type === "system" ||
        (type === "booking" && settings.bookingAlerts) ||
        (type === "client" && settings.clientAlerts) ||
        (type === "payment" && settings.paymentAlerts)

      if (!isAllowed) return

      const notification: AppNotification = {
        id: `${Date.now()}-${Math.random()}`,
        type,
        title,
        description,
        timestamp: Date.now(),
        timeLabel: "Ahora",
        read: false,
      }

      setNotifications((current) => [notification, ...current].slice(0, 30))

      if (settings.desktopAlerts) {
        toast({ title, description })
      }
    },
    [settings.bookingAlerts, settings.clientAlerts, settings.desktopAlerts, settings.paymentAlerts]
  )

  const markConversationRead = useCallback((conversationId: string) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, unread: 0 } : conversation
      )
    )
  }, [])

  const selectConversation = useCallback(
    (conversationId: string) => {
      setSelectedConversationId(conversationId)
      setSelectedClientId(
        conversations.find((conversation) => conversation.id === conversationId)?.clientId ?? null
      )
      markConversationRead(conversationId)
    },
    [conversations, markConversationRead]
  )

  const selectClient = useCallback((clientId: string | null) => {
    setSelectedClientId(clientId)
    if (!clientId) return
    const linkedConversation = conversations.find((conversation) => conversation.clientId === clientId)
    if (linkedConversation) {
      setSelectedConversationId(linkedConversation.id)
      markConversationRead(linkedConversation.id)
    }
  }, [conversations, markConversationRead])

  const appendConversationMessage = useCallback((conversationId: string, lastMessage: string) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, lastMessage, time: nowTimeLabel() }
          : conversation
      )
    )
  }, [])

  const sendMessage = useCallback(
    (conversationId: string, text: string, sender: BookingMessage["sender"] = "barber") => {
      const trimmed = text.trim()
      if (!trimmed) return

      const message: BookingMessage = {
        id: `msg-${Date.now()}`,
        conversationId,
        text: trimmed,
        sender,
        time: nowTimeLabel(),
        status: sender === "client" ? "delivered" : "read",
        type: "text",
      }

      setMessages((current) => [...current, message])
      appendConversationMessage(conversationId, trimmed)

      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === conversationId
            ? { ...conversation, unread: sender === "client" ? conversation.unread + 1 : 0, time: message.time, lastMessage: trimmed }
            : conversation
        )
      )

      if (sender === "client") {
        const client = clientsRef.current.find((item) => item.id === conversations.find((c) => c.id === conversationId)?.clientId)
        pushNotification("booking", "Nueva respuesta en Reservas", `${client?.name ?? "Un cliente"} envio un nuevo mensaje.`)
      }
    },
    [appendConversationMessage, conversations, pushNotification]
  )

  const createBookingOffer = useCallback(
    (conversationId: string, draft: BookingDraftInput) => {
      const conversation = conversations.find((item) => item.id === conversationId)
      if (!conversation) return ""

      const offerId = `offer-${Date.now()}`
      const offer: BookingOffer = {
        id: offerId,
        conversationId,
        clientId: conversation.clientId,
        barber: "Marcus",
        status: "pending",
        ...draft,
      }

      const assistantMessage: BookingMessage = {
        id: `msg-${Date.now()}-offer`,
        conversationId,
        text: "Te propuse una nueva reserva. Revisa los datos y confirma si te sirve.",
        sender: "bot",
        time: nowTimeLabel(),
        type: "booking",
        offerId,
      }

      setBookingOffers((current) => [...current.filter((item) => item.conversationId !== conversationId || item.status !== "pending"), offer])
      setMessages((current) => [...current, assistantMessage])
      appendConversationMessage(conversationId, `${draft.service} - ${draft.time}`)
      pushNotification("booking", "Nueva propuesta de turno", `${clientsRef.current.find((client) => client.id === conversation.clientId)?.name ?? "Cliente"} recibio una propuesta para ${draft.date}.`)
      return offerId
    },
    [appendConversationMessage, conversations, pushNotification]
  )

  const confirmBookingOffer = useCallback(
    (offerId: string) => {
      const offer = bookingOffers.find((item) => item.id === offerId)
      if (!offer) return

      setBookingOffers((current) =>
        current.map((item) => (item.id === offerId ? { ...item, status: "accepted" } : item))
      )

      setAppointments((current) => {
        const exists = current.some((appointment) => appointment.id === offerId)
        if (exists) return current
        return [
          ...current,
          {
            id: offerId,
            clientId: offer.clientId,
            barber: offer.barber,
            dateLabel: offer.date,
            dateKey: offer.dateKey,
            startSlot: offer.startSlot,
            duration: offer.duration,
            time: offer.time,
            endTime: offer.endTime,
            service: offer.service,
            price: offer.price,
            status: "confirmed",
          },
        ]
      })

      setMessages((current) => [
        ...current,
        {
          id: `msg-${Date.now()}-confirm`,
          conversationId: offer.conversationId,
          text: "Turno confirmado. Ya quedo sincronizado con la agenda.",
          sender: "bot",
          time: nowTimeLabel(),
          type: "confirmation",
          offerId,
        },
      ])

      setClients((current) =>
        current.map((client) =>
          client.id === offer.clientId
            ? {
                ...client,
                preferredService: offer.service,
                nextSuggested: offer.date,
                lastVisit: "Reserva futura",
              }
            : client
        )
      )

      appendConversationMessage(offer.conversationId, "Turno confirmado")
      pushNotification("booking", "Reserva confirmada", `${clientsRef.current.find((client) => client.id === offer.clientId)?.name ?? "Cliente"} confirmo ${offer.service} para ${offer.date}.`)
    },
    [appendConversationMessage, bookingOffers, pushNotification]
  )

  const rescheduleBookingOffer = useCallback(
    (offerId: string, draft: BookingDraftInput) => {
      const offer = bookingOffers.find((item) => item.id === offerId)
      if (!offer) return

      setBookingOffers((current) =>
        current.map((item) =>
          item.id === offerId ? { ...item, ...draft, status: "rescheduled" } : item
        )
      )

      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === offerId
            ? {
                ...appointment,
                dateLabel: draft.date,
                dateKey: draft.dateKey,
                startSlot: draft.startSlot,
                duration: draft.duration,
                time: draft.time,
                endTime: draft.endTime,
                service: draft.service,
                price: draft.price,
              }
            : appointment
        )
      )

      setMessages((current) => [
        ...current,
        {
          id: `msg-${Date.now()}-reschedule`,
          conversationId: offer.conversationId,
          text: "La propuesta fue reprogramada con nuevos datos.",
          sender: "bot",
          time: nowTimeLabel(),
          type: "booking",
          offerId,
        },
      ])

      appendConversationMessage(offer.conversationId, `Reprogramado para ${draft.time}`)
      pushNotification("booking", "Reserva reprogramada", `${clientsRef.current.find((client) => client.id === offer.clientId)?.name ?? "Cliente"} ahora figura para ${draft.date}.`)
    },
    [appendConversationMessage, bookingOffers, pushNotification]
  )

  const cancelBookingOffer = useCallback(
    (offerId: string) => {
      const offer = bookingOffers.find((item) => item.id === offerId)
      if (!offer) return

      setBookingOffers((current) =>
        current.map((item) => (item.id === offerId ? { ...item, status: "cancelled" } : item))
      )
      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === offerId ? { ...appointment, status: "cancelled" } : appointment
        )
      )
      setMessages((current) => [
        ...current,
        {
          id: `msg-${Date.now()}-cancel`,
          conversationId: offer.conversationId,
          text: "La reserva fue cancelada.",
          sender: "bot",
          time: nowTimeLabel(),
          type: "booking",
          offerId,
        },
      ])
      appendConversationMessage(offer.conversationId, "Reserva cancelada")
      pushNotification("booking", "Reserva cancelada", `${clientsRef.current.find((client) => client.id === offer.clientId)?.name ?? "Cliente"} ya no tiene ese turno activo.`)
    },
    [appendConversationMessage, bookingOffers, pushNotification]
  )

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

      pushNotification(template.type, template.title, template.description)
    }, 15000)

    return () => window.clearInterval(timer)
  }, [
    settings.bookingAlerts,
    settings.clientAlerts,
    settings.desktopAlerts,
    settings.paymentAlerts,
    settings.realtimeEnabled,
    pushNotification,
  ])

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      settings,
      brandSettings,
      portfolioPage,
      clients,
      conversations,
      messages,
      bookingOffers,
      appointments,
      selectedConversationId,
      selectedClientId,
      unreadInboxCount,
      todayAppointments,
      bookingSlots: bookingTimeSlots,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      removeNotification,
      updateSetting,
      updateBrandName,
      updateBrandMode,
      updateBrandPalette,
      updateBrandLogo,
      resetBrandSettings,
      selectConversation,
      selectClient,
      sendMessage,
      createBookingOffer,
      confirmBookingOffer,
      rescheduleBookingOffer,
      cancelBookingOffer,
      markConversationRead,
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
      markConversationRead,
      notifications,
      brandSettings,
      bookingOffers,
      appointments,
      cancelBookingOffer,
      clients,
      confirmBookingOffer,
      conversations,
      createBookingOffer,
      messages,
      portfolioPage,
      removeNotification,
      resetBrandSettings,
      rescheduleBookingOffer,
      selectClient,
      selectConversation,
      selectedClientId,
      selectedConversationId,
      sendMessage,
      setPortfolioStatus,
      settings,
      todayAppointments,
      unreadCount,
      unreadInboxCount,
      updateBrandLogo,
      updateBrandMode,
      updateBrandName,
      updateBrandPalette,
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
