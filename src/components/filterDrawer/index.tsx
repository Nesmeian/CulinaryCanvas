import { CloseIcon } from '@chakra-ui/icons';
import { Button, FormControl, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { ApplicationState } from '~/store/configure-store';
import { addFilterData, cleanFilterData } from '~/store/filterSlice';

import closeSvg from '../../assets/closeSvg.svg';
import DB from '../../data/db.json';
import AllergensControlsDrawer from './allergensControls';
import FilterCategories from './filterMenu';
import { FilterType } from './filterType';
export default function FilterDrawer({ onClose }: { onClose: () => void }) {
    const dispatch = useDispatch();
    const [allowAllergens, setAllowAllergens] = useState(false);
    const [allergens, setAllergens] = useState<string[]>([]);
    const { data: categoryData } = useGetFilteredCategories();
    const categories = categoryData.map(({ title }) => title);
    const [category, setCategory] = useState<string[]>([]);
    const [auth, setAuth] = useState<string[]>([]);
    const [sideDish, setSideDish] = useState<string[]>([]);
    const [meat, setMeat] = useState<string[]>([]);
    const filterData = useSelector((state: ApplicationState) => state.filterState.filterData);
    const authCategory = [...new Set(DB.card.map(({ author }) => author.name))];
    const hasSelectedFilters = useMemo(() => {
        const arrayFilters =
            sideDish.length > 0 || meat.length > 0 || category.length > 0 || auth.length > 0;
        const allergenFilter = allowAllergens && allergens.length > 0;
        return arrayFilters || allergenFilter;
    }, [category, auth, sideDish, meat, allowAllergens, allergens]);
    const tags = [...allergens, ...meat, ...sideDish, ...category, ...auth];
    const meatTypes = ['Курица', 'Свинина', 'Говядина', 'Индейка', 'Утка'];

    const garnishType = [
        'Картошка',
        'Гречка',
        'Паста',
        'Спагетти',
        'Рис',
        'Капуста',
        'Фасоль',
        'Другие овощи',
    ];
    const toggleAllowAllergens = () => {
        setAllowAllergens((prev) => !prev);
    };
    const collectData = () => {
        dispatch(
            addFilterData({
                allergens: allowAllergens ? allergens : [],
                sideDish: sideDish,
                meat: meat,
                category: category,
                auth: auth,
            }),
        );
    };
    const cleanData = () => {
        if (filterData) {
            setAllowAllergens(false);
            setAllergens([]);
            setSideDish([]);
            setMeat([]);
            setCategory([]);
            setAuth([]);
            dispatch(cleanFilterData());
        }
    };
    return (
        <FormControl
            data-test-id='filter-drawer'
            display='flex'
            flexDirection='column'
            height='100vh'
            width={{ base: '344px', lg: '463px' }}
            p={{ base: '16px', lg: '32px' }}
            gap='24px'
            overflowY='scroll'
        >
            <HStack w='100%' justify='space-between' mb='12px'>
                <Heading as='h4' size='h4' fontSize='24px' fontWeight='700'>
                    Фильтр
                </Heading>
                <Image
                    src={closeSvg}
                    alt='close Svg'
                    data-test-id='close-filter-drawer'
                    onClick={() => onClose()}
                />
            </HStack>
            <VStack width='100%' position='relative' gap='24px'>
                <FilterCategories
                    selectedItems={category}
                    name='Категория'
                    list={categories}
                    onChange={setCategory}
                />
                <FilterCategories
                    selectedItems={auth}
                    name='Поиск по автору'
                    list={authCategory}
                    onChange={setAuth}
                />
            </VStack>
            <FilterType list={meatTypes} name='Тип Мяса' onChange={setMeat} selectedItems={meat} />
            <FilterType
                list={garnishType}
                name='Тип Гарнира'
                onChange={setSideDish}
                selectedItems={sideDish}
            />
            <AllergensControlsDrawer
                setAllergens={setAllergens}
                toggleAllowAllergens={toggleAllowAllergens}
                allergens={allergens}
            />

            <VStack marginTop='auto' alignSelf='flex-end' gap='32px' width='100%'>
                <HStack alignItems='flex-start' w='100%' flexWrap='wrap'>
                    {tags.map((e) => (
                        <HStack
                            key={e}
                            border='1px solid #b1ff2e'
                            p='2px 8px'
                            background='#EAFFC7'
                            borderRadius='6px'
                            gap='8px'
                            data-test-id='filter-tag'
                        >
                            <Text fontSize='14px' color='#207e00' fontWeight='500'>
                                {e}
                            </Text>
                            <CloseIcon boxSize='10px' color='#207e00' />
                        </HStack>
                    ))}
                </HStack>
                <HStack alignItems='flex-end' width='100%'>
                    <Button
                        background='white'
                        color='black'
                        border='1px solid rgba(0, 0, 0, 0.48)'
                        fontSize={{ lg: '18px', base: '14px' }}
                        fontWeight='600'
                        height={{ lg: '48px', base: '32px' }}
                        variant='noHover'
                        _hover={{
                            background: '#f5f5f5',
                            borderColor: 'rgba(0, 0, 0, 0.6)',
                            transition: 'all 0.2s ease-in-out',
                        }}
                        data-test-id='clear-filter-button'
                        onClick={() => {
                            cleanData();
                        }}
                    >
                        Очистить фильтр
                    </Button>
                    <Button
                        isDisabled={!hasSelectedFilters}
                        background='black'
                        color='white'
                        height={{ lg: '48px', base: '32px' }}
                        fontSize={{ lg: '18px', base: '14px' }}
                        fontWeight='600'
                        _hover={{
                            background: '#1a1a1a',
                            transform: 'scale(1.02)',
                            transition: 'all 0.2s ease-in-out',
                        }}
                        onClick={() => {
                            collectData();
                            onClose();
                        }}
                        pointerEvents={hasSelectedFilters ? 'auto' : 'none'}
                        data-test-id='find-recipe-button'
                    >
                        Найти рецепт
                    </Button>
                </HStack>
            </VStack>
        </FormControl>
    );
}
