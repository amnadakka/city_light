import productsData from '../data/products.json'
import type { Product, SortOption } from '../types/product'

/**
 * Product access layer.
 * Today: static JSON. Later: swap implementations to call NestJS API.
 */
const products = productsData as Product[]

export async function getAllProducts(): Promise<Product[]> {
  return [...products]
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // Newest featured first so new bottle photos lead the home grid
  return products.filter((p) => p.featured).reverse()
}

export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}

export function productImageUrl(filename: string): string {
  return assetUrl(`products/${filename}`)
}

export function formatPrice(amount: number, currency: Product['currency'] = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function sortProducts(list: Product[], sort: SortOption): Product[] {
  const next = [...list]
  switch (sort) {
    case 'price-asc':
      return next.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return next.sort((a, b) => b.price - a.price)
    case 'name':
      return next.sort((a, b) => a.nameAr.localeCompare(b.nameAr, 'ar'))
    case 'rating':
      return next.sort((a, b) => b.rating - a.rating)
    case 'featured':
    default:
      return next.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)
  }
}

export function filterProducts(
  list: Product[],
  opts: { query?: string; inStockOnly?: boolean; badge?: string },
): Product[] {
  const q = opts.query?.trim().toLowerCase()
  return list.filter((p) => {
    if (opts.inStockOnly && !p.inStock) return false
    if (opts.badge && !p.badges.includes(opts.badge as Product['badges'][number])) return false
    if (!q) return true
    const hay = [p.nameAr, p.descriptionAr, ...p.notes.top, ...p.notes.heart, ...p.notes.base]
      .join(' ')
      .toLowerCase()
    return hay.includes(q) || p.nameAr.includes(opts.query!.trim())
  })
}
