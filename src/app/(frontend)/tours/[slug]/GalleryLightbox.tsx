'use client'

import { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Props {
  media: MediaType[]
  open: boolean
  onOpenChange: (open: boolean) => void
  initialIndex?: number
}

export const GalleryLightbox = ({ media, open, onOpenChange, initialIndex = 0 }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious()
    } else if (e.key === 'ArrowRight') {
      goToNext()
    }
  }

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideCloseButton
        className="max-w-[100vw] max-h-[100vh] w-[100vw] h-[100vh] p-0 border-0 bg-black/90 overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 md:right-6 md:top-6 z-50 h-9 w-9 md:h-10 md:w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
        </Button>

        {/* Navigation Buttons - Fixed Position */}
        {media.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="fixed left-2 md:left-6 top-1/2 -translate-y-1/2 z-50 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </Button>
          </>
        )}

        {/* Image Display with Padding */}
        <div className="w-full h-full flex items-center justify-center px-0 py-12 md:px-24 md:py-20">
          {typeof media[currentIndex] === 'object' && (
            <div className="relative w-full h-full md:max-w-[85vw] md:max-h-[80vh] flex items-center justify-center">
              <Media
                resource={media[currentIndex]}
                className="w-full h-full"
                imgClassName="object-contain w-full h-full md:max-w-[85vw] md:max-h-[80vh] md:rounded-sm shadow-2xl"
                videoClassName="object-contain w-full h-full md:max-w-[85vw] md:max-h-[80vh] md:rounded-sm shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* Image Counter */}
        {media.length > 1 && (
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm z-50">
            {currentIndex + 1} / {media.length}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
