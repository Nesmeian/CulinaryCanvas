import { breadCrumbType } from '~/types/utilsTypes';

export const breadCrumbPath = ({ data, segment, index, pathSegments }: breadCrumbType) => {
    const category = data.find(({ category }) => category === segment);
    const routeTo =
        index !== 0
            ? `${pathSegments.slice(0, index + 1).join('/')}`
            : `/${pathSegments[0]}/${category?.subCategories[0].category}`;
    const isLast = index === pathSegments.length - 1;
    return { routeTo, isLast };
};
