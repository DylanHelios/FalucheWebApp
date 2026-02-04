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

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/insignes/circulaire" element={<InsignesCirculaire />} />
              <Route path="/insignes/autodecerne" element={<InsignesAutodecerne />} />
              <Route path="/insignes/croix" element={<InsignesCroix />} />
              <Route path="/insignes/partenaire" element={<InsignesPartenaire />} />
              <Route path="/insignes/elu" element={<InsignesElu />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
  )
}
