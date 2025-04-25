import { CardItem } from '~/types/dataTypes';

export default function concatAllArrays(arrays: CardItem[][]): CardItem[] {
    return arrays.reduce((acc, chunk) => acc.concat(chunk), [] as CardItem[]);
}
