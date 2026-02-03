import { useTranslation } from "react-i18next"
import InsigneCard from "@/components/insigne-card"
import { useInsignes } from "@/pages/insignes/useInsignes"
import InsignesSkeletonPage from "@/components/skeleton/insigne-page-skeleton"
import { NoDataCard } from "@/components/no-data-card"
import { ErrorCard } from "@/components/error-card"

export default function InsignesCirculaire() {
  const { t } = useTranslation()
  const { insignes, loading, error } = useInsignes("Circulaire")

  if (loading) 
    return <InsignesSkeletonPage />

  if (error)
    return <ErrorCard error={error} />

  if (insignes.length === 0)
    return <NoDataCard />

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {t("sidebar.insignes.circulaire")}
        </h1>
        <p className="text-muted-foreground">
          {insignes.length} insigne{insignes.length > 1 ? "s" : ""} trouvé
          {insignes.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {insignes.map((insigne) => (
          <InsigneCard key={insigne.name} insigne={insigne} />
        ))}
      </div>
    </div>
  )
}
