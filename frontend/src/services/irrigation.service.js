// Consume tu backend: http://localhost:3000/api/irrigation (via proxy)
// Además incluye fallback en localStorage por si el backend no está arriba.

const API = "/api/irrigation";

const LS_KEY = "hydroleaf_irrigation";
const getLocal = () => {
  const raw = localStorage.getItem(LS_KEY);
  if (raw) return JSON.parse(raw);
  const seed = { active: false, durationMin: 30, frequencyH: 24, nextRun: "08:00" };
  localStorage.setItem(LS_KEY, JSON.stringify(seed));
  return seed;
};
const setLocal = (v) => localStorage.setItem(LS_KEY, JSON.stringify(v));

export async function getIrrigationStatus() {
  try {
    const r = await fetch(`${API}/status`);
    if (!r.ok) throw new Error();
    return await r.json();
  } catch {
    const cur = getLocal();
    return { active: cur.active };
  }
}

export async function toggleIrrigation(nextActive) {
  try {
    const r = await fetch(`${API}/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: nextActive }),
    });
    if (!r.ok) throw new Error();
    return await r.json();
  } catch {
    const cur = getLocal();
    cur.active = nextActive;
    setLocal(cur);
    return { ok: true, active: cur.active };
  }
}

export async function getIrrigationSchedule() {
  try {
    const r = await fetch(`${API}/schedule`);
    if (!r.ok) throw new Error();
    return await r.json();
  } catch {
    const cur = getLocal();
    return {
      durationMin: cur.durationMin,
      frequencyH: cur.frequencyH,
      nextRun: cur.nextRun,
    };
  }
}

export async function updateIrrigationSchedule({ durationMin, frequencyH }) {
  try {
    const r = await fetch(`${API}/schedule`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ durationMin, frequencyH }),
    });
    if (!r.ok) throw new Error();
    return await r.json();
  } catch {
    const cur = getLocal();
    cur.durationMin = durationMin;
    cur.frequencyH = frequencyH;

    // Calcula una próxima hora simple (ahora + frecuencia)
    const now = new Date();
    const next = new Date(now.getTime() + frequencyH * 60 * 60 * 1000);
    const hh = String(next.getHours()).padStart(2, "0");
    const mm = String(next.getMinutes()).padStart(2, "0");
    cur.nextRun = `${hh}:${mm}`;

    setLocal(cur);
    return { ok: true, ...cur };
  }
}
