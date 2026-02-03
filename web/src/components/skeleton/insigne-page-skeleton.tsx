import InsigneCardSkeleton from "./insigne-card-skeleton";

export default function InsignesSkeletonPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Chargement des insignes…</h1>
        <p className="text-muted-foreground">
          Patientez, les insignes sont en cours de chargement
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <InsigneCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
