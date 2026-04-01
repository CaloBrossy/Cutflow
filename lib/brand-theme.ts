export type BrandMode = "auto" | "manual"
export type ThemeMode = "light" | "dark"

export interface BrandPalette {
  primary: string
  accent: string
  surface: string
  sidebar: string
}

export interface BrandSettings {
  brandName: string
  logo: string | null
  mode: BrandMode
  palette: BrandPalette
}

const defaultPalette: BrandPalette = {
  primary: "#27c599",
  accent: "#6d7ef7",
  surface: "#f4f7fb",
  sidebar: "#eef3f7",
}

export const defaultBrandSettings: BrandSettings = {
  brandName: "Flowcut",
  logo: null,
  mode: "auto",
  palette: defaultPalette,
}

export function hasActiveBrandTheme(settings: BrandSettings) {
  return settings.logo !== null || settings.mode === "manual"
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "")
  const value = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized
  const int = Number.parseInt(value, 16)
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  }
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0")).join("")}`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function mix(hexA: string, hexB: string, amount: number) {
  const a = hexToRgb(hexA)
  const b = hexToRgb(hexB)
  return rgbToHex(
    a.r + (b.r - a.r) * amount,
    a.g + (b.g - a.g) * amount,
    a.b + (b.b - a.b) * amount
  )
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const values = [r, g, b].map((channel) => {
    const normalized = channel / 255
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
  })
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722
}

function contrastRatio(a: string, b: string) {
  const first = luminance(a)
  const second = luminance(b)
  const lighter = Math.max(first, second)
  const darker = Math.min(first, second)
  return (lighter + 0.05) / (darker + 0.05)
}

export function ensureAccessibleForeground(background: string) {
  const whiteContrast = contrastRatio(background, "#ffffff")
  const darkContrast = contrastRatio(background, "#0f172a")
  return whiteContrast >= darkContrast ? "#ffffff" : "#0f172a"
}

export function normalizePalette(palette: Partial<BrandPalette>): BrandPalette {
  const primary = palette.primary ?? defaultPalette.primary
  const accent = palette.accent ?? mix(primary, "#6d7ef7", 0.35)
  const surface = palette.surface ?? mix(primary, "#ffffff", 0.9)
  const sidebar = palette.sidebar ?? mix(primary, "#edf2f7", 0.82)

  return {
    primary,
    accent,
    surface,
    sidebar,
  }
}

function colorDistance(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }) {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2)
}

export async function extractPaletteFromImage(imageSrc: string): Promise<BrandPalette> {
  const img = new Image()
  img.crossOrigin = "anonymous"
  img.src = imageSrc

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(new Error("No se pudo leer la imagen"))
  })

  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  if (!context) return defaultPalette

  const maxSize = 48
  const scale = Math.min(maxSize / img.width, maxSize / img.height, 1)
  canvas.width = Math.max(1, Math.round(img.width * scale))
  canvas.height = Math.max(1, Math.round(img.height * scale))
  context.drawImage(img, 0, 0, canvas.width, canvas.height)

  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
  const buckets = new Map<string, { r: number; g: number; b: number; count: number }>()

  for (let index = 0; index < pixels.length; index += 16) {
    const alpha = pixels[index + 3]
    if (alpha < 180) continue
    const r = Math.round(pixels[index] / 32) * 32
    const g = Math.round(pixels[index + 1] / 32) * 32
    const b = Math.round(pixels[index + 2] / 32) * 32
    const key = `${r}-${g}-${b}`
    const bucket = buckets.get(key)
    if (bucket) {
      bucket.count += 1
    } else {
      buckets.set(key, { r, g, b, count: 1 })
    }
  }

  const ranked = [...buckets.values()]
    .filter((bucket) => {
      const avg = (bucket.r + bucket.g + bucket.b) / 3
      return avg > 20 && avg < 245
    })
    .sort((a, b) => b.count - a.count)

  const primaryBucket = ranked[0] ?? hexToRgb(defaultPalette.primary)
  const accentBucket =
    ranked.find((bucket) => colorDistance(bucket, primaryBucket) > 90) ??
    hexToRgb(mix(rgbToHex(primaryBucket.r, primaryBucket.g, primaryBucket.b), "#6d7ef7", 0.35))

  return normalizePalette({
    primary: rgbToHex(primaryBucket.r, primaryBucket.g, primaryBucket.b),
    accent: rgbToHex(accentBucket.r, accentBucket.g, accentBucket.b),
  })
}

export function buildThemeVariables(palette: BrandPalette, mode: ThemeMode) {
  const normalized = normalizePalette(palette)
  const dark = mode === "dark"
  const primary = normalized.primary
  const accent = normalized.accent
  const surface = dark ? mix(primary, "#0f172a", 0.88) : normalized.surface
  const sidebar = dark ? mix(primary, "#020617", 0.9) : normalized.sidebar
  const background = dark ? mix(primary, "#020617", 0.94) : "#fafafa"
  const card = dark ? mix(primary, "#111827", 0.88) : "#ffffff"
  const secondary = dark ? mix(primary, "#1f2937", 0.82) : mix(primary, "#ffffff", 0.92)
  const muted = dark ? mix(primary, "#0f172a", 0.8) : mix(primary, "#ffffff", 0.94)
  const border = dark ? mix(primary, "#334155", 0.8) : mix(primary, "#cbd5e1", 0.7)
  const text = dark ? "#f8fafc" : "#0f172a"
  const mutedText = dark ? "#cbd5e1" : "#475569"
  const primaryForeground = ensureAccessibleForeground(primary)
  const accentForeground = ensureAccessibleForeground(accent)

  return {
    "--background": background,
    "--foreground": text,
    "--card": card,
    "--card-foreground": text,
    "--popover": card,
    "--popover-foreground": text,
    "--primary": primary,
    "--primary-foreground": primaryForeground,
    "--secondary": secondary,
    "--secondary-foreground": text,
    "--muted": muted,
    "--muted-foreground": mutedText,
    "--accent": accent,
    "--accent-foreground": accentForeground,
    "--border": border,
    "--input": border,
    "--ring": primary,
    "--chart-1": primary,
    "--chart-2": accent,
    "--chart-3": mix(accent, "#ec4899", 0.35),
    "--chart-4": mix(primary, "#f59e0b", 0.4),
    "--chart-5": mix(primary, "#ef4444", 0.45),
    "--sidebar": sidebar,
    "--sidebar-foreground": text,
    "--sidebar-primary": primary,
    "--sidebar-primary-foreground": primaryForeground,
    "--sidebar-accent": surface,
    "--sidebar-accent-foreground": text,
    "--sidebar-border": border,
    "--sidebar-ring": primary,
  }
}

export function safePalette(palette: Partial<BrandPalette>) {
  return normalizePalette(palette)
}
