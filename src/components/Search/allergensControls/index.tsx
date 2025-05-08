import './style.css';

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
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cleanAllergens, toggleAllergen, toggleAllergenState } from '~/store/allergens';
import { ApplicationState } from '~/store/configure-store';
import { allergensMap, invertedAllergens } from '~/utils/allergensMap';

import addIcon from '../../../assets/addIcon.svg';
export default function AllergensControls() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputState, setInputState] = useState('');
    const allergenState = useSelector((state: ApplicationState) => state.allergensSlice.isActive);
    const reduxAllergens = useSelector((state: ApplicationState) => state.allergensSlice.allergens);
    const dispatch = useDispatch();

    const addAllergen = (allergen: string) => {
        dispatch(toggleAllergen(allergen));
    };
    const handleAddCustomAllergen = () => {
        setInputState('');
        dispatch(toggleAllergen(inputState));
    };
    return (
        <FormControl
            display='flex'
            flexDirection='row'
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
                    data-test-id='allergens-switcher'
                    checked={allergenState}
                    onChange={() => {
                        dispatch(toggleAllergenState());
                        dispatch(cleanAllergens());
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
            <Menu
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                closeOnBlur={true}
                closeOnSelect={false}
            >
                <MenuButton
                    data-test-id='allergens-menu-button'
                    height='100%'
                    w='234px'
                    isDisabled={!allergenState}
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
                    <HStack
                        flexWrap='wrap'
                        p='10px 0'
                        rowGap='4px'
                        columnGap='8px'
                        data-test-id='allergens-menu'
                    >
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
                                Выберите из списка...
                            </Text>
                        )}
                    </HStack>
                </MenuButton>
                <MenuList w='auto' zIndex={30}>
                    {Object.entries(allergensMap).map(([key, value], i) => (
                        <MenuItem
                            key={key}
                            background={i % 2 == 0 ? 'rgba(0, 0, 0, 0.06);' : 'white'}
                            data-test-id={isOpen ? `allergen-${i}` : ''}
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
                    <HStack p='0 8px' mt='10px' alignItems='center' justifyContent='space-between'>
                        <Input
                            height='32px'
                            width='90%'
                            color='#134b00'
                            value={inputState}
                            placeholder='Другой аллерген'
                            data-test-id={isOpen ? `add-other-allergen` : ''}
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
                            data-test-id={isOpen ? `add-allergen-button` : ''}
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
