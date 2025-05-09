import { skipToken } from '@reduxjs/toolkit/query';

import { useGetCategoryIdQuery } from '~/query/services/get';

export const useGetCategoryId = (id?: string) => {
    const queryArg = id ? id : skipToken;
    const { data: subCategoryData, isLoading: isSubLoading } = useGetCategoryIdQuery(queryArg);
    const { data: category, isLoading: isRootLoading } = useGetCategoryIdQuery(
        subCategoryData?.rootCategoryId ?? '',
        {
            skip: !subCategoryData?.rootCategoryId,
        },
    );
    const loading = isSubLoading || isRootLoading;
    return { subCategoryData, category, loading };
};
