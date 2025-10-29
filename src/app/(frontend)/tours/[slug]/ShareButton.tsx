'use client'

import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'

export const ShareButton = () => {
  return (
    <Button
      variant="ghost"
      className="py-2 px-0 cursor-pointer flex items-center gap-2"
      onClick={() => {
        navigator.share({
          title: 'Share this tour',
          text: 'Share this tour',
          url: window.location.href,
        })
      }}
    >
      <Share2 size={16} /> <span className="font-semibold">Share</span>
    </Button>
  )
}
