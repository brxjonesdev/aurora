'use client';
import Logo from '@/lib/shared/components/navbar-components/logo';
import UserMenu from '@/lib/shared/components/navbar-components/user-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../shared/components/ui/breadcrumb';
import StorySwitch from './story-switch';
import ViewSwitch from './view-switch';
import { useParams } from 'next/navigation';

interface StoryMenuItem {
  id: number;
  name: string;
  slug: string;
}

export default function Navbar() {
  const stories: StoryMenuItem[] = [
    { id: 1, name: 'My First Story', slug: 'my-first-story' },
    { id: 2, name: 'Adventure in Space', slug: 'adventure-in-space' },
    { id: 3, name: 'Mystery of the Lost City', slug: 'mystery-of-the-lost-city' },
  ];
  const params = useParams<{ story: string; id: string; view: string }>();
  console.log(params);
  return (
    <header className="font-inter w-full px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-foreground">
                  <Logo />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className=""> / </BreadcrumbSeparator>
              <BreadcrumbItem className="">
                <StorySwitch stories={stories} selectedStory={params.id} />
              </BreadcrumbItem>
              {params.view && (
                <>
                  <BreadcrumbSeparator className=""> / </BreadcrumbSeparator>
                  <BreadcrumbItem className="">
                    <ViewSwitch />
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
