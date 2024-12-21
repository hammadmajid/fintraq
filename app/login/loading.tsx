import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen grid place-content-center">
      <div className="mx-auto grid w-[350px] gap-8">
        <div>
          <Skeleton className="h-9 w-40 mb-2" />
          <Skeleton className="h-6 w-60" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </main>
  );
}
