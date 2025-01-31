import { Skeleton } from "@/components/ui/skeleton";

export default function AccountFormSkeleton() {
  return (
    <main className="p-12">
      <div className="space-y-6">
        {/* Title field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Description field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Type field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Initial Balance field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-3/5" />
        </div>

        {/* Color field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Icon field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <div className="flex flex-wrap gap-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Submit button */}
        <Skeleton className="h-10 w-full" />
      </div>
    </main>
  );
}
