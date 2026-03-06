import { useMemo, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ErrorCard } from "@/components/error-card"
import { NoDataCard } from "@/components/no-data-card"
import EmblemesSkeletonPage from "@/components/skeleton/embleme-page-skeleton"
import { useEmblemes } from "@/pages/emblèmes/useEmblemes"
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

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
}

function maskText(text: string, guesses: Set<string>) {
  const parts = text.split(/([A-Za-zÀ-ÿ0-9'’]+)/g)

  return parts
    .map((part) => {
      if (!part) return ""
      if (!/[A-Za-zÀ-ÿ0-9'’]+/.test(part)) return part

      return guesses.has(normalize(part)) ? part : "_".repeat(Math.max(3, part.length))
    })
    .join("")
}

function isFullyRevealed(text: string, guesses: Set<string>) {
  const tokens = text.split(/[^A-Za-zÀ-ÿ0-9'’]+/g).filter(Boolean)
  if (!tokens.length) return true
  return tokens.every((token) => guesses.has(normalize(token)))
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
          <h3 className="font-medium leading-tight">
            {maskText(embleme.Embleme, guesses)}
          </h3>

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

export default function QuizPage() {
  const { emblemes, loading, error } = useEmblemes()

  const [guessInput, setGuessInput] = useState("")
  const [guesses, setGuesses] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

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

  const revealedCount = useMemo(() => {
    return emblemesSorted.filter((embleme) => {
      const nameOk = isFullyRevealed(embleme.Embleme, guessSet)
      const colorOk = isFullyRevealed(embleme.Couleur || "", guessSet)
      const domaineOk = isFullyRevealed(embleme.Domaine || "", guessSet)
      const matiereOk = isFullyRevealed(embleme.Matiere || "", guessSet)
      return nameOk && colorOk && domaineOk && matiereOk
    }).length
  }, [emblemesSorted, guessSet])

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

  if (loading) return <EmblemesSkeletonPage />
  if (error) return <ErrorCard error={error} />
  if (!emblemes || emblemes.length === 0) return <NoDataCard />

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Quiz Emblèmes</h1>
        <p className="text-sm text-muted-foreground">
          Satin et Velour sont regroupés. Entre un mot pour révéler les champs cachés sur toutes les cartes.
          L'image s'affiche uniquement quand nom, couleur, domaine et matière sont trouvés.
        </p>
      </div>

      <div className="sticky top-2 z-20 mb-6 rounded-lg border bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          ref={inputRef}
          placeholder="Entre un mot (nom, couleur, domaine, matière...)"
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
          <Button type="button" onClick={onSubmitGuess}>Valider</Button>
          <Button type="button" variant="outline" onClick={onReset}>Réinitialiser</Button>
        </div>
      </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <Badge variant="outline">Révélées: {revealedCount}/{emblemesSorted.length}</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {emblemesSorted.map((embleme) => {
          const key = `${embleme.Matiere}-${embleme.Couleur}-${embleme.Domaine}-${embleme.Embleme}`
          return <EmblemeQuizCard key={key} embleme={embleme} guesses={guessSet} />
        })}
      </div>
    </div>
  )
}
