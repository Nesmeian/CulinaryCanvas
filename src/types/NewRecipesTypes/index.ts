export type IngredientsType = {
    ingredient: string;
    amount: number;
    measurement: string;
}[];
export type IngredientsListProps = {
    ingredients: IngredientsType;
    setIngredient: React.Dispatch<React.SetStateAction<IngredientsType>>;
};
