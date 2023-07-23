import express from 'express';
import * as categoryControllers from '../controllers/categoryControllers'

const router = express.Router();

router.get('/all', categoryControllers.getAllCatgory)

export default router