import tagsKeys from '~/utils/addTags/tagsImgData';

export type TagKey = keyof typeof tagsKeys;

export default interface TagsProps {
    color?: string;
    size?: string;
    withText: boolean;
    tag: TagKey;
}
interface Notifications {
    share?: string;
    likes?: string;
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
