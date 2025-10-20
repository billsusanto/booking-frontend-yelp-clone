'use client'

import { SelectHTMLAttributes, forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            'flex h-11 w-full appearance-none rounded-lg border border-neutral-300 bg-white px-4 py-2 pr-10 text-base transition-colors',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100',
            'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }