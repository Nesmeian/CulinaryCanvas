import { FormControl, Image, Input } from '@chakra-ui/react';
import { useState } from 'react';

import { AddIngredientProps } from '~/types/NewRecipesTypes';

import * as AddIcon from '../../../assets/addIcon/index';
import { ChooseMeasure } from './ChooseMeasure';
export const AddIngredients = ({
    setIngredient,
    isInvalidArray,
    clearErrors,
}: AddIngredientProps) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [measure, setMeasure] = useState('');
    const isNameValid = name.trim().length > 0 && name.trim().length <= 50;
    const isValid =
        isNameValid && !isNaN(Number(quantity)) && Number(quantity) > 0 && measure !== '';
    const resetArrayError = () => {
        if (clearErrors && isInvalidArray) {
            clearErrors('ingredients');
        }
    };
    const handleAdd = () => {
        if (!isValid) return;
        setIngredient((prev) => [
            ...prev,
            { title: name.trim(), count: Number(quantity), measureUnit: measure },
        ]);
        setName('');
        setQuantity('');
        setMeasure('');
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
                value={measure}
                onChange={setMeasure}
                isInvalid={isInvalidArray}
                resetArrayError={resetArrayError}
            />
            <Image src={AddIcon.WhiteCenter} alt='add icon' onClick={handleAdd} cursor='pointer' />
        </FormControl>
    );
};
