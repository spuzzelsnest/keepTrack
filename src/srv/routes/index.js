import express from 'express';
import LogicController from '../controllers/logic';
const router = new express.Router();

router.get('/api/login/', LogicController.start);
router.get('/api/login/:key', LogicController.getLogin);
router.post('/api/:key/add', LogicController.addLog);
router.get('/api/:key/logs', LogicController.getLogs);

export default router;