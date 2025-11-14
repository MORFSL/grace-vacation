'use client'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { General, Itinerary } from '@/payload-types'
import { cn } from '@/utilities/ui'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { MapPin, ChevronDown } from 'lucide-react'

interface Props {
  itinerary: Itinerary
  general: General
}

export const TourMilestones = ({ itinerary, general }: Props) => {
  if (!itinerary.milestones || itinerary.milestones.length === 0) {
    return null
  }

  return (
    <div>
      {general.itinerary?.milestonesTitle && (
        <h2 className="text-2xl font-semibold mb-8">{general.itinerary.milestonesTitle}</h2>
      )}
      <div className="relative">
        <Accordion type="single" collapsible>
          {itinerary.milestones?.map((milestone, index) => (
            <AccordionItem
              key={milestone.id || index}
              value={`item-${index}`}
              className={cn('relative group border-none')}
            >
              <div
                className={cn(
                  'absolute left-5 top-0 bottom-0 w-0.5',
                  'group-data-[state=closed]:bg-gray-300',
                  'group-data-[state=open]:bg-primary',
                )}
              />
              <div
                className={cn(
                  'absolute left-5 top-0 bottom-0 w-2 blur-sm -translate-x-1/2',
                  'group-data-[state=closed]:bg-gray-300/40',
                  'group-data-[state=open]:bg-primary/20',
                )}
              />
              <div className="absolute left-0 top-4 w-10 h-10 flex items-center justify-center z-10">
                <div className="relative w-10 h-10 rounded-full bg-primary shadow-lg ring-4 ring-white group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  <span className="text-white font-bold text-sm drop-shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </span>
                </div>
                <div className="absolute inset-2 rounded-full bg-white/15" />
              </div>

              <div className="ml-12 bg-white/50 backdrop-blur-sm transition-all duration-300 overflow-hidden">
                <AccordionTrigger className="w-full text-left py-6 pl-3 flex items-center justify-between gap-4 hover:bg-white/30 transition-colors duration-200 group [&[data-state=open]>h3]:text-primary">
                  <h3 className="text-sm md:text-base font-medium group-hover:text-primary transition-colors duration-300">
                    {milestone.title}
                  </h3>
                  <span className="flex-shrink-0">
                    <ChevronDown className="w-5 h-5 text-gray-500 transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                  <div className="px-3 pb-2">
                    {milestone.content && (
                      <div className="mb-4 text-gray-700">
                        <RichText
                          data={milestone.content}
                          enableGutter={false}
                          className="text-start"
                        />
                      </div>
                    )}

                    {milestone.media && milestone.media.length > 0 && (
                      <div
                        className={cn(
                          'grid grid-cols-1 gap-4 mt-4',
                          milestone.media.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2',
                        )}
                      >
                        {milestone.media.map((mediaItem) =>
                          typeof mediaItem === 'object' ? (
                            <Media
                              key={mediaItem.id}
                              resource={mediaItem}
                              className="overflow-hidden rounded-md relative pt-[340px]"
                              imgClassName="absolute inset-0 w-full h-full object-cover"
                              videoClassName="absolute inset-0 w-full h-full object-cover"
                            />
                          ) : null,
                        )}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
