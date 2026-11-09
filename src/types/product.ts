export type ProductBadge = 'new' | 'soldout' | 'exclusive'

export interface ProductSize {
  ml: number
  price: number
}

export interface FragranceNotes {
  top: string[]
  heart: string[]
  base: string[]
}

export interface Product {
  id: string
  slug: string
  nameAr: string
  descriptionAr: string
  currency: 'USD'
  price: number
  sizes: ProductSize[]
  images: string[]
  accent: string
  badges: ProductBadge[]
  notes: FragranceNotes
  rating: number
  reviewCount: number
  inStock: boolean
  featured?: boolean
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name' | 'rating'
