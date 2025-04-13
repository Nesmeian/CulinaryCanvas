export interface CategoriesProps {
    category: CategoryKey;
}

export interface DBStructure {
    juiciest: {
        title: string;
        elems: Array<{
            id: string;
            imgUrl: string;
            title: string;
            description: string;
            tag: string;
            notifications: {
                share: number;
                likes: number;
            };
            userRecommendation?: {
                id: string;
                user: string;
                imgUrl: string;
            };
        }>;
    };
    culinaryBlogData: Array<{
        id: string;
        user: string;
        email: string;
        img: string;
        description: string;
    }>;
    sliderData: Array<{
        id: string;
        imgUrl: string;
        title: string;
        description: string;
        tag: string;
        notifications?: {
            share?: number;
            likes?: number;
        };
    }>;
    navMenu: Array<{
        id: string;
        name: string;
        routeName: string;
        imgUrl: string;
        elems: Record<string, string>;
    }>;
    veganCuisine: {
        title: string;
        description: string;
        elems: {
            card: Array<{
                id: string;
                title: string;
                description: string;
                tag: string;
                notifications: {
                    share: string;
                    likes: string;
                };
            }>;
            recipes: Array<{
                id: string;
                title: string;
                tag: string;
            }>;
        };
    };
}
export interface CategoriesProps {
    category: CategoryKey;
}

export type CategoryKey = 'veganCuisine' | 'juiciest';

export type SubcategoryKey =
    | 'appetizers'
    | 'firstCourses'
    | 'mainCourses'
    | 'sideDishes'
    | 'desserts'
    | 'rawFoodDishes';
