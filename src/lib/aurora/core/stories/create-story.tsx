import { Button } from '@/lib/shared/components/ui/button';
import React from 'react';

export default function CreateStory() {
  return (
    <Button
      variant={'outline'}
      size={'sm'}
      className="mt-2 cursor-pointer tracking-wide transition-all duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-900"
    >
      Create New Story
    </Button>
  );
}
