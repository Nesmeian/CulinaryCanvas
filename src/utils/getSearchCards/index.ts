import { RecipeData } from '~/types/recipesData';
export default function getSearchCards(searchQuery: string, cards: RecipeData[]): RecipeData[] {
    if (!searchQuery) return cards;

    const lowerQuery = searchQuery.toLowerCase();

    const filtered = cards.filter((recipe) => recipe.title.toLowerCase().includes(lowerQuery));

    const sorted = filtered.sort((a, b) => {
        const idxA = a.title.toLowerCase().indexOf(lowerQuery);
        const idxB = b.title.toLowerCase().indexOf(lowerQuery);
        if (idxA !== idxB) {
            return idxA - idxB;
        }

        return a.title.localeCompare(b.title);
    });

    return sorted;
}
