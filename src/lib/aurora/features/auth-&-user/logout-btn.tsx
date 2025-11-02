'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/lib/shared/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();
  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
    } else {
      router.push('/');
    }
  };
  return (
    <Button onClick={onLogout} size={'sm'} className="w-full">
      Logout
    </Button>
  );
}
