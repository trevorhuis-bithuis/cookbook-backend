import express from 'express';
import { isAuthenticated } from '../middlewares';
import * as handler from './auth.handlers'

const router = express.Router()

router.post('/register', handler.registerHandler)
router.post('/login', handler.loginHandler)
router.post('/logout', isAuthenticated, handler.logoutHandler)
router.post('/refresh-token', handler.refreshTokenHandler)

export default router