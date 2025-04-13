import { TagKey } from '../utilsTypes';
interface Notification {
    share: number;
    likes: number;
}

interface UserRecommendation {
    id: string;
    user: string;
    imgUrl: string;
}

interface CardItem {
    id: string;
    imgUrl: string;
    title: string;
    description: string;
    tag: TagKey;
    notifications: Notification;
    userRecommendation?: UserRecommendation;
}

export default interface BigCardsListProps {
    maxElems: number;
    data: CardItem[];
}
