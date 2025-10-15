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
import { Story } from '../../core/stories/types';
import { storyService } from '../../core/stories';

interface StoryMenuItem {
  id: number;
  name: string;
  slug: string;
}

export default function Navbar() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [userID, setUserID] = useState<string>('');
  const supabase = createClient();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ user: string, slug: string, view: string }>();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setIsAuthed(false);
        return;
      }
      setIsAuthed(true);
      setUserID(data.user.id);
    };
    checkUser();
  }, [supabase, router, pathname]);

  useEffect(() => {
    const fetchStories = async () => {
      const result = await storyService.getUsersStories(userID);
      if (!result.ok) {
        console.error('Error fetching stories:', result.error);
        return;
      }
      setStories(result.data || []);
    };
    if (isAuthed) {
      fetchStories();
    }
  }, [isAuthed, supabase, userID]);
  return (
    <header className="font-inter w-full px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left: Breadcrumb navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/aurora/home" className="text-foreground">
                <Logo />
              </BreadcrumbLink>
            </BreadcrumbItem>

            {isAuthed && (
              <>
                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <StorySwitch stories={stories} selectedStory={params.slug} />
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
