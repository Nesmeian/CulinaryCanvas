import { useGetSortedAtLikesQuery } from '~/query/services/get';

export const useGetJuiciest = (limit: number, page: number) => {
    const { data, isLoading, isError, isFetching } = useGetSortedAtLikesQuery({
        limit,
        page,
    });
    return { data, isLoading, isError, isFetching };
};
