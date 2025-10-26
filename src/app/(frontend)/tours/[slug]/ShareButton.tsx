'use client'

import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'

export const ShareButton = () => {
  return (
    <Button
      variant="ghost"
      className="p-4 cursor-pointer"
      onClick={() => {
        navigator.share({
          title: 'Share this tour',
          text: 'Share this tour',
          url: window.location.href,
        })
      }}
    >
      <Share2 size={16} />
    </Button>
  )
}
