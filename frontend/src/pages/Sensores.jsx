// src/pages/Sensores.jsx
import { useState, useEffect } from "react";
import {
  Drop,
  Thermometer,
  Sun,
  BatteryWarning,
  ArrowLeft,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/HydroLeaf-logo.png";

export default function Sensores() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    humedad: 33,
    temperatura: 24,
    luz: "Moderado",
  });
  const [, setUltimoUpdate] = useState(Date.now());
  const [errorSensor, setErrorSensor] = useState(false);

  // Simulación de actualización de sensores
  useEffect(() => {
    const intervalo = setInterval(() => {
      const now = Date.now();
      const aleatorio = Math.random();

      // 10% de las veces simulamos fallo de sensor
      if (aleatorio < 0.1) {
        setErrorSensor(true);
        return;
      }

      // Actualizamos datos normalmente
      setDatos({
        humedad: Math.floor(Math.random() * 100),
        temperatura: Math.floor(Math.random() * 40),
        luz: ["Bajo", "Moderado", "Alto"][Math.floor(Math.random() * 3)],
      });
      setUltimoUpdate(now);
      setErrorSensor(false);
    }, 10000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    /**
     * Importante:
     * Aquí NO usamos min-h-screen, max-w-md ni bg-background.
     * Eso ya lo hace el Layout de App.jsx.
     */
    <div className="w-full pt-4 pb-24 font-inter">
      {/* Botón de regreso + título */}
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          className="p-2 rounded-full hover:bg-white/60"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} className="text-subtext" />
        </button>
        <h1 className="text-text text-[18px] font-semibold">Sensores</h1>
      </div>

      {/* Header con logo, igual estilo HydroLeaf */}
      <div className="flex items-center gap-2 mb-1">
        <img src={logo} alt="HydroLeaf Logo" className="w-7 h-7" />
        <h2 className="text-[#5A5A5A] text-[22px] font-bold leading-tight">
          HydroLeaf
        </h2>
      </div>
      <h3 className="text-text text-[20px] font-semibold mb-5">
        Estado de sensores
      </h3>

      {/* Alerta de error del sensor */}
      {errorSensor && (
        <div className="bg-white border-l-4 border-alert p-3 rounded-[14px] flex items-center gap-2 mb-4 shadow-sm">
          <BatteryWarning size={20} color="#F76E6E" />
          <p className="text-alert text-sm font-semibold">
            Sensor desconectado o sin respuesta
          </p>
        </div>
      )}

      {/* Tarjeta HUMEDAD DEL SUELO */}
      <section className="bg-primary/40 rounded-[20px] mb-4 px-4 py-3 shadow-sm">
        <p className="text-subtext text-[14px] font-semibold mb-2">
          Humedad del suelo
        </p>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#6AC8C8] flex items-center justify-center">
            <Drop size={34} color="white" weight="fill" />
          </div>
          <div className="bg-white rounded-xl px-6 py-2">
            <p className="text-text text-[22px] font-bold">
              {datos.humedad}%
            </p>
          </div>
        </div>
      </section>

      {/* Tarjeta TEMPERATURA */}
      <section className="bg-primary/40 rounded-[20px] mb-4 px-4 py-3 shadow-sm">
        <p className="text-subtext text-[14px] font-semibold mb-2">
          Temperatura ambiente
        </p>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#6AC8C8] flex items-center justify-center">
            <Thermometer size={34} color="white" weight="fill" />
          </div>
          <div className="bg-white rounded-xl px-6 py-2">
            <p className="text-text text-[22px] font-bold">
              {datos.temperatura}°C
            </p>
          </div>
        </div>
      </section>

      {/* Tarjeta LUZ SOLAR */}
      <section className="bg-primary/40 rounded-[20px] mb-4 px-4 py-3 shadow-sm">
        <p className="text-subtext text-[14px] font-semibold mb-2">
          Luz solar
        </p>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#6AC8C8] flex items-center justify-center">
            <Sun size={34} color="white" weight="fill" />
          </div>
          <div className="bg-white rounded-xl px-6 py-2">
            <p className="text-text text-[22px] font-bold">{datos.luz}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
