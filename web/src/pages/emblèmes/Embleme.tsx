import { InsigneCard } from "@/components/card-pins"
import EmblemeVelour from "./velour/EmblemeVelour"
import { Separator } from "@/components/ui/separator"
import EmblemeSatin from "./satin/EmblemeSatin"

export default function Embleme() {

  return (
    <>
       <InsigneCard>
        <EmblemeVelour />
      </InsigneCard>

      <Separator className="my-8" />

      <InsigneCard>
        <EmblemeSatin />
      </InsigneCard>
    </>
  )
}

