import { CardItem, NotificationBase } from '../dataTypes';

export interface AuthorData {
    name: string;
    email: string;
    imgUrl: string;
    notifications: NotificationBase;
}
interface IngredientsData {
    title: string;
    count: string;
    measureUnit: string;
}
interface StepsData {
    stepNumber: number;
    description: string;
    image?: string;
}
export interface NutritionValueData {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
}

export interface StepsDataProps {
    data: StepsData[];
}
export interface IngredientsDataProps {
    data: IngredientsData[];
    recipePortions: number;
}

export interface RecipeData extends CardItem {
    id: string;
    title: string;
    description: string;
    tag: string[];
    subtag: string[];
    path: string;
    imgUrl: string;
    notifications: NotificationBase;
    date: string;
    time: string;
    portions: number;
    nutritionValue: NutritionValueData;
    author: AuthorData;
    ingredients: IngredientsData[];
    meat?: string;
    side?: string;
    steps: StepsData[];
}
