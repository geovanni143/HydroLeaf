// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EditarUmbrales from "./pages/EditarUmbrales";
import Sensores from "./pages/Sensores";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";
import Config from "./pages/Config";
import ControlRiego from "./pages/ControlRiego";

/**
 * Layout principal que se aplica a todas las rutas.
 * - Fondo general
 * - Altura mínima de pantalla
 * - Ancho máximo del contenido (controlado matemáticamente)
 * - Menú inferior fijo
 */
function Layout({ children }) {
  const location = useLocation();
  const hideNav = location.pathname === "/editar-umbrales";

  return (
    <div className="min-h-screen bg-background font-inter flex flex-col overflow-x-hidden">
      {/* CONTENIDO PRINCIPAL */}
      <main
        className="
          flex-1 flex justify-center items-start
          px-3 sm:px-4       /* padding horizontal: 12px móvil, 16px sm+ */
          pt-3 pb-24
          overflow-y-auto
          overflow-x-hidden
        "
      >
        {/*
          REGLA IMPORTANTE (móvil):
            max-w-[348px] + 2 * 12px = 348 + 24 = 372px  <= 375px
          => No hay scroll horizontal en 375 ni en 390.
        */}
        <div
          className="
            w-full
            max-w-[348px]    /* móviles pequeños/medianos */
            sm:max-w-md      /* tablets chicas */
            md:max-w-3xl     /* desktop */
            lg:max-w-5xl     /* pantallas grandes */
          "
        >
          {children}
        </div>
      </main>

      {/* MENÚ INFERIOR FIJO */}
      {!hideNav && (
        <footer className="fixed bottom-0 left-0 right-0 flex justify-center pb-3 pointer-events-none">
          <div
            className="
              w-full
              max-w-[348px]
              sm:max-w-md
              md:max-w-3xl
              lg:max-w-5xl
              px-3 sm:px-4
              pointer-events-auto
            "
          >
            <BottomNav />
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editar-umbrales" element={<EditarUmbrales />} />
          <Route path="/sensores" element={<Sensores />} />
          <Route path="/config" element={<Config />} />
          <Route path="/control-riego" element={<ControlRiego />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}
