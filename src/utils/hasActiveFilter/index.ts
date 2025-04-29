import { FilterData } from '~/types/userTypes';

export default function hasActiveFilters(filterData: FilterData) {
    const filterDataArray: Record<string, string[]> = {
        allergens: filterData.allergens,
        sideDish: filterData.sideDish,
        meat: filterData.meat,
        category: filterData.category,
        auth: filterData.auth,
    };

    return Object.values(filterDataArray).some((value) =>
        Array.isArray(value) ? value.length > 0 : value !== '',
    );
}
