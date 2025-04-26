import { RecipeData } from '~/types/recipesData';

import DB from '../../data/db.json';
import concatAllArrays from '../concatAllArrays';
import findCardArrays from '../findCardsArray';
export default function filterRecipesOnData() {
    const arr: RecipeData[] = [];
    findCardArrays(DB, arr);
    const result = concatAllArrays(arr);
    const sortedByDate = result.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });

    return sortedByDate.slice(0, 10);
}
