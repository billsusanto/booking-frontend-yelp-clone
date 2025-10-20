'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingProps {
  rating: number
  maxRating?: number
  showNumber?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Rating({
  rating,
  maxRating = 5,
  showNumber = true,
  size = 'md',
  className,
}: RatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of ${maxRating} stars`}>
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < Math.floor(rating)
          const isPartial = index === Math.floor(rating) && rating % 1 !== 0
          
          return (
            <div key={index} className="relative">
              <Star
                className={cn(
                  sizeClasses[size],
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-neutral-200 text-neutral-200'
                )}
              />
              {isPartial && (
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${(rating % 1) * 100}%` }}
                >
                  <Star
                    className={cn(
                      sizeClasses[size],
                      'fill-amber-400 text-amber-400'
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
      {showNumber && (
        <span className={cn('font-semibold text-neutral-700', textSizeClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}