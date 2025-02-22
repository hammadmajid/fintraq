import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main>
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="w-40 h-9" />
        <div className="space-x-2">
          <Skeleton className="inline-block h-10 w-36" />
          <Skeleton className="inline-block w-32 h-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="w-40 h-6 mb-2" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="w-24 h-6 mb-2" />
            <Skeleton className="w-48 h-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[250px] w-[250px] rounded-full mx-auto" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
