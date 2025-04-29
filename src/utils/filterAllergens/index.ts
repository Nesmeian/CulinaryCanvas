import { RecipeData } from '~/types/recipesData';
export default function filterAllergens(allergens: string[], data: RecipeData[]) {
    return data.filter((item) =>
        allergens.every((key) => !Object.prototype.hasOwnProperty.call(item, key)),
    );
}
