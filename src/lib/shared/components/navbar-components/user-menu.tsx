'use client';

import {
  BoltIcon,
  BookOpenIcon,
  Layers2Icon,
  PinIcon,
  UserPlusIcon as UserPenIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/shared/components/ui/dropdown-menu';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/aurora/features/auth-&-user/profile.service';
import { useEffect, useState } from 'react';
import Avatar from 'boring-avatars';
import LogoutButton from '@/lib/aurora/features/auth-&-user/logout-btn';
import { Card } from '../ui/card';

export default function UserMenu() {
  const supabase = createClient();
  const [user, setUser] = useState<Profile | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setUser(null);
        return;
      }
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();
      if (profileError || !profileData) {
        setUser(null);
        return;
      }
      setUser(profileData);
    };
    fetchUser();
  }, [supabase]);
  if (!user) {
    return null;
  }
  console.log('User data:', user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Card className="hover:bg-accent hover:text-accent-foreground flex min-h-[44px] cursor-pointer flex-row items-center gap-2 p-2 transition-colors w-full">
          <div>
            <Avatar
              name={user.avatar_id as string}
              colors={['#e7ecef', '#274c77', '#6096ba', '#a3cef1', '#8b8c89']}
              variant="beam"
              size={30}
            />
          </div>
          <p className="hidden md:block">/</p>
          <div className="hidden md:block">
            <span className="text-foreground truncate text-sm font-medium">{user.full_name}</span>
          </div>
        </Card>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[calc(100vw-2rem)] max-w-64 md:w-64"
        align="start"
        side='right'
        sideOffset={12}
      >
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">{user.full_name}</span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            @{user.username}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PinIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
