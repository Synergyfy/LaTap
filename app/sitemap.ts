import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://la-tap.vercel.app/'
  
  const pages = [
    '',
    '/how-it-works',
    '/pricing',
    '/features',
    '/faq',
    '/solutions',
    '/testimonials',
    '/contact',
    '/login',
    '/get-started',
    '/privacy',
    '/terms',
  ]

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: page === '' ? 1 : 0.8,
  }))
}
