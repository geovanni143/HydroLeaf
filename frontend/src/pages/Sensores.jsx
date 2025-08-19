// src/pages/Sensores.jsx
import { useState, useEffect } from 'react';
import { Drop, Thermometer, Sun, BatteryWarning, ArrowLeft } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/HydroLeaf-logo.png';

export default function Sensores() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    humedad: 33,
    temperatura: 24,
    luz: 'Moderado',
  });
  const [, setUltimoUpdate] = useState(Date.now());
  const [errorSensor, setErrorSensor] = useState(false);

  // Simulación de actualización de sensores
  useEffect(() => {
    const intervalo = setInterval(() => {
      const now = Date.now();
      const aleatorio = Math.random();

      // Simulamos que el 10% de las veces el sensor deja de transmitir
      if (aleatorio < 0.1) {
        setErrorSensor(true);
        return;
      }

      // Si hay datos, actualizar todo
      setDatos({
        humedad: Math.floor(Math.random() * 100),
        temperatura: Math.floor(Math.random() * 40),
        luz: ['Bajo', 'Moderado', 'Alto'][Math.floor(Math.random() * 3)],
      });
      setUltimoUpdate(now);
      setErrorSensor(false);
    }, 10000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="bg-background min-h-screen font-inter px-4 pt-6 pb-28">
      <div className="max-w-md mx-auto">
        
        {/* Botón de regreso */}
        <div
          className="flex items-center gap-2 mb-4 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={24} />
          <h1 className="text-text text-lg font-semibold">Sensores</h1>
        </div>

        {/* Header con logo */}
        <div className="flex items-center gap-2 mb-1">
          <img src={logo} alt="HydroLeaf Logo" className="w-6 h-6" />
          <h1 className="text-[#5A5A5A] text-[24px] font-bold leading-tight">HydroLeaf</h1>
        </div>
        <h2 className="text-text text-[20px] font-semibold mb-6">Estado de sensores</h2>

        {/* Alerta si hay error */}
        {errorSensor && (
          <div className="bg-white border-l-4 border-alert p-3 rounded-lg flex items-center gap-2 mb-4">
            <BatteryWarning size={20} color="#F76E6E" />
            <p className="text-alert text-sm font-semibold">Sensor desconectado o sin respuesta</p>
          </div>
        )}

        {/* Sensor: Humedad del suelo */}
        <div className="bg-primary bg-opacity-40 rounded-[20px] mb-4 px-4 py-3">
          <p className="text-subtext text-[14px] font-semibold mb-2">Humedad del suelo</p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#6AC8C8] flex items-center justify-center">
              <Drop size={36} color="white" weight="fill" />
            </div>
            <div className="bg-white rounded-xl px-6 py-2">
              <p className="text-text text-[24px] font-bold">{datos.humedad}%</p>
            </div>
          </div>
        </div>

        {/* Sensor: Temperatura */}
        <div className="bg-primary bg-opacity-40 rounded-[20px] mb-4 px-4 py-3">
          <p className="text-subtext text-[14px] font-semibold mb-2">Temperatura</p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#6AC8C8] flex items-center justify-center">
              <Thermometer size={36} color="white" weight="fill" />
            </div>
            <div className="bg-white rounded-xl px-6 py-2">
              <p className="text-text text-[24px] font-bold">{datos.temperatura}°C</p>
            </div>
          </div>
        </div>

        {/* Sensor: Luz solar */}
        <div className="bg-primary bg-opacity-40 rounded-[20px] mb-4 px-4 py-3">
          <p className="text-subtext text-[14px] font-semibold mb-2">Luz solar</p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#6AC8C8] flex items-center justify-center">
              <Sun size={36} color="white" weight="fill" />
            </div>
            <div className="bg-white rounded-xl px-6 py-2">
              <p className="text-text text-[24px] font-bold">{datos.luz}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
