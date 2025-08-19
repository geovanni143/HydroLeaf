import { Router } from 'express';
import {
  getStatusCtrl,
  toggleCtrl,
  getScheduleCtrl,
  updateScheduleCtrl,
} from '../controllers/irrigation.controller.js';

const router = Router();

router.get('/status', getStatusCtrl);
router.post('/toggle', toggleCtrl);
router.get('/schedule', getScheduleCtrl);
router.put('/schedule', updateScheduleCtrl);

export default router;
