import { RecipeData } from '~/types/recipesData';

import DB from '../../data/db.json';
import filterOnSubCategories from '../filterOnsubcategorys';
export default function getSearchCards(search: string, category?: string, subcategory?: string) {
    const searchDB = category ? DB.card.filter((e) => e.category.includes(category)) : DB.card;
    const searchDb: RecipeData[] = subcategory
        ? filterOnSubCategories(searchDB, subcategory)
        : searchDB;
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
