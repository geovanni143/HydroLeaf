import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";

const ZONA_ID = "invernadero-1";
const KEY = `umbral:${ZONA_ID}`;

export default function EditarUmbrales() {
  const navigate = useNavigate();
  const [umbral, setUmbral] = useState(30);

  // Cargar umbral guardado
  useEffect(() => {
    const saved = Number(localStorage.getItem(KEY));
    if (!Number.isNaN(saved) && saved > 0) setUmbral(saved);
  }, []);

  const guardar = () => {
    localStorage.setItem(KEY, String(umbral));
    alert(`Umbral guardado: ${umbral}%`);
    navigate(-1); // volver a la pantalla anterior
  };

  return (
    <div className="bg-background min-h-screen font-inter px-4 pt-4 pb-16">
      <div className="max-w-md mx-auto">
        {/* Header con volver */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-white/50"
            aria-label="Volver"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-text text-[18px] font-semibold">Editar umbral</h1>
        </div>

        {/* Tarjeta de zona */}
        <div className="bg-white rounded-[14px] p-4 mb-4">
          <p className="text-text text-[14px] font-semibold">Zona: Invernadero 1</p>
          <p className="text-subtext text-[12px]">
            Define el mínimo de humedad permitido antes de lanzar una alerta.
          </p>
        </div>

        {/* Control de umbral */}
        <div className="bg-white rounded-[20px] p-6 mb-4 text-center">
          <p className="text-subtext text-sm mb-2">Umbral de humedad</p>
          <p className="text-text text-[24px] font-bold mb-3">{umbral}%</p>
          <input
            type="range"
            min={5}
            max={100}
            value={umbral}
            onChange={(e) => setUmbral(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <button
          onClick={guardar}
          className="w-full bg-primary text-white font-semibold py-3 rounded-[14px] shadow hover:opacity-90"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
