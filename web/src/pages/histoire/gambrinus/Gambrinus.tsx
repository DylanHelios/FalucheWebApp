import { Card, CardContent } from "@/components/ui/card";
import GambrinusImage from "@/assets/gambrinus.png";

export default function Gambrinus() {
  return (
    <div className="container mx-auto px-6 py-12">
      <Card className="flex flex-col-reverse lg:flex-row items-center gap-8 p-6">

        <CardContent className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-10">Gambrinus</h1>

          <p className="text-lg leading-relaxed mb-4">
            Héros du Houblon et symbole des amateurs de bière. La légende raconte que Gambrinus, habitant à
            Fresnes-sur-Escaut, une petite ville des Flandres françaises, et exerçant le métier de carillonneur,
            était amoureux de Flandrine, la fille de son maître, qui était verrier. Hélas, cet amour était à sens
            unique. On dit que, malade de tristesse, il se mit à trembler au point de ne plus pouvoir jouer
            correctement du carillon et à pleurer de désespoir à n’importe quelle heure du jour ou de la nuit.
            Les habitants de Fresnes le mirent en prison pour tapage nocturne, non sans l’avoir insulté et roué
            de coups.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            Lorsqu’il fut sorti de prison, un mois plus tard, il tenta de se suicider mais le diable lui apparut,
            lui proposant un pacte : oublier la belle en échange de son âme que le diable viendrait chercher
            trente ans plus tard. Gambrinus accepta le pacte et s’enrichit par des jeux d’argent, devenant bientôt
            très riche au point de pouvoir s’offrir de nombreux trésors. Mais il ne parvenait toujours pas à
            oublier Flandrine.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            Il choisit de rencontrer de nouveau le diable, qui lui donna des graines de houblon afin de créer un
            breuvage digne du diable et lui montra comment fabriquer un carillon auquel nul ne pourrait résister.
            Gambrinus organisa alors une fête où tous étaient conviés. Les habitants de Fresnes trouvèrent la bière
            fort amère. Gambrinus commença à jouer du carillon dans le but d’accomplir sa vengeance, et tous
            dansèrent jusqu'à épuisement, sautant et se démenant comme des diables sur la piste. La vengeance de
            Gambrinus était accomplie : les villageois étaient tombés, incapables de résister au carillon de celui
            qu’ils avaient enfermé pour tapage nocturne. Après avoir été épuisés par cette danse endiablée, ils
            se précipitèrent sur la bière pour se rafraîchir et découvrirent que plus on en buvait, plus elle était douce.
          </p>

          <p className="text-lg leading-relaxed mb-4">
            La boisson se fit connaître au-delà des frontières du pays et le roi des Flandres, pour récompenser
            Gambrinus de ce succès, le nomma duc, comte et seigneur. Mais il préféra le titre de « Héros du Houblon »
            que lui avaient donné les habitants de Fresnes. Peu de temps après, Flandrine vint lui parler dans sa
            taverne, mais il se contenta de lui servir une chope de bière, sans un mot ni un regard, certainement
            trop habitué à servir les nombreux clients qui se pressaient au comptoir… il l’avait oubliée.
          </p>

          <p className="text-lg leading-relaxed">
            Lorsque les trente années furent passées et que le diable revint, Gambrinus joua du carillon jusqu’à
            ce que le diable, épuisé, boive suffisamment de bière pour oublier qu’il était venu chercher l’âme
            de Gambrinus et parte sans la récupérer. Gambrinus vécut heureux cent ans encore, continuant à boire
            de la bière et à jouer du carillon. À sa mort, on retrouva à sa place un tonneau de bière : c’est
            pourquoi aucune tombe ne porte son nom.
          </p>
        </CardContent>

        <div className="lg:w-1/2 flex justify-center mb-6 lg:mb-0">
          <img
            src={GambrinusImage}
            alt="Gambrinus"
            className="rounded-lg shadow-lg"
            width={400}
            height={400}
          />
        </div>
      </Card>
    </div>
  );
}