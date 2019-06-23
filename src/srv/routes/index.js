import express from 'express';
import LogicController from '../controllers/logic';
const router = new express.Router();

router.get('/api/start',  LogicController.start);
router.get('/api/login', LogicController.getLogin);
router.get('/api/logs/:key', LogicController.getLogs);
router.post('/api/add', LogicController.addLog);

export default router;
