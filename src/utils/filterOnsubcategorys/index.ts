import { RecipeData } from '~/types/recipesData';

export default function filterOnSubCategories(Data: RecipeData[], subcategory: string) {
    return Data.filter((item) => item.subcategory.includes(subcategory));
}
