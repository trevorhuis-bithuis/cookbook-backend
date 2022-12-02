import express from 'express';
import * as handler from './auth.handlers'

const router = express.Router()

router.post('/register', handler.registerHandler)
router.post('/login', handler.loginHandler)
router.post('/logout', handler.logoutHandler)
router.post('/refresh-token', handler.refreshTokenHandler)

export default router