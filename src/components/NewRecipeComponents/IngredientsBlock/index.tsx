import { Heading, HStack, Image, VStack } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Loader } from '~/components/loader';
import { useGetMeasureUnitQuery } from '~/query/services/get/getMeasureUnits';
import { RecipeFields } from '~/types/NewRecipesTypes';

import * as AddIcon from '../../../assets/addIcon/index';
import { newRecipeHeadingStyle } from '../componentStyles';
import { AddIngredients } from './AddIngredients';
import { IngredientsDescription } from './ingredientsDescription';
import { IngredientsList } from './IngredientsList';

export const IngredientsBlock = () => {
    const {
        control,
        clearErrors,
        formState: { errors },
    } = useFormContext<RecipeFields>();

    const { fields, append, remove, update } = useFieldArray({
        name: 'ingredients',
        control,
    });
    const { data: measureUnits, isLoading } = useGetMeasureUnitQuery();
    const mockMeasureUnits = [
        {
            _id: '67df368460039e390e3546da',
            name: 'грамм',
        },
    ];

    return (
        <VStack w='100%'>
            <HStack alignItems='flex-start' w='100%'>
                <Heading {...newRecipeHeadingStyle}>Добавьте ингредиенты рецепта, нажав на</Heading>
                <Image src={AddIcon.Black} alt='add ingredient' />
            </HStack>

            <VStack w='100%' alignItems='flex-start'>
                <IngredientsDescription />
                <IngredientsList
                    measure={measureUnits ?? mockMeasureUnits}
                    fields={fields}
                    remove={remove}
                    update={update}
                />

                <AddIngredients
                    measure={measureUnits ?? mockMeasureUnits}
                    append={append}
                    clearErrors={clearErrors}
                    hasError={fields.length === 0 ? !!errors.ingredients : undefined}
                />
            </VStack>
            {isLoading && <Loader />}
        </VStack>
    );
};
