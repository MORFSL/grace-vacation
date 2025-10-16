import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container py-28">
      <div className="prose max-w-none text-center">
        <h1 className="mb-4 text-primary text-9xl">404</h1>
        <p className="mb-6 font-medium">This page could not be found.</p>
        <Button asChild variant="default" className="no-underline">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  )
}
