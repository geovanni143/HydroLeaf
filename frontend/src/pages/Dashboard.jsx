// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { Drop, ThermometerSimple } from "phosphor-react";
import logo from "../assets/HydroLeaf-logo.png";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ZONA_ID = "invernadero-1";
const KEY = `umbral:${ZONA_ID}`;

export default function Dashboard() {
  // Umbral persistente
  const [umbral, setUmbral] = useState(() => {
    const saved = Number(localStorage.getItem(KEY));
    return !Number.isNaN(saved) && saved > 0 ? saved : 30;
  });

  // Datos actuales simulados
  const [data, setData] = useState({
    humedad: 0,
    temperatura: 0,
    alerta: false,
  });

  // Historial para la gráfica
  const [historico, setHistorico] = useState([80, 75, 70, 65, 60, 55, 50]);

  // Simulación de lecturas
  useEffect(() => {
    const interval = setInterval(() => {
      const humedadRandom = Math.floor(Math.random() * 100);
      const temperaturaRandom =
        Math.floor(Math.random() * (40 - 15 + 1)) + 15;

      setData({
        humedad: humedadRandom,
        temperatura: temperaturaRandom,
        alerta: humedadRandom < umbral,
      });

      setHistorico((prev) => [...prev.slice(-6), humedadRandom]);
    }, 3000);

    return () => clearInterval(interval);
  }, [umbral]);

  // Sincronizar umbral entre pestañas
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY) {
        const v = Number(e.newValue);
        if (!Number.isNaN(v)) setUmbral(v);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Configuración de la gráfica
  const chartData = {
    labels: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    datasets: [
      {
        label: "Humedad",
        data: historico,
        borderColor: "#4FC3F7",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 0, max: 100, ticks: { stepSize: 20 } },
      x: { ticks: { font: { size: 10 } } },
    },
  };

  return (
    <>
      {/* Encabezado */}
      <header className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <img src={logo} alt="HydroLeaf Logo" className="w-7 h-7" />
          <h1 className="text-secondary text-[24px] font-bold leading-tight">
            HydroLeaf
          </h1>
        </div>
        <h2 className="text-text text-[20px] font-semibold">
          Estado del cultivo
        </h2>
      </header>

      {/* Grid responsiva:
          - Móvil: 1 columna (tarjetas → alerta → gráfica → botones)
          - md+: 2 columnas (izquierda info, derecha gráfica grande)
      */}
      <section className="grid gap-3 md:gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)] items-start">
        {/* TARJETAS */}
        <div className="grid grid-cols-2 gap-3 md:col-start-1 md:row-start-1">
          {/* Humedad */}
          <div className="bg-white rounded-[24px] p-4 flex items-center gap-3 shadow-sm">
            <Drop size={34} weight="fill" color="#AFE4F7" />
            <div>
              <p className="text-subtext text-xs">Humedad actual</p>
              <p className="text-subtext text-[22px] font-bold">
                {data.humedad}%
              </p>
            </div>
          </div>
          {/* Temperatura */}
          <div className="bg-white rounded-[24px] p-4 flex items-center gap-3 shadow-sm">
            <ThermometerSimple size={34} weight="fill" color="#A2E4B8" />
            <div>
              <p className="text-subtext text-xs">Temperatura</p>
              <p className="text-subtext text-[22px] font-bold">
                {data.temperatura}°C
              </p>
            </div>
          </div>
        </div>

        {/* ALERTA */}
        {data.alerta && (
          <div className="flex items-center justify-center gap-2 bg-[#FFE7E7] rounded-[24px] py-3 px-3 md:col-start-1 md:row-start-2">
            <div className="w-7 h-7 bg-[#F76E6E] rounded-full flex items-center justify-center">
              <FiAlertCircle size={16} color="white" />
            </div>
            <span className="text-[#F76E6E] text-[17px] md:text-[19px] font-bold text-center break-words">
              Alerta de humedad baja
            </span>
          </div>
        )}

        {/* GRÁFICA */}
        <div className="bg-white rounded-[24px] p-4 h-52 md:h-64 lg:h-[330px] flex flex-col shadow-sm md:col-start-2 md:row-start-1 md:row-span-3">
          <div className="flex-1">
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="text-subtext text-xs mt-2 text-center">
            Sensor: <span className="font-semibold text-text">Activo</span> •
            Zona: <span className="font-semibold text-text">Invernadero 1</span>
          </div>
        </div>

        {/* BOTONES */}
        <div className="flex flex-col gap-2 md:col-start-1 md:row-start-3">
          <Link
            to="/sensores"
            className="
              bg-primary text-white font-semibold
              py-3 rounded-[18px]
              shadow text-center hover:opacity-90
              text-sm
            "
          >
            Ver historial
          </Link>

          <Link
            to="/editar-umbrales"
            className="
              bg-white border border-border text-text font-semibold
              py-3 rounded-[18px]
              shadow text-center hover:opacity-90
              text-sm
            "
          >
            Configuración Umbral…
          </Link>
        </div>
      </section>
    </>
  );
}
