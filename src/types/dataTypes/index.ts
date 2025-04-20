export interface NotificationBase {
    share?: number;
    likes?: number;
}

interface UserRecommendation {
    id: string;
    user: string;
    imgUrl: string;
}

export interface CardItem {
    id: string;
    imgUrl: string;
    path?: string;
    title: string;
    description: string;
    tag: string[];
    notifications: NotificationBase;
    userRecommendation?: UserRecommendation;
    time?: string;
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
            tag: string[];
            description: string;
            notifications: NotificationBase;
        }>;
        recipes?: Array<{
            id: string;
            title: string;
            tag: string[];
        }>;
        card?: CardItem[];
    };
}

export type Category = 'veganCuisine' | 'juiciest';
export interface BottomSectionProps {
    data: CategoryData;
}

export interface CategoriesProps {
    category: 'veganCuisine' | 'juiciest'; // 👈 Явно указываем допустимые значения
}
export interface BigCardsListProps {
    data: CategoryData;
    maxElems?: number;
}
