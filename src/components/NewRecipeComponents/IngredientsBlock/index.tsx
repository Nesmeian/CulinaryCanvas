import { Heading, HStack, Image, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { IngredientsType } from '~/types/NewRecipesTypes';

import * as AddIcon from '../../../assets/addIcon/index';
import { newRecipeHeadingStyle } from '../componentStyles';
import { AddIngredients } from './AddIngredients';
import { IngredientsDescription } from './ingredientsDescription';
import { IngredientsList } from './IngredientsList';

export const IngredientsBlock = () => {
    const [ingredients, setIngredient] = useState<IngredientsType>([]);

    return (
        <VStack w='100%'>
            <HStack alignItems='flex-start' w='100%'>
                <Heading {...newRecipeHeadingStyle}>Добавьте ингредиенты рецепта, нажав на</Heading>
                <Image src={AddIcon.Black} alt='add ingredient' />
            </HStack>
            <VStack w='100%' alignItems='flex-start'>
                <IngredientsDescription />
                {ingredients && (
                    <IngredientsList ingredients={ingredients} setIngredient={setIngredient} />
                )}
                <AddIngredients setIngredient={setIngredient} />
            </VStack>
        </VStack>
    );
};
