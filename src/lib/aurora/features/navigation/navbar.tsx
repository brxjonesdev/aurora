'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Logo from '@/lib/shared/components/navbar-components/logo';
import UserMenu from '@/lib/shared/components/navbar-components/user-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/lib/shared/components/ui/breadcrumb';
import StorySwitch from './story-switch';
import ViewSwitch from './view-switch';

interface StoryMenuItem {
  id: number;
  name: string;
  slug: string;
}

export default function Navbar() {
  const [isAuthed, setIsAuthed] = useState(false);
  const supabase = createClient();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ story: string; id: string; view: string }>();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setIsAuthed(false);
        return;
      }
      if (pathname !== '/aurora/home') {
        router.push('/aurora/home');
      }
      setIsAuthed(true);
    };
    checkUser();
  }, [supabase, router, pathname]);

  const stories: StoryMenuItem[] = [
    { id: 1, name: 'My First Story', slug: 'my-first-story' },
    { id: 2, name: 'Adventure in Space', slug: 'adventure-in-space' },
    { id: 3, name: 'Mystery of the Lost City', slug: 'mystery-of-the-lost-city' },
  ];

  return (
    <header className="font-inter w-full px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left: Breadcrumb navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="text-foreground">
                <Logo />
              </BreadcrumbLink>
            </BreadcrumbItem>

            {isAuthed && (
              <>
                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <StorySwitch stories={stories} selectedStory={params.id} />
                </BreadcrumbItem>

                {params.view && (
                  <>
                    <BreadcrumbSeparator> / </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <ViewSwitch />
                    </BreadcrumbItem>
                  </>
                )}
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Right: User menu */}
        <UserMenu />
      </div>
    </header>
  );
}
