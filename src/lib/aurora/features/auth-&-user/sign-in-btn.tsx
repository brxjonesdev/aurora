'use client';
import { Button } from '@/lib/shared/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';
export default function SignInButton() {
  const router = useRouter();
  const handleSignIn = () => {
    router.push('/aurora/home');
  };
  return (
    <Button
      className="w-full bg-blue-200 font-semibold text-blue-500 hover:bg-blue-300 hover:text-blue-500"
      onClick={handleSignIn}
    >
      Log In
    </Button>
  );
}
