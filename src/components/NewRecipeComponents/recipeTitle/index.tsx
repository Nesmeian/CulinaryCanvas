import { FormControl, Input, Textarea, VStack } from '@chakra-ui/react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { RecipeFields } from '~/types/NewRecipesTypes';

export const NewRecipeTitle = ({
    register,
    errors,
}: {
    register: UseFormRegister<RecipeFields>;
    errors: FieldErrors<RecipeFields>;
}) => (
    <VStack w='100%' gap='24px'>
        <FormControl isInvalid={!!errors.title}>
            <Input {...register('title')} size='lg' placeholder='Название рецепта'></Input>
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
            <Textarea
                {...register('description')}
                h='80px'
                placeholder='Краткое описание рецепта'
            />
        </FormControl>
    </VStack>
);
