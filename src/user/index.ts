import express from 'express';
import { isAuthenticated } from '../middlewares';
import * as handler from './users.handlers'

const router = express.Router()

router.put('/:id', isAuthenticated, handler.updateUserHandler)
router.delete('/:id', isAuthenticated, handler.deleteUserHandler)
router.get('/:id', isAuthenticated, handler.getUserHandler)

export default router