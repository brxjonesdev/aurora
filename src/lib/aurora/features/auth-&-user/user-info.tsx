import React from 'react';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/shared/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/lib/shared/components/ui/avatar';
import Link from 'next/link';

export default function UserInfo() {
  return (
    <Card className="w-full max-w-[200px] p-0">
      <CardHeader className="gap-1 p-2">
        <CardTitle>Braxton Jones</CardTitle>
        <CardDescription>
          <Link href={'/aurora/settings'} className="text-xs">
            View Profile
          </Link>
        </CardDescription>
        <CardAction>
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://via.placeholder.com/150" alt="User Avatar" />
            <AvatarFallback>BJ</AvatarFallback>
          </Avatar>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
