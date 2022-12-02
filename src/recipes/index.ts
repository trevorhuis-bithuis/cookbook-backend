import express from 'express';
import { isAuthenticated } from '../middlewares';
import * as handler from './recipes.handlers'

const router = express.Router()

router.put('/:id', isAuthenticated, handler.updateRecipeHandler)
router.delete('/:id', isAuthenticated, handler.deleteRecipeHandler)
router.get('/:id', isAuthenticated, handler.getRecipeHandler)

export default router