import { Button, Heading, HStack, Image, VStack } from '@chakra-ui/react';

import closeSvg from '../../assets/closeSvg.svg';
import AllergensControls from '../Search/allergensControls';
import FilterCategories from './filterMenu';
import FilterType from './filterType';
export default function FilterDrawer() {
    const test = ['LASSSSSSSSSooooo', 'LASSSSSSSSSooooo', 'LASSSSSSSSSooooo'];
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
    return (
        <VStack
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
                <Image src={closeSvg} alt='close Svg' />
            </HStack>
            <VStack width='100%' position='relative' gap='24px'>
                <FilterCategories name='Категория' list={test} />
                <FilterCategories name='Поиск по автору' list={test} />
            </VStack>
            <FilterType list={meatType} name='Тип Мяса' />
            <FilterType list={garnishType} name='Тип Гарнира' />
            <AllergensControls isDrawer />
            <HStack marginTop='auto' alignSelf='flex-end'>
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
    );
}
