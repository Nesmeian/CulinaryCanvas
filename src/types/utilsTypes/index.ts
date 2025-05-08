import tagsKeys from '../../utils/addTags/tagsImgData';
import { ComingCategoryData } from '../comingData';

export type TagKey = keyof typeof tagsKeys;

export default interface TagsProps {
    color?: string;
    size?: string;
    withText: boolean;
    newPosition?: true;
    category: string;
    multi?: boolean;
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

export type breadCrumbType = {
    data: ComingCategoryData[];
    segment: string;
    index: number;
    pathSegments: string[];
};
