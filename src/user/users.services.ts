import bcrypt from 'bcrypt';
import { prisma } from '../app';

const createUser = async (name: string, username: string, password: string) => {
    password = bcrypt.hashSync(password, 12);
    const user = await prisma.user.create({ data: { name, username, password } })
    return user;
}

const deleteUser = async (id: string) => {
    const user = await prisma.user.delete({ where: { id } })
    return user;
}

const updateUser = async (id: string, name: string) => {
    const user = await prisma.user.update({ where: { id }, data: { name } })
    return user;
}

const findUserByUsername = async (username: string) => {
    const user = await prisma.user.findUnique({ where: { username } })
    return user;
}

const findUserById = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } })
    return user;
}

export { createUser, updateUser, deleteUser, findUserByUsername, findUserById }