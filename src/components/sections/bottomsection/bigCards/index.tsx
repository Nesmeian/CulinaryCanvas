import { Heading, HStack, Text, VStack } from '@chakra-ui/react';

import { ComingRecipeData } from '~/types/comingData';
import AddNotifications from '~/utils/addNotifications';
import AddTags from '~/utils/addTags';

export const BigCard = ({ cards }: { cards: ComingRecipeData[] }) =>
    cards?.map(({ _id, title, categoriesIds, description, bookmarks, likes }) => (
        <VStack
            key={_id}
            className='bottom-section__card-item'
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
        >
            <Heading variant='veganCardHeadingStyles' width='100%' as='h4' size='h4'>
                {title}
            </Heading>
            <Text variant='culinaryTextStyles' mb='18px' noOfLines={3}>
                {description}
            </Text>
            <HStack width='100%' justify='space-between' position='relative'>
                <AddTags
                    category={categoriesIds[0]}
                    withText
                    size='14px'
                    color='#ffffd3;'
                    newPosition
                />
                <AddNotifications bookmarks={bookmarks} likes={likes} />
            </HStack>
        </VStack>
    ));
