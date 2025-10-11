import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/shared/components/ui/dialog';
import { Button } from '@/lib/shared/components/ui/button';
import Link from 'next/link';

export default function LearnMore() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-blue-100 hover:text-blue-200">
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="font-inter">
        <DialogHeader>
          <DialogTitle>More Information on Aurora</DialogTitle>
          <section>
            <p className="font-inter mb-4 text-sm leading-6 font-light tracking-wide text-gray-300">
              With Aurora, you can create branching narratives, explore different possibilities, and
              see how your choices impact the overall story. Whether you&apos;re a writer, a game
              designer, or just someone who loves storytelling, Aurora is the perfect tool for you.
            </p>
          </section>
        </DialogHeader>
        <DialogFooter>
          <Button asChild size={'sm'} className="hover:bg-blue-100">
            <Link href="https://portfolio.braxtonjones.dev/">built by brxjonesdev</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
