import { FilterData } from '~/types/userTypes';

import getEngCategory from '../getEngCategory';

export function getFilledFilterData(data: FilterData) {
    const entries = Object.entries(data) as [keyof FilterData, string[] | string][];
    const filtered = entries.filter(([_, value]) => {
        if (Array.isArray(value)) {
            return value.length > 0;
        }
        return value != null;
    });

    const result = Object.fromEntries(filtered) as Partial<FilterData>;
    if (Array.isArray(result.category)) {
        result.category = result.category.map(getEngCategory);
    }

    return result;
}
