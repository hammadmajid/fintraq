import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="grid min-h-screen place-content-center">
      <div className="mx-auto grid w-[350px] gap-8">
        <div>
          <Skeleton className="w-40 mb-2 h-9" />
          <Skeleton className="h-6 w-60" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    </main>
  );
}
