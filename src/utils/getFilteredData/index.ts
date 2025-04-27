import { FilterData } from '~/types/userTypes';

import getEngCategory from '../getEngCategory';

export function getFilledFilterData(data: FilterData) {
    const entries = Object.entries(data) as [keyof FilterData, string[] | string][];
    const filtered = entries.filter(([_, value]) => {
        if (Array.isArray(value)) {
            return value.length > 0;
        }
        if (typeof value === 'string') {
            return value !== 'Категория' && value !== 'Поиск по автору';
        }
        return value != null;
    });

    const result = Object.fromEntries(filtered) as Partial<FilterData>;
    if (typeof result.category === 'string') {
        result.category = getEngCategory(result.category);
    }

    return result;
}
