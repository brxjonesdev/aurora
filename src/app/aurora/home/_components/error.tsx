"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/lib/shared/components/ui/card'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/lib/shared/components/ui/empty'
import { BookIcon } from 'lucide-react'
import React from 'react'

export default function StoryErrorView({errorMessage}: {errorMessage: string}) {
  return (
    <section className="flex w-full flex-1 gap-0 px-8 py-4">
        <Card className="flex-1 gap-0 border-2 bg-transparent p-0">
          <CardHeader className="gap-0 p-4">
            <CardTitle className="text-md font-medium">Error</CardTitle>
            <CardDescription className="text-sm">
              There was an error loading your stories.
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-secondary flex flex-1 flex-col items-center justify-center gap-4 rounded-b-lg p-4 lg:flex-row">
            <Empty className="w-full max-w-sm border-2">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BookIcon />
                </EmptyMedia>
                <EmptyTitle>Unable to load stories</EmptyTitle>
                <EmptyDescription>{errorMessage}</EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardContent>
        </Card>
      </section>
  )
}
