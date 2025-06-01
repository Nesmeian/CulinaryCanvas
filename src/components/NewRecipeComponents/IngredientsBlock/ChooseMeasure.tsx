import { Select } from '@chakra-ui/react';
import { useEffect } from 'react';

import { ChooseMeasureProps } from '~/types/NewRecipesTypes';

export const ChooseMeasure = ({
    value,
    onChange,
    isInvalid,
    setValue,
    index,
    measure,
    resetArrayError,
}: ChooseMeasureProps) => {
    useEffect(() => {
        if (setValue && index !== undefined && value) {
            setValue(`ingredients.${index}.measureUnit`, value, { shouldValidate: true });
        }
    }, [value, index, setValue]);

    const SelectHandler = (newValue: string) => {
        onChange(newValue);
        if (setValue && index !== undefined) {
            setValue(`ingredients.${index}.measureUnit`, newValue, { shouldValidate: true });
        }
        if (resetArrayError) {
            resetArrayError();
        }
    };

    return (
        <Select
            placeholder='Единица измерения'
            value={value || ''}
            onChange={(e) => SelectHandler(e.target.value)}
            isInvalid={isInvalid}
        >
            {measure &&
                measure.map(({ name }) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
        </Select>
    );
};
