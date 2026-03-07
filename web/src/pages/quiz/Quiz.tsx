import { useEffect, useMemo, useRef, useState } from "react"

import api from "@/services/axios"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ErrorCard } from "@/components/error-card"
import { NoDataCard } from "@/components/no-data-card"
import EmblemesSkeletonPage from "@/components/skeleton/embleme-page-skeleton"
import InsignesSkeletonPage from "@/components/skeleton/insigne-page-skeleton"
import { useEmblemes } from "@/pages/emblèmes/useEmblemes"
import type { ApiItem } from "@/types/ApiItem"
import type { Embleme } from "@/types/Embleme"

const couleurMap: Record<string, string> = {
  Argenté: "#C0C0C0",
  Saumon: "#FA8072",
  Orange: "#FFA500",
  Violet: "#8A2BE2",
  Blanc: "#FFFFFF",
  Rose: "#ff00a2",
  Marron: "#8B4513",
  Rouge: "#FF0000",
  "Bleu roy": "#4169E1",
  Vert: "#008000",
  Fuchsia: "#FF00FF",
  Bordeaux: "#800000",
  "Vert clair": "#90EE90",
  Bleu: "#4040f8",
  "Vert foncé": "#006400",
  Jaune: "#FFFF00",
}

const INSIGNE_TYPES = [
  "Autodecerné",
  "Circulaire",
  "GM",
  "Partenaire",
  "Partie régionale",
  "Régional",
  "Regionaux",
  "Ruban d'élu",
  "Potager",
]

const INSIGNE_GROUP_ORDER = [
  "Autodécernés",
  "GM",
  "Circulaire",
  "Partenaire",
  "Regionaux",
  "Ruban d'élu",
  "Potager",
  "Autres",
]

type QuizMode = "emblemes" | "insignes"

interface QuizPageProps {
  fixedMode?: QuizMode
}

interface InsigneQuizItem {
  name: string
  provenance: string
  description?: string
  image?: string
}

interface Group<T> {
  title: string
  items: T[]
}

function normalize(value: string) {
  return value
    .replace(/[’'`´]/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
}

function maskText(text: string, guesses: Set<string>) {
  const parts = text.split(/([A-Za-zÀ-ÿ0-9]+)/g)

  return parts
    .map((part) => {
      if (!part) return ""
      if (!/[A-Za-zÀ-ÿ0-9]+/.test(part)) return part

      return guesses.has(normalize(part)) ? part : "_".repeat(Math.max(3, part.length))
    })
    .join("")
}

function isFullyRevealed(text: string, guesses: Set<string>) {
  const tokens = text.split(/[^A-Za-zÀ-ÿ0-9]+/g).filter(Boolean)
  if (!tokens.length) return true
  return tokens.every((token) => {
    const t = normalize(token)
    if (guesses.has(t)) return true
    if (t.endsWith("s") && guesses.has(t.slice(0, -1))) return true
    return guesses.has(`${t}s`)
  })
}

function canonicalMatiere(matiere?: string) {
  const n = normalize(matiere || "")
  if (n.includes("velour")) return "Velour"
  if (n.includes("satin")) return "Satin"
  return "Autres"
}

function insigneGroupTitle(provenance?: string) {
  const n = normalize(provenance || "")
  if (n.includes("autodecerne")) return "Autodécernés"
  if (n === "gm") return "GM"
  if (n.includes("circulaire")) return "Circulaire"
  if (n.includes("partenaire")) return "Partenaire"
  if (n.includes("region") || n.includes("partie regionale")) return "Regionaux"
  if (n.includes("ruban d'elu") || n.includes("ruban d elu")) return "Ruban d'élu"
  if (n.includes("potager")) return "Potager"
  return "Autres"
}

function groupByTitle<T>(items: T[], getTitle: (item: T) => string, titleOrder?: string[]) {
  const map = new Map<string, T[]>()

  items.forEach((item) => {
    const title = getTitle(item)
    const current = map.get(title) ?? []
    current.push(item)
    map.set(title, current)
  })

  const groups: Group<T>[] = Array.from(map.entries()).map(([title, groupItems]) => ({
    title,
    items: groupItems,
  }))

  if (titleOrder) {
    const rank = new Map(titleOrder.map((title, idx) => [title, idx]))
    groups.sort((a, b) => {
      const ra = rank.get(a.title) ?? Number.MAX_SAFE_INTEGER
      const rb = rank.get(b.title) ?? Number.MAX_SAFE_INTEGER
      if (ra !== rb) return ra - rb
      return a.title.localeCompare(b.title, "fr", { sensitivity: "base" })
    })
  } else {
    groups.sort((a, b) => a.title.localeCompare(b.title, "fr", { sensitivity: "base" }))
  }

  return groups
}

function EmblemeQuizCard({ embleme, guesses }: { embleme: Embleme; guesses: Set<string> }) {
  const bgColor = embleme.Couleur ? couleurMap[embleme.Couleur] || "#888" : "#888"
  const nameRevealed = isFullyRevealed(embleme.Embleme, guesses)
  const colorRevealed = isFullyRevealed(embleme.Couleur || "", guesses)
  const domaineRevealed = isFullyRevealed(embleme.Domaine || "", guesses)
  const matiereRevealed = isFullyRevealed(embleme.Matiere || "", guesses)
  const imageRevealed = nameRevealed && colorRevealed && domaineRevealed && matiereRevealed

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex flex-col gap-3 h-full">
        <div className="h-32 w-full flex items-center justify-center rounded-md overflow-hidden flex-shrink-0 bg-black">
          {imageRevealed && embleme.ImageData ? (
            <img
              src={`data:image/png;base64,${embleme.ImageData}`}
              alt="Emblème"
              className="h-full object-contain"
            />
          ) : (
            <div className="text-xs text-white/80">Image cachée</div>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-grow">
          <h3 className="font-medium leading-tight">{maskText(embleme.Embleme, guesses)}</h3>

          <Badge
            variant="outline"
            className="w-fit text-xs"
            style={{
              backgroundColor: colorRevealed ? bgColor : "#000000",
              color: colorRevealed ? "#000000" : "#FFFFFF",
            }}
          >
            Couleur : {maskText(embleme.Couleur || "Inconnue", guesses)}
          </Badge>

          <p className="text-sm text-muted-foreground line-clamp-2">
            Domaine : {maskText(embleme.Domaine || "Inconnu", guesses)}
          </p>

          <p className="text-sm text-muted-foreground line-clamp-2">
            Matière : {maskText(embleme.Matiere || "Inconnue", guesses)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function InsigneQuizCard({ insigne, guesses }: { insigne: InsigneQuizItem; guesses: Set<string> }) {
  const nameRevealed = isFullyRevealed(insigne.name, guesses)
  const provenanceRevealed = isFullyRevealed(insigne.provenance, guesses)
  const descriptionRevealed = insigne.description
    ? isFullyRevealed(insigne.description, guesses)
    : true
  const imageRevealed = nameRevealed && provenanceRevealed && descriptionRevealed

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4 flex flex-col gap-3 h-full">
        <div className="h-32 w-full flex items-center justify-center rounded-md overflow-hidden flex-shrink-0 bg-black">
          {imageRevealed && insigne.image ? (
            <img src={insigne.image} alt="Insigne" className="h-full object-contain" />
          ) : (
            <div className="text-xs text-white/80">Image cachée</div>
          )}
        </div>

        <div className="flex flex-col gap-2 flex-grow">
          <h3 className="font-medium leading-tight">{maskText(insigne.name, guesses)}</h3>

          <Badge
            variant="outline"
            className="w-fit text-xs"
            style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
          >
            Catégorie : {maskText(insigne.provenance || "Inconnue", guesses)}
          </Badge>

          <p className="text-sm text-muted-foreground line-clamp-2">
            Description : {maskText(insigne.description || "Aucune description", guesses)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function mapInsignesRows(rows: ApiItem[]) {
  const map = new Map<string, InsigneQuizItem>()

  rows.forEach((row) => {
    const key = `${row.n.name}__${row.n.provenance}`

    if (!map.has(key)) {
      map.set(key, {
        name: row.n.name,
        provenance: row.n.provenance,
      })
    }

    const current = map.get(key)!

    if (row.relation === "a_pour_image" && row.m?.data) {
      current.image = `data:image/png;base64,${row.m.data}`
    }

    if (row.relation === "signifie" && row.m?.description) {
      current.description = row.m.description
    }
  })

  return Array.from(map.values())
}

export default function QuizPage({ fixedMode }: QuizPageProps) {
  const [mode, setMode] = useState<QuizMode>(fixedMode ?? "emblemes")
  const { emblemes, loading: emblemesLoading, error: emblemesError } = useEmblemes()

  const [insignes, setInsignes] = useState<InsigneQuizItem[]>([])
  const [insignesLoading, setInsignesLoading] = useState(true)
  const [insignesError, setInsignesError] = useState<string | null>(null)

  const [guessInput, setGuessInput] = useState("")
  const [guesses, setGuesses] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const isModeLocked = Boolean(fixedMode)

  useEffect(() => {
    let cancelled = false

    const loadInsignes = async () => {
      setInsignesLoading(true)
      setInsignesError(null)

      try {
        const responses = await Promise.allSettled(
          INSIGNE_TYPES.map((type) => api.get<ApiItem[]>(`/insignes/${encodeURIComponent(type)}`))
        )

        if (cancelled) return

        const merged = responses
          .filter(
            (response): response is PromiseFulfilledResult<{ data: ApiItem[] }> =>
              response.status === "fulfilled"
          )
          .flatMap((response) => response.value.data)

        const mapped = mapInsignesRows(merged)

        setInsignes(
          mapped.sort((a, b) => {
            const provenanceCmp = a.provenance.localeCompare(b.provenance, "fr", {
              sensitivity: "base",
            })
            if (provenanceCmp !== 0) return provenanceCmp
            return a.name.localeCompare(b.name, "fr", { sensitivity: "base" })
          })
        )
      } catch {
        if (!cancelled) {
          setInsignesError("Erreur de chargement des insignes")
        }
      } finally {
        if (!cancelled) setInsignesLoading(false)
      }
    }

    loadInsignes()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (fixedMode) {
      setMode(fixedMode)
      setGuesses([])
      setGuessInput("")
    }
  }, [fixedMode])

  const guessSet = useMemo(() => new Set(guesses.map((guess) => normalize(guess))), [guesses])

  const emblemesSorted = useMemo(
    () =>
      [...emblemes].sort((a, b) => {
        const matiereCmp = a.Matiere.localeCompare(b.Matiere, "fr", { sensitivity: "base" })
        if (matiereCmp !== 0) return matiereCmp

        const couleurCmp = a.Couleur.localeCompare(b.Couleur, "fr", { sensitivity: "base" })
        if (couleurCmp !== 0) return couleurCmp

        return a.Embleme.localeCompare(b.Embleme, "fr", { sensitivity: "base" })
      }),
    [emblemes]
  )

  const emblemesGrouped = useMemo(
    () => groupByTitle(emblemesSorted, (item) => canonicalMatiere(item.Matiere), ["Velour", "Satin", "Autres"]),
    [emblemesSorted]
  )

  const insignesGrouped = useMemo(
    () => groupByTitle(insignes, (item) => insigneGroupTitle(item.provenance), INSIGNE_GROUP_ORDER),
    [insignes]
  )

  const revealedCount = useMemo(() => {
    if (mode === "emblemes") {
      return emblemesSorted.filter((embleme) => {
        const nameOk = isFullyRevealed(embleme.Embleme, guessSet)
        const colorOk = isFullyRevealed(embleme.Couleur || "", guessSet)
        const domaineOk = isFullyRevealed(embleme.Domaine || "", guessSet)
        const matiereOk = isFullyRevealed(embleme.Matiere || "", guessSet)
        return nameOk && colorOk && domaineOk && matiereOk
      }).length
    }

    return insignes.filter((insigne) => {
      const nameOk = isFullyRevealed(insigne.name, guessSet)
      const provenanceOk = isFullyRevealed(insigne.provenance || "", guessSet)
      const descriptionOk = insigne.description ? isFullyRevealed(insigne.description, guessSet) : true
      return nameOk && provenanceOk && descriptionOk
    }).length
  }, [mode, emblemesSorted, insignes, guessSet])

  const totalCount = mode === "emblemes" ? emblemesSorted.length : insignes.length

  const onSubmitGuess = () => {
    const value = guessInput.trim()
    if (!value) return

    const normalized = normalize(value)
    const exists = guesses.some((guess) => normalize(guess) === normalized)
    if (!exists) {
      setGuesses((prev) => [...prev, value])
    }
    setGuessInput("")
    inputRef.current?.focus()
  }

  const onReset = () => {
    setGuesses([])
    setGuessInput("")
    inputRef.current?.focus()
  }

  const switchMode = (nextMode: QuizMode) => {
    setMode(nextMode)
    setGuesses([])
    setGuessInput("")
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  if (mode === "emblemes" && emblemesLoading) return <EmblemesSkeletonPage />
  if (mode === "insignes" && insignesLoading) return <InsignesSkeletonPage />

  if (mode === "emblemes" && emblemesError) return <ErrorCard error={emblemesError} />
  if (mode === "insignes" && insignesError) return <ErrorCard error={insignesError} />

  if (mode === "emblemes" && (!emblemes || emblemes.length === 0)) return <NoDataCard />
  if (mode === "insignes" && (!insignes || insignes.length === 0)) return <NoDataCard />

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Quiz {mode === "emblemes" ? "Emblèmes" : "Insignes"}</h1>
        <p className="text-sm text-muted-foreground">
          Entre des mots pour révéler les champs cachés sur toutes les cartes et sur les titres de sections.
          {mode === "emblemes"
            ? " L'image s'affiche quand nom, couleur, domaine et matière sont trouvés."
            : " L'image s'affiche quand nom, catégorie et description sont trouvés."}
        </p>
      </div>

      {!isModeLocked ? (
        <div className="mb-4 flex gap-2">
          <Button
            type="button"
            variant={mode === "emblemes" ? "default" : "outline"}
            onClick={() => switchMode("emblemes")}
          >
            Emblèmes
          </Button>
          <Button
            type="button"
            variant={mode === "insignes" ? "default" : "outline"}
            onClick={() => switchMode("insignes")}
          >
            Insignes
          </Button>
        </div>
      ) : null}

      <div className="sticky top-2 z-20 mb-6 rounded-lg border bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            ref={inputRef}
            placeholder="Entre un mot (nom, couleur, domaine, matière, catégorie...)"
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                onSubmitGuess()
              }
            }}
          />
          <div className="flex gap-2">
            <Button type="button" onClick={onSubmitGuess}>
              Valider
            </Button>
            <Button type="button" variant="outline" onClick={onReset}>
              Réinitialiser
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <Badge variant="outline">Révélées: {revealedCount}/{totalCount}</Badge>
      </div>

      {mode === "emblemes"
        ? emblemesGrouped.map((group) => (
            <section key={group.title} className="mb-8">
              <Card className="p-6 md:p-8">
                <h2 className="mb-6 text-2xl font-semibold">{maskText(group.title, guessSet)}</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {group.items.map((embleme) => {
                    const key = `${embleme.Matiere}-${embleme.Couleur}-${embleme.Domaine}-${embleme.Embleme}`
                    return <EmblemeQuizCard key={key} embleme={embleme} guesses={guessSet} />
                  })}
                </div>
              </Card>
            </section>
          ))
        : insignesGrouped.map((group) => (
            <section key={group.title} className="mb-8">
              <Card className="p-6 md:p-8">
                <h2 className="mb-6 text-2xl font-semibold">{maskText(group.title, guessSet)}</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {group.items.map((insigne) => {
                    const key = `${insigne.provenance}-${insigne.name}`
                    return <InsigneQuizCard key={key} insigne={insigne} guesses={guessSet} />
                  })}
                </div>
              </Card>
            </section>
          ))}
    </div>
  )
}
