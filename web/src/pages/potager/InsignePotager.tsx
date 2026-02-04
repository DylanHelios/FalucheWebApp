import { useTranslation } from "react-i18next"
import { InsignesList } from "../insignes/InsignesList"

export default function InsignesPotager() {
  const { t } = useTranslation()

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {t("sidebar.potager.potagerinsignes")}
        </h1>
      </div>

      <InsignesList type="Potager" />
    </div>
  )
}