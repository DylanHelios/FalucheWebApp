import InsignesSkeletonPage from "@/components/skeleton/insigne-page-skeleton";
import { useInsignes } from "./useInsignes";
import { ErrorCard } from "@/components/error-card";
import { NoDataCard } from "@/components/no-data-card";
import InsigneCard from "@/components/insigne-card";

interface InsignesListProps {
  type: string;
}

export function InsignesList({ type }: InsignesListProps) {
  const { insignes, loading, error } = useInsignes(type);

  if (loading) return <InsignesSkeletonPage />;
  if (error) return <ErrorCard error={error} />;
  if (!insignes || insignes.length === 0) return <NoDataCard />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {insignes.map((insigne) => (
        <InsigneCard key={insigne.name} insigne={insigne} />
      ))}
    </div>
  );
}