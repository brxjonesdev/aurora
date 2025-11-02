import { File, Label, Status } from '@/lib/aurora/core/types/manuscript';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/shared/components/ui/card';
import React from 'react';
type SynopsisCardProps = {
  id: string;
  title: string;
  synopsis: string;
  labels?: Label[];
  status?: Status;
};
export default function SynopsisCard({ id, title, synopsis, labels, status }: SynopsisCardProps) {
  console.log(title, 'title in synopsis card');
  return (
    <Card className='text-xs flex flex-col h-full'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 bg-blue-300/20'>
        <p>{synopsis}</p>
      </CardContent>
      <CardFooter>
        <div>
          {labels && labels.map((label) => (
            <span
              key={label.value}
              className={`inline-block px-2 py-1 text-xs rounded-full mr-2`}
              style={{ backgroundColor: label.color }}
            >
              {label.label}
            </span>
          ))}
        </div>
        <div>
          {status && (
            <span
              className={`inline-block px-2 py-1 text-xs rounded-full`}
              style={{ backgroundColor: status.color }}
            >
              {status.label}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
