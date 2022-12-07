export default interface RecipeSearch {
    category?: string;
    ingredients?: string[];
    favorite?: boolean;
    skip: number;
    take: number;
}