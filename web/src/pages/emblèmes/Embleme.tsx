import { useTranslation } from "react-i18next"
import { EmblemesList } from "./EmblemeList"

export default function Embleme() {
  const { t } = useTranslation()

  return (
    <>
        <div className="p-6">
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
            {t("sidebar.emblemes.velours")}
            </h1>
        </div>

        <EmblemesList type="Velour" />
        </div>

        <div className="p-6">
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
            {t("sidebar.emblemes.satin")}
            </h1>
        </div>

        <EmblemesList type="Satin" />
        </div>
    </>
  )
}