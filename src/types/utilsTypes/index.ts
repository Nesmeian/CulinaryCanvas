import tagsKeys from '../../utils/addTags/tagsImgData';

export type TagKey = keyof typeof tagsKeys;

export default interface TagsProps {
    color?: string;
    size?: string;
    withText: boolean;
    tag: TagKey[];
    newPosition?: true;
    category?: string;
    multi?: boolean;
}

export interface addNotificationsProps {
    isRecipe?: boolean;
    bookmarks: number;
    likes: number;
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
