import { CloseIcon } from '@chakra-ui/icons';
import { Button, FormControl, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { toggleFilterState } from '~/store/filterSlice';
import { invertedAllergens } from '~/utils/allergensMap';

import closeSvg from '../../assets/closeSvg.svg';
import DB from '../../data/db.json';
import AllergensControlsDrawer from './allergensControls';
import FilterCategories from './filterMenu';
import FilterType from './filterType';
export default function FilterDrawer() {
    const dispatch = useDispatch();
    const [allergens, setAllergens] = useState<string[]>([]);
    const categories = DB.navMenu.categories.map(({ name }) => name);
    const [category, setCategory] = useState<string>('Категория');
    const [auth, setAuth] = useState<string>('Поиск по автору');
    const [sideDish, setSideDish] = useState<string[]>([]);
    const [meat, setMeat] = useState<string[]>([]);
    const authCategory = [...new Set(DB.card.map(({ author }) => author.name))];
    const meatType = ['Курица', 'Свинина', 'Говядина', 'Индейка', 'Утка'];
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
    console.log(sideDish, meat);
    return (
        <FormControl
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
                    onClick={() => dispatch(toggleFilterState())}
                />
            </HStack>
            <VStack width='100%' position='relative' gap='24px'>
                <FilterCategories name={category} list={categories} onClick={setCategory} />
                <FilterCategories name={auth} list={authCategory} onClick={setAuth} />
            </VStack>
            <FilterType list={meatType} name='Тип Мяса' onChange={setSideDish} />
            <FilterType list={garnishType} name='Тип Гарнира' onChange={setMeat} />
            <AllergensControlsDrawer setAllergens={setAllergens} allergens={allergens} />

            <VStack marginTop='auto' alignSelf='flex-end' gap='32px' width='100%'>
                <HStack alignItems='flex-start' w='100%' flexWrap='wrap'>
                    {allergens.map((e) => (
                        <HStack
                            key={e}
                            border='1px solid #b1ff2e'
                            p='2px 8px'
                            background='#EAFFC7'
                            borderRadius='6px'
                            gap='8px'
                        >
                            <Text fontSize='14px' color='#207e00' fontWeight='500'>
                                {invertedAllergens[e] || e}
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
                    >
                        Очистить фильтр
                    </Button>
                    <Button
                        background='black'
                        color='white'
                        height={{ lg: '48px', base: '32px' }}
                        fontSize={{ lg: '18px', base: '14px' }}
                        fontWeight='600'
                    >
                        Найти рецепт
                    </Button>
                </HStack>
            </VStack>
        </FormControl>
    );
}
