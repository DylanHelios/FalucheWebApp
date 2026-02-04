import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Embleme } from "@/types/Embleme";

export default function EmblemeCard({ embleme }: { embleme: Embleme }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex flex-col gap-3 h-full">
        {/* Image */}
        <div className="h-32 w-full flex items-center justify-center bg-muted rounded-md overflow-hidden flex-shrink-0">
          {embleme.ImageData ? (
            <img
              src={`data:image/png;base64,${embleme.ImageData}`}
              alt={embleme.Embleme}
              className="h-full object-contain"
            />
          ) : (
            <div className="text-xs text-muted-foreground">Aucune image</div>
          )}
        </div>

        {/* Infos */}
        <div className="flex flex-col gap-2 flex-grow">
          <h3 className="font-medium leading-tight">{embleme.Embleme}</h3>

          {embleme.Couleur && (
            <Badge
              variant="outline"
              className="w-fit text-xs"
              style={{ backgroundColor: embleme.Couleur, color: "#fff" }}
            >
              Couleur : {embleme.Couleur}
            </Badge>
          )}

          {embleme.Domaine && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              Domaine : {embleme.Domaine}
            </p>
          )}

          {embleme.Matiere && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              Matière : {embleme.Matiere}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
