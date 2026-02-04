import EmblemeCardSkeleton from "./embleme-card-skeleton";

export default function EmblemesSkeletonPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Chargement des emblèmes…</h1>
        <p className="text-muted-foreground">
          Patientez, les emblèmes sont en cours de chargement
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <EmblemeCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
