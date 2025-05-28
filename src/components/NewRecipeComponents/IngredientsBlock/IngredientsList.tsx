import { FormControl, HStack, Image, Input } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

import { IngredientsListProps, RecipeFields } from '~/types/NewRecipesTypes';

import deleteIcon from '../../../assets/deleteIcon.svg';
import { ChooseMeasure } from './ChooseMeasure';
export const IngredientsList = ({ measure, fields, remove, update }: IngredientsListProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext<RecipeFields>();

    return (
        <>
            {fields.map((field, idx) => (
                <HStack key={field.id || idx} spacing='12px' w='100%'>
                    <FormControl
                        isInvalid={!!errors.ingredients?.[idx]?.title}
                        w={{ lg: '295px', md: '241px', base: '328px' }}
                    >
                        <Controller
                            name={`ingredients.${idx}.title`}
                            control={control}
                            defaultValue={field.title}
                            render={({ field }) => <Input {...field} placeholder='Ингредиент' />}
                        />
                    </FormControl>

                    <FormControl
                        isInvalid={!!errors.ingredients?.[idx]?.count}
                        w={{ base: '80px' }}
                    >
                        <Controller
                            name={`ingredients.${idx}.count`}
                            control={control}
                            defaultValue={field.count}
                            render={({ field }) => (
                                <Input {...field} type='number' placeholder='100' />
                            )}
                        />
                    </FormControl>

                    <ChooseMeasure
                        value={field.measureUnit}
                        onChange={(val) => {
                            const newUnit = typeof val === 'string' ? val : val(field.measureUnit);
                            update(idx, { ...field, measureUnit: newUnit });
                        }}
                        isInvalid={!!errors.ingredients?.[idx]?.measureUnit}
                        measure={measure}
                    />

                    {fields.length > 1 && (
                        <Image
                            src={deleteIcon}
                            alt='удалить ингредиент'
                            cursor='pointer'
                            onClick={() => remove(idx)}
                        />
                    )}
                </HStack>
            ))}
        </>
    );
};
