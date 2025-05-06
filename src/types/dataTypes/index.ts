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
            bookmarks?: number;
            likes?: number;
        }>;
        recipes?: Array<{
            id: string;
            title: string;
            category: string[];
        }>;
        card?: CardItem[];
    };
}

export interface BottomSectionProps {
    data: CategoryData;
}

export interface CategoriesProps {
    subcategory?: string;
    category?: string;
}
export interface BigCardsListProps {
    data: RecipeData[];
    maxElems?: number;
    categoryTag?: string;
}
export interface DBProps {
    'the-juiciest': {
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
