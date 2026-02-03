import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Inbox } from "lucide-react"
import { useTranslation } from "react-i18next"

export function NoDataCard() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <Card className="flex flex-col items-center justify-center text-center p-8 w-fit min-w-[320px] max-w-md">
        <CardHeader className="space-y-0 p-0 flex flex-col items-center">
          <Inbox className="h-10 w-10 text-muted-foreground mb-4" />
          <CardTitle className="text-lg font-semibold whitespace-nowrap">
            {t("NoData.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-2 p-0">
          <p className="text-sm text-muted-foreground">
            {t("NoData.description")}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}