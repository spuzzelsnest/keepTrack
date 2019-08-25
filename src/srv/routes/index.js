import express from 'express';
import path from 'path';

import LogicController from '../controllers/logic';
const router = new express.Router();

//router.get(express.static(path.join(__dirname, '../_frontend')));
router.get(express.static('../_frontend'));
router.get('/api/login/:key', LogicController.getLogin);
router.get('/api/:key/logs', LogicController.getLogs);
router.post('/api/:key/add', LogicController.createLog);
router.post('/api/:key/logs/:logid', LogicController.createStartlog);
router.put('/api/:key/logs/:logid', LogicController.updateTimelog);
router.get('/api/:key/logs/:logid', LogicController.getLog);
router.get('/', LogicController.start);

export default router;