import EmblemesSkeletonPage from "@/components/skeleton/embleme-page-skeleton";
import { useEmblemes } from "./useEmblemes";
import { ErrorCard } from "@/components/error-card";
import { NoDataCard } from "@/components/no-data-card";
import EmblemeCard from "@/components/embleme-card";

interface EmblemesListProps {
  type?: string;
}

export function EmblemesList({ type }: EmblemesListProps) {
  const { emblemes, loading, error } = useEmblemes(type);

  if (loading) return <EmblemesSkeletonPage />;
  if (error) return <ErrorCard error={error} />;
  if (!emblemes || emblemes.length === 0) return <NoDataCard />;

  const emblemesSorted = [...emblemes].sort((a, b) =>
    a.Couleur.localeCompare(b.Couleur, "fr", { sensitivity: "base" })
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {emblemesSorted.map((embleme) => {
        const uid = crypto.randomUUID();
        return <EmblemeCard key={uid} embleme={embleme} />;
      })}
    </div>
  );
}