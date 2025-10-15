import React from 'react'

export default function loading() {
  return (
    <section className="flex w-full flex-1 gap-0 px-8 py-4">
      <div className="flex h-full w-full animate-pulse items-center justify-between gap-4 rounded-md border bg-muted/50 px-4 md:px-6">
        <div className="h-4 w-1/4 rounded bg-muted" />
        <div className="h-4 w-1/4 rounded bg-muted" />
        <div className="h-4 w-1/4 rounded bg-muted" />
      </div>
    </section>
  )
}
