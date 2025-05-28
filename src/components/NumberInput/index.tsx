import {
    FormControl,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput as NumberInputComponent,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';

type Props = {
    value: number;
    onChange: (val: string) => void;
    error?: string;
};
export const NumberInput = ({ value, onChange, error }: Props) => (
    <FormControl isInvalid={!!error}>
        <NumberInputComponent w='90px' value={value} onChange={onChange}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInputComponent>
    </FormControl>
);
