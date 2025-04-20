import './style.css';

import { HStack, Image, Stack, Text } from '@chakra-ui/react';

import TagsProps from '../../types/utilsTypes';
import tagsKeys from './tagsImgData';

export default function AddTags({ tag, withText, color, size, newPosition }: TagsProps) {
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
                    {withText && <Text variant='addTag'>{e}</Text>}
                </HStack>
            ))}
        </Stack>
    );
}
