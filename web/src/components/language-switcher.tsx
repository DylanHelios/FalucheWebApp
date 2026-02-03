import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "react-i18next"

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  // Vérifie que i18n.language existe, sinon default = 'EN'
  const currentLang = i18n?.language?.toUpperCase() || "EN"

  const flagMap: { [key: string]: string } = {
    EN: "🇬🇧",
    FR: "🇫🇷",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {flagMap[currentLang]}
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          🇬🇧 EN
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("fr")}>
          🇫🇷 FR
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
