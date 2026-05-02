import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface UnderConstructionProps {
  title: string
  description: string
  icon: LucideIcon
}

export function UnderConstruction({
  title,
  description,
  icon: Icon,
}: UnderConstructionProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-2 flex items-center gap-3">
            <Icon className="size-8 text-primary" />
            <CardTitle>{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">
              This page is under construction. Check back soon!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
