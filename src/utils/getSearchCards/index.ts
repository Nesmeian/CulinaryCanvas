import { CardItem } from '~/types/dataTypes';

import DB from '../../data/db.json';
import concatAllArrays from '../concatAllArrays';
import findCardArrays from '../findCardsArray';
export default function getSearchCards(search: string) {
    let arr: CardItem[][] = [];
    arr = findCardArrays(DB, arr);
    console.log(arr);
    const newArr = concatAllArrays(arr);
    const searchResults = newArr
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
