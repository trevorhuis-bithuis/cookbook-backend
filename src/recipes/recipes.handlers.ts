import { Request, Response } from "express"
import { updateRecipe, deleteRecipe, findRecipeById } from './recipes.services'

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

export { updateRecipeHandler, deleteRecipeHandler, getRecipeHandler }