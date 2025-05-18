import { FieldErrors } from 'react-hook-form';

import { RegFields } from '~/types/LoginTypes';

export const registrationProgress = (fields: RegFields, errors: FieldErrors<RegFields>) => {
    const entries = Object.entries(fields) as [keyof RegFields, string | undefined][];
    const totalFields = entries.length;

    const validFields = entries.filter(
        ([key, value]) => value?.trim() !== '' && !errors[key],
    ).length;

    return Math.round((validFields / totalFields) * 100);
};
