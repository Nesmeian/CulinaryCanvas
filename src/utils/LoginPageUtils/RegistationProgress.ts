import { RegFields } from '~/types/LoginTypes';

export const registrationProgress = (fields: RegFields) => {
    const totalFields = Object.keys(fields).length;
    const filledCount = Object.values(fields).filter((v) => v !== '').length;
    return Math.round((filledCount / totalFields) * 100);
};
