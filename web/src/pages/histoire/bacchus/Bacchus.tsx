import { Card, CardContent } from "@/components/ui/card";
import BacchusImage from "@/assets/bacchus.png";

export default function Bacchus() {
  return (
    <div className="container mx-auto px-6 py-2   ">
      <Card className="flex flex-col lg:flex-row items-center gap-2 p-2">
        <CardContent className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-10">Bacchus</h1>

          <p className="text-lg leading-relaxed mb-4">
            Dieu romain, équivalent de Dionysos dans l’Antiquité grecque, Bacchus est le dieu du vin,
            de l’ivresse, des débordements et de la nature. Il est considéré comme une autre facette de
            Liber Pater, le dieu latin de la fécondité.
            <br />
            <br />
            Il est l’une des représentations parfaites des trois B de la faluche (Bonne Baise, Bonne
            Bouffe, Bonne Boisson) ; en effet, représentant l’amour de la consommation du vin
            (en toute modération... ou non), consommation pouvant entraîner déboires et histoires
            abracadabrantes.
          </p>

          <p className="text-lg leading-relaxed mt-4">
            Le vin, rassemblant autour d’une table et libérant les mœurs, fait de Bacchus un dieu
            parfaitement lié au festoiement faluchard. Il est également le père du théâtre et de la
            tragédie, associant au plaisir du vin ceux de l’esprit et de l’amusement.
          </p>
        </CardContent>

        <div className="lg:w-1/2 flex justify-center">
          <img
            src={BacchusImage}
            alt="Bacchus"
            className="rounded-lg shadow-lg"
            width={400}
            height={400}
          />
        </div>
      </Card>
    </div>
  );
}