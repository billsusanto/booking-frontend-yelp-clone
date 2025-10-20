'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-200 text-neutral-700',
        success:
          'bg-green-100 text-green-700 border border-green-200',
        warning:
          'bg-amber-100 text-amber-700 border border-amber-200',
        error:
          'bg-red-100 text-red-700 border border-red-200',
        info:
          'bg-blue-100 text-blue-700 border border-blue-200',
        premium:
          'bg-gradient-to-r from-accent-400 to-accent-500 text-neutral-900 font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }