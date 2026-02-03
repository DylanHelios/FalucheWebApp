import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

type ErrorCardProps = {
  error: unknown
  onRetry?: () => void
}

export function ErrorCard({ error, onRetry }: ErrorCardProps) { 
  const { t } = useTranslation();
  
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : t("Error.unknown")

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <Card className="flex flex-col items-center justify-center text-center p-8 w-fit min-w-[320px] max-w-md border-destructive">
        <CardHeader className="p-0 flex flex-col items-center">
          <AlertTriangle className="h-10 w-10 text-destructive" />
          <CardTitle className="mt-4 text-lg text-destructive whitespace-nowrap">
            {t("Error.occurred")}
          </CardTitle>
        </CardHeader>

        <CardContent className="mt-4 p-0 flex flex-col items-center space-y-4">
          <p className="text-sm text-muted-foreground">
            {message}
          </p>

          {onRetry && (
            <Button
              variant="destructive"
              onClick={onRetry}
              className="gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              {t("Error.retry")}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}