import './style.css';

import { HStack, Image, Stack, Text } from '@chakra-ui/react';

import { useGetCategoryId } from '~/Hooks/useGetCategoryAndSubCategoryId';
import { IMG_PATH } from '~/shared/config/api';

import TagsProps from '../../types/utilsTypes';

export default function AddTags({ category, withText, color, size, newPosition }: TagsProps) {
    const { category: searchCategory } = useGetCategoryId(category);
    return (
        <Stack flexWrap='wrap' direction={{ md: 'row', base: 'column' }}>
            <HStack
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
                    src={`${IMG_PATH}${searchCategory?.icon}`}
                    alt={searchCategory?.icon}
                />
                {withText && <Text variant='addTag'>{searchCategory?.title}</Text>}
            </HStack>
        </Stack>
    );
}
