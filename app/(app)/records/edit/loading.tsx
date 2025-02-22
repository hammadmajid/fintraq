import { Skeleton } from "@/components/ui/skeleton";

export default function RecordsLoading() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-[250px] mb-4" />
        <Skeleton className="h-10 w-[150px] mb-4" />
      </div>
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-[200px]" />
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
