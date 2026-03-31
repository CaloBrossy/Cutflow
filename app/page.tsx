"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { Calendar } from "@/components/calendar"
import { ClientProfile } from "@/components/client-profile"
import { BookingChat } from "@/components/booking-chat"
import { Analytics } from "@/components/analytics"
import { BarberPortfolio } from "@/components/barber-portfolio"
import { NotificationsCenter } from "@/components/notifications-center"
import { SettingsView } from "@/components/settings-view"

export type PageView =
  | "dashboard"
  | "calendar"
  | "clients"
  | "chat"
  | "analytics"
  | "portfolio"
  | "notifications"
  | "settings"

export default function Home() {
  const [currentView, setCurrentView] = useState<PageView>("dashboard")

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentView} />
      case "calendar":
        return <Calendar />
      case "clients":
        return <ClientProfile />
      case "chat":
        return <BookingChat />
      case "analytics":
        return <Analytics />
      case "portfolio":
        return <BarberPortfolio />
      case "notifications":
        return <NotificationsCenter />
      case "settings":
        return <SettingsView />
      default:
        return <Dashboard onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="flex min-h-screen bg-background md:h-screen md:overflow-hidden">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className="min-w-0 flex-1 md:overflow-y-auto">
        {renderView()}
      </main>
    </div>
  )
}
