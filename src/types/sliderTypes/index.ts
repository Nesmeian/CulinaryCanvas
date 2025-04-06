import tagsKeys from '~/components/slider/tags/tagsImgData';

export type TagKey = keyof typeof tagsKeys;

export default interface TagsProps {
    tag: TagKey; // Теперь принимает только конкретные значения
}
interface Notifications {
    share?: string;
    likes?: string;
}

export interface SliderNotificationsProps {
    notifications?: Notifications;
}
