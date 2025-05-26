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
    resetArrayError,
}: ChooseMeasureProps) => {
    const measures = ['грамм', 'мл', 'литр'];
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
                {measures.map((e) => (
                    <MenuItem key={e} px={0}>
                        <Checkbox
                            onChange={() => {
                                SelectHandler(e);
                            }}
                            isChecked={value.includes(e)}
                            borderColor='#D7FF94'
                            colorScheme='customgreen'
                            width='100%'
                            pl='16px'
                        >
                            {e}
                        </Checkbox>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
