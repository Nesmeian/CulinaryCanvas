import { FormControl, HStack, Image, Input } from '@chakra-ui/react';

import { Ingredient, IngredientsListProps } from '~/types/NewRecipesTypes';

import deleteIcon from '../../../assets/deleteIcon.svg';
import { ChooseMeasure } from './ChooseMeasure';

export const IngredientsList = ({
    ingredients,
    setIngredient,
    register,
    errors,
    setValue,
    measure,
}: IngredientsListProps) => {
    const updateItem = (idx: number, field: keyof Ingredient[number], value: string | number) => {
        setIngredient((prev) =>
            prev.map((item, i) =>
                i === idx
                    ? { ...item, [field]: field === 'count' ? Number(value) : String(value) }
                    : item,
            ),
        );
    };

    return ingredients.map((item, idx) => (
        <HStack key={idx} spacing='12px' w='100%'>
            <FormControl isInvalid={!!errors.ingredients?.[idx]?.title}>
                <Input
                    {...register(`ingredients.${idx}.title`)}
                    placeholder='Ингредиент'
                    value={item.title}
                    onChange={(e) => updateItem(idx, 'title', e.target.value)}
                    w={{ lg: '295px', md: '241px', base: '328px' }}
                />
            </FormControl>
            <FormControl isInvalid={!!errors.ingredients?.[idx]?.count}>
                <Input
                    {...register(`ingredients.${idx}.count`)}
                    placeholder='100'
                    w={{ base: '80px' }}
                    value={item.count}
                    type='number'
                    onChange={(e) => updateItem(idx, 'count', e.target.value)}
                />
            </FormControl>
            <ChooseMeasure
                value={item.measureUnit}
                onChange={(val) => {
                    const newMeasurement = typeof val === 'string' ? val : val(item.measureUnit);
                    updateItem(idx, 'measureUnit', newMeasurement);
                }}
                isInvalid={!!errors.ingredients?.[idx]?.measureUnit}
                setValue={setValue}
                index={idx}
                measure={measure}
            />
            {ingredients.length !== 1 && (
                <Image
                    src={deleteIcon}
                    alt='delete ingredient icon'
                    onClick={() => setIngredient((prev) => prev.filter((_, i) => i !== idx))}
                />
            )}
        </HStack>
    ));
};
