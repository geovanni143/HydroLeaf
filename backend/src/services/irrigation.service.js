let state = {
  active: false,
  durationMin: 30,
  frequencyH: 24,
  nextRun: "08:00",
};

export function getStatus() {
  return { active: state.active };
}

export function toggle(active) {
  state.active = Boolean(active);
  return { ok: true, active: state.active };
}

export function getSchedule() {
  return {
    durationMin: state.durationMin,
    frequencyH: state.frequencyH,
    nextRun: state.nextRun,
  };
}

export function updateSchedule({ durationMin, frequencyH }) {
  if (durationMin !== undefined) state.durationMin = Number(durationMin);
  if (frequencyH !== undefined) state.frequencyH = Number(frequencyH);

  const now = new Date();
  const next = new Date(now.getTime() + state.frequencyH * 60 * 60 * 1000);
  const hh = String(next.getHours()).padStart(2, "0");
  const mm = String(next.getMinutes()).padStart(2, "0");
  state.nextRun = `${hh}:${mm}`;

  return { ok: true, ...state };
}
