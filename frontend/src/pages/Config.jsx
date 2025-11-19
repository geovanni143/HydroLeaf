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
  ArrowLeft,
} from "phosphor-react";
import logo from "../assets/HydroLeaf-logo.png";

export default function Config() {
  const navigate = useNavigate();

  const opciones = [
    { icon: User, label: "Cuenta", path: "/404" },
    { icon: Bell, label: "Notificaciones", path: "/404" },
    { icon: Drop, label: "Control de riego", path: "/control-riego" },
    { icon: MapPin, label: "Zonas de riego", path: "/zonas" },
    { icon: Thermometer, label: "Sensores", path: "/sensores" },
    { icon: Globe, label: "Idioma", path: "/404" },
  ];

  return (
    // Importante: este componente ya NO maneja min-h-screen ni max-w-md;
    // eso lo hace el Layout de App.jsx. Aquí solo usamos w-full.
    <div className="w-full">
      {/* Botón de regreso */}
      <button
        type="button"
        className="flex items-center gap-2 mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={22} weight="bold" className="text-subtext" />
        <span className="text-subtext text-base font-semibold">Volver</span>
      </button>

      {/* Encabezado con logo */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={logo}
          alt="HydroLeaf Logo"
          className="w-9 h-9 rounded-full"
        />
        <h1 className="text-text text-[22px] font-bold leading-tight">
          HydroLeaf
        </h1>
      </div>

      <h2 className="text-text text-[20px] font-semibold mb-5">
        Configuración
      </h2>

      {/* Lista de opciones */}
      <div className="flex flex-col gap-3">
        {opciones.map(({ icon: IconComp, label, path }) => (
          <Link
            key={label}
            to={path}
            className="
              flex items-center justify-between
              bg-white rounded-[16px]
              px-4 py-3
              shadow-sm
              hover:opacity-90 transition
            "
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                {IconComp && (
                  <IconComp
                    size={22}
                    weight="fill"
                    className="text-emerald-600"
                  />
                )}
              </div>
              <span className="text-text font-medium text-sm md:text-base">
                {label}
              </span>
            </div>
            <CaretRight size={18} weight="bold" className="text-subtext" />
          </Link>
        ))}
      </div>
    </div>
  );
}
