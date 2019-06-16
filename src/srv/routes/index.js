import express from 'express';
import LogicController from '../controllers/logic';
const router = new express.Router();

router.get('/',  LogicController.start);

export default router;
