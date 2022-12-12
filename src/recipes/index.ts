import express from 'express';
import { isAuthenticated } from '../middlewares';
import * as handler from './recipes.handlers'

const router = express.Router()

router.post('/', isAuthenticated, handler.createRecipeHandler)
router.put('/:id', isAuthenticated, handler.updateRecipeHandler)
router.delete('/:id', isAuthenticated, handler.deleteRecipeHandler)
router.get('/:id', isAuthenticated, handler.getRecipeHandler)
router.post('/search', isAuthenticated, handler.searchRecipesHandler)
router.get('/search-filters', isAuthenticated, handler.getSearchFiltersHandler)

export default router