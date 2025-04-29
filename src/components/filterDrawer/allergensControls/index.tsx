import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    CheckboxIcon,
    FormControl,
    FormLabel,
    HStack,
    Image,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Switch,
} from '@chakra-ui/react';
import { useState } from 'react';

import { allergensMap } from '~/utils/allergensMap';

import addIcon from '../../../assets/addIcon.svg';
export default function AllergensControlsDrawer({
    setAllergens,
    allergens,
    toggleAllowAllergens,
}: {
    allergens: string[];
    setAllergens: React.Dispatch<React.SetStateAction<string[]>>;
    toggleAllowAllergens: () => void;
}) {
    const addOtherAllergen = () => {
        const trimmed = inputState.trim();
        if (!trimmed) return;
        setAllergens((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
        setInputState('');
    };
    const [inputState, setInputState] = useState('');
    return (
        <FormControl
            display='flex'
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='space-between'
            p=' 8px'
            gap='10px'
        >
            <HStack gap='16px'>
                <FormLabel m='0' fontSize='16.5px'>
                    Исключить аллергены
                </FormLabel>
                <Switch
                    data-test-id='allergens-switcher-filter'
                    onChange={() => toggleAllowAllergens()}
                    sx={{
                        'span.chakra-switch__track': {
                            bg: 'rgba(0, 0, 0, 0.16)',
                            _checked: {
                                bg: '#b1ff2e',
                            },
                        },

                        'span.chakra-switch__thumb': {
                            bg: 'white',
                        },
                    }}
                />
            </HStack>
            <Menu closeOnSelect={false}>
                <MenuButton
                    data-test-id='allergens-menu-button-filter'
                    w={{ lg: '399px', base: '308px' }}
                    background='white'
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    as={Button}
                    noOfLines={1}
                    fontSize='16px'
                    fontWeight='400 '
                    textAlign='left'
                    rightIcon={<ChevronDownIcon transition='transform 0.1s' />}
                    _active={{
                        background: 'white',
                        border: '1px solid #c4ff61',
                        '& svg': {
                            transform: 'rotate(180deg)',
                        },
                    }}
                    _hover={{ background: 'white' }}
                >
                    Выберите из списка аллергенов...
                </MenuButton>
                <MenuList w={{ lg: '399px', base: '308px' }} zIndex={30}>
                    {Object.entries(allergensMap).map(([key, value], i) => (
                        <MenuItem
                            key={key}
                            background={i % 2 == 0 ? 'rgba(0, 0, 0, 0.06);' : 'white'}
                        >
                            <Checkbox
                                data-test-id={`allergen-${i}`}
                                width='100%'
                                borderColor='#b1ff2e'
                                isChecked={allergens.includes(value)}
                                onChange={() =>
                                    setAllergens((prev) =>
                                        prev.includes(value)
                                            ? prev.filter((item) => item !== value)
                                            : [...prev, value],
                                    )
                                }
                                colorScheme='customgreen'
                                icon={
                                    <CheckboxIcon
                                        sx={{
                                            color: 'black',
                                        }}
                                    />
                                }
                            >
                                {key}
                            </Checkbox>
                        </MenuItem>
                    ))}
                    <HStack p='0 8px' mt='10px' alignItems='center' justifyContent='space-between'>
                        <Input
                            height='32px'
                            width='90%'
                            color='#134b00'
                            value={inputState}
                            placeholder='Другой аллерген'
                            onChange={(e) => setInputState(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addOtherAllergen();
                                }
                            }}
                            _placeholder={{ color: '#134b00' }}
                            data-test-id='add-other-allergen'
                        />
                        <Image
                            src={addIcon}
                            data-test-id='add-allergen-button'
                            onClick={addOtherAllergen}
                        />
                    </HStack>
                </MenuList>
            </Menu>
        </FormControl>
    );
}
