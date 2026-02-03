import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import type { Insigne } from "@/types/Insigne"
import type { ApiItem } from "@/types/ApiItem"
import InsigneCard from "@/components/insigne-card"

// Prefer using an env var so the API host is configurable in dev/prod
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL ??
  "http://127.0.0.1:8000"

export default function InsignesCirculaire() {
  const { t } = useTranslation()
  const [insignes, setInsignes] = useState<Insigne[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchInsignes = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/insignes/circulaire/Circulaire`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error(`Erreur API: ${response.status}`)
        }

        const data: ApiItem[] = await response.json()
        const map = new Map<string, Insigne>()

        data.forEach((item) => {
          const key = item.n.name

          if (!map.has(key)) {
            map.set(key, {
              name: item.n.name,
              provenance: item.n.provenance,
            })
          }

          const current = map.get(key)!

          if (item.relation === "a_pour_image" && item.m?.data) {
            current.image = `data:image/png;base64,${item.m.data}`
          }

          if (item.relation === "signifie" && item.m?.description) {
            current.description = item.m.description
          }
        })

        setInsignes(Array.from(map.values()))
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return
        }
        setError(err instanceof Error ? err.message : "Une erreur est survenue")
      } finally {
        setLoading(false)
      }
    }
    fetchInsignes()

    // Cleanup: abort fetch if component unmounts
    return () => controller.abort()
  }, [])

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Chargement…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <h3 className="font-semibold mb-2">Erreur de chargement</h3>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (insignes.length === 0) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-700">
          <p>Aucun insigne trouvé.</p>
        </div>
      </div>
    )
  }

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
