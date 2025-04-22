import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Box,
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

import addIcon from '../../../assets/addIcon.svg';
export default function SearchControls() {
    const [checked, setChecked] = useState<string[]>([]);
    const [inputState, setInputState] = useState('');
    const alergens = {
        'Молочные продукты': 'Dairy products',
        Яйцо: 'Egg',
        Рыба: 'Fish',
        Моллюски: 'Shellfish',
        Орехи: 'Nuts',
        'Томат (помидор)': 'Tomato',
        Цитрусовые: 'Citrus',
        'Клубника (ягоды)': 'Strawberry (berries)',
        Шоколад: 'Chocolate',
    };
    const addAllergen = (key: string) => {
        const cleanKey = key.split(' (')[0].trim();
        setChecked((prev) =>
            prev.includes(cleanKey)
                ? prev.filter((item) => item !== cleanKey)
                : [...prev, cleanKey],
        );
    };
    const handleAddCustomAllergen = () => {
        const trimmedValue = inputState.trim();
        if (trimmedValue && !checked.includes(trimmedValue)) {
            setChecked((prev) => [...prev, trimmedValue]);
            setInputState('');
        } else {
            setInputState('');
        }
    };
    return (
        <FormControl
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            p=' 8px'
            gap='20px'
        >
            <HStack gap='16px'>
                <FormLabel m='0' fontSize='16.5px'>
                    Исключить мои аллергены
                </FormLabel>
                <Switch
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
                    height='100%'
                    background='white'
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    as={Button}
                    fontSize='17.5px'
                    width='234px'
                    textAlign='left'
                    rightIcon={<ChevronDownIcon />}
                    _active={{
                        background: 'white',
                        border: '1px solid #c4ff61',
                    }}
                    _hover={{ background: 'white' }}
                >
                    <HStack flexWrap='wrap' p='10px 0' rowGap='4px' columnGap='8px'>
                        {checked.length !== 0 ? (
                            checked.map((e) => (
                                <Box
                                    fontSize='12px'
                                    key={e}
                                    padding='2px 8px'
                                    color='#2db100'
                                    border='1px solid #2db100'
                                    borderRadius='6px'
                                >
                                    {e}
                                </Box>
                            ))
                        ) : (
                            <Box color='rgba(0, 0, 0, 0.64)'>Выберите из списка...</Box>
                        )}
                    </HStack>
                </MenuButton>

                <MenuList width='234px' zIndex={10}>
                    {Object.entries(alergens).map(([key, _], i) => (
                        <MenuItem
                            key={key}
                            background={i % 2 == 0 ? 'rgba(0, 0, 0, 0.06);' : 'white'}
                        >
                            <Checkbox
                                width='100%'
                                borderColor='#b1ff2e'
                                colorScheme='customgreen'
                                onChange={() => addAllergen(key)}
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
                            _placeholder={{ color: '#134b00' }}
                        />
                        <Image
                            src={addIcon}
                            onClick={() => {
                                handleAddCustomAllergen();
                            }}
                        />
                    </HStack>
                </MenuList>
            </Menu>
        </FormControl>
    );
}
