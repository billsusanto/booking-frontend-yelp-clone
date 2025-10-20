'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Grid, List, SlidersHorizontal, X } from 'lucide-react'
import { SearchBar } from '@/components/SearchBar'
import { BusinessCard } from '@/components/BusinessCard'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { fetchMockData, filterBusinesses } from '@/lib/utils'

function ListingsContent() {
  const searchParams = useSearchParams()
  const [businesses, setBusinesses] = useState<any[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState('')
  const [ratingFilter, setRatingFilter] = useState(0)
  const [priceFilter, setPriceFilter] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  const searchQuery = searchParams.get('search') || ''
  const categoryParam = searchParams.get('category') || ''

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const data = await fetchMockData()
        setBusinesses(data)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (categoryParam) {
      setCategoryFilter(categoryParam)
    }
  }, [categoryParam])

  useEffect(() => {
    let filtered = filterBusinesses(businesses, {
      category: categoryFilter || undefined,
      rating: ratingFilter || undefined,
      price: priceFilter || undefined,
      search: searchQuery || undefined,
    })

    // Sort
    if (sortBy === 'rating') {
      filtered = filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'reviews') {
      filtered = filtered.sort((a, b) => b.reviews - a.reviews)
    } else if (sortBy === 'distance') {
      filtered = filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    }

    setFilteredBusinesses(filtered)
  }, [businesses, categoryFilter, ratingFilter, priceFilter, searchQuery, sortBy])

  const clearFilters = () => {
    setCategoryFilter('')
    setRatingFilter(0)
    setPriceFilter('')
  }

  const activeFilterCount = [categoryFilter, ratingFilter, priceFilter].filter(Boolean).length

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Search Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <SearchBar variant="compact" initialQuery={searchQuery} />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 md:w-48"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="distance">Nearest</option>
              </Select>
              <Button
                variant="outline"
                size="medium"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
                aria-label="Toggle filters"
              >
                <SlidersHorizontal className="w-5 h-5" />
                {activeFilterCount > 0 && (
                  <Badge variant="info" className="ml-2" aria-label={`${activeFilterCount} active filters`}>
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
              <div className="hidden md:flex gap-2">
                <Button
                  variant={layout === 'grid' ? 'primary' : 'ghost'}
                  size="medium"
                  onClick={() => setLayout('grid')}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button
                  variant={layout === 'list' ? 'primary' : 'ghost'}
                  size="medium"
                  onClick={() => setLayout('list')}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block w-full md:w-64 flex-shrink-0`}
          >
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    Category
                  </label>
                  <div className="space-y-2">
                    {['', 'Restaurant', 'Cafe', 'Spa', 'Gym', 'Hotel', 'Salon', 'Wellness'].map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={categoryFilter === cat}
                          onChange={() => setCategoryFilter(cat)}
                          className="w-4 h-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
                        />
                        <span className="text-sm text-neutral-700">
                          {cat || 'All Categories'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {[0, 4, 4.5].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={ratingFilter === rating}
                          onChange={() => setRatingFilter(rating)}
                          className="w-4 h-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
                        />
                        <span className="text-sm text-neutral-700">
                          {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {['', '$', '$$', '$$$', '$$$$'].map((price) => (
                      <label key={price} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          checked={priceFilter === price}
                          onChange={() => setPriceFilter(price)}
                          className="w-4 h-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
                        />
                        <span className="text-sm text-neutral-700">
                          {price || 'All Prices'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="small"
                onClick={() => setShowFilters(false)}
                className="w-full mt-6 md:hidden"
              >
                <X className="w-4 h-4 mr-2" />
                Close Filters
              </Button>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900">
                  {searchQuery ? `Results for "${searchQuery}"` : 'All Businesses'}
                </h1>
                <p className="text-neutral-600 mt-1">
                  {loading ? 'Loading...' : `${filteredBusinesses.length} businesses found`}
                </p>
              </div>
              <div className="md:hidden flex gap-2">
                <Button
                  variant={layout === 'grid' ? 'primary' : 'ghost'}
                  size="small"
                  onClick={() => setLayout('grid')}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={layout === 'list' ? 'primary' : 'ghost'}
                  size="small"
                  onClick={() => setLayout('list')}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {loading ? (
              <div className={layout === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-6'}>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredBusinesses.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  No results found
                </h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={layout === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-6'}>
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} layout={layout} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  )
}