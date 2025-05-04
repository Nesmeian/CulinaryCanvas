import { useGetSortedAtLikesQuery } from '~/query/services/get';

export const useGetJuiciest = () => {
    const { data, isLoading } = useGetSortedAtLikesQuery();
    return { data, isLoading };
};
