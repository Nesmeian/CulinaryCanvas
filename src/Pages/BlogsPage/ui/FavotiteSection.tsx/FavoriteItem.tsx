import { Button, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import CardAvatar from '~/components/CardAvatar';
import AddNotifications from '~/utils/addNotifications';

import { BloggerParams } from '../../model/types';
import { BtnReadStyles } from '../../shared/styles/components';
import { NewRecipeCount } from './newRecipeCount';
import { favoriteSectionItemStl } from './style';

export const FavoriteItem = ({ blog }: BloggerParams) => {
    const { _id, firstName, login, photoLink, bookmarksCount, subscribersCount, newRecipesCount } =
        blog;
    return (
        <GridItem>
            <VStack {...favoriteSectionItemStl}>
                <VStack gap='12px' alignItems='flex-start'>
                    <CardAvatar userData={{ user: firstName, email: login, img: photoLink }} />
                    <Text>{blog.notes[0]?.text}</Text>
                </VStack>
                <HStack w='100%' justify='space-between'>
                    <HStack>
                        <Button
                            as={Link}
                            to={_id}
                            background=' #b1ff2e'
                            color='black'
                            h='24px'
                            p='0 12px'
                        >
                            Рецепты
                        </Button>
                        <Button as={Link} to={_id} {...BtnReadStyles}>
                            Читать
                        </Button>
                    </HStack>
                    <AddNotifications bookmarks={bookmarksCount} subscribes={subscribersCount} />
                </HStack>
                <NewRecipeCount newRecipesCount={newRecipesCount} />
            </VStack>
        </GridItem>
    );
};
