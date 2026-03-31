import type { Metadata } from "next"
import { PublicPortfolioPage } from "@/components/public-portfolio-page"
import { getPortfolioBySlug } from "@/lib/portfolio-data"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getPortfolioBySlug(slug)

  if (!page) {
    return {
      title: "Pagina no encontrada | Cutflow",
      description: "La pagina publica solicitada no existe.",
    }
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      images: [page.avatar],
    },
    alternates: {
      canonical: `/${page.slug}`,
    },
  }
}

export default async function PortfolioPublicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getPortfolioBySlug(slug)

  return <PublicPortfolioPage slug={slug} initialPage={page} />
}
