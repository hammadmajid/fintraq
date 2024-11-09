import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main>
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-9 w-40" />
        <div className="space-x-2">
          <Skeleton className="h-10 w-36 inline-block" />
          <Skeleton className="h-10 w-32 inline-block" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[250px] w-[250px] rounded-full mx-auto" />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}