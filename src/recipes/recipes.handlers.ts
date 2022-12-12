import { Request, Response } from "express"
import { updateRecipe, deleteRecipe, findRecipeById, searchRecipes, getSearchFilters, createRecipe } from './recipes.services'

const createRecipeHandler = async (req: Request, res: Response) => {
    const { title, category, favorite, description, steps, authorId, ingredients } = req.body

    const user = await createRecipe(title, category, favorite, description, steps, authorId, ingredients)
    res.status(200).json({ user })
}

const updateRecipeHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, password } = req.body

    const user = await updateRecipe(id, name)
    res.status(200).json({ user })
}

const deleteRecipeHandler = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = await deleteRecipe(id)
    res.status(200).json({ user })
}

const getRecipeHandler = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = await findRecipeById(id)
    res.status(200).json({ user })
}

const searchRecipesHandler = async (req: Request, res: Response) => {
    const { filters } = req.body

    const user = await searchRecipes(filters);
    res.status(200).json({ user })
}

const getSearchFiltersHandler = async (req: Request, res: Response) => {
    const searchFilters = await getSearchFilters();
    return searchFilters;
}

export { updateRecipeHandler, deleteRecipeHandler, getRecipeHandler, searchRecipesHandler, getSearchFiltersHandler, createRecipeHandler }