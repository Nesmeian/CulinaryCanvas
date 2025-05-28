import { Heading, HStack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import { NumberInput } from '~/components/NumberInput';
import { RecipeFields } from '~/types/NewRecipesTypes';

import { newRecipeHeadingStyle } from '../componentStyles';

export const PersonCount = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<RecipeFields>();

    return (
        <HStack gap='24px'>
            <Heading {...newRecipeHeadingStyle}>На сколько человек ваш рецепт?</Heading>

            <Controller
                name='portions'
                control={control}
                defaultValue={4}
                render={({ field }) => (
                    <NumberInput
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.portions?.message}
                    />
                )}
            />
        </HStack>
    );
};
