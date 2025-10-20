'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-neutral-200', className)}
      {...props}
    />
  )
}

export { Skeleton }