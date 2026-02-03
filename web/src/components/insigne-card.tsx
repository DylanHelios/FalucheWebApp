import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Insigne } from "@/types/Insigne";

export default function InsigneCard({ insigne }: { insigne: Insigne }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex flex-col gap-3 h-full">
        <div className="h-32 w-full flex items-center justify-center bg-muted rounded-md overflow-hidden flex-shrink-0">
          {insigne.image ? (
            <img
              src={insigne.image}
              alt={insigne.name}
              className="h-full object-contain"
            />
          ) : (
            <div className="text-xs text-muted-foreground">Aucune image</div>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-grow">
          <h3 className="font-medium leading-tight">{insigne.name}</h3>
          <Badge variant="outline" className="w-fit text-xs">
            {insigne.provenance}
          </Badge>

          {insigne.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {insigne.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}