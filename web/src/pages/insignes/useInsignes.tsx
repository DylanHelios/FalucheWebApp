import { useEffect, useState } from "react"
import api from "@/services/axios"
import { isAxiosError } from "axios"
import type { Insigne } from "@/types/Insigne"
import type { ApiItem } from "@/types/ApiItem"

export function useInsignes(provenance: string) {
  const [insignes, setInsignes] = useState<Insigne[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchInsignes = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data } = await api.get<ApiItem[]>(`/insignes/${provenance}`)

        if (cancelled) return

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
      } catch (err: any) {
        if (isAxiosError(err)) {
          setError(
            err.response ? `Erreur API: ${err.response.status}` : "API inaccessible"
          )
        } else {
          setError("Une erreur est survenue")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchInsignes()

    return () => {
      cancelled = true
    }
  }, [provenance])

  return { insignes, loading, error }
}
