'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-base transition-colors',
          'placeholder:text-neutral-400',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100',
          'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }