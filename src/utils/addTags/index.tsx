import './style.css';

import { HStack, Image, Stack, Text } from '@chakra-ui/react';

import TagsProps from '../../types/utilsTypes';
import tagsKeys from './tagsImgData';

export default function AddTags({ tag, withText, color, size, newPosition }: TagsProps) {
    const tagsTranscription = {
        vegan: 'Веганская кухня',
        'second-dish': 'Вторые блюда',
        salads: 'Салаты',
        snacks: 'Закуски',
        firstCourses: 'Первое блюда',
        desserts: 'Десерты',
        grilledDishes: 'Блюда на гриле',
        kidsDishes: 'Веганские блюда',
        therapeuticNutrition: 'Лечебное питание',
        national: 'национальное',
        drinks: 'напитки',
        preserves: 'Заготовки',
    };
    return (
        <Stack flexWrap='wrap' direction={{ md: 'row', base: 'column' }}>
            {tag.map((e) => (
                <HStack
                    key={e}
                    className='tag'
                    position={{ lg: 'static', sm: newPosition ? 'static' : 'absolute' }}
                    background={color}
                    gap={{ sm: '9px' }}
                    pr='8px'
                >
                    <Image
                        objectFit='cover'
                        className='tag__img'
                        boxSize={size}
                        src={tagsKeys[e]}
                        alt={e}
                    />
                    {withText && <Text variant='addTag'>{tagsTranscription[e]}</Text>}
                </HStack>
            ))}
        </Stack>
    );
}
