import { Status } from '@/lib/aurora/core/types/manuscript'
import { ContextMenuItem, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from '@/lib/shared/components/ui/context-menu'
import { CheckCircle2, Circle } from 'lucide-react'
import React from 'react'

export default function StatusSelect({ selectedStatus }: { selectedStatus: Status | null }) {
  const initialStatuses: Status[] = [
    { value: "not-started", label: "Not Started", color: "#9ca3af" },
    { value: "in-progress", label: "In Progress", color: "#fbbf24" },
    { value: "review", label: "Review", color: "#3b82f6" },
    { value: "completed", label: "Completed", color: "#10b981" },
  ]
  const [statuses, setStatuses] = React.useState<Status[]>(initialStatuses)
  return (
    <ContextMenuSub>
        <ContextMenuSubTrigger>
          <Circle className="mr-2 h-4 w-4" style={{ color: selectedStatus?.color }} />
          Status
        </ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48">
          {statuses.map((status) => {
            return (
              <ContextMenuItem key={status.value}>
                <Circle className="mr-2 h-4 w-4" style={{ color: status.color }} />
                {status.label}
              </ContextMenuItem>
            )
          })}
        </ContextMenuSubContent>
      </ContextMenuSub>
  )
}
