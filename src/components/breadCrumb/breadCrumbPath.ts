import { breadCrumbType } from '~/types/utilsTypes';

export const breadCrumbPath = ({ data, segment, index, pathSegments }: breadCrumbType) => {
    const isLast = index === pathSegments.length - 1;

    let routeTo = `/${pathSegments.slice(0, index + 1).join('/')}`;

    if (segment === 'blogs') {
        routeTo = '/blogs';
    } else if (index === 0) {
        const category = data.find((item) => item.category === segment);
        const firstSub = category?.subCategories?.[0]?.category;
        routeTo = firstSub ? `/${segment}/${firstSub}` : `/${segment}`;
    }

    return { routeTo, isLast };
};
