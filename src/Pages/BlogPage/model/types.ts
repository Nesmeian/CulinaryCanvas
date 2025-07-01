import { Blogger, Note } from '~/Pages/BlogsPage/model/types';
import { RecipeData } from '~/types/recipesData';

export type BloggerInfoType = {
    totalSubscribers: number;
    totalBookmarks: number;
    isFavorite: boolean;
    bloggerInfo: Blogger;
};
export interface UserBlogData {
    myBookmarks: number[];
    notes: Note[];
    recipes: RecipeData[];
    totalBookmarks: number;
    totalSubscribers: number;
    userId: string;
}
