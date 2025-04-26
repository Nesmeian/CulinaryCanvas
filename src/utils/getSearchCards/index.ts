import { CardItem } from '~/types/dataTypes';

import DB from '../../data/db.json';
import concatAllArrays from '../concatAllArrays';
import filterOnSubCategories from '../filterOnsubcategorys';
import findCardArrays from '../findCardsArray';
export default function getSearchCards(search: string, category?: string, subcategory?: string) {
    let arr: CardItem[][] = [];
    const searchDB = category ? DB[category] : DB;
    arr = findCardArrays(searchDB, arr);

    const newArr = concatAllArrays(arr);
    const searchDb = subcategory ? filterOnSubCategories(newArr, subcategory) : newArr;
    const searchResults = searchDb
        .filter((prof) => prof.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (
                a.title.toLowerCase().indexOf(search.toLowerCase()) >
                b.title.toLowerCase().indexOf(search.toLowerCase())
            ) {
                return 1;
            } else if (
                a.title.toLowerCase().indexOf(search.toLowerCase()) <
                b.title.toLowerCase().indexOf(search.toLowerCase())
            ) {
                return -1;
            } else {
                if (a.title > b.title) return 1;
                else return -1;
            }
        });
    return searchResults;
}
