import { useGetCategoryIdQuery } from '~/query/services/get';

export const useGetCategoryId = (id: string[]) => {
    const { data: subCategoryData, isLoading: isSubLoading } = useGetCategoryIdQuery(id[0]);
    const { data: category, isLoading: isRootLoading } = useGetCategoryIdQuery(
        subCategoryData?.rootCategoryId ?? '',
        {
            skip: !subCategoryData?.rootCategoryId,
        },
    );

    const loading = isSubLoading || isRootLoading;
    if (loading) {
        return { subCategoryData: null, category: null, loading: true };
    }
    return { subCategoryData, category, loading: false };
};
