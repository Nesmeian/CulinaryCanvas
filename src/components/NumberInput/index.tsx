import {
    FormControl,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput as NumberInputComponent,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';

import { NumberInputType } from '~/types/NewRecipesTypes';
export const NumberInput = ({ name, value, setValue, errors }: NumberInputType) => (
    <FormControl isInvalid={!!errors[name]}>
        <NumberInputComponent
            w='90px'
            defaultValue={value}
            onChange={(valueString) => setValue(name, valueString, { shouldValidate: true })}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInputComponent>
    </FormControl>
);
