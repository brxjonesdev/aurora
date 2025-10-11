"use client";

import { Avatar, AvatarFallback } from "@/lib/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/lib/shared/components/ui/dropdown-menu";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface View {
  id: string;
  name: string;
  desc: string;
  slug: string;
}

const workspaces: View[] = [
  {
    id: "1",
    name: "Plot",
    desc: "A plot view",
    slug: "plot",
  },
  {
    id: "2",
    name: "Beats",
    desc: "A beats view",
    slug: "beats",
  },
  {
    id: "3",
    name: "Timeline",
    desc: "A timeline view",
    slug: "timeline",
  },
];

export default function ViewSwitcher() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 bg-accent py-2.5 px-3 rounded-lg ">
        <Avatar className="rounded-lg h-8 w-8">
          <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
            {selectedWorkspace.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="text-start flex flex-col gap-1 leading-none">
          <span className="text-sm leading-none font-semibold truncate max-w-[17ch]">
            {selectedWorkspace.name}
          </span>
        </div>
        <ChevronsUpDown className="ml-6 h-4 w-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => setSelectedWorkspace(workspace)}
          >
            <div className="flex items-center gap-2">
              <Avatar className="rounded-md h-8 w-8">
                <AvatarFallback className="rounded-md bg-primary/10 text-foreground">
                  {workspace.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>{workspace.name}</span>
                <span className="text-xs text-muted-foreground">
                  {workspace.desc}
                </span>
              </div>
            </div>
            {selectedWorkspace.id === workspace.id && (
              <Check className="ml-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
