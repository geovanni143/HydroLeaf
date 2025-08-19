// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import EditarUmbrales from './pages/EditarUmbrales'
import Sensores from './pages/Sensores'
import NotFound from './pages/NotFound'
import BottomNav from './components/BottomNav'
import Config from './pages/Config'
import ControlRiego from './pages/ControlRiego'

// Layout principal que usa useLocation (debe ir dentro del Router)
function Layout({ children }) {
  const location = useLocation()
  const hideNav = location.pathname === '/editar-umbrales'
  return (
    <div className="bg-background min-h-screen flex justify-center">
      <div className="w-full max-w-md">
        {children}
        {!hideNav && <BottomNav />}
      </div>
    </div>
  )
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
  )
}
