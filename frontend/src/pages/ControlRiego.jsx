import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drop, Gear, ArrowLeft, Leaf } from "phosphor-react";
import logo from "../assets/HydroLeaf-logo.png";
import {
  getIrrigationStatus,
  toggleIrrigation,
  getIrrigationSchedule,
  updateIrrigationSchedule,
} from "../services/irrigationApi"; // 👈 corregido: servicio del FRONT

export default function ControlRiego() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const [nextRun, setNextRun] = useState("08:00");
  const [durationMin, setDurationMin] = useState(30);
  const [frequencyH, setFrequencyH] = useState(24);

  const [openConfig, setOpenConfig] = useState(false);
  const durationOptions = [10, 15, 20, 30, 45, 60];
  const frequencyOptions = [6, 8, 12, 24, 48, 72];

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const [status, sched] = await Promise.all([
          getIrrigationStatus(),
          getIrrigationSchedule(),
        ]);
        if (!alive) return;
        setIsActive(Boolean(status?.active));
        setNextRun(sched?.nextRun ?? "08:00");
        setDurationMin(Number(sched?.durationMin ?? 30));
        setFrequencyH(Number(sched?.frequencyH ?? 24));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const estadoBadge = useMemo(
    () =>
      isActive ? (
        <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 font-semibold"
          style={{ backgroundColor: "#A2E4B8", color: "#5A5A5A" }}>
          <Leaf size={16} /> Activo
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-1.5 text-gray-600 font-semibold">
          <Leaf size={16} /> Detenido
        </span>
      ),
    [isActive]
  );

  const onToggle = async () => {
    try {
      setToggling(true);
      const next = !isActive;
      setIsActive(next); // UI optimista
      await toggleIrrigation(next);
    } catch {
      setIsActive((v) => !v);
      alert("No se pudo cambiar el estado del riego.");
    } finally {
      setToggling(false);
    }
  };

  const onSave = async () => {
    try {
      setSaving(true);
      const r = await updateIrrigationSchedule({ durationMin, frequencyH });
      setNextRun(r?.nextRun ?? nextRun);
      setOpenConfig(false);
    } catch {
      alert("No se pudo guardar la configuración.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter px-4 pt-6 pb-28">
      <div className="max-w-md mx-auto">
        {/* Header con logo (igual estilo que Dashboard) */}
        <div className="flex items-center gap-2 mb-1">
          <button
            onClick={() => navigate(-1)}
            className="rounded-[14px] p-2 bg-white shadow"
            aria-label="Volver"
          >
            <ArrowLeft size={18} />
          </button>
          <img src={logo} alt="HydroLeaf Logo" className="w-6 h-6" />
          <h1 className="text-secondary text-[20px] font-semibold">HydroLeaf</h1>
        </div>

        <h2 className="text-text text-[28px] font-extrabold mb-4">Control de riego</h2>

        {/* Tarjeta Estado (paleta igual al Dashboard) */}
        <section className="bg-white rounded-[20px] p-5 mb-4 shadow">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[18px] bg-emerald-50 flex items-center justify-center">
              <Drop size={28} weight="fill" color="#AFE4F7" />
            </div>
            <div className="flex-1">
              <p className="text-subtext text-[16px] font-semibold leading-5">Estado del riego</p>
              <p className="text-text text-[34px] font-extrabold -mt-1">
                {isActive ? "Activo" : "Detenido"}
              </p>
              <div className="mt-2">{estadoBadge}</div>
            </div>
          </div>

          <button
            onClick={onToggle}
            disabled={toggling || loading}
            className={`mt-4 w-full rounded-[14px] py-3 font-semibold shadow transition ${
              isActive
                ? "bg-[#A2E4B8] text-[#5A5A5A] hover:opacity-95" // verde suave como dashboard
                : "bg-primary text-white hover:opacity-95"
            }`}
          >
            {isActive ? (toggling ? "Deteniendo..." : "Detener") : toggling ? "Activando..." : "Activar"}
          </button>
        </section>

        {/* Próximo riego */}
        <section className="bg-white rounded-[20px] p-5 mb-4 shadow">
          <p className="text-subtext text-[18px] font-semibold">Próximo riego</p>
          <p className="text-text text-[36px] font-extrabold mt-1">{nextRun}</p>
        </section>

        {/* Duración / Frecuencia */}
        <section className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-[20px] p-5 shadow">
            <p className="text-subtext text-[18px] font-semibold">Duración</p>
            <p className="text-text text-[26px] font-extrabold mt-1">
              {durationMin} minutos
            </p>
          </div>
          <div className="bg-white rounded-[20px] p-5 shadow">
            <p className="text-subtext text-[18px] font-semibold">Frecuencia</p>
            <p className="text-text text-[26px] font-extrabold mt-1">
              {frequencyH} Horas
            </p>
          </div>
        </section>

        {/* Botón Configurar */}
        <button
          onClick={() => setOpenConfig(true)}
          className="w-full bg-white border border-border rounded-[14px] p-3 font-semibold shadow flex items-center justify-center gap-2 hover:opacity-90"
        >
          <Gear size={18} /> Configurar
        </button>
      </div>

      {/* Modal Config */}
      {openConfig && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-end justify-center z-50"
          onClick={() => setOpenConfig(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-t-[24px] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[18px] font-bold text-text">Configurar riego</h3>
              <button
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => setOpenConfig(false)}
              >
                Cerrar
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Duración (min)</label>
                <select
                  className="w-full rounded-[12px] border border-border focus:ring-emerald-500 focus:border-emerald-500"
                  value={durationMin}
                  onChange={(e) => setDurationMin(Number(e.target.value))}
                >
                  {durationOptions.map((m) => (
                    <option key={m} value={m}>{m} minutos</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Frecuencia (horas)</label>
                <select
                  className="w-full rounded-[12px] border border-border focus:ring-emerald-500 focus:border-emerald-500"
                  value={frequencyH}
                  onChange={(e) => setFrequencyH(Number(e.target.value))}
                >
                  {frequencyOptions.map((h) => (
                    <option key={h} value={h}>Cada {h} horas</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              disabled={saving}
              onClick={onSave}
              className="mt-4 w-full rounded-[14px] py-3 font-semibold shadow bg-primary text-white hover:opacity-95 disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
