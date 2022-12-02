import { Request, Response } from "express"
import { updateUser, deleteUser, findUserById } from './users.services'

const updateUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, password } = req.body

    const user = await updateUser(id, name)
    res.status(200).json({ user })
}

const deleteUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = await deleteUser(id)
    res.status(200).json({ user })
}

const getUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = await findUserById(id)
    res.status(200).json({ user })
}

export { updateUserHandler, deleteUserHandler, getUserHandler }