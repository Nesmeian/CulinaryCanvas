import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput as NumberInputComponent,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';
export const NumberInput = ({ defaultValue }: { defaultValue: number }) => (
    <NumberInputComponent defaultValue={defaultValue} w='90px'>
        <NumberInputField />
        <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
        </NumberInputStepper>
    </NumberInputComponent>
);
