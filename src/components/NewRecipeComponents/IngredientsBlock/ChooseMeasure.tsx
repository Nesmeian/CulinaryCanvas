import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Checkbox, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useEffect } from 'react';

import { ChooseMeasureProps } from '~/types/NewRecipesTypes';

import { chooseMeasureMenuStyle } from '../componentStyles';

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
    const SelectHandler = (e: string) => {
        onChange(e);
        if (setValue && index !== undefined) {
            setValue(`ingredients.${index}.measureUnit`, e, { shouldValidate: true });
        }
        if (resetArrayError) {
            resetArrayError();
        }
    };

    return (
        <Menu>
            <MenuButton
                as={Button}
                {...chooseMeasureMenuStyle}
                rightIcon={<ChevronDownIcon transition='transform 0.1s' />}
                border={isInvalid ? '1.667px solid' : '1px solid'}
                borderColor={isInvalid ? '#FC8181' : 'rgba(0, 0, 0, 0.08)'}
            >
                {value ? value : 'Единица измерения'}
            </MenuButton>
            <MenuList width='100%' zIndex={30}>
                {measure &&
                    measure.map(({ name }) => (
                        <MenuItem key={name} px={0}>
                            <Checkbox
                                onChange={() => {
                                    SelectHandler(name);
                                }}
                                isChecked={value.includes(name)}
                                borderColor='#D7FF94'
                                colorScheme='customgreen'
                                width='100%'
                                pl='16px'
                            >
                                {name}
                            </Checkbox>
                        </MenuItem>
                    ))}
            </MenuList>
        </Menu>
    );
};
