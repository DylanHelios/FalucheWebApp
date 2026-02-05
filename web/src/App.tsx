import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import "./i18n"

import Layout from "./components/layout/Layout"
import Home from "./pages/home/Home"

import InsignesCirculaire from "./pages/insignes/circulaire/InsigneCirculaire"
import InsignesAutodecerne from "./pages/insignes/autodecerne/InsigneAutodecerne"
import InsignesCroix from "./pages/insignes/croix/InsigneCroix"
import InsignesPartenaire from "./pages/insignes/partenaire/InsignePartenaire"
import InsignesElu from "./pages/insignes/élu/InsignesElu"
import InsignesPotager from "./pages/potager/Insigne/InsignePotager"
import InsignesRegion from "./pages/insignes/region/InsignesRegion"

import EmblemeSatin from "./pages/emblèmes/satin/EmblemeSatin"
import EmblemeVelour from "./pages/emblèmes/velour/EmblemeVelour"
import Embleme from "./pages/emblèmes/Embleme"
import HistoryPotager from "./pages/potager/history/HistoryPotager"

import Heraldique from "./pages/heraldique/Heraldique"
import Insigne from "./pages/insignes/Insigne"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
        
              <Route path="/insignes" element={<Insigne />} />
              <Route path="/insignes/circulaire" element={<InsignesCirculaire />} />
              <Route path="/insignes/autodecerne" element={<InsignesAutodecerne />} />
              <Route path="/insignes/croix" element={<InsignesCroix />} />
              <Route path="/insignes/partenaire" element={<InsignesPartenaire />} />
              <Route path="/insignes/elu" element={<InsignesElu />} />
              <Route path="/insignes/region" element={<InsignesRegion />} />

              <Route path="/emblemes" element={<Embleme />} />
              <Route path="/emblemes/satin" element={<EmblemeSatin />} />
              <Route path="/emblemes/velours" element={<EmblemeVelour />} />

              <Route path="/potager/history" element={<HistoryPotager />} />
              <Route path="/potager/insignes" element={<InsignesPotager />} />

              <Route path="/heraldique" element={<Heraldique />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
  )
}
