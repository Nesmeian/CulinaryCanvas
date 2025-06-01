import { FormControl, Input, Textarea, VStack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import { RecipeFields } from '~/types/NewRecipesTypes';

export const NewRecipeTitle = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<RecipeFields>();

    return (
        <VStack w='100%' gap='24px'>
            <Controller
                name='title'
                control={control}
                render={({ field }) => (
                    <FormControl isInvalid={!!errors.title}>
                        <Input {...field} size='lg' placeholder='Название рецепта' />
                    </FormControl>
                )}
            />

            <FormControl isInvalid={!!errors.description}>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <Textarea {...field} h='80px' placeholder='Краткое описание рецепта' />
                    )}
                />
            </FormControl>
        </VStack>
    );
};
