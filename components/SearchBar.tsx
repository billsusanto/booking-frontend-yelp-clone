'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

interface SearchBarProps {
  variant?: 'hero' | 'compact'
  initialQuery?: string
}

export function SearchBar({ variant = 'hero', initialQuery = '' }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [location, setLocation] = useState('Irvine, CA')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/listings?search=${encodeURIComponent(query)}`)
    }
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <Input
            type="text"
            placeholder="Search restaurants, spas, gyms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-4 h-12 rounded-full border-2"
            aria-label="Search for businesses"
          />
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-full shadow-xl p-2 flex flex-col sm:flex-row gap-2">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <Input
            type="text"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 border-0 focus:ring-0 rounded-full h-12"
            aria-label="Search for businesses"
          />
        </div>

        {/* Location Input */}
        <div className="relative sm:w-64">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-12 border-0 focus:ring-0 rounded-full h-12"
            aria-label="Location"
          />
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          size="large"
          className="rounded-full px-8"
        >
          Search
        </Button>
      </div>

      {/* Quick Suggestions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-neutral-600">Popular:</span>
        {['Restaurants', 'Spas', 'Gyms', 'Cafes'].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setQuery(suggestion)}
            className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  )
}