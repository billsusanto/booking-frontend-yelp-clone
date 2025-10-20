'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Coffee, Sparkles, Dumbbell, Hotel, ChevronLeft, ChevronRight } from 'lucide-react'
import { SearchBar } from '@/components/SearchBar'
import { BusinessCard } from '@/components/BusinessCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { fetchMockData } from '@/lib/utils'

const categories = [
  { name: 'Restaurants', icon: Coffee, color: 'bg-primary-50 text-primary-600' },
  { name: 'Spa', icon: Sparkles, color: 'bg-secondary-50 text-secondary-600' },
  { name: 'Gym', icon: Dumbbell, color: 'bg-accent-50 text-accent-700' },
  { name: 'Hotel', icon: Hotel, color: 'bg-purple-50 text-purple-600' },
]

export default function HomePage() {
  const [businesses, setBusinesses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMockData()
        setBusinesses(data.filter((b: any) => b.featured))
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3
  const maxIndex = Math.max(0, businesses.length - itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Discover & Book
              <span className="text-primary-500"> Amazing Experiences</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
              Find the best restaurants, spas, gyms, and more in your area.
              Book instantly with just a few clicks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SearchBar variant="hero" />
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-neutral-600">
              Explore our most popular categories
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/listings?category=${category.name}`}
                    className="block group"
                  >
                    <div className="bg-white border-2 border-neutral-200 rounded-2xl p-6 md:p-8 text-center hover:border-primary-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section id="top-rated" className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-2">
                Top Rated Businesses
              </h2>
              <p className="text-lg text-neutral-600">
                Handpicked favorites loved by our community
              </p>
            </div>
            <Link href="/listings">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Carousel */}
              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-6"
                  animate={{ x: `${-currentIndex * (100 / itemsPerPage)}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {businesses.map((business) => (
                    <div
                      key={business.id}
                      className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0"
                    >
                      <BusinessCard business={business} />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation Arrows */}
              {businesses.length > itemsPerPage && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors z-10"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-6 h-6 text-neutral-700" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors z-10"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-6 h-6 text-neutral-700" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {businesses.length > itemsPerPage && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-primary-500 w-8'
                          : 'bg-neutral-300 hover:bg-neutral-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Why Choose BookNow?
            </h2>
            <p className="text-lg text-neutral-600">
              The easiest way to discover and book local businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Instant Booking',
                description: 'Book your favorite spots instantly without waiting for confirmation.',
                icon: '⚡',
              },
              {
                title: 'Verified Reviews',
                description: 'Read authentic reviews from real customers to make informed decisions.',
                icon: '⭐',
              },
              {
                title: 'Best Prices',
                description: 'Get the best deals and exclusive offers from top-rated businesses.',
                icon: '💰',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}