import { cn } from '@/utilities/ui'
import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  let calculatedWidth = width ? `${width}%` : undefined

  if (width && typeof width === 'number' && width < 100) {
    calculatedWidth = `calc(${width}% - 0.625rem)`
  }

  return (
    <div className={cn(className)} style={{ width: width ? calculatedWidth : undefined }}>
      {children}
    </div>
  )
}
