// src/pages/EditarUmbrales.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";

const ZONA_ID = "invernadero-1";
const KEY = `umbral:${ZONA_ID}`;

export default function EditarUmbrales() {
  const navigate = useNavigate();
  const [umbral, setUmbral] = useState(30);

  // cargar umbral guardado
  useEffect(() => {
    const saved = Number(localStorage.getItem(KEY));
    if (!Number.isNaN(saved) && saved > 0) setUmbral(saved);
  }, []);

  const guardar = () => {
    localStorage.setItem(KEY, String(umbral));
    alert(`Umbral guardado: ${umbral}%`);
    navigate(-1);
  };

  return (
    /** 
     * NOTA IMPORTANTE:
     * Aquí NO usamos min-h-screen ni max-w-md, 
     * eso ya lo hace automáticamente el Layout del App.jsx
     */
    <div className="w-full font-inter pt-4 pb-24">
      {/* Header con botón volver */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/50"
        >
          <ArrowLeft size={22} className="text-subtext" />
        </button>

        <h1 className="text-text text-[20px] font-semibold">
          Editar umbral
        </h1>
      </div>

      {/* Tarjeta de zona */}
      <div className="bg-white rounded-[16px] p-4 mb-4 shadow-sm">
        <p className="text-text text-[15px] font-semibold">
          Zona: Invernadero 1
        </p>
        <p className="text-subtext text-[13px] leading-tight mt-1">
          Define el nivel mínimo de humedad antes de activar una alerta.
        </p>
      </div>

      {/* Control del umbral */}
      <div className="bg-white rounded-[20px] p-6 mb-5 shadow-sm text-center">
        <p className="text-subtext text-sm mb-1">Umbral de humedad</p>
        <p className="text-text text-[28px] font-extrabold mb-4">{umbral}%</p>
        <input
          type="range"
          min={5}
          max={100}
          value={umbral}
          onChange={(e) => setUmbral(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>

      {/* Botón guardar */}
      <button
        onClick={guardar}
        className="
          w-full bg-primary text-white
          font-semibold py-3 rounded-[14px] shadow
          hover:opacity-90 transition
        "
      >
        Guardar cambios
      </button>
    </div>
  );
}
