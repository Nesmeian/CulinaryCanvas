import { Button, VStack } from '@chakra-ui/react';

import { RecipeFormProps } from '~/types/NewRecipesTypes';

import { IngredientsBlock } from '../IngredientsBlock';
import { RecipeStepsBlock } from '../recipeStepsBlock';

export const RecipeBuilder = ({ register, errors, setValue, clearErrors }: RecipeFormProps) => (
    <VStack w={{ lg: '658px', md: '604px', base: '328px' }} mt={{ base: '44px' }}>
        <IngredientsBlock
            register={register}
            errors={errors}
            setValue={setValue}
            clearErrors={clearErrors}
        />
        <RecipeStepsBlock />
        <Button type='submit' variant='commonLoginBtn'>
            Опубликовать рецепт
        </Button>
    </VStack>
);
