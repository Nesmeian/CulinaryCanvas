import { CardItem, DBProps } from '~/types/dataTypes';

export default function findCardArrays(data: DBProps, results: CardItem[][] = []) {
    if (typeof data === 'object' && data !== null) {
        if (!Array.isArray(data) && 'card' in data && Array.isArray(data.card)) {
            results.push(data.card);
        }

        for (const key of Object.keys(data)) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                findCardArrays(data[key as keyof typeof data], results);
            }
        }
    }
    return results;
}
