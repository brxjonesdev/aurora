import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/shared/components/ui/card"
import SynopsisCard from './synopsis-card';
import { Folder, File } from '@/lib/aurora/core/types/manuscript';

export type SynopsisCardProps = {
    id: string;
    title: string;
    synopsis: string;
    // add other things like characters, word count, etc.
}

export default function Cards({selectedFileObject}: {selectedFileObject: File | Folder | undefined | null}) {
  console.log('Selected File Object:', selectedFileObject);
    const sampleCardData = [
        {
            id: '1',
            title: 'Sample Card 1',
            synopsis: 'This is a sample synopsis for card 1.',
        },
        {
            id: '2',
            title: 'Sample Card 2',
            synopsis: 'This is a sample synopsis for card 2.',
        },
    ]
  return (
    <Card className='flex-1'>

  <CardContent className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
    {sampleCardData.map((card) => (
      <SynopsisCard key={card.id} {...card} />
    ))}
  </CardContent>
</Card>
  )
}
