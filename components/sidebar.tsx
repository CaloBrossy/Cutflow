"use client"

import { useState } from "react"
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Globe, 
  Settings,
  Scissors,
  Bell,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { PageView } from "@/app/dashboard/page"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AnimatedNavIcon } from "@/components/animated-nav-icon"
import { useAppState } from "@/providers/app-state-provider"

interface SidebarProps {
  currentView: PageView
  onNavigate: (view: PageView) => void
}

const navItems = [
  { id: "dashboard" as PageView, label: "Panel", icon: LayoutDashboard, variant: "dashboard" as const },
  { id: "calendar" as PageView, label: "Agenda", icon: Calendar, variant: "calendar" as const },
  { id: "clients" as PageView, label: "Clientes", icon: Users, variant: "clients" as const },
  { id: "chat" as PageView, label: "Reservas", icon: MessageSquare, variant: "chat" as const },
  { id: "analytics" as PageView, label: "Analiticas", icon: BarChart3, variant: "analytics" as const },
  { id: "portfolio" as PageView, label: "Mi pagina", icon: Globe, variant: "portfolio" as const },
]

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<PageView | null>(null)
  const { unreadCount, unreadInboxCount, settings, brandSettings, updateSetting } = useAppState()
  const isCompact = settings.compactSidebar

  return (
    <aside
      className={cn(
        "hidden md:flex md:h-screen md:flex-shrink-0 md:flex-col md:overflow-y-auto border-r border-border bg-sidebar transition-all duration-300",
        isCompact ? "md:w-20" : "md:w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center border-b border-sidebar-border", isCompact ? "justify-center px-3 py-5" : "gap-3 px-6 py-5")}>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary overflow-hidden">
          {brandSettings.logo ? (
            <img src={brandSettings.logo} alt={brandSettings.brandName} className="w-full h-full object-cover" />
          ) : (
            <Scissors className="w-5 h-5 text-primary-foreground" />
          )}
        </div>
        {!isCompact && (
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground tracking-tight">{brandSettings.brandName || "Flowcut"}</h1>
            <p className="text-xs text-muted-foreground">Suite Pro</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={cn(
                "group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-primary" 
                  : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <AnimatedNavIcon
                icon={Icon}
                variant={item.variant}
                isActive={isActive}
                isHovered={hoveredItem === item.id}
              />
              {!isCompact && <span className="flex-1 text-left">{item.label}</span>}
              {item.id === "chat" && unreadInboxCount > 0 && !isCompact && (
                <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
                  {unreadInboxCount}
                </Badge>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        <button
          onClick={() => onNavigate("notifications")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            currentView === "notifications"
              ? "bg-sidebar-accent text-sidebar-primary"
              : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
        >
          <Bell className="w-5 h-5" />
          {!isCompact && <span>Notificaciones</span>}
          {unreadCount > 0 && !isCompact && (
            <Badge variant="secondary" className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 ml-auto">
              {unreadCount}
            </Badge>
          )}
        </button>
        <button
          onClick={() => onNavigate("settings")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            currentView === "settings"
              ? "bg-sidebar-accent text-sidebar-primary"
              : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
        >
          <Settings className="w-5 h-5" />
          {!isCompact && <span>Configuracion</span>}
        </button>
        <button
          onClick={() => updateSetting("compactSidebar", !isCompact)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          {isCompact ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          {!isCompact && <span>Ocultar sidebar</span>}
        </button>
      </div>

      {/* User profile */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <div className={cn("flex px-3 py-2", isCompact ? "justify-center" : "items-center gap-3")}>
          <Avatar className="w-9 h-9 border-2 border-primary/30">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
          {!isCompact && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Marcus Johnson</p>
                <p className="text-xs text-muted-foreground truncate">Elite Cuts Studio</p>
              </div>
              <button className="p-1.5 rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
