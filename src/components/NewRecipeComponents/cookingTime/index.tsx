import { Heading, HStack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import { NumberInput } from '~/components/NumberInput';
import { RecipeFields } from '~/types/NewRecipesTypes';

import { newRecipeHeadingStyle } from '../componentStyles';

export const CookingTime = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<RecipeFields>();

    return (
        <HStack gap='24px'>
            <Heading {...newRecipeHeadingStyle}>Сколько времени готовить в минутах?</Heading>

            <Controller
                name='time'
                control={control}
                defaultValue={30}
                render={({ field }) => (
                    <NumberInput
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.time?.message}
                    />
                )}
            />
        </HStack>
    );
};
