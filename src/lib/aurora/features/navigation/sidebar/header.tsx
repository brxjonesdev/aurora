import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/shared/components/ui/dropdown-menu"
import { BookOpen, Globe, Users, Pen, StickyNote, ChevronRight } from "lucide-react"
import { Button } from "@/lib/shared/components/ui/button"
import Link from "next/link"

export default function Header({ user, slug }: { user: string; slug: string }) {
  const navItems = [
    { href: `/stories/${slug}/worldbuilding`, icon: Globe, label: "Worldbuilding", disabled: true },
    { href: `/stories/${slug}/plotting`, icon: BookOpen, label: "Plotweaver", disabled: false },
    { href: `/stories/${slug}/characters`, icon: Users, label: "Characters", disabled: true },
    { href: `/stories/${slug}/writing`, icon: Pen, label: "Writing", disabled: true },
    { href: `/stories/${slug}/notes`, icon: StickyNote, label: "Notes", disabled: true },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="justify-between gap-2 min-w-[200px] bg-transparent flex  border-b-3 p-4">
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-sm font-semibold">
              {slug
                .replaceAll("-", " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </span>
            <span className="text-xs text-muted-foreground">@{user}</span>
          </div>
          <ChevronRight className="size-4 opacity-50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right" className="w-56">
        <DropdownMenuLabel>Story Modules</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navItems.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href} className={`flex items-center gap-2 cursor-pointer hover: hover:bg-blue-300/30 ${item.disabled ? "opacity-50 pointer-events-none " : ""}`} aria-disabled={item.disabled}>
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
