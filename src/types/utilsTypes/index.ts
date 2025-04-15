import tagsKeys from '../../utils/addTags/tagsImgData';

export type TagKey = keyof typeof tagsKeys;

export default interface TagsProps {
    color?: string;
    size?: string;
    withText: boolean;
    tag: TagKey;
    newPosition?: true;
}
interface Notifications {
    share?: number;
    likes?: number;
}

export interface addNotificationsProps {
    notifications?: Notifications;
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
