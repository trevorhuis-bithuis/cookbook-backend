import bcrypt from 'bcrypt';
import { prisma } from '../app';

const createUser = async (name: string, username: string, password: string) => {
    password = bcrypt.hashSync(password, 12);
    const user = await prisma.user.create({ data: { name, username, password } })
    return user;
}

const deleteUser = async (id: number) => {
    const user = await prisma.user.delete({ where: { id } })
    return user;
}

const updateUser = async (id: number, name: string, username: string, password: string) => {
    const user = await prisma.user.update({ where: { id }, data: { name, username, password } })
    return user;
}

const findUserByUsername = async (username: string) => {
    const user = await prisma.user.findUnique({ where: { username } })
    return user;
}

const findUserById = async (id: number) => {
    const user = await prisma.user.findUnique({ where: { id } })
    return user;
}

export { createUser, updateUser, deleteUser, findUserByUsername, findUserById }