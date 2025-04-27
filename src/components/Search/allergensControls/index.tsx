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
    Portal,
    Switch,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleAllergen, toggleAllergenState } from '~/store/allergens';
import { ApplicationState } from '~/store/configure-store';

import addIcon from '../../../assets/addIcon.svg';
export default function AllergensControls({ isDrawer }: { isDrawer?: boolean }) {
    const [inputState, setInputState] = useState('');
    const reduxAllergens = useSelector((state: ApplicationState) => state.allergensSlice.allergens);
    const dispatch = useDispatch();
    const allergens = {
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
    const invertedAllergens = Object.fromEntries(
        Object.entries(allergens).map(([rus, eng]) => [eng, rus]),
    );
    const addAllergen = (allergen: string) => {
        dispatch(toggleAllergen(allergen));
    };
    const handleAddCustomAllergen = () => {
        const trimmedValue = inputState.trim();
        setInputState('');
        dispatch(toggleAllergen(trimmedValue));
    };
    return (
        <FormControl
            display='flex'
            flexDirection={!isDrawer ? 'row' : 'column'}
            alignItems={!isDrawer ? 'center' : 'flex-start'}
            justifyContent='space-between'
            p=' 8px'
            gap={!isDrawer ? '20px' : '10px'}
        >
            <HStack gap='16px'>
                <FormLabel m='0' fontSize='16.5px'>
                    {!isDrawer ? 'Исключить мои аллергены' : 'Исключить аллергены'}
                </FormLabel>
                <Switch
                    onChange={() => {
                        dispatch(toggleAllergenState());
                    }}
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
                    w={!isDrawer ? '234px' : { lg: '399px', base: '308px' }}
                    background='white'
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    as={Button}
                    fontSize='17.5px'
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
                    <HStack flexWrap='wrap' p='10px 0' rowGap='4px' columnGap='8px'>
                        {reduxAllergens.length !== 0 ? (
                            reduxAllergens.map((e) => (
                                <Box
                                    fontSize='12px'
                                    key={e}
                                    padding='2px 8px'
                                    color='#2db100'
                                    border='1px solid #2db100'
                                    borderRadius='6px'
                                >
                                    {invertedAllergens[e] || e}
                                </Box>
                            ))
                        ) : (
                            <Text color='rgba(0, 0, 0, 0.64)' noOfLines={1}>
                                {!isDrawer
                                    ? 'Выберите из списка...'
                                    : 'Выберите из списка аллергенов...'}
                            </Text>
                        )}
                    </HStack>
                </MenuButton>
                <Portal>
                    <MenuList w={!isDrawer ? 'auto' : { lg: '399px', base: '308px' }} zIndex={30}>
                        {Object.entries(allergens).map(([key, value], i) => (
                            <MenuItem
                                key={key}
                                background={i % 2 == 0 ? 'rgba(0, 0, 0, 0.06);' : 'white'}
                            >
                                <Checkbox
                                    width='100%'
                                    borderColor='#b1ff2e'
                                    colorScheme='customgreen'
                                    isChecked={reduxAllergens.includes(value)}
                                    onChange={() => addAllergen(value)}
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
                        <HStack
                            p='0 8px'
                            mt='10px'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <Input
                                height='32px'
                                width='90%'
                                color='#134b00'
                                value={inputState}
                                placeholder='Другой аллерген'
                                onChange={(e) => setInputState(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddCustomAllergen();
                                    }
                                }}
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
                </Portal>
            </Menu>
        </FormControl>
    );
}
