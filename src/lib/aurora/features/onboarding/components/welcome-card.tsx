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
import SignInButton from '@/lib/aurora/features/auth-&-user/sign-in-btn';

export default function WelcomeCard() {
  const isAuthed = false; // Replace with actual authentication check
  return (
    <Card className="font-inter w-full lg:max-w-3xl">
      <CardHeader className="">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tighter">Welcome to Aurora</CardTitle>
          <CardDescription>
            Architect complex, multi-threaded storylines with visual clarity
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 font-medium tracking-wide text-gray-300">
          With Aurora, you can create branching narratives, explore different possibilities, and see
          how your choices impact the overall story. Whether you&apos;re a writer, a game designer,
          or just someone who loves storytelling, Aurora is the perfect tool for you.
        </p>
      </CardContent>
      {isAuthed ? null : (
        <CardFooter className="flex justify-end">
          <SignInButton />
        </CardFooter>
      )}
    </Card>
  );
}
