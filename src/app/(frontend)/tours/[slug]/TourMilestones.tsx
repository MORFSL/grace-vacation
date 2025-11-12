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

interface Props {
  itinerary: Itinerary
  general: General
}

export const TourMilestones = ({ itinerary, general }: Props) => {
  if (!itinerary.milestones || itinerary.milestones.length === 0) {
    return null
  }
  console.log(general.itinerary?.milestonesTitle)

  return (
    <div>
      {general.itinerary?.milestonesTitle && (
        <h2 className="text-2xl font-semibold mb-8">{general.itinerary.milestonesTitle}</h2>
      )}
      <div className="relative pl-16">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/60" />
        <div className="absolute left-6 top-0 bottom-0 w-2 bg-primary/20 blur-sm -translate-x-1/2" />
        <Accordion type="single" collapsible defaultValue="item-0">
          {itinerary.milestones?.map((milestone, index) => (
            <AccordionItem
              key={milestone.id || index}
              value={`item-${index}`}
              className={cn(
                'relative group border-none',
                index < (itinerary.milestones?.length || 0) - 1 && 'mb-6',
              )}
            >
              <div className="absolute -left-16 top-4 w-12 h-12 flex items-center justify-center z-10">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/30 transition-all duration-300" />
                <div className="relative w-12 h-12 rounded-full bg-primary shadow-lg ring-4 ring-white group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  <span className="text-white font-bold text-sm drop-shadow-sm">{index + 1}</span>
                </div>
                <div className="absolute inset-2 rounded-full bg-white/20" />
              </div>

              <div className="bg-white/50 backdrop-blur-sm transition-all duration-300 overflow-hidden">
                <AccordionTrigger className="w-full text-left py-6 pl-3 flex items-center justify-between gap-4 hover:bg-white/30 transition-colors duration-200 group [&[data-state=open]>h3]:text-primary">
                  <h3 className="font-medium group-hover:text-primary transition-colors duration-300">
                    {milestone.title}
                  </h3>
                  <span className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-500 transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                  <div className="px-3 py-0">
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
                              className="overflow-hidden rounded-md relative pt-[340px] shadow-md group-hover:shadow-lg transition-shadow duration-300"
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
