import { Benefits } from "@/components/landing/benefits"
import { BrandingSection } from "@/components/landing/branding-section"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { Navbar } from "@/components/landing/navbar"
import { Pricing } from "@/components/landing/pricing"
import { Product } from "@/components/landing/product"
import { SocialProof } from "@/components/landing/social-proof"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="noise pointer-events-none fixed inset-0 z-50" />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Benefits />
        <Product />
        <BrandingSection />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
