import { Box, FormControl, HStack, Image, Input } from '@chakra-ui/react';
import { useState } from 'react';

import { AddIngredientsProps } from '~/types/NewRecipesTypes';

import * as AddIcon from '../../../assets/addIcon/index';
import { ChooseMeasure } from './ChooseMeasure';
export const AddIngredients = ({ measure, append, clearErrors, hasError }: AddIngredientsProps) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [measureState, setMeasureState] = useState('');

    const resetArrayError = () => {
        if (hasError) clearErrors('ingredients');
    };

    const handleAdd = () => {
        const title = name.trim();
        const count = Number(quantity);
        append({ title, count, measureUnit: measureState });
        setName('');
        setQuantity('');
        setMeasureState('');
        resetArrayError();
    };

    return (
        <FormControl isInvalid={hasError} w='100%'>
            <HStack spacing='12px'>
                <Input
                    placeholder='Ингредиент'
                    value={name}
                    onChange={(e) => {
                        resetArrayError();
                        setName(e.target.value);
                    }}
                    w={{ lg: '295px', md: '241px', base: '328px' }}
                />
                <Input
                    placeholder='100'
                    value={quantity}
                    type='number'
                    onChange={(e) => {
                        resetArrayError();
                        setQuantity(e.target.value);
                    }}
                    w={{ base: '80px' }}
                />
                <Box width={{ md: '215px', base: '192px' }}>
                    <ChooseMeasure
                        value={measureState}
                        onChange={(val) => {
                            resetArrayError();
                            const newUnit = typeof val === 'string' ? val : val(measureState);
                            setMeasureState(newUnit);
                        }}
                        isInvalid={hasError}
                        measure={measure}
                        resetArrayError={resetArrayError}
                    />
                </Box>
                <Image
                    src={AddIcon.WhiteCenter}
                    alt='add icon'
                    onClick={handleAdd}
                    cursor='pointer'
                />
            </HStack>
        </FormControl>
    );
};
