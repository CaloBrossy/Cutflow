'use client'

import * as React from 'react'
import { buildThemeVariables, hasActiveBrandTheme } from '@/lib/brand-theme'
import { useAppState } from '@/providers/app-state-provider'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>('dark')
  const [mounted, setMounted] = React.useState(false)
  const { brandSettings } = useAppState()

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem('cutflow-theme')
    const nextTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark'
    setThemeState(nextTheme)
    setMounted(true)
  }, [])

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('cutflow-theme', theme)
  }, [theme])

  React.useEffect(() => {
    if (!mounted) return
    const themeKeys = [
      "--background",
      "--foreground",
      "--card",
      "--card-foreground",
      "--popover",
      "--popover-foreground",
      "--primary",
      "--primary-foreground",
      "--secondary",
      "--secondary-foreground",
      "--muted",
      "--muted-foreground",
      "--accent",
      "--accent-foreground",
      "--border",
      "--input",
      "--ring",
      "--chart-1",
      "--chart-2",
      "--chart-3",
      "--chart-4",
      "--chart-5",
      "--sidebar",
      "--sidebar-foreground",
      "--sidebar-primary",
      "--sidebar-primary-foreground",
      "--sidebar-accent",
      "--sidebar-accent-foreground",
      "--sidebar-border",
      "--sidebar-ring",
    ]

    if (!hasActiveBrandTheme(brandSettings)) {
      themeKeys.forEach((key) => document.documentElement.style.removeProperty(key))
      return
    }

    const variables = buildThemeVariables(brandSettings.palette, theme)
    Object.entries(variables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [brandSettings, mounted, theme])

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme: theme,
      setTheme: (nextTheme: Theme) => setThemeState(nextTheme),
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider')
  }

  return context
}
