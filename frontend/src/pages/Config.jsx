// src/pages/Config.jsx
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Bell,
  Drop,
  MapPin,
  Thermometer,
  Globe,
  CaretRight,
  ArrowLeft
} from "phosphor-react";
import logo from "../assets/HydroLeaf-logo.png";

export default function Config() {
  const navigate = useNavigate();

  const opciones = [
    { icon: User, label: "Cuenta", path: "/404" },
    { icon: Bell, label: "Notificaciones", path: "/404" },
    // ✅ Enlaza a Control de riego real
    { icon: Drop, label: "Control de riego", path: "/control-riego" },
    { icon: MapPin, label: "Zonas de riego", path: "/zonas" },
    { icon: Thermometer, label: "Sensores", path: "/sensores" },
    { icon: Globe, label: "Idioma", path: "/404" },
  ];

  return (
    <div className="bg-background min-h-screen font-inter px-4 pt-6 pb-28">
      <div className="max-w-md mx-auto">
        {/* Botón de regreso */}
        <button
          type="button"
          className="flex items-center gap-2 mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={24} weight="bold" className="text-subtext" />
          <span className="text-subtext text-lg font-semibold">Volver</span>
        </button>

        {/* Encabezado con logo */}
        <div className="flex items-center gap-3 mb-6">
          <img src={logo} alt="HydroLeaf Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-text text-[24px] font-bold leading-tight">HydroLeaf</h1>
        </div>

        <h2 className="text-text text-[20px] font-semibold mb-6">Configuración</h2>

        {/* Lista de opciones */}
        <div className="flex flex-col gap-3">
          {opciones.map(({ icon: IconComp, label, path }) => (
            <Link
              key={label}
              to={path}
              className="flex items-center justify-between bg-white rounded-[14px] px-4 py-3 hover:opacity-90"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                  {IconComp && <IconComp size={24} weight="fill" className="text-emerald-600" />}
                </div>
                <span className="text-text font-medium">{label}</span>
              </div>
              <CaretRight size={20} weight="bold" className="text-subtext" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
