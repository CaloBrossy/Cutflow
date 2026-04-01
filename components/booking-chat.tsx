"use client"

import { useMemo, useState } from "react"
import { Bot, Calendar, Check, CheckCheck, Clock, MessageSquare, MoreVertical, Phone, Search, Send, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useAppState } from "@/providers/app-state-provider"

export function BookingChat() {
  const {
    clients,
    conversations,
    messages,
    bookingOffers,
    bookingSlots,
    selectedConversationId,
    selectConversation,
    sendMessage,
    createBookingOffer,
    confirmBookingOffer,
    rescheduleBookingOffer,
    cancelBookingOffer,
  } = useAppState()
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [draftService, setDraftService] = useState("Corte clasico")
  const [draftDate, setDraftDate] = useState("Viernes, 3 de abril de 2026")
  const [draftDateKey, setDraftDateKey] = useState("2026-04-03")
  const [draftSlot, setDraftSlot] = useState("11:00 AM")
  const [draftPrice, setDraftPrice] = useState("35")

  const clientMap = useMemo(() => Object.fromEntries(clients.map((client) => [client.id, client])), [clients])
  const selectedConversation = conversations.find((conversation) => conversation.id === selectedConversationId) ?? conversations[0]
  const threadMessages = messages.filter((message) => message.conversationId === selectedConversation?.id)
  const filteredConversations = conversations.filter((conversation) =>
    clientMap[conversation.clientId]?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const buildDraft = () => {
    const slotIndex = bookingSlots.indexOf(draftSlot)
    const nextSlot = bookingSlots[Math.min(slotIndex + 1, bookingSlots.length - 1)] ?? draftSlot
    return {
      service: draftService,
      date: draftDate,
      dateKey: draftDateKey,
      time: draftSlot,
      endTime: nextSlot,
      startSlot: Math.max(slotIndex, 0),
      duration: 1,
      price: Number(draftPrice) || 0,
    }
  }

  const handleSendMessage = () => {
    if (!selectedConversation || !newMessage.trim()) return
    sendMessage(selectedConversation.id, newMessage)
    setNewMessage("")
  }

  const handleCreateOffer = () => {
    if (!selectedConversation) return
    createBookingOffer(selectedConversation.id, buildDraft())
  }

  return (
    <div className="flex min-h-full flex-col md:h-full">
      <div className="border-b border-border p-4 md:p-6">
        <h1 className="text-2xl font-bold text-foreground">Reservas</h1>
        <p className="mt-1 text-muted-foreground">Inbox real conectado con agenda, clientes y notificaciones</p>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-full flex-col border-r border-border md:w-80">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar conversaciones..." className="pl-10" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => {
              const client = clientMap[conversation.clientId]
              if (!client) return null
              return (
                <button
                  key={conversation.id}
                  onClick={() => selectConversation(conversation.id)}
                  className={cn("flex w-full items-center gap-3 border-b border-border p-4 text-left transition-colors", selectedConversation?.id === conversation.id ? "bg-primary/5" : "hover:bg-muted/50")}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback>{client.initials}</AvatarFallback>
                    </Avatar>
                    {conversation.online && <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-green-500" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-foreground">{client.name}</p>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-muted-foreground">{conversation.lastMessage}</p>
                      {!!conversation.unread && <Badge className="bg-primary text-primary-foreground">{conversation.unread}</Badge>}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="hidden flex-1 flex-col md:flex">
          {selectedConversation ? (
            <>
              <div className="flex items-center justify-between border-b border-border p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={clientMap[selectedConversation.clientId]?.avatar} />
                    <AvatarFallback>{clientMap[selectedConversation.clientId]?.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{clientMap[selectedConversation.clientId]?.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedConversation.online ? "En linea" : "Sin conexion ahora"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
                </div>
              </div>

              <div className="grid gap-4 border-b border-border bg-card p-4 lg:grid-cols-4">
                <Input value={draftService} onChange={(e) => setDraftService(e.target.value)} placeholder="Servicio" />
                <Input value={draftDate} onChange={(e) => setDraftDate(e.target.value)} placeholder="Fecha visible" />
                <select value={draftSlot} onChange={(e) => setDraftSlot(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                  {bookingSlots.map((slot) => <option key={slot}>{slot}</option>)}
                </select>
                <div className="flex gap-2">
                  <Input value={draftPrice} onChange={(e) => setDraftPrice(e.target.value)} placeholder="Precio" />
                  <Button onClick={handleCreateOffer} className="shrink-0">Proponer</Button>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto bg-muted/20 p-4">
                {threadMessages.map((message) => {
                  const offer = message.offerId ? bookingOffers.find((item) => item.id === message.offerId) : undefined
                  return (
                    <div key={message.id} className={cn("flex", message.sender === "client" ? "justify-start" : "justify-end")}>
                      {message.type === "booking" && offer ? (
                        <Card className="max-w-sm border-primary/30 bg-card">
                          <CardContent className="p-4">
                            <div className="mb-3 flex items-center gap-2">
                              <Bot className="h-4 w-4 text-primary" />
                              <span className="text-xs font-medium text-primary">Oferta de turno</span>
                              <Badge variant="outline">{offer.status}</Badge>
                            </div>
                            <p className="mb-3 text-sm text-foreground">{message.text}</p>
                            <div className="space-y-2 rounded-lg bg-muted/50 p-3">
                              <div className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-muted-foreground" />{offer.date}</div>
                              <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-muted-foreground" />{offer.time} - {offer.endTime}</div>
                              <div className="flex items-center justify-between border-t border-border pt-2 text-sm">
                                <span>{offer.service}</span>
                                <span className="font-semibold text-primary">${offer.price}</span>
                              </div>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1" onClick={() => rescheduleBookingOffer(offer.id, buildDraft())}>Reprogramar</Button>
                              <Button size="sm" variant="outline" className="flex-1" onClick={() => cancelBookingOffer(offer.id)}>Cancelar</Button>
                              <Button size="sm" className="flex-1" onClick={() => confirmBookingOffer(offer.id)}>Confirmar</Button>
                            </div>
                            <span className="mt-2 block text-right text-xs text-muted-foreground">{message.time}</span>
                          </CardContent>
                        </Card>
                      ) : message.type === "confirmation" ? (
                        <Card className="max-w-sm border-green-500/30 bg-green-500/10">
                          <CardContent className="p-4">
                            <div className="mb-2 flex items-center gap-2">
                              <CheckCheck className="h-4 w-4 text-green-600" />
                              <span className="text-xs font-medium text-green-600">Confirmado</span>
                            </div>
                            <p className="text-sm text-foreground">{message.text}</p>
                            <span className="mt-2 block text-right text-xs text-muted-foreground">{message.time}</span>
                          </CardContent>
                        </Card>
                      ) : (
                        <div className={cn("max-w-xs rounded-2xl px-4 py-2.5 lg:max-w-md", message.sender === "client" ? "rounded-tl-sm bg-muted" : "rounded-tr-sm bg-primary text-primary-foreground")}>
                          <p className="text-sm">{message.text}</p>
                          <div className="mt-1 flex items-center justify-end gap-1">
                            <span className={cn("text-xs", message.sender === "client" ? "text-muted-foreground" : "text-primary-foreground/70")}>{message.time}</span>
                            {message.sender === "barber" && message.status && (message.status === "read" ? <CheckCheck className="h-4 w-4 text-primary-foreground/70" /> : <Check className="h-4 w-4 text-primary-foreground/50" />)}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="border-t border-border bg-card p-4">
                <div className="flex items-center gap-2">
                  <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} placeholder="Escribe un mensaje..." className="flex-1 bg-muted" />
                  <Button size="icon" onClick={handleSendMessage}><Send className="h-5 w-5" /></Button>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="flex flex-1 items-center justify-center p-8 text-center md:hidden">
          <div>
            <MessageSquare className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">Abre una conversacion para gestionar la reserva</p>
          </div>
        </div>
      </div>
    </div>
  )
}
