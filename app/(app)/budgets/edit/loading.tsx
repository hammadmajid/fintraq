import { Skeleton } from "@/components/ui/skeleton";

export default function AccountFormSkeleton() {
  return (
    <main>
      <div className="flex justify-between">
        <Skeleton className="h-10 w-[250px] mb-4" />
        <Skeleton className="h-10 w-[150px] mb-4" />
      </div>

      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-[200px]" />
      </div>

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

        {/* Goal field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Goal field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-3/5" />
        </div>

        {/* Submit button */}
        <Skeleton className="h-10 w-full" />
      </div>
    </main>
  );
}
