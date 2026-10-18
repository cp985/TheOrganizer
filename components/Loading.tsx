export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col animate-pulse p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded-xl" />
          <div className="space-y-2">
            <div className="w-40 h-5 bg-muted rounded-md" />
            <div className="w-60 h-3 bg-muted/60 rounded-md" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-muted rounded-lg" />
          <div className="w-9 h-9 bg-muted rounded-lg" />
        </div>
      </div>

      {/* Main Layout Grid (Sidebar + Content) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1">
        
        {/* Sidebar Skeleton */}
        <div className="md:col-span-1 border border-border bg-card rounded-xl p-4 space-y-3">
          <div className="w-28 h-4 bg-muted rounded-md mb-4" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full h-8 bg-muted/50 rounded-lg flex items-center justify-between px-3">
                <div className="w-24 h-3 bg-muted rounded" />
                <div className="w-4 h-3 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3 space-y-6">
          
          {/* Action Bar Skeleton */}
          <div className="border border-border bg-card rounded-xl p-3 flex flex-wrap items-center gap-3">
            <div className="h-8 bg-muted rounded-lg flex-1 min-w-[200px]" />
            <div className="h-8 bg-muted rounded-lg w-28 shrink-0" />
            <div className="h-8 bg-muted rounded-lg w-28 shrink-0" />
            <div className="h-8 bg-muted rounded-lg w-20 shrink-0" />
            <div className="h-8 bg-muted rounded-lg w-32 shrink-0 ml-auto" />
          </div>

          {/* Grid Skeleton: 6 Card Product (3 colonne x 2 righe) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="border border-border bg-card rounded-xl p-4 flex flex-col justify-between h-48 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-16 h-16 bg-muted rounded-lg shrink-0" />
                  <div className="space-y-2 flex flex-col items-end">
                    <div className="w-16 h-5 bg-muted rounded-full" />
                    <div className="w-12 h-3 bg-muted/60 rounded" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="w-3/4 h-4 bg-muted rounded-md" />
                  <div className="w-1/2 h-3 bg-muted/60 rounded-md" />
                </div>

                <div className="border-t border-border/60 pt-3 flex justify-between items-center">
                  <div className="w-16 h-4 bg-muted rounded" />
                  <div className="w-16 h-4 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}