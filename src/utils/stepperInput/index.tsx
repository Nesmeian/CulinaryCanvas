import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';

export default function StepperInput({
    count,
    setCount,
}: {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <NumberInput
            w={{ md: '90px', base: '73px' }}
            value={count}
            min={1}
            max={99}
            onChange={(valueString) => {
                const value = parseInt(valueString) || 1;
                setCount(Math.min(Math.max(value, 1), 99));
            }}
        >
            <NumberInputField
                onKeyDown={(e) => {
                    if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight/.test(e.key)) {
                        e.preventDefault();
                    }
                }}
            />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    );
}
