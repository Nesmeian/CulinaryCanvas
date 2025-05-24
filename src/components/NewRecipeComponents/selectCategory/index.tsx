import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    CheckboxIcon,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { AddCategory } from '~/utils/newRecipeUtils/addCategoryBox';

import { menuText, newRecipeHeadingStyle } from '../componentStyles';

export const SelectCategory = () => {
    const subCategories = useGetFilteredCategories(true).data;
    const [selectCategory, setSelectCategory] = useState<string[]>([]);
    const setSelectCategoryHandler = (e: string) => {
        setSelectCategory((prev) =>
            prev.includes(e) ? prev.filter((item) => item !== e) : [...prev, e],
        );
    };
    return (
        <HStack w='100%' gap={{ lg: '84px', base: '16px' }} mb='6px'>
            <Heading as='h3' size='h3' {...newRecipeHeadingStyle}>
                Выберите не менее 3-х тегов
            </Heading>
            <Menu closeOnSelect={false}>
                <MenuButton
                    as={Button}
                    w={{ lg: '350px', md: '232px', base: '196px' }}
                    background='white'
                    border='1px solid rgba(0,0,0,0.08)'
                    display='flex'
                    _active={{
                        background: 'white',
                        border: '1px solid #c4ff61',
                        '& svg': { transform: 'rotate(180deg)' },
                    }}
                    _hover={{ background: 'white' }}
                    sx={{
                        '> span': {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            flexWrap: 'nowrap',
                        },
                    }}
                >
                    {selectCategory.length === 0 ? (
                        <Text {...menuText}>Выберите из списка...</Text>
                    ) : (
                        <AddCategory selectCategory={selectCategory} width={350} />
                    )}
                    <ChevronDownIcon transition='transform 0.1s' />
                </MenuButton>
                <MenuList
                    w={{ lg: '399px', base: '308px' }}
                    zIndex={30}
                    h='300px'
                    overflowY='scroll'
                >
                    {subCategories.map(({ title }, i) => (
                        <MenuItem
                            key={`${title}+${i}`}
                            background={i % 2 == 0 ? 'rgba(0, 0, 0, 0.06);' : 'white'}
                        >
                            <Checkbox
                                width='100%'
                                borderColor='#b1ff2e'
                                colorScheme='customgreen'
                                onChange={() => setSelectCategoryHandler(title)}
                                icon={
                                    <CheckboxIcon
                                        sx={{
                                            color: 'black',
                                        }}
                                    />
                                }
                            >
                                {title}
                            </Checkbox>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </HStack>
    );
};
