import tagsKeys from '~/utils/addTags/tagsImgData';

export type TagKey = keyof typeof tagsKeys;

export default interface TagsProps {
    tag: TagKey;
}
interface Notifications {
    share?: string;
    likes?: string;
}

export interface addNotificationsProps {
    notifications?: Notifications;
}
