import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  const numericWidth = typeof width === 'string' ? parseFloat(width) : width
  const isFullWidth = numericWidth === 100 || !numericWidth

  return (
    <div
      className={className}
      style={{
        width: numericWidth ? `calc(${numericWidth}% - 1.5rem)` : '100%',
        minWidth: numericWidth && numericWidth < 100 ? `calc(${numericWidth}% - 1.5rem)` : undefined,
        flexGrow: isFullWidth ? 1 : 0,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  )
}
