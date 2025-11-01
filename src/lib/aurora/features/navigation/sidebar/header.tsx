import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/shared/components/ui/dropdown-menu';
import { BookOpen, Globe, Users, Pen, StickyNote, ChevronRight } from 'lucide-react';
import { Button } from '@/lib/shared/components/ui/button';
import Link from 'next/link';

export default function Header({ user, slug }: { user: string; slug: string }) {
  const navItems = [
    { href: `/aurora/manuscript/${user}/${slug}`, icon: Pen, label: 'Manuscript', disabled: false },
    {
      href: `/aurora/worldbuilding/${user}/${slug}`,
      icon: Globe,
      label: 'Worldbuilding',
      disabled: true,
    },
    {
      href: `/aurora/plotweaver/${user}/${slug}/timeline`,
      icon: BookOpen,
      label: 'Plotweaver',
      disabled: false,
    },
    {
      href: `/aurora/characters/${user}/${slug}`,
      icon: Users,
      label: 'Characters',
      disabled: true,
    },
    { href: `/aurora/notes/${user}/${slug}`, icon: StickyNote, label: 'Notes', disabled: true },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex min-w-[200px] justify-between gap-2 border-b-3 bg-transparent p-4">
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-sm font-semibold">
              {slug
                .replaceAll('-', ' ')
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </span>
            <span className="text-muted-foreground text-xs">@{user}</span>
          </div>
          <ChevronRight className="size-4 opacity-50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right" className="w-56">
        <DropdownMenuLabel>Story Modules</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navItems.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link
              href={item.href}
              className={`hover: flex cursor-pointer items-center gap-2 hover:bg-blue-300/30 ${item.disabled ? 'pointer-events-none opacity-50' : ''}`}
              aria-disabled={item.disabled}
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
