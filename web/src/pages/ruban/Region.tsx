import { useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { colorNameMap, couleurMap } from '@/types/color';


export default function ProvincesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const provincesData = [
    { name: "Alsace", colors: ["bg-red-600", "bg-white"], regions: "Bas Rhin, Haut Rhin" },
    { name: "Angoumois", colors: ["bg-red-600", "bg-yellow-400"], regions: "Charente" },
    { name: "Anjou", colors: ["bg-red-600", "bg-blue-900"], regions: "Maine et Loire, Mayenne" },
    { name: "Artois", colors: ["bg-red-600", "bg-blue-900"], regions: "Pas de Calais" },
    { name: "Aunis", colors: ["bg-red-600", "bg-yellow-400"], regions: "Charente-Maritime" },
    { name: "Auvergne", colors: ["bg-red-600", "bg-green-700", "bg-yellow-400"], regions: "Cantal, Haute Loire, Puy de Dôme" },
    { name: "Béarn", colors: ["bg-red-600", "bg-yellow-400"], regions: "Pyrénées Atlantiques" },
    { name: "Berry", colors: ["bg-red-600", "bg-blue-900"], regions: "Cher, Indre" },
    { name: "Bourbonnais", colors: ["bg-red-600", "bg-blue-900"], regions: "Allier" },
    { name: "Bourgogne", colors: ["bg-blue-900", "bg-yellow-400", "bg-red-600"], regions: "Côte d’Or, Saône et Loire, Sud de l’Yonne" },
    { name: "Bretagne", colors: ["bg-black", "bg-white"], regions: "Côtes d’Armor, Finistère, Ille et Vilaine, Morbihan, Loire Atlantique" },
    { name: "Champagne", colors: ["bg-blue-600", "bg-white"], regions: "Ardennes, Marne, Aube, Nord de l’Yonne, Seine et Marne" },
    { name: "Comtat Venaissin", colors: ["bg-red-600", "bg-yellow-400"], regions: "Vaucluse" },
    { name: "Comté de Foix", colors: ["bg-red-600", "bg-yellow-400"], regions: "Ariège" },
    { name: "Comté de Nice", colors: ["bg-sky-300", "bg-blue-400"], regions: "Alpes Maritimes" },
    { name: "Corse", colors: ["bg-black", "bg-white"], regions: "Haute Corse, Basse Corse" },
    { name: "Dauphiné", colors: ["bg-blue-900", "bg-yellow-400"], regions: "Hautes Alpes, Drôme, Isère" },
    { name: "Flandre", colors: ["bg-yellow-400", "bg-black"], regions: "Nord (Lille : Blanc/Rouge), Belgique" },
    { name: "Franche Comté", colors: ["bg-blue-600", "bg-yellow-400"], regions: "Doubs, Jura, Haute Saône, Belfort, Sud-Est Vosges" },
    { name: "Gascogne", colors: ["bg-blue-900", "bg-red-600"], regions: "Haute Garonne, Gers, Landes, Pyrénées Atlantiques, Hautes Pyrénées" },
    { name: "Guyenne", colors: ["bg-red-600", "bg-yellow-400"], regions: "Aveyron, Dordogne, Gironde, Lot, Lot et Garonne, Tarn et Garonne" },
    { name: "Ile de France", colors: ["bg-blue-900", "bg-yellow-400"], regions: "Eure et Loire, Paris (Bleu/Blanc), Seine St Denis, Val de Marne, Val d’Oise, Yvelines" },
    { name: "Languedoc", colors: ["bg-red-600", "bg-yellow-400"], regions: "Aude, Gard, Hérault, Haute Garonne, Tarn" },
    { name: "Limousin", colors: ["bg-red-600", "bg-white"], regions: "Corrèze, Sud de la Creuse, Haute Vienne" },
    { name: "Lorraine", colors: ["bg-yellow-400", "bg-red-600"], regions: "Meurthe et Moselle, Moselle, Vosges" },
    { name: "Lyonnais", colors: ["bg-red-600", "bg-blue-900"], regions: "Ain, Loire, Rhône" },
    { name: "Maine", colors: ["bg-red-600", "bg-blue-600"], regions: "Sarthe" },
    { name: "Marche", colors: ["bg-blue-900", "bg-red-600"], regions: "Nord de la Creuse (Guéret)" },
    { name: "Nivernais", colors: ["bg-red-600", "bg-yellow-400", "bg-blue-900"], regions: "Nièvre" },
    { name: "Normandie", colors: ["bg-red-600", "bg-yellow-500"], regions: "Calvados, Eure, Manche, Orne, Seine Maritime" },
    { name: "Orléanais", colors: ["bg-blue-900", "bg-yellow-400"], regions: "Loiret, Loir et Cher" },
    { name: "Picardie", colors: ["bg-sky-400", "bg-white"], regions: "Aisne, Oise, Somme" },
    { name: "Poitou", colors: ["bg-red-600", "bg-yellow-400"], regions: "Deux Sèvres, Vendée, Vienne" },
    { name: "Provence", colors: ["bg-red-600", "bg-yellow-400", "bg-red-600", "bg-yellow-400"], regions: "Alpes de Hte Provence, Alpes Maritimes, Bouches du Rhône, Var, Vaucluse" },
    { name: "Roussillon", colors: ["bg-yellow-400", "bg-red-600"], regions: "Aude, Pyrénées Orientales" },
    { name: "Saintonge", colors: ["bg-blue-600", "bg-slate-200"], regions: "Charentes Maritimes" },
    { name: "Savoie", colors: ["bg-red-600", "bg-white"], regions: "Savoie, Haute Savoie, Sud Est de l'Ain" },
    { name: "Touraine", colors: ["bg-red-600", "bg-blue-900"], regions: "Indre et Loire" }
  ];

  const filtered = provincesData
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.regions.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
    <h1 className="text-2xl font-bold mb-6 mt-6 ml-6">Provinces historiques de France</h1>

    <div className="p-6 space-y-6">
      <Input 
        placeholder="Rechercher une province..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-xs bg-white"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((province) => (
          <Card key={province.name} className="overflow-hidden hover:shadow-lg transition-shadow border-zinc-200">
            <CardTitle className="text-lg pl-4 font-semibold text-white:shadow-lg text-dark:light">{province.name}</CardTitle>
            <CardContent className="p-4 flex flex-col gap-3 h-full">
              
              <div className="h-32 w-full flex flex-col bg-muted rounded-md overflow-hidden flex-shrink-0 border border-zinc-100">
                {province.colors.map((colorClass, idx) => (
                  <div 
                    key={idx} 
                    className="flex-1 w-full"
                    style={{ backgroundColor: couleurMap[colorClass] }}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-2 flex-grow">
                <h3 className="font-medium leading-tight text-zinc-900">{province.name}</h3>

                <div className="flex flex-wrap gap-1">
                  {province.colors.map((colorClass, idx) => {
                    const bgColor = couleurMap[colorClass];
                    const textColor = ["bg-black", "bg-blue-900", "bg-red-600"].includes(colorClass) ? "#FFF" : "#000";
                    
                    return (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-[10px] px-2 py-0 border-zinc-200"
                        style={{ backgroundColor: bgColor, color: textColor }}
                      >
                        {colorNameMap[colorClass] || "Couleur"}
                      </Badge>
                    );
                  })}
                </div>

                <p className="text-sm text-zinc-500 line-clamp-2 mt-1">
                  Territoires : {province.regions}
                </p>
              </div>
            </CardContent>
          </Card>
          
        ))}
      </div>
    </div>
    </>
  );
}