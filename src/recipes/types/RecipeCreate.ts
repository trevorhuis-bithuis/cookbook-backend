interface RecipeCreate {
    title: string;
    description: string;
    category: string;
    steps: string[];
    ingredients: string[];
    favorite: boolean;
}

interface IngredientCreate {
    name: string;
    quantity: number;
    unit: string;
}

export { RecipeCreate, IngredientCreate };