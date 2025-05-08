import { useSelector } from 'react-redux';

import { useGetRecipesQuery } from '~/query/services/get';
import { ApplicationState } from '~/store/configure-store';

interface UseSearchRecipesParams {
    subcategory: string;
    categoryIds?: string[];
    allowSearch: boolean;
}

export function useSearchRecipesHook({
    subcategory,
    categoryIds = [],
    allowSearch,
}: UseSearchRecipesParams) {
    const search = useSelector((state: ApplicationState) => state.searchState.search);
    const allergens = useSelector((state: ApplicationState) => state.allergensSlice.allergens);
    const allergensActive = useSelector((state: ApplicationState) => state.allergensSlice.isActive);
    const {
        allergens: filteredAllergens,
        sideDish,
        meat,
    } = useSelector((state: ApplicationState) => state.filterState.filterData);

    const params = {
        searchString: search,
        limit: 8,
        ...(allergensActive && { allergens: allergens.join('') }),
        ...(filteredAllergens.length > 0 && { allergens: filteredAllergens.join('') }),
        ...(sideDish.length > 0 && { garnish: sideDish.join('') }),
        ...(meat.length > 0 && { meat: meat.join('') }),
        subcategory: categoryIds.length ? categoryIds.join(',') : subcategory,
    };

    // fire off the RTK Query
    const { data, isLoading, isFetching, isError } = useGetRecipesQuery(params, {
        skip: !allowSearch,
    });

    return {
        searchData: data,
        searchLoading: isLoading,
        searchFetching: isFetching,
        searchError: isError,
    };
}
