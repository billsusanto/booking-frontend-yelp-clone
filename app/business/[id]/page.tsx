'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Clock,
  Phone,
  Globe,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Calendar,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Rating } from '@/components/ui/Rating'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { Select } from '@/components/ui/Select'
import { fetchMockData } from '@/lib/utils'
import { format } from 'date-fns'

export default function BusinessDetailPage() {
  const params = useParams()
  const businessId = parseInt(params.id as string)
  
  const [business, setBusiness] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'reviews' | 'booking'>('overview')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  
  // Booking states
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [guestCount, setGuestCount] = useState(2)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  useEffect(() => {
    const loadBusiness = async () => {
      setLoading(true)
      try {
        const data = await fetchMockData()
        const foundBusiness = data.find((b: any) => b.id === businessId)
        setBusiness(foundBusiness)
      } catch (error) {
        console.error('Error loading business:', error)
      } finally {
        setLoading(false)
      }
    }
    loadBusiness()
  }, [businessId])

  const nextImage = () => {
    if (business) {
      setCurrentImageIndex((prev) => (prev + 1) % business.images.length)
    }
  }

  const prevImage = () => {
    if (business) {
      setCurrentImageIndex((prev) => (prev - 1 + business.images.length) % business.images.length)
    }
  }

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setBookingConfirmed(true)
      setTimeout(() => {
        setBookingConfirmed(false)
        setShowBookingModal(false)
        setSelectedDate('')
        setSelectedTime('')
        setGuestCount(2)
      }, 3000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Skeleton className="h-96 w-full" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-64" />
              <Skeleton className="h-48" />
            </div>
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Business not found</h2>
          <p className="text-neutral-600">The business you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Image Carousel */}
      <div className="relative h-96 bg-neutral-900">
        <Image
          src={business.images[currentImageIndex]}
          alt={business.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-neutral-900" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-neutral-900" />
        </button>

        {/* Gallery Button */}
        <button
          onClick={() => setShowGallery(true)}
          className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
        >
          View All Photos
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {business.images.length}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900">
                  {business.name}
                </h1>
                {business.featured && <Badge variant="premium">Featured</Badge>}
              </div>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Rating rating={business.rating} size="lg" />
                <span className="text-neutral-600">({business.reviews} reviews)</span>
                <Badge variant="default">{business.category}</Badge>
                <span className="text-lg font-semibold text-neutral-700">{business.price}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="medium" aria-label="Share">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="medium" aria-label="Save">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2 text-neutral-700">
              <MapPin className="w-5 h-5 text-primary-500" />
              <span>{business.location}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Clock className="w-5 h-5 text-primary-500" />
              <span>{business.hours}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Phone className="w-5 h-5 text-primary-500" />
              <span>{business.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Globe className="w-5 h-5 text-primary-500" />
              <a href={business.website} className="text-primary-500 hover:underline">
                Website
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-neutral-200 mb-8 sticky top-16 bg-neutral-50 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {(['overview', 'photos', 'reviews', 'booking'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <Card className="p-6">
                      <h2 className="text-xl font-semibold text-neutral-900 mb-4">About</h2>
                      <p className="text-neutral-700 leading-relaxed">{business.description}</p>
                    </Card>

                    <Card className="p-6">
                      <h2 className="text-xl font-semibold text-neutral-900 mb-4">Amenities</h2>
                      <div className="grid grid-cols-2 gap-3">
                        {business.amenities.map((amenity: string) => (
                          <div key={amenity} className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-secondary-500" />
                            <span className="text-neutral-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h2 className="text-xl font-semibold text-neutral-900 mb-4">Location</h2>
                      <p className="text-neutral-700 mb-4">{business.address}</p>
                      <div className="h-64 bg-neutral-200 rounded-lg flex items-center justify-center">
                        <MapPin className="w-12 h-12 text-neutral-400" />
                        <span className="ml-2 text-neutral-500">Map view (mock)</span>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Photos Tab */}
                {activeTab === 'photos' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {business.images.map((image: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                        onClick={() => {
                          setCurrentImageIndex(index)
                          setShowGallery(true)
                        }}
                      >
                        <Image
                          src={image}
                          alt={`${business.name} photo ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <Card className="p-6">
                      <h2 className="text-xl font-semibold text-neutral-900 mb-6">Customer Reviews</h2>
                      <div className="space-y-6">
                        {business.reviewsList.map((review: any) => (
                          <div key={review.id} className="border-b border-neutral-200 last:border-0 pb-6 last:pb-0">
                            <div className="flex items-start gap-4 mb-3">
                              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold flex-shrink-0">
                                {review.userAvatar}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className="font-semibold text-neutral-900">{review.userName}</h4>
                                  <span className="text-sm text-neutral-500">{review.date}</span>
                                </div>
                                <Rating rating={review.rating} size="sm" showNumber={false} />
                              </div>
                            </div>
                            <p className="text-neutral-700 leading-relaxed">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                )}

                {/* Booking Tab */}
                {activeTab === 'booking' && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold text-neutral-900 mb-6">Make a Reservation</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Select Date
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={format(new Date(), 'yyyy-MM-dd')}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Select Time
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {business.availableSlots.map((slot: string) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                                selectedTime === slot
                                  ? 'border-primary-500 bg-primary-50 text-primary-600'
                                  : 'border-neutral-200 hover:border-primary-300'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Number of Guests
                        </label>
                        <Select
                          value={guestCount}
                          onChange={(e) => setGuestCount(parseInt(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <Button
                        size="large"
                        className="w-full"
                        onClick={handleBooking}
                        disabled={!selectedDate || !selectedTime}
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </Card>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar - Booking Widget */}
          <div className="lg:block hidden">
            <Card className="p-6 sticky top-32">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Booking</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Guests
                  </label>
                  <Select
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </Select>
                </div>

                <Button
                  size="large"
                  className="w-full"
                  onClick={() => setActiveTab('booking')}
                >
                  Check Availability
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Mobile Sticky Footer */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 z-40">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-neutral-600">From</div>
              <div className="text-lg font-semibold text-neutral-900">{business.price}</div>
            </div>
            <Button
              size="large"
              onClick={() => setShowBookingModal(true)}
              className="flex-1"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end lg:items-center justify-center p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-2xl lg:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              {bookingConfirmed ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">Booking Confirmed!</h3>
                  <p className="text-neutral-600 mb-4">
                    Your reservation at {business.name} has been confirmed.
                  </p>
                  <div className="bg-neutral-50 rounded-lg p-4 text-left">
                    <div className="flex justify-between py-2">
                      <span className="text-neutral-600">Date:</span>
                      <span className="font-medium">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-neutral-600">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-neutral-600">Guests:</span>
                      <span className="font-medium">{guestCount}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-neutral-900">Book {business.name}</h3>
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Select Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Select Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {business.availableSlots.map((slot: string) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2 px-3 rounded-lg border-2 font-medium transition-colors text-sm ${
                              selectedTime === slot
                                ? 'border-primary-500 bg-primary-50 text-primary-600'
                                : 'border-neutral-200 hover:border-primary-300'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Guests</label>
                      <Select value={guestCount} onChange={(e) => setGuestCount(parseInt(e.target.value))}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <Button
                      size="large"
                      className="w-full"
                      onClick={handleBooking}
                      disabled={!selectedDate || !selectedTime}
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4">
              <Image
                src={business.images[currentImageIndex]}
                alt={`${business.name} photo ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {business.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}