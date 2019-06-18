import express from 'express';
import LogicController from '../controllers/logic';
const router = new express.Router();

router.get('/',  LogicController.start);
router.get('/api/users/:id', LogicController.getUser);
router.get('/api/logs', LogicController.getLogs);
router.get('/api/log/:id', LogicController.getLog);
router.post('/api/add', LogicController.addLog);
router.put('/api/edit/:id', LogicController.editLog);
export default router;
