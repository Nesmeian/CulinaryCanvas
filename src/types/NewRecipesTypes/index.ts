import {
    FieldArrayWithId,
    FieldErrors,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFieldArrayUpdate,
    UseFormClearErrors,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';

export type IngredientsListProps = {
    measure: { _id: string; name: string }[];
    fields: FieldArrayWithId<RecipeFields, 'ingredients', 'id'>[];
    remove: UseFieldArrayRemove;
    update: UseFieldArrayUpdate<RecipeFields, 'ingredients'>;
};
type measureType = {
    _id: string;
    name: string;
};
export type addCategoryToNewRecipeProps = {
    selectCategory: string[];
    width: number;
    setValue: UseFormSetValue<RecipeFields>;
};
export type AddIngredientsProps = {
    measure?: measureType[];
    append: UseFieldArrayAppend<RecipeFields, 'ingredients'>;
    clearErrors: UseFormClearErrors<RecipeFields>;
    hasError?: boolean;
};
export type newRecipeStepsType = {
    image: string | undefined;
    description: string;
}[];
export type newRecipeStepsListType = {
    steps: FieldArrayWithId<RecipeFields, 'steps', 'id'>[];
    remove: UseFieldArrayRemove;
    update: UseFieldArrayUpdate<RecipeFields, 'steps'>;
    errors: FieldErrors<RecipeFields>;
};
export type RecipeFields = {
    title: string;
    description: string;
    image: File;
    portions: number;
    time: number;
    categoriesIds: string[];
    ingredients: Ingredient[];
    steps: newRecipeStepsType;
};
export type Ingredient = {
    title: string;
    count: number;
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
    measure?: measureType[];
    resetArrayError?: () => void;
};
