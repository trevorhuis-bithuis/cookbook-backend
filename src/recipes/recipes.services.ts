import bcrypt from 'bcrypt';
import { prisma } from '../app';
import { Category } from '@prisma/client';
import RecipeSearch from './types/RecipeSearch';

const createRecipe = async (title: string, category: Category, favorite: boolean, description: any, steps: string[], authorId: string) => {
    if (!Object.values(Category).includes(category)) throw new Error('Invalid category'
        const recipe = await prisma.recipe.create({ data: { title, category, favorite, steps, authorId, description } })
    return recipe;
}

const deleteRecipe = async (id: string) => {
    const recipe = await prisma.recipe.delete({ where: { id } })
    return recipe;
}

const updateRecipe = async (id: string, title: string) => {
    const recipe = await prisma.recipe.update({ where: { id }, data: { title } })
    return recipe;
}

const findRecipeById = async (id: string) => {
    const recipe = await prisma.recipe.findUnique({ where: { id } })
    return recipe;
}

const searchRecipes = async (filters: RecipeSearch) => {
    const { category, ingredients, favorite, skip, take } = filters;
    const searchObj: any = {}

    if (category) searchObj.category = category;
    if (favorite) searchObj.favorite = favorite;
    if (ingredients) searchObj.ingredients = { some: { name: { in: ingredients } } }

    const recipes = await prisma.recipe.findMany({ skip, take, where: searchObj })
    return recipes;
}

const getSearchFilters = async () => {
    const ingredients = await prisma.ingredient.findMany({
        where: {},
        distinct: ['name']
    });
    return { ingredients, categories: Object.values(Category) as string[] };
}


export { createRecipe, updateRecipe, deleteRecipe, findRecipeById, searchRecipes, getSearchFilters }