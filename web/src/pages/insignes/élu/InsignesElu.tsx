import { useTranslation } from "react-i18next"
import { InsignesList } from "../InsignesList"

export default function InsignesElu() {
  const { t } = useTranslation()

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {t("sidebar.insignes.elu")}
        </h1>
      </div>

      <InsignesList type="Ruban d'élu" />
    </div>
  )
}