import { HStack, Image, Input } from '@chakra-ui/react';

import { IngredientsListProps, IngredientsType } from '~/types/NewRecipesTypes';

import deleteIcon from '../../../assets/deleteIcon.svg';
import { ChooseMeasure } from './ChooseMeasure';

export const IngredientsList = ({ ingredients, setIngredient }: IngredientsListProps) => {
    const updateItem = (
        idx: number,
        field: keyof IngredientsType[number],
        value: string | number,
    ) => {
        setIngredient((prev) =>
            prev.map((item, i) =>
                i === idx
                    ? { ...item, [field]: field === 'amount' ? Number(value) : String(value) }
                    : item,
            ),
        );
    };
    return ingredients.map((item, idx) => (
        <HStack key={idx} spacing='12px' w='100%'>
            <Input
                placeholder='Ингредиент'
                value={item.ingredient}
                onChange={(e) => updateItem(idx, 'ingredient', e.target.value)}
                w={{ lg: '295px', md: '241px', base: '328px' }}
            />
            <Input
                placeholder='100'
                w={{ base: '80px' }}
                value={item.amount}
                type='number'
                onChange={(e) => updateItem(idx, 'amount', e.target.value)}
            />
            <ChooseMeasure
                value={item.measurement}
                onChange={(val) => {
                    const newMeasurement = typeof val === 'string' ? val : val(item.measurement);
                    updateItem(idx, 'measurement', newMeasurement);
                }}
            />
            <Image
                src={deleteIcon}
                alt='delete ingredient icon'
                onClick={() => setIngredient((prev) => prev.filter((_, i) => i !== idx))}
            />
        </HStack>
    ));
};
