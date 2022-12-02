import bcrypt from 'bcrypt';
import { prisma } from '../app';

const createRecipe = async (name: string, username: string, password: string) => {
    password = bcrypt.hashSync(password, 12);
    const user = await prisma.user.create({ data: { name, username, password } })
    return user;
}

const deleteRecipe = async (id: string) => {
    const user = await prisma.user.delete({ where: { id } })
    return user;
}

const updateRecipe = async (id: string, name: string) => {
    const user = await prisma.user.update({ where: { id }, data: { name } })
    return user;
}

const findRecipeById = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } })
    return user;
}

export { createRecipe, updateRecipe, deleteRecipe, findRecipeById }