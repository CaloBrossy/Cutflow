"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { Calendar } from "@/components/calendar"
import { ClientProfile } from "@/components/client-profile"
import { BookingChat } from "@/components/booking-chat"
import { Analytics } from "@/components/analytics"
import { NotificationsCenter } from "@/components/notifications-center"
import { SettingsView } from "@/components/settings-view"
import { PortfolioManager } from "@/components/portfolio-manager"

export type PageView =
  | "dashboard"
  | "calendar"
  | "clients"
  | "chat"
  | "analytics"
  | "portfolio"
  | "notifications"
  | "settings"

function DashboardContent() {
  const searchParams = useSearchParams()
  const [currentView, setCurrentView] = useState<PageView>("dashboard")

  useEffect(() => {
    const requestedView = searchParams.get("view")
    if (!requestedView) return

    const allowedViews: PageView[] = [
      "dashboard",
      "calendar",
      "clients",
      "chat",
      "analytics",
      "portfolio",
      "notifications",
      "settings",
    ]

    if (allowedViews.includes(requestedView as PageView)) {
      setCurrentView(requestedView as PageView)
    }
  }, [searchParams])

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
        return <PortfolioManager />
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
      <main className="min-w-0 flex-1 md:overflow-y-auto">{renderView()}</main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <DashboardContent />
    </Suspense>
  )
}
