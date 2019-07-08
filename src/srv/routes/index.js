import express from 'express';
import LogicController from '../controllers/logic';
const router = new express.Router();

router.get('/api/login/', LogicController.start);
router.get('/api/login/:key', LogicController.getLogin);
router.get('/api/:key/logs', LogicController.getLogs);
router.post('/api/:key/add', LogicController.addLog);
router.put('/api/:key/logs/:logid', LogicController.editLog);
router.get('/api/:key/logs/:logid', LogicController.getLog);

export default router;