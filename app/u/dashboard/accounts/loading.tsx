import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountsLoading() {
  return (
    <main>
      <Skeleton className="h-9 w-[200px] mb-2" />
      <Skeleton className="h-5 w-[300px] mb-6" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(5)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Skeleton className="w-6 h-6 mr-2" />
                  <Skeleton className="h-6 w-[100px]" />
                </div>
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
              <Skeleton className="w-full h-4 mb-4" />
              <Skeleton className="h-8 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
