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
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { RecipeFields } from '~/types/NewRecipesTypes';
import { AddCategory } from '~/utils/newRecipeUtils/addCategoryBox';

import { menuText, newRecipeHeadingStyle } from '../componentStyles';

export const SelectCategory = () => {
    const {
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<RecipeFields>();
    const selectedIds = watch('categoriesIds') ?? [];
    const subCategories = useGetFilteredCategories(true).data ?? [];
    const selectedNames = useMemo(
        () => subCategories.filter((cat) => selectedIds.includes(cat._id)).map((cat) => cat.title),
        [selectedIds, subCategories],
    );

    const toggleCategory = (id: string) => {
        const newIds = selectedIds.includes(id)
            ? selectedIds.filter((i) => i !== id)
            : [...selectedIds, id];

        setValue('categoriesIds', newIds, {
            shouldValidate: true,
            shouldDirty: true,
        });
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
                    border='1px solid'
                    borderColor={errors.categoriesIds ? 'red.500' : 'rgba(0,0,0,0.08)'}
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
                    {selectedNames.length === 0 ? (
                        <Text {...menuText}>Выберите из списка...</Text>
                    ) : (
                        <AddCategory
                            selectCategory={selectedNames}
                            width={350}
                            setValue={setValue}
                        />
                    )}
                    <ChevronDownIcon transition='transform 0.1s' />
                </MenuButton>
                <MenuList
                    w={{ lg: '399px', base: '308px' }}
                    zIndex={30}
                    h='300px'
                    overflowY='scroll'
                >
                    {subCategories.map(({ title, _id }, i) => (
                        <MenuItem
                            key={`${title}+${i}`}
                            background={i % 2 == 0 ? 'rgba(0, 0, 0, 0.06);' : 'white'}
                        >
                            <Checkbox
                                width='100%'
                                borderColor='#b1ff2e'
                                colorScheme='customgreen'
                                onChange={() => toggleCategory(_id)}
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
