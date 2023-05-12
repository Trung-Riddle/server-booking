import express from 'express';
import * as authControllers from '../controllers/authControllers'

const router = express.Router();

router.post('/register', authControllers.register)
router.post('/login', authControllers.login)

export default router