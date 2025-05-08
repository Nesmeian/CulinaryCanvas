import { StepsData } from '../recipesData';

export type ComingCategoryData = {
    category: string;
    description: string;
    icon: string;
    _id: string;
    title: string;
    subCategories: SubCategoriesValues[];
};
export type ComingRecipeDataProps = {
    data: ComingRecipeData[];
    meta: MetaValues;
};
export type ComingRecipeData = {
    authorId: string;
    bookmarks: number;
    likes: number;
    categoriesIds: string[];
    createdAt: string;
    description: string;
    image: string;
    ingredients: IngredientsValues[];
    nutritionValue: NutritionValues;
    portions: number;
    steps: StepsData[];
    time: number;
    title: string;
    views: number;
    _id: string;
};
type SubCategoriesValues = {
    category: string;
    rootCategoryId: string;
    title: string;
    _id: string;
};
type IngredientsValues = {
    title: string;
    count: string;
    measureUnit: string;
};
type MetaValues = { total: number; limit: number; page: number; totalPages: number };
type NutritionValues = {
    calories: number;
    carbohydrates: number;
    fats: number;
    protein: number;
};
export type SubCategoriesProps = {
    category: string;
    rootCategoryId: string;
    title: string;
    _id: string;
};
