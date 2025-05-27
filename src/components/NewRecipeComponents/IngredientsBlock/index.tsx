import { Heading, HStack, Image, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { Loader } from '~/components/loader';
import { useGetMeasureUnitQuery } from '~/query/services/get/getMeasureUnits';
import { RecipeFormProps } from '~/types/NewRecipesTypes';

import * as AddIcon from '../../../assets/addIcon/index';
import { newRecipeHeadingStyle } from '../componentStyles';
import { AddIngredients } from './AddIngredients';
import { IngredientsDescription } from './ingredientsDescription';
import { IngredientsList } from './IngredientsList';

export const IngredientsBlock = ({ register, errors, setValue, clearErrors }: RecipeFormProps) => {
    const [ingredients, setIngredient] = useState<IngredientsType>([]);
    const { data, isLoading } = useGetMeasureUnitQuery();
    console.log(data);
    return (
        <VStack w='100%'>
            <HStack alignItems='flex-start' w='100%'>
                <Heading {...newRecipeHeadingStyle}>Добавьте ингредиенты рецепта, нажав на</Heading>
                <Image src={AddIcon.Black} alt='add ingredient' />
            </HStack>
            <VStack w='100%' alignItems='flex-start'>
                <IngredientsDescription />
                {ingredients && (
                    <IngredientsList
                        measure={data ? data : undefined}
                        ingredients={ingredients}
                        setIngredient={setIngredient}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                )}
                <AddIngredients
                    setIngredient={setIngredient}
                    measure={data ? data : undefined}
                    isInvalidArray={ingredients.length === 0 ? !!errors.ingredients : undefined}
                    clearErrors={ingredients.length === 0 ? clearErrors : undefined}
                />
            </VStack>
            {isLoading && <Loader />}
        </VStack>
    );
};
