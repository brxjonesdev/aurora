import { Label, Status } from '@/lib/aurora/core/types/manuscript';
import {
  Card,
  CardContent,
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
  return (
    <Card className="flex h-full flex-col text-xs" key={id}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 bg-blue-300/20">
        <p>{synopsis}</p>
      </CardContent>
      <CardFooter>
        <div>
          {labels &&
            labels.map((label) => (
              <span
                key={label.value}
                className={`mr-2 inline-block rounded-full px-2 py-1 text-xs`}
                style={{ backgroundColor: label.color }}
              >
                {label.label}
              </span>
            ))}
        </div>
        <div>
          {status && (
            <span
              className={`inline-block rounded-full px-2 py-1 text-xs`}
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
