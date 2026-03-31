export type PortfolioStatus = "draft" | "published"

export interface PortfolioImage {
  id: number
  url: string
  likes: number
  service: string
  featured: boolean
}

export interface PortfolioService {
  id: number
  name: string
  price: number
  duration: string
}

export interface PortfolioReview {
  id: number
  author: string
  avatar: string
  rating: number
  text: string
  date: string
}

export interface WorkingHour {
  day: string
  hours: string
}

export interface PortfolioSocialLinks {
  instagram: string
  twitter: string
  phone: string
  whatsapp: string
}

export interface PortfolioSeo {
  title: string
  description: string
}

export interface PortfolioAnalytics {
  views: number
  clicks: number
  conversionRate: string
}

export interface PortfolioPageData {
  slug: string
  status: PortfolioStatus
  verified: boolean
  displayName: string
  businessName: string
  location: string
  coverImage: string
  avatar: string
  initials: string
  rating: number
  reviewsCount: number
  clientsCountLabel: string
  bio: string
  ctaText: string
  ctaSubtitle: string
  socialLinks: PortfolioSocialLinks
  seo: PortfolioSeo
  analytics: PortfolioAnalytics
  images: PortfolioImage[]
  services: PortfolioService[]
  reviews: PortfolioReview[]
  workingHours: WorkingHour[]
}

export const initialPortfolioPage: PortfolioPageData = {
  slug: "marcus-johnson",
  status: "published",
  verified: true,
  displayName: "Marcus Johnson",
  businessName: "Elite Cuts Studio",
  location: "Centro de Los Angeles, CA",
  coverImage: "linear-gradient(135deg, rgba(39, 197, 153, 0.18), rgba(148, 163, 184, 0.18), rgba(255,255,255,0))",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  initials: "MJ",
  rating: 4.9,
  reviewsCount: 127,
  clientsCountLabel: "500+ clientes",
  bio: "Barbero profesional con mas de 8 anos de experiencia, especializado en fades, arreglo de barba y disenos creativos. Creo que cada cliente merece una experiencia premium que lo haga sentirse con confianza y verse impecable. Reserva tu turno hoy y nota la diferencia.",
  ctaText: "Reservar ahora",
  ctaSubtitle: "Reserva tu turno ahora y vive el servicio premium de barberia que mereces.",
  socialLinks: {
    instagram: "https://instagram.com/clippr.studio",
    twitter: "https://twitter.com/clipprstudio",
    phone: "tel:+541155555555",
    whatsapp: "https://wa.me/541155555555",
  },
  seo: {
    title: "Marcus Johnson | Elite Cuts Studio",
    description: "Reserva cortes premium, fades y disenos creativos con Marcus Johnson en Elite Cuts Studio.",
  },
  analytics: {
    views: 2841,
    clicks: 312,
    conversionRate: "11%",
  },
  images: [
    { id: 1, url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop", likes: 234, service: "Skin fade", featured: true },
    { id: 2, url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=400&fit=crop", likes: 189, service: "Fade + Barba", featured: false },
    { id: 3, url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=400&fit=crop", likes: 312, service: "Diseno geometrico", featured: true },
    { id: 4, url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop", likes: 156, service: "Corte clasico", featured: false },
    { id: 5, url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop", likes: 278, service: "Fade premium", featured: true },
    { id: 6, url: "https://images.unsplash.com/photo-1593702288056-7927b442d0fa?w=400&h=400&fit=crop", likes: 145, service: "Rapado", featured: false },
    { id: 7, url: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400&h=400&fit=crop", likes: 423, service: "Perfilado", featured: true },
    { id: 8, url: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&h=400&fit=crop", likes: 198, service: "Taper fade", featured: false },
    { id: 9, url: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=400&h=400&fit=crop", likes: 267, service: "Pompadour moderno", featured: true },
  ],
  services: [
    { id: 1, name: "Corte clasico", price: 35, duration: "30 min" },
    { id: 2, name: "Fade + Barba", price: 45, duration: "45 min" },
    { id: 3, name: "Skin fade", price: 40, duration: "40 min" },
    { id: 4, name: "Corte premium + Barba", price: 65, duration: "60 min" },
    { id: 5, name: "Diseno geometrico", price: 55, duration: "45 min" },
    { id: 6, name: "Rapado", price: 25, duration: "20 min" },
  ],
  reviews: [
    { id: 1, author: "James Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", rating: 5, text: "El mejor barbero de la ciudad. Marcus siempre logra exactamente lo que quiero. La atencion al detalle es increible.", date: "Hace 2 semanas" },
    { id: 2, author: "David Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", rating: 5, text: "Increible nivel con los disenos geometricos. Siempre salgo sintiendome fresco y con confianza.", date: "Hace 1 mes" },
    { id: 3, author: "Michael Brown", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", rating: 5, text: "Profesional, puntual y talentoso. Lo recomiendo mucho para cualquiera que busque cortes de calidad.", date: "Hace 1 mes" },
  ],
  workingHours: [
    { day: "Lunes", hours: "9:00 AM - 6:00 PM" },
    { day: "Martes", hours: "9:00 AM - 6:00 PM" },
    { day: "Miercoles", hours: "9:00 AM - 6:00 PM" },
    { day: "Jueves", hours: "9:00 AM - 7:00 PM" },
    { day: "Viernes", hours: "9:00 AM - 7:00 PM" },
    { day: "Sabado", hours: "10:00 AM - 5:00 PM" },
    { day: "Domingo", hours: "Cerrado" },
  ],
}

export function getPortfolioBySlug(slug: string) {
  return slug === initialPortfolioPage.slug ? initialPortfolioPage : null
}
