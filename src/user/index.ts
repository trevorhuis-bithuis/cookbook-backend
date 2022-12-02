import express from 'express';
import { isAuthenticated } from '../middlewares';
import * as handler from './users.handlers'

const router = express.Router()

router.post('/create-user', handler.createUserHandler)
router.put('/update-user/:id', isAuthenticated, handler.updateUserHandler)
router.delete('/delete-user/:id', isAuthenticated, handler.deleteUserHandler)
router.get('/get-user/:username', isAuthenticated, handler.getUserHandler)

export default router