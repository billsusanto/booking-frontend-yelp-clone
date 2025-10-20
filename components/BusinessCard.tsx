'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { Rating } from './ui/Rating'
import { Button } from './ui/Button'
import { formatPrice } from '@/lib/utils'

interface Business {
  id: number
  name: string
  category: string
  rating: number
  reviews: number
  price: string
  images: string[]
  description: string
  location: string
  distance: string
  hours: string
  featured?: boolean
}

interface BusinessCardProps {
  business: Business
  layout?: 'grid' | 'list'
}

export function BusinessCard({ business, layout = 'grid' }: BusinessCardProps) {
  if (layout === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={`/business/${business.id}`}>
          <Card className="hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0">
                <Image
                  src={business.images[0]}
                  alt={business.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 256px"
                />
                {business.featured && (
                  <Badge variant="premium" className="absolute top-3 left-3">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                        {business.name}
                      </h3>
                      <Badge variant="default">{business.category}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <Rating rating={business.rating} size="sm" />
                    <span className="text-sm text-neutral-600">({business.reviews} reviews)</span>
                    <span className="text-sm font-medium text-neutral-700">{business.price}</span>
                  </div>

                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                    {business.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{business.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{business.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/business/${business.id}`}>
        <Card className="hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden h-full flex flex-col">
          {/* Image */}
          <div className="relative w-full h-48">
            <Image
              src={business.images[0]}
              alt={business.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {business.featured && (
              <Badge variant="premium" className="absolute top-3 left-3">
                Featured
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-lg font-semibold text-neutral-900 line-clamp-1">
                {business.name}
              </h3>
              <span className="text-sm font-semibold text-neutral-700 whitespace-nowrap">
                {business.price}
              </span>
            </div>

            <Badge variant="default" className="w-fit mb-3">
              {business.category}
            </Badge>

            <div className="flex items-center gap-2 mb-3">
              <Rating rating={business.rating} size="sm" />
              <span className="text-xs text-neutral-600">({business.reviews})</span>
            </div>

            <p className="text-sm text-neutral-600 mb-4 line-clamp-2 flex-1">
              {business.description}
            </p>

            <div className="space-y-2 text-xs text-neutral-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span className="line-clamp-1">{business.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{business.hours}</span>
              </div>
            </div>

            <Button variant="outline" size="small" className="mt-4 w-full">
              View Details
            </Button>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}