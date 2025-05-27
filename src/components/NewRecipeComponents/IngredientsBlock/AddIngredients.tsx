import { FormControl, Image, Input } from '@chakra-ui/react';
import { useState } from 'react';

import { AddIngredientProps } from '~/types/NewRecipesTypes';

import * as AddIcon from '../../../assets/addIcon/index';
import { ChooseMeasure } from './ChooseMeasure';
export const AddIngredients = ({
    setIngredient,
    isInvalidArray,
    clearErrors,
    measure,
}: AddIngredientProps) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [measureState, setMeasureState] = useState('');
    const resetArrayError = () => {
        if (clearErrors && isInvalidArray) {
            clearErrors('ingredients');
        }
    };
    const handleAdd = () => {
        setIngredient((prev) => [
            ...prev,
            { title: name.trim(), count: Number(quantity), measureUnit: measureState },
        ]);
    };
    return (
        <FormControl gap='12px' display='flex' isInvalid={isInvalidArray}>
            <Input
                placeholder='Ингредиент'
                value={name}
                type='text'
                onChange={(e) => {
                    resetArrayError(), setName(e.target.value);
                }}
                w={{ lg: '295px', md: '241px', base: '328px' }}
                errorBorderColor='red.300'
            />
            <Input
                placeholder='100'
                w={{ base: '80px' }}
                value={quantity}
                type='number'
                onChange={(e) => {
                    resetArrayError(), setQuantity(e.target.value);
                }}
                errorBorderColor='red.300'
            />
            <ChooseMeasure
                value={measureState}
                onChange={setMeasureState}
                isInvalid={isInvalidArray}
                resetArrayError={resetArrayError}
                measure={measure}
            />
            <Image src={AddIcon.WhiteCenter} alt='add icon' onClick={handleAdd} cursor='pointer' />
        </FormControl>
    );
};
