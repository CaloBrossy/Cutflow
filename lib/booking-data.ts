export type ClientRisk = "low" | "medium" | "high"
export type MessageSender = "client" | "barber" | "bot"
export type MessageStatus = "sent" | "delivered" | "read"
export type MessageType = "text" | "booking" | "confirmation" | "reminder"
export type BookingOfferStatus = "pending" | "accepted" | "rejected" | "rescheduled" | "cancelled"
export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled"

export interface BookingClient {
  id: string
  name: string
  phone: string
  email: string
  avatar: string
  initials: string
  visits: number
  lastVisit: string
  totalSpent: number
  preferredService: string
  loyaltyPoints: number
  riskScore: ClientRisk
  nextSuggested: string
  avgFrequency: string
  notes: string
  photos: string[]
  vip: boolean
}

export interface Appointment {
  id: string
  clientId: string
  barber: string
  dateLabel: string
  dateKey: string
  startSlot: number
  duration: number
  time: string
  endTime: string
  service: string
  price: number
  status: AppointmentStatus
}

export interface BookingOffer {
  id: string
  conversationId: string
  clientId: string
  service: string
  date: string
  dateKey: string
  time: string
  endTime: string
  startSlot: number
  duration: number
  price: number
  barber: string
  status: BookingOfferStatus
}

export interface BookingMessage {
  id: string
  conversationId: string
  text: string
  sender: MessageSender
  time: string
  status?: MessageStatus
  type?: MessageType
  offerId?: string
}

export interface BookingConversation {
  id: string
  clientId: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

export const bookingClients: BookingClient[] = [
  {
    id: "client-1",
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
    ],
    vip: true,
  },
  {
    id: "client-2",
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
    photos: ["https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop"],
    vip: false,
  },
  {
    id: "client-3",
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
    vip: false,
  },
  {
    id: "client-4",
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
    photos: ["https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=200&h=200&fit=crop"],
    vip: true,
  },
  {
    id: "client-5",
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
    photos: ["https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=200&h=200&fit=crop"],
    vip: false,
  },
]

export const initialAppointments: Appointment[] = [
  { id: "apt-1", clientId: "client-1", barber: "Marcus", dateLabel: "Martes, 31 de marzo", dateKey: "2026-03-31", startSlot: 0, duration: 2, time: "9:00 AM", endTime: "9:45 AM", service: "Fade + Barba", price: 45, status: "confirmed" },
  { id: "apt-2", clientId: "client-2", barber: "Marcus", dateLabel: "Martes, 31 de marzo", dateKey: "2026-03-31", startSlot: 2, duration: 1, time: "10:00 AM", endTime: "10:30 AM", service: "Corte clasico", price: 35, status: "confirmed" },
  { id: "apt-3", clientId: "client-4", barber: "Marcus", dateLabel: "Martes, 31 de marzo", dateKey: "2026-03-31", startSlot: 4, duration: 2, time: "11:00 AM", endTime: "11:45 AM", service: "Skin fade + diseno", price: 55, status: "confirmed" },
  { id: "apt-4", clientId: "client-3", barber: "Marcus", dateLabel: "Martes, 31 de marzo", dateKey: "2026-03-31", startSlot: 10, duration: 2, time: "2:00 PM", endTime: "2:45 PM", service: "Fade + Perfilado", price: 50, status: "pending" },
  { id: "apt-5", clientId: "client-5", barber: "Marcus", dateLabel: "Martes, 31 de marzo", dateKey: "2026-03-31", startSlot: 13, duration: 2, time: "3:30 PM", endTime: "4:15 PM", service: "Corte premium + Barba", price: 65, status: "confirmed" },
]

export const initialConversations: BookingConversation[] = [
  { id: "conv-1", clientId: "client-1", lastMessage: "Perfecto, nos vemos entonces!", time: "10:32 AM", unread: 0, online: true },
  { id: "conv-2", clientId: "client-2", lastMessage: "Puedo reprogramar para el viernes?", time: "9:45 AM", unread: 2, online: false },
  { id: "conv-3", clientId: "client-3", lastMessage: "Reserva confirmada para las 2:00 PM", time: "Ayer", unread: 0, online: true },
  { id: "conv-4", clientId: "client-4", lastMessage: "Podes hacer el mismo diseno?", time: "Ayer", unread: 1, online: false },
  { id: "conv-5", clientId: "client-5", lastMessage: "Gracias por el recordatorio!", time: "29 Mar", unread: 0, online: false },
]

export const initialBookingOffers: BookingOffer[] = [
  {
    id: "offer-1",
    conversationId: "conv-1",
    clientId: "client-1",
    service: "Fade + Recorte de barba",
    date: "Martes, 31 de marzo de 2026",
    dateKey: "2026-03-31",
    time: "9:00 AM",
    endTime: "9:45 AM",
    startSlot: 0,
    duration: 2,
    price: 45,
    barber: "Marcus",
    status: "accepted",
  },
  {
    id: "offer-2",
    conversationId: "conv-2",
    clientId: "client-2",
    service: "Corte clasico",
    date: "Viernes, 3 de abril de 2026",
    dateKey: "2026-04-03",
    time: "11:00 AM",
    endTime: "11:30 AM",
    startSlot: 4,
    duration: 1,
    price: 35,
    barber: "Marcus",
    status: "pending",
  },
]

export const initialMessages: BookingMessage[] = [
  { id: "msg-1", conversationId: "conv-1", text: "Hola Marcus! Quiero reservar un corte para esta semana", sender: "client", time: "9:15 AM", status: "read", type: "text" },
  { id: "msg-2", conversationId: "conv-1", text: "Hola James! Que bueno saber de vos. Tengo lugares el martes y el jueves. Que te queda mejor?", sender: "barber", time: "9:18 AM", status: "read", type: "text" },
  { id: "msg-3", conversationId: "conv-1", text: "El martes estaria perfecto. Que horarios tenes?", sender: "client", time: "9:20 AM", status: "read", type: "text" },
  { id: "msg-4", conversationId: "conv-1", text: "Tengo disponible 9:00 AM, 11:00 AM o 2:30 PM. Cual te queda mejor?", sender: "barber", time: "9:22 AM", status: "read", type: "text" },
  { id: "msg-5", conversationId: "conv-1", text: "9:00 AM me viene genial!", sender: "client", time: "9:25 AM", status: "read", type: "text" },
  { id: "msg-6", conversationId: "conv-1", text: "Te cree una reserva. Por favor confirma los datos de abajo:", sender: "bot", time: "9:26 AM", type: "booking", offerId: "offer-1" },
  { id: "msg-7", conversationId: "conv-1", text: "Se ve perfecto! Confirmo la reserva.", sender: "client", time: "9:28 AM", status: "read", type: "text" },
  { id: "msg-8", conversationId: "conv-1", text: "Tu turno fue confirmado! Se enviara un recordatorio 24 horas antes.", sender: "bot", time: "9:28 AM", type: "confirmation", offerId: "offer-1" },
  { id: "msg-9", conversationId: "conv-1", text: "Perfecto, nos vemos entonces!", sender: "client", time: "10:32 AM", status: "read", type: "text" },
  { id: "msg-10", conversationId: "conv-2", text: "Puedo reprogramar para el viernes?", sender: "client", time: "9:45 AM", status: "read", type: "text" },
  { id: "msg-11", conversationId: "conv-2", text: "Claro, te propongo viernes 11:00 AM. Te sirve?", sender: "barber", time: "9:47 AM", status: "delivered", type: "booking", offerId: "offer-2" },
  { id: "msg-12", conversationId: "conv-3", text: "Reserva confirmada para las 2:00 PM", sender: "bot", time: "Ayer", type: "confirmation" },
  { id: "msg-13", conversationId: "conv-4", text: "Podes hacer el mismo diseno?", sender: "client", time: "Ayer", status: "read", type: "text" },
  { id: "msg-14", conversationId: "conv-5", text: "Gracias por el recordatorio!", sender: "client", time: "29 Mar", status: "read", type: "text" },
]

export const bookingTimeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM",
]
