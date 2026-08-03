import Skeleton from './Skeleton'

/**
 * Structured skeleton patterns so every loading state matches its
 * real content shape.
 */

export function SkeletonCardGrid({ count = 10 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="space-y-3 rounded-2xl bg-white/[0.02] p-3"
        >
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonHero() {
  return <Skeleton className="h-60 w-full rounded-3xl sm:h-72" />
}

export function SkeletonList({ count = 6 }) {
  return (
    <div className="space-y-1 rounded-2xl border border-white/[0.06] bg-surface/40 p-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 px-3 py-2">
          <Skeleton className="h-4 w-6" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-1/3" />
            <Skeleton className="h-3 w-1/5" />
          </div>
          <Skeleton className="h-3 w-8" />
        </div>
      ))}
    </div>
  )
}
