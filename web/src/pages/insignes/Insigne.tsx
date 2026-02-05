import InsignesAutodecerne from "./autodecerne/InsigneAutodecerne"
import InsignesCirculaire from "./circulaire/InsigneCirculaire"
import InsignesCroix from "./croix/InsigneCroix"
import InsignesElu from "./élu/InsignesElu"
import InsignesRegion from "./region/InsignesRegion"
import InsignesPartenaire from "./partenaire/InsignePartenaire"
import { Separator } from "@/components/ui/separator"
import { InsigneCard } from "@/components/card-pins"

export default function Insigne() {
  return (
    <>
      <InsigneCard>
        <InsignesAutodecerne />
      </InsigneCard>

      <Separator className="my-8" />

      <InsigneCard>
        <InsignesCirculaire />
      </InsigneCard>

      <Separator className="my-8" />

      <InsigneCard>
        <InsignesCroix />
      </InsigneCard>

      <Separator className="my-8" />

      <InsigneCard>
        <InsignesElu />
      </InsigneCard>

      <Separator className="my-8" />

      <InsigneCard>
        <InsignesPartenaire />
      </InsigneCard>

      <Separator className="my-8" />

      <InsigneCard>
        <InsignesRegion />
      </InsigneCard>
    </>
  )
}