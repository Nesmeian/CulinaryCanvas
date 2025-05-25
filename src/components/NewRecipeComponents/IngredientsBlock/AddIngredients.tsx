import { FormControl, Image, Input } from '@chakra-ui/react';
import { useState } from 'react';

import { IngredientsType } from '~/types/NewRecipesTypes';

import * as AddIcon from '../../../assets/addIcon/index';
import { ChooseMeasure } from './ChooseMeasure';
export const AddIngredients = ({
    setIngredient,
}: {
    setIngredient: React.Dispatch<React.SetStateAction<IngredientsType>>;
}) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [measure, setMeasure] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const isNameValid = name.trim().length > 0 && name.trim().length <= 50;
    const isValid =
        isNameValid && !isNaN(Number(quantity)) && Number(quantity) > 0 && measure !== '';

    const handleAdd = () => {
        setIsTouched(true);
        if (!isValid) return;
        setIngredient((prev) => [
            ...prev,
            { title: name.trim(), count: Number(quantity), measureUnit: measure },
        ]);
        setName('');
        setQuantity('');
        setMeasure('');
        setIsTouched(false);
    };

    return (
        <FormControl gap='12px' display='flex'>
            <Input
                placeholder='Ингредиент'
                value={name}
                type='text'
                onChange={(e) => setName(e.target.value)}
                w={{ lg: '295px', md: '241px', base: '328px' }}
                isInvalid={isTouched && !isNameValid}
                errorBorderColor='red.300'
            />
            <Input
                placeholder='100'
                w={{ base: '80px' }}
                value={quantity}
                type='number'
                onChange={(e) => setQuantity(e.target.value)}
                isInvalid={isTouched && (Number(quantity) <= 0 || isNaN(Number(quantity)))}
                errorBorderColor='red.300'
            />
            <ChooseMeasure
                value={measure}
                onChange={setMeasure}
                isInvalid={isTouched && measure === ''}
            />
            <Image src={AddIcon.WhiteCenter} alt='add icon' onClick={handleAdd} cursor='pointer' />
        </FormControl>
    );
};
