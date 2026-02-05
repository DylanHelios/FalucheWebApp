import { Card, CardContent } from "@/components/ui/card";
import heraldique from "@/assets/heraldique.svg.png";

export default function Heraldique() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 flex flex-col md:flex-row gap-6">
          
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Couleurs en héraldique</h1>
              <p className="text-muted-foreground">
                En héraldique, la couleur désigne l’attribut coloré d’un champ ou d’une charge.
                Les noms de couleur renvoient à un système codifié réparti en trois grandes catégories.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Métaux</h2>
              <p className="text-muted-foreground">
                Les métaux sont principalement composés de l’or (jaune) et de l’argent (blanc).
                Certaines illustrations utilisent le doré et l’argenté, ce qui est admis en français.
                Toutefois, la norme internationale — notamment en héraldique anglaise — emploie
                les termes <strong>Or</strong> et <strong>Argent</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Émaux</h2>
              <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                <li>Azur (bleu)</li>
                <li>Gueules (rouge)</li>
                <li>Sable (noir)</li>
                <li>Sinople (vert)</li>
                <li>Pourpre (pourpre-violet)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Fourrures</h2>
              <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                <li>
                  Hermine : fond d’argent (blanc) moucheté de sable (noir)
                </li>
                <li>
                  Vair : pavage de clochetons alternant azur (bleu) et argent (blanc)
                </li>
              </ul>

              <p className="text-muted-foreground mt-3">
                Leur forme connaît de nombreuses variantes (contre-vair, herminé, potencé,
                contre-hermine). Ce sont des compositions bichromatiques associant un émail et
                un métal, non concernées par la règle de contrariété des couleurs.
              </p>

              <p className="text-muted-foreground mt-2">
                Les variantes non répertoriées doivent être blasonnées selon les couleurs
                effectivement utilisées.
              </p>
            </div>
          </div>

        <div className="w-full md:w-64 flex items-start justify-center">
            <div className="bg-white p-4 rounded-2xl border">
                <img
                src={heraldique}
                alt="Schéma héraldique"
                className="w-full h-auto object-contain"
                />
            </div>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}