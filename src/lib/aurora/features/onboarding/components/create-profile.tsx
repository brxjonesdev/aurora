import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/shared/components/ui/card';

export default function CreateProfile() {
  return (
    <Card className="flex-1 gap-0 border-2 bg-transparent p-0">
      <CardHeader className="gap-0 p-4">
        <CardTitle className="text-md font-medium">Welcome to Aurora!</CardTitle>
        <CardDescription className="text-sm">
          Let&apos;s get you set up with a profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-secondary flex flex-1 flex-col items-center justify-center gap-4 rounded-b-lg p-4 lg:flex-row">
        <CreateProfile />
      </CardContent>
    </Card>
  );
}
