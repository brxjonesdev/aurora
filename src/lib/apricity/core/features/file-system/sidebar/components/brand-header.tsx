import React from 'react';
import { Home, Settings, FileText } from 'lucide-react';
import { SidebarHeader } from '@/lib/shared/components/ui/sidebar';
import { Button } from '@/lib/shared/components/ui/button';
import UserMenu from '@/lib/shared/components/navbar-components/user-menu';

export default function BrandHeader({ id }: { id: string }) {
  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    // In real app: router.push(path) or navigate(path)
  };

  return (
    <SidebarHeader>
      <div className="flex items-baseline justify-between w-full">
        {/* Brand name */}
        <h2 className="text-2xl font-semibold tracking-tight">Apricity</h2>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {/* Home */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('/apricity/home')}
            className="h-8 w-8"
          >
            <Home className="h-4 w-4" />
          </Button>

          {/* Frontmatter */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation(`/apricity/${id}/frontmatter`)}
            className="h-8 w-8"
          >
            <FileText className="h-4 w-4" />
          </Button>

          {/* ID Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation(`/apricity/${id}/settings`)}
            className="h-8 w-8"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* User Menu */}
          
          <UserMenu />
        </div>
      </div>
    </SidebarHeader>
  );
}