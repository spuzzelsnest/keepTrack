import express from 'express';
import LogicController from '../controllers/logic';
const router = new express.Router();

router.get('/',  LogicController.start);
router.get('/api/users/:id', LogicController.getUser);
router.get('/api/logs', LogicController.getAllLogs);
router.get('/api/logs/:id', LogicController.getLog);
router.post('/api/add', LogicController.addLog);
export default router;
