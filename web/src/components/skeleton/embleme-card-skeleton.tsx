import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EmblemeCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <CardContent className="p-4 flex flex-col gap-3 h-full">
        {/* Skeleton image */}
        <div className="h-32 w-full flex items-center justify-center bg-muted rounded-md overflow-hidden flex-shrink-0">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Skeleton text */}
        <div className="flex flex-col gap-2 flex-grow">
          <Skeleton className="h-4 w-3/4 rounded" /> {/* Nom emblème */}
          <Skeleton className="h-3 w-1/4 rounded" /> {/* Badge couleur */}
          <Skeleton className="h-10 w-full rounded" /> {/* Description / autres infos */}
        </div>
      </CardContent>
    </Card>
  )
}
