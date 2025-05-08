import { Button, Heading, HStack } from '@chakra-ui/react';

import { ComingRecipeData } from '~/types/comingData';
import AddTags from '~/utils/addTags';
export const SmallCard = ({ cards }: { cards: ComingRecipeData[] }) =>
    cards.map(({ title, categoriesIds }) => (
        <HStack
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
            key={title}
            className='bottom-section__recipe-item'
            width='100%'
            justify='space-between'
        >
            <HStack gap='0px' position='relative' width='70%'>
                <AddTags category={categoriesIds[0]} newPosition withText={false} size='24px' />
                <Heading variant='veganItemHeadingStyles' noOfLines={1} as='h4' size='h4'>
                    {title}
                </Heading>
            </HStack>
            <Button
                width='30%'
                fontSize='15.5px'
                fontWeight='600'
                height='32px'
                variant='outline'
                colorScheme='customGreen'
            >
                Готовить
            </Button>
        </HStack>
    ));
