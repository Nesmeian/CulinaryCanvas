export type IngredientsType = {
    title: string;
    count: number;
    measureUnit: string;
}[];
export type IngredientsListProps = {
    ingredients: IngredientsType;
    setIngredient: React.Dispatch<React.SetStateAction<IngredientsType>>;
};
export type newRecipeStepsType = {
    step: number;
    image: string;
    description: string;
}[];
export type newRecipeStepsListType = {
    steps: newRecipeStepsType;
    setSteps: React.Dispatch<React.SetStateAction<newRecipeStepsType>>;
};
