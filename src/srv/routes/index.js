import express from 'express';
import LogicController from '../controllers/logic';
const router = new express.Router();

router.get('/api/login',  LogicController.start);
router.get('/api/login?:key', LogicController.getLogin);
router.get('/api/logs/:key', LogicController.getLogs);
router.post('/api/add/:key', LogicController.addLog);

export default router;
