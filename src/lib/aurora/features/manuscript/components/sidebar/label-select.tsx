"use client"

import React from "react"
import type { Label } from "@/lib/aurora/core/types/manuscript"
import {
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/lib/shared/components/ui/context-menu"
import { Edit2Icon, PlusIcon, Tag, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/lib/shared/components/ui/dialog"
import { Button } from "@/lib/shared/components/ui/button"
import { Input } from "@/lib/shared/components/ui/input"

export default function LabelSelect({ selectedLabels }: { selectedLabels: Label[] }) {
  const colorOptions = [
    "text-red-500",
    "text-yellow-500",
    "text-blue-500",
    "text-green-500",
    "text-pink-500",
    "text-purple-500",
    "text-orange-500",
    "text-gray-500",
  ]

  const initialLabels: Label[] = [
    { value: "important", label: "Important", color: "text-red-500" },
    { value: "draft", label: "Draft", color: "text-yellow-500" },
    { value: "review", label: "Review", color: "text-blue-500" },
    { value: "final", label: "Final", color: "text-green-500" },
  ]

  const [labels, setLabels] = React.useState<Label[]>(initialLabels)
  const [assignedLabels, setAssignedLabels] = React.useState<Label[]>(selectedLabels || [])
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editLabel, setEditLabel] = React.useState<Label | null>(null)
  const [newLabel, setNewLabel] = React.useState({ label: "", color: "text-gray-500" })

  // --- CRUD Handlers ---
  const handleAdd = () => {
    if (!newLabel.label.trim()) return
    const value = newLabel.label.toLowerCase().replace(/\s+/g, "-")
    setLabels([...labels, { value, label: newLabel.label, color: newLabel.color }])
    setNewLabel({ label: "", color: "text-gray-500" })
  }

  const handleEdit = (updated: Label) => {
    setLabels((prev) => prev.map((l) => (l.value === updated.value ? updated : l)))
    setEditLabel(null)
  }

  const handleDelete = (value: string) => {
    setLabels((prev) => prev.filter((l) => l.value !== value))
  }

  const toggleAssign = (label: Label) => {
    setAssignedLabels((prev) =>
      prev.find((l) => l.value === label.value) ? prev.filter((l) => l.value !== label.value) : [...prev, label],
    )
  }

  // --- UI ---
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger>
        <Tag className="mr-2 h-4 w-4" style={{ color: selectedLabels[0]?.color }} />
        Label
      </ContextMenuSubTrigger>

      <ContextMenuSubContent className="w-48">
        {labels.map((label) => (
          <ContextMenuItem
            key={label.value}
            onClick={() => toggleAssign(label)}
            className={`${assignedLabels.find((l) => l.value === label.value) ? "bg-gray-200 dark:bg-gray-700" : ""}`}
          >
            <Tag className={`mr-2 h-4 w-4 ${label.color}`} />
            {label.label}
          </ContextMenuItem>
        ))}

        <ContextMenuSeparator />

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <ContextMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit2Icon className="size-3 mr-2" />
              Edit Labels
            </ContextMenuItem>
          </DialogTrigger>

          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Edit Labels</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              {labels.map((label) => (
                <div key={label.value} className="flex items-center justify-between gap-2">
                  {editLabel?.value === label.value ? (
                    <div className="flex flex-col w-full gap-2">
                      <div className="flex gap-2">
                        <Input
                          value={editLabel.label}
                          onChange={(e) => setEditLabel({ ...editLabel, label: e.target.value })}
                        />
                        <Button variant="secondary" onClick={() => handleEdit(editLabel)}>
                          Save
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            onClick={() => setEditLabel({ ...editLabel, color })}
                            className={`w-6 h-6 rounded-full border ${
                              editLabel.color === color ? "ring-2 ring-offset-1" : ""
                            }`}
                          >
                            <Tag className={`${color} w-4 h-4 mx-auto`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 flex-1">
                        <Tag className={`h-4 w-4 ${label.color}`} />
                        <span>{label.label}</span>
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => setEditLabel(label)}>
                        <Edit2Icon className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(label.value)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </>
                  )}
                </div>
              ))}

              <div className="pt-2 border-t mt-4 space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="New label name"
                    value={newLabel.label}
                    onChange={(e) => setNewLabel({ ...newLabel, label: e.target.value })}
                  />
                  <Button onClick={handleAdd}>
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewLabel({ ...newLabel, color })}
                      className={`w-6 h-6 rounded-full border ${
                        newLabel.color === color ? "ring-2 ring-offset-1" : ""
                      }`}
                    >
                      <Tag className={`${color} w-4 h-4 mx-auto`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </ContextMenuSubContent>
    </ContextMenuSub>
  )
}
