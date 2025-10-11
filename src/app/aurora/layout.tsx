import UserInfo from '@/lib/aurora/features/auth-&-user/user-info';
import DynamicMenu from '@/lib/aurora/features/navigation/dynamic-menu';
import AuroraMenu from '@/lib/aurora/features/navigation/menu';
import ViewSwitcher from '@/lib/aurora/features/navigation/view-switcher';
import React from 'react';

export default function AuroraLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="w-full border-b flex items-center px-4 gap-4 py-2">
        <p className='text-2xl font-bold'>
          Aurora
        </p>
        <div className='flex flex-1 items-center gap-4'>
          <ViewSwitcher/>
          <DynamicMenu/>  
          <UserInfo/>
        </div>
      </section>
      {children}
    </main>
  );
}