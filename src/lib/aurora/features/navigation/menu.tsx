import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/lib/shared/components/ui/card';
import UserInfo from '../auth-&-user/user-info';
import DynamicMenu from './dynamic-menu';
import { Building2, Home, Settings, View } from 'lucide-react';
import ViewSwitcher from './view-switcher';


export default function AuroraMenu() {
  return (
    <Card className='w-fit p-1 gap-2 bg-transparent border-none hover:bg-accent/50 transition-colors transition-duration-200 ease-in-out'>
      <ViewSwitcher />
      <DynamicMenu />
      <UserInfo/>
    </Card>
  );
}
