import { Card, CardContent, CardHeader } from "@/lib/shared/components/ui/card";

export default function Loading() {
  return (
    <section className="flex w-full flex-1 gap-0 px-8 py-4">
      <Card className="flex-1 gap-0 border-2 bg-transparent p-0">
        <CardHeader className="gap-0 p-4">
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-56 animate-pulse rounded bg-muted" />
          <div className="absolute right-4 top-4 h-9 w-36 animate-pulse rounded-md bg-muted" />
        </CardHeader>
        <CardContent className="bg-secondary flex flex-1 flex-col gap-4 rounded-b-lg p-4 lg:flex-row">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex h-48 w-full flex-col gap-3 rounded-lg border-2 bg-card p-4 lg:w-80">
              {/* Story title skeleton */}
              <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
              {/* Story description skeleton */}
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
              {/* Spacer */}
              <div className="flex-1" />
              {/* Action buttons skeleton */}
              <div className="flex gap-2">
                <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
                <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
