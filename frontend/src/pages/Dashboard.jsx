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
  const [umbral, setUmbral] = useState(() => {
    const saved = Number(localStorage.getItem(KEY));
    return !Number.isNaN(saved) && saved > 0 ? saved : 30; // default 30%
  });

  const [data, setData] = useState({ humedad: 0, temperatura: 0, alerta: false });
  const [historico, setHistorico] = useState([80, 75, 70, 65, 60, 55, 50]);

  // Simulación de datos
  useEffect(() => {
    const interval = setInterval(() => {
      const humedadRandom = Math.floor(Math.random() * 100);
      const temperaturaRandom = Math.floor(Math.random() * (40 - 15 + 1)) + 15;
      setData({
        humedad: humedadRandom,
        temperatura: temperaturaRandom,
        alerta: humedadRandom < umbral, // usa el umbral guardado
      });
      setHistorico((prev) => [...prev.slice(-6), humedadRandom]);
    }, 3000);
    return () => clearInterval(interval);
  }, [umbral]); // si cambia el umbral, se actualiza la condición

  // Si cambias el umbral en otra pestaña/ventana, sincroniza
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

  return (
    <div className="min-h-screen bg-background font-inter px-4 pt-6 pb-28">
      <div className="max-w-md mx-auto">
        {/* Encabezado con logo */}
        <div className="flex items-center gap-2 mb-1">
          <img src={logo} alt="HydroLeaf Logo" className="w-6 h-6" />
          <h1 className="text-secondary text-[24px] font-bold leading-tight">HydroLeaf</h1>
        </div>
        <h2 className="text-text text-[20px] font-semibold mb-6">Estado del cultivo</h2>

        {/* Tarjetas */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-[20px] p-4 flex items-center gap-3">
            <Drop size={36} weight="fill" color="#AFE4F7" />
            <div>
              <p className="text-subtext text-sm">Humedad actual</p>
              <p className="text-subtext text-[24px] font-bold">{data.humedad}%</p>
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-4 flex items-center gap-3">
            <ThermometerSimple size={36} weight="fill" color="#A2E4B8" />
            <div>
              <p className="text-subtext text-sm">Temperatura</p>
              <p className="text-subtext text-[24px] font-bold">{data.temperatura}°C</p>
            </div>
          </div>
        </div>

        {/* Alerta visual */}
        {data.alerta && (
          <div className="flex items-center justify-center gap-2 bg-white rounded-[14px] py-2 px-4 mb-4">
            <div className="w-6 h-6 bg-[#F76E6E] rounded-full flex items-center justify-center">
              <FiAlertCircle size={14} color="white" />
            </div>
            <span className="text-[#F76E6E] text-[20px] font-bold">
              Alerta de humedad baja (umbral {umbral}%)
            </span>
          </div>
        )}

        {/* Gráfica */}
        <div className="bg-white p-4 rounded-[20px] mb-4">
          <Line
            data={chartData}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                y: { min: 0, max: 100, ticks: { stepSize: 20 } },
                x: { ticks: { font: { size: 10 } } },
              },
            }}
          />
          <div className="text-subtext text-sm mt-2 text-center">
            Sensor: <span className="font-semibold text-text">Activo</span> • Zona:{" "}
            <span className="font-semibold text-text">Invernadero 1</span>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-3 mb-6">
          <Link
            to="/sensores"
            className="bg-primary text-white font-semibold py-3 rounded-[14px] shadow text-center hover:opacity-90"
          >
            Ver historial
          </Link>
          <Link
            to="/editar-umbrales"
            className="bg-white border border-border text-text font-semibold py-3 rounded-[14px] shadow text-center hover:opacity-90"
          >
            Configuración umbral…
          </Link>
        </div>
      </div>

      {/* Menú inferior (igual que ya tienes) */}
      {/* ... */}
    </div>
  );
}
