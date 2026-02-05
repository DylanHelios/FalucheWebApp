// pages/potager/PotagerLegumes.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Carrot } from "lucide-react"

export default function HistoryPotager() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-start gap-4">
          <div className="p-2 rounded-xl bg-muted">
            <Carrot className="h-6 w-6" />
          </div>

          <div>
            <CardTitle className="text-2xl">Les légumes du potager</CardTitle>
            <CardDescription>
              Origine et symbolique dans la tradition étudiante
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Dans les traditions étudiantes anciennes, les étudiants étaient fréquemment logés
            en ville chez des « logeuses ». Ces dernières préparaient le soir la base de la
            soupe, composée principalement de pommes de terre — ce qui explique leur apparition
            relativement tardive dans le « potager » symbolique.
          </p>

          <p>
            Les étudiants devaient, quant à eux, apporter les autres légumes nécessaires :
            carottes, poireaux, navets et divers produits du potager.
          </p>

          <p>
            Selon la tradition orale, les conversations à table devaient rester convenables,
            ce qui empêchait les étudiants d’évoquer directement leurs aventures ou leurs
            exploits. Pour contourner cette contrainte, ils auraient progressivement attribué
            des significations symboliques aux légumes qu’ils rapportaient.
          </p>

          <p>
            Ainsi, chaque légume devenait un code implicite permettant d’évoquer des expériences,
            des situations ou des traits de caractère, donnant naissance à tout un langage
            symbolique intégré à la culture du potager étudiant.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}