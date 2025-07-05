import { CardItem } from '../dataTypes';

export interface AuthorData {
    name: string;
    email: string;
    imgUrl: string;
    notifications: AuthorNoticafiton;
}
type AuthorNoticafiton = {
    bookmarks: number;
    subscribe: number;
};
interface IngredientsData {
    title: string;
    count: string;
    measureUnit: string;
}
export interface StepsData {
    stepNumber: number;
    description: string;
    image: string;
}
export interface NutritionValueData {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
}

export interface IngredientsDataProps {
    data: IngredientsData[];
    recipePortions: number;
}

export interface RecipeData extends CardItem {
    id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    imgUrl: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    portions?: number;
    nutritionValue: NutritionValueData;
    author: AuthorData;
    ingredients: IngredientsData[];
    meat?: string;
    side?: string;
    steps: StepsData[];
}
