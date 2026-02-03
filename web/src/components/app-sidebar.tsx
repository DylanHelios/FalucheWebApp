// components/sidebar/AppSidebar.tsx
import { Link } from "react-router-dom"
import {
  BookOpen,
  BadgeCheck,
  Shield,
  Palette,
  Carrot,
  GraduationCap,
  Ribbon,
  Landmark,
  ChevronRight,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ModeToggle } from "@/components/mode-toggle"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export function AppSidebar() {
  const { t } = useTranslation()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const { isMobile } = useSidebar()

  const toggleItem = (key: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedItems(newExpanded)
  }

  const items = [
    {
      key: "history",
      label: t("sidebar.history.label"),
      url: "/histoire",
      icon: BookOpen,
      submenu: [
        { label: t("sidebar.history.origins"), url: "/histoire/origines" },
        { label: t("sidebar.history.evolution"), url: "/histoire/evolution" },
        { label: t("sidebar.history.traditions"), url: "/histoire/traditions" },
      ],
    },
    {
      key: "insignes",
      label: t("sidebar.insignes.label"),
      url: "/insignes",
      icon: BadgeCheck,
      submenu: [
        { label: t("sidebar.insignes.autodecerne"), url: "/insignes/autodecerne" },
        { label: t("sidebar.insignes.circulaire"), url: "/insignes/circulaire" },
        { label: t("sidebar.insignes.croix"), url: "/insignes/croix" },
        { label: t("sidebar.insignes.partenaire"), url: "/insignes/decerne-partenaire" },
        { label: t("sidebar.insignes.elu"), url: "/insignes/elu" },
      ],
    },
    {
      key: "emblemes",
      label: t("sidebar.emblemes.label"),
      url: "/emblemes",
      icon: Shield,
      submenu: [
        { label: t("sidebar.emblemes.satin"), url: "/emblemes/satin" },
        { label: t("sidebar.emblemes.velours"), url: "/emblemes/velours" },
        { label: t("sidebar.emblemes.autres"), url: "/emblemes/autres" },
      ],
    },
    {
      key: "couleurs",
      label: t("sidebar.couleurs.label"),
      url: "/couleurs",
      icon: Palette,
      submenu: [
        { label: t("sidebar.couleurs.sciences"), url: "/couleurs/sciences" },
        { label: t("sidebar.couleurs.lettres"), url: "/couleurs/lettres" },
        { label: t("sidebar.couleurs.commerce"), url: "/couleurs/commerce" },
        { label: t("sidebar.couleurs.technique"), url: "/couleurs/technique" },
      ],
    },
    {
      key: "potager",
      label: t("sidebar.potager.label"),
      url: "/potager",
      icon: Carrot,
      submenu: [
        { label: t("sidebar.potager.vue_ensemble"), url: "/potager/vue-ensemble" },
        { label: t("sidebar.potager.evenements"), url: "/potager/evenements" },
        { label: t("sidebar.potager.galerie"), url: "/potager/galerie" },
      ],
    },
    {
      key: "faluches",
      label: t("sidebar.faluches.label"),
      url: "/faluches",
      icon: GraduationCap,
      submenu: [
        { label: t("sidebar.faluches.lilloise"), url: "/faluches/lilloise" },
        { label: t("sidebar.faluches.montpellieraines"), url: "/faluches/montpellieraines" },
        { label: t("sidebar.faluches.perpignanaise"), url: "/faluches/perpignanaise" },
        { label: t("sidebar.faluches.tourangelle"), url: "/faluches/tourangelle" },
        { label: t("sidebar.faluches.marseillaise"), url: "/faluches/marseillaise" },
        { label: t("sidebar.faluches.alsacienne"), url: "/faluches/alsacienne" },
      ],
    },
    {
      key: "rubans",
      label: t("sidebar.rubans.label"),
      url: "/rubans",
      icon: Ribbon,
      submenu: [
        { label: t("sidebar.rubans.couleurs"), url: "/rubans/couleurs" },
        { label: t("sidebar.rubans.port"), url: "/rubans/port" },
        { label: t("sidebar.rubans.traditions"), url: "/rubans/traditions" },
      ],
    },
    {
      key: "armoiries",
      label: t("sidebar.armoiries.label"),
      url: "/armoiries",
      icon: Landmark,
      submenu: [
        { label: t("sidebar.armoiries.historique"), url: "/armoiries/historique" },
        { label: t("sidebar.armoiries.blasons"), url: "/armoiries/blasons" },
        { label: t("sidebar.armoiries.heraldiques"), url: "/armoiries/heraldiques" },
      ],
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4">
          <h1 className="font-semibold text-lg">La Faluche</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Découvrir</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible key={item.key} open={expandedItems.has(item.key)} onOpenChange={() => toggleItem(item.key)}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <div className="flex items-center justify-between w-full cursor-pointer">
                          <Link to={item.url} className="flex items-center gap-3 flex-1">
                            <item.icon />
                            <span>{item.label}</span>
                          </Link>
                          <ChevronRight
                            className={`ml-auto h-4 w-4 transition-transform ${
                              expandedItems.has(item.key) ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.submenu.map((subitem) => (
                          <SidebarMenuSubItem key={subitem.url}>
                            <SidebarMenuSubButton asChild>
                              <Link to={subitem.url}>{subitem.label}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between gap-3 w-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="Utilisateur" />
            <AvatarFallback>FA</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2 flex-1 justify-end">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
