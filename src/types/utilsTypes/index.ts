import { JSX } from 'react';

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
export type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    element: JSX.Element;
    isFilter?: boolean;
};
export type isDrawerType = {
    isDrawer?: boolean;
    onClose: () => void;
};
export type BreadCrumbsTypes = {
    isOpen?: boolean;
    onClose?: () => void;
};
export type greenButtonType = {
    test?: string;
    center?: boolean;
    text: string;
    onClick?: () => void;
};
