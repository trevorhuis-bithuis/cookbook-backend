import { Request, Response } from "express"
import { createUser, updateUser, deleteUser, findUserByUsername } from './users.services'

const createUserHandler = async (req: Request, res: Response) => {
    const { name, username, password } = req.body

    const user = await createUser(name, username, password)
    res.status(201).json({ user })
}

const updateUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, username, password } = req.body

    const user = await updateUser(Number(id), name, username, password)
    res.status(200).json({ user })
}

const deleteUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = await deleteUser(Number(id))
    res.status(200).json({ user })
}

const getUserHandler = async (req: Request, res: Response) => {
    const { username } = req.params

    const user = await findUserByUsername(username)
    res.status(200).json({ user })
}

export { createUserHandler, updateUserHandler, deleteUserHandler, getUserHandler }