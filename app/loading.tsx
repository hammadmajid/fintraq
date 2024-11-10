import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex items-center justify-center gap-3 p-4 h-full">
      <Skeleton className="w-12 h-12" />
      <Skeleton className="w-12 h-12" />
      <Skeleton className="w-12 h-12" />
    </div>
  );
}
