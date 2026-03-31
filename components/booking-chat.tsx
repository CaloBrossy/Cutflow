"use client"

import { useState } from "react"
import { 
  Search, 
  Send,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
  Clock,
  Calendar,
  Image,
  Paperclip,
  Smile,
  Mic,
  Bot,
  User
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  text: string
  sender: "client" | "barber" | "bot"
  time: string
  status?: "sent" | "delivered" | "read"
  type?: "text" | "booking" | "confirmation" | "reminder"
  bookingDetails?: {
    service: string
    date: string
    time: string
    price: number
  }
}

const conversations = [
  {
    id: 1,
    client: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    initials: "JW",
    lastMessage: "Perfecto, nos vemos entonces!",
    time: "10:32 AM",
    unread: 0,
    online: true
  },
  {
    id: 2,
    client: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    initials: "MB",
    lastMessage: "Puedo reprogramar para el viernes?",
    time: "9:45 AM",
    unread: 2,
    online: false
  },
  {
    id: 3,
    client: "Kevin Martinez",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    initials: "KM",
    lastMessage: "Reserva confirmada para las 2:00 PM",
    time: "Ayer",
    unread: 0,
    online: true
  },
  {
    id: 4,
    client: "David Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    initials: "DC",
    lastMessage: "Podes hacer el mismo diseno?",
    time: "Ayer",
    unread: 1,
    online: false
  },
  {
    id: 5,
    client: "Anthony Davis",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
    initials: "AD",
    lastMessage: "Gracias por el recordatorio!",
    time: "29 Mar",
    unread: 0,
    online: false
  },
]

const messagesData: Message[] = [
  {
    id: 1,
    text: "Hola Marcus! Quiero reservar un corte para esta semana",
    sender: "client",
    time: "9:15 AM",
    status: "read",
    type: "text"
  },
  {
    id: 2,
    text: "Hola James! Que bueno saber de vos. Tengo lugares el martes y el jueves. Que te queda mejor?",
    sender: "barber",
    time: "9:18 AM",
    status: "read",
    type: "text"
  },
  {
    id: 3,
    text: "El martes estaria perfecto. Que horarios tenes?",
    sender: "client",
    time: "9:20 AM",
    status: "read",
    type: "text"
  },
  {
    id: 4,
    text: "Tengo disponible 9:00 AM, 11:00 AM o 2:30 PM. Cual te queda mejor?",
    sender: "barber",
    time: "9:22 AM",
    status: "read",
    type: "text"
  },
  {
    id: 5,
    text: "9:00 AM me viene genial!",
    sender: "client",
    time: "9:25 AM",
    status: "read",
    type: "text"
  },
  {
    id: 6,
    text: "Te cree una reserva. Por favor confirma los datos de abajo:",
    sender: "bot",
    time: "9:26 AM",
    type: "booking",
    bookingDetails: {
      service: "Fade + Recorte de barba",
      date: "Martes, 31 de marzo de 2026",
      time: "9:00 AM - 9:45 AM",
      price: 45
    }
  },
  {
    id: 7,
    text: "Se ve perfecto! Confirmo la reserva.",
    sender: "client",
    time: "9:28 AM",
    status: "read",
    type: "text"
  },
  {
    id: 8,
    text: "Tu turno fue confirmado! Se enviara un recordatorio 24 horas antes.",
    sender: "bot",
    time: "9:28 AM",
    type: "confirmation"
  },
  {
    id: 9,
    text: "Perfecto, nos vemos entonces!",
    sender: "client",
    time: "10:32 AM",
    status: "read",
    type: "text"
  },
]

export function BookingChat() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messages, setMessages] = useState<Message[]>(messagesData)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter(conv =>
    conv.client.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "barber",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent",
      type: "text"
    }
    
    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex min-h-full flex-col md:h-full">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Reservas</h1>
        <p className="text-muted-foreground mt-1">Conversaciones de reservas estilo WhatsApp</p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversation List */}
        <div className="w-full md:w-80 border-r border-border flex flex-col">
          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar conversaciones..." 
                className="pl-10 bg-card border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Conversation Cards */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 border-b border-border transition-colors text-left",
                  selectedConversation.id === conv.id 
                    ? "bg-primary/5" 
                    : "hover:bg-muted/50"
                )}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conv.avatar} />
                    <AvatarFallback>{conv.initials}</AvatarFallback>
                  </Avatar>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-success border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground truncate">{conv.client}</p>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{conv.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground truncate pr-2">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0 flex-shrink-0">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedConversation.avatar} />
                  <AvatarFallback>{selectedConversation.initials}</AvatarFallback>
                </Avatar>
                {selectedConversation.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-background" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{selectedConversation.client}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.online ? "En linea" : "Visto hace poco"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "client" ? "justify-start" : "justify-end"
                )}
              >
                {message.type === "booking" && message.bookingDetails ? (
                  <Card className="max-w-sm bg-card border-primary/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Bot className="w-4 h-4 text-primary" />
                        <span className="text-xs text-primary font-medium">Asistente de reservas</span>
                      </div>
                      <p className="text-sm text-foreground mb-3">{message.text}</p>
                      <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{message.bookingDetails.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{message.bookingDetails.time}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="text-sm text-foreground">{message.bookingDetails.service}</span>
                          <span className="text-sm font-semibold text-primary">${message.bookingDetails.price}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          Reprogramar
                        </Button>
                        <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                          Confirmar
                        </Button>
                      </div>
                      <span className="text-xs text-muted-foreground mt-2 block text-right">{message.time}</span>
                    </CardContent>
                  </Card>
                ) : message.type === "confirmation" ? (
                  <Card className="max-w-sm bg-success/10 border-success/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCheck className="w-4 h-4 text-success" />
                        <span className="text-xs text-success font-medium">Confirmado</span>
                      </div>
                      <p className="text-sm text-foreground">{message.text}</p>
                      <span className="text-xs text-muted-foreground mt-2 block text-right">{message.time}</span>
                    </CardContent>
                  </Card>
                ) : (
                  <div 
                    className={cn(
                      "max-w-xs lg:max-w-md rounded-2xl px-4 py-2.5",
                      message.sender === "client" 
                        ? "bg-muted rounded-tl-sm" 
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className={cn(
                        "text-xs",
                        message.sender === "client" ? "text-muted-foreground" : "text-primary-foreground/70"
                      )}>
                        {message.time}
                      </span>
                      {message.sender === "barber" && message.status && (
                        message.status === "read" 
                          ? <CheckCheck className="w-4 h-4 text-primary-foreground/70" />
                          : message.status === "delivered"
                          ? <CheckCheck className="w-4 h-4 text-primary-foreground/50" />
                          : <Check className="w-4 h-4 text-primary-foreground/50" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Smile className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input 
                placeholder="Escribe un mensaje..." 
                className="flex-1 bg-muted border-0"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              {newMessage.trim() ? (
                <Button 
                  size="icon" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleSendMessage}
                >
                  <Send className="w-5 h-5" />
                </Button>
              ) : (
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Mic className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: Show message when no chat selected */}
        <div className="flex md:hidden flex-1 items-center justify-center p-8 text-center">
          <div>
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Selecciona una conversacion para empezar a chatear</p>
          </div>
        </div>
      </div>
    </div>
  )
}
