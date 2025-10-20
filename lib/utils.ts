import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: string): string {
  const priceMap: { [key: string]: string } = {
    '$': 'Under $15',
    '$$': '$15-$30',
    '$$$': '$30-$60',
    '$$$$': '$60+',
  }
  return priceMap[price] || price
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export async function fetchMockData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch('/data/mockData.json')
  return response.json()
}

export function filterBusinesses(
  businesses: any[],
  filters: {
    category?: string
    rating?: number
    price?: string
    search?: string
  }
) {
  return businesses.filter((business) => {
    if (filters.category && business.category !== filters.category) {
      return false
    }
    if (filters.rating && business.rating < filters.rating) {
      return false
    }
    if (filters.price && business.price !== filters.price) {
      return false
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      return (
        business.name.toLowerCase().includes(searchLower) ||
        business.category.toLowerCase().includes(searchLower) ||
        business.description.toLowerCase().includes(searchLower)
      )
    }
    return true
  })
}