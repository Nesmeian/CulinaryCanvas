import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

export type IngredientsType = {
    title: string;
    count: number;
    measureUnit: string;
}[];
export type IngredientsListProps = RecipeFormProps & {
    ingredients: IngredientsType;
    setIngredient: React.Dispatch<React.SetStateAction<IngredientsType>>;
};
export type AddIngredientProps = {
    setIngredient: React.Dispatch<React.SetStateAction<IngredientsType>>;
    isInvalidArray?: boolean;
    clearErrors?: UseFormClearErrors<RecipeFields>;
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
export type RecipeFields = {
    title: string;
    description: string;
    image: File;
    portions: number;
    time: number;
    ingredients: Ingredient[];
};
export type Ingredient = {
    title: string;
    count: string;
    measureUnit: string;
};
export type RecipeFormBasicProps = {
    register: UseFormRegister<RecipeFields>;
    errors: FieldErrors<RecipeFields>;
};
export type RecipeFormHelpers = {
    errors: FieldErrors<RecipeFields>;
    setValue: UseFormSetValue<RecipeFields>;
};
export type RecipeFormProps = {
    register: UseFormRegister<RecipeFields>;
    errors: FieldErrors<RecipeFields>;
    setValue: UseFormSetValue<RecipeFields>;
    clearErrors?: UseFormClearErrors<RecipeFields>;
};
export type NumberInputType = {
    name: keyof RecipeFields;
    value: number;
    setValue: UseFormSetValue<RecipeFields>;
    errors: FieldErrors<RecipeFields>;
};
export type ChooseMeasureProps = {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    isInvalid?: boolean;
    setValue?: UseFormSetValue<RecipeFields>;
    index?: number;
    resetArrayError?: () => void;
};
