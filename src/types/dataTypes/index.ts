import { RecipeData } from '../recipesData';

export interface NotificationBase {
    share?: number;
    likes?: number;
    views?: number;
}

interface UserRecommendation {
    id: string;
    user: string;
    imgUrl: string;
}

export interface CardItem {
    id: string;
    imgUrl?: string;
    imgPath?: string;
    path?: string;
    title: string;
    description: string;
    category: string[];
    notifications?: NotificationBase;
    userRecommendation?: UserRecommendation;
    time?: string;
}
export interface SearchCardsProps {
    data: CardItem[];
}
interface BaseData {
    title: string;
    description?: string;
}

export interface CategoryData extends BaseData {
    elems: {
        smallCard?: Array<{
            id: string;
            title: string;
            category: string[];
            description: string;
            notifications?: NotificationBase;
        }>;
        recipes?: Array<{
            id: string;
            title: string;
            tag: string[];
        }>;
        card?: CardItem[];
    };
}

export type Category =
    | 'salads'
    | 'snacks'
    | 'firstCourses'
    | 'second-dish'
    | 'desserts'
    | 'grilledDishes'
    | 'vegan'
    | 'childrenMeals'
    | 'therapeuticNutrition'
    | 'national'
    | 'drinks'
    | 'preserves'
    | 'sauces'
    | 'juiciest';
export interface BottomSectionProps {
    data: CategoryData;
}

export interface CategoriesProps {
    subcategory?: string;
    category: 'veganCuisine' | 'juiciest';
}
export interface BigCardsListProps {
    data: CardItem[];
    maxElems?: number;
}
export interface DBProps {
    juiciest: {
        title: string;
        elems: {
            card: CardItem[];
        };
    };
    culinaryBlogData: SmallCardProps[];
    sliderData: CardItem[];
    navMenu: {
        categories: categoriesProps[];
        subcategories: subCategoriesProps;
    };
    veganCuisine: ExtendCategory;
    desserts: ExtendCategory;
    recipes: RecipeData[];
}
interface SmallCardProps {
    id: string;
    user: string;
    email: string;
    img: string;
    description: string;
}
interface categoriesProps {
    id: string;
    name: string;
    routeName: string;
    imgUrl: string;
    elems: subCategoriesProps;
}
interface subCategoriesProps {
    Закуски: string;
    'Первые блюда': string;
    'Вторые блюда': string;
    Гарниры: string;
    Десерты: string;
    'Сыроедческие блюда': string;
}
export interface ExtendCategory {
    title: string;
    description: string;
    elems: {
        smallCard: CardItem[];
        recipes: recipesProps[];
        card: CardItem[];
    };
}

interface recipesProps {
    id: string;
    title: string;
    tag: string[];
}
