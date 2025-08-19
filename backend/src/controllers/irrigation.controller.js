import {
  getStatus,
  toggle,
  getSchedule,
  updateSchedule,
} from '../services/irrigation.service.js';

export const getStatusCtrl = (req, res) => {
  res.json(getStatus());
};

export const toggleCtrl = (req, res) => {
  const { active } = req.body || {};
  res.json(toggle(active));
};

export const getScheduleCtrl = (req, res) => {
  res.json(getSchedule());
};

export const updateScheduleCtrl = (req, res) => {
  const { durationMin, frequencyH } = req.body || {};
  res.json(updateSchedule({ durationMin, frequencyH }));
};
