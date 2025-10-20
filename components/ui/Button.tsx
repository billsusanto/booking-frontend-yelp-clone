'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-md hover:-translate-y-0.5',
        secondary:
          'bg-secondary-500 text-white hover:bg-secondary-600 hover:shadow-md hover:-translate-y-0.5',
        outline:
          'border-2 border-primary-500 bg-transparent text-primary-500 hover:bg-primary-50',
        ghost:
          'bg-transparent text-neutral-700 hover:bg-neutral-100',
      },
      size: {
        small: 'h-8 px-3 text-sm rounded-md',
        medium: 'h-10 px-5 text-base rounded-lg',
        large: 'h-12 px-7 text-lg rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }