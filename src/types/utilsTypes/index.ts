import tagsKeys from '../../utils/addTags/tagsImgData';

export type TagKey = keyof typeof tagsKeys;

export default interface TagsProps {
    color?: string;
    size?: string;
    withText: boolean;
    newPosition?: true;
    category: string;
    multi?: boolean;
}

export interface addNotificationsProps {
    isRecipe?: boolean;
    bookmarks?: number;
    likes?: number;
}
interface UserRecommendation {
    imgUrl: string;
    user: string;
}

export interface AddRecommendationProps {
    userRecommendation?: UserRecommendation | null;
}
export type Breakpoints = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};
export const meatType = {
    Курица: 'Chicken',
    Свинина: 'Pork',
    Говядина: 'Beef',
    Индейка: 'Turkey',
    Утка: 'Duck',
} as const;

export type MeatTypeKey = keyof typeof meatType;
export type MeatTypeMap = Record<MeatTypeKey, string>;

export const garnishType = {
    Картошка: 'Potato',
    Гречка: 'Buckwheat',
    Паста: 'Pasta',
    Спагетти: 'Spaghetti',
    Рис: 'Rice',
    Капуста: 'Cabbage',
    Фасоль: 'Beans',
    'Другие овощи': 'Other vegetables',
} as const;

export type GarnishTypeKey = keyof typeof garnishType;
export type GarnishTypeMap = Record<GarnishTypeKey, string>;
