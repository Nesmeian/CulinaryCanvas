import { Button, Grid, GridItem, HStack, Image, Text, VStack } from '@chakra-ui/react';

import * as socialIcons from '~/assets/socialIcons/index';
import { Alert } from '~/components/alert';
import CardAvatar from '~/components/CardAvatar';
import { Loader } from '~/components/loader';
import AddNotifications from '~/utils/addNotifications';

import { useGetBlogsQuery } from '../model/slice';
export const BlogsSection = () => {
    const { data, isLoading, isError } = useGetBlogsQuery({ limit: 9 });
    const BlogGridStyles = {
        templateColumns: 'repeat(3, 1fr)',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.04)',
        borderRadius: '16px',
        p: '24px',
        gap: '16px',
    };
    const BlogGridItemStyles = {
        h: '224px',
        background: 'white',
        p: '24px',
        borderRadius: '8px',
        gap: '12px',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    };
    if (isLoading) {
        return <Loader />;
    }
    if (isError) {
        return <Alert />;
    }
    return (
        <Grid {...BlogGridStyles}>
            {data?.others.map(
                ({ _id, photoLink, firstName, login, notes, bookmarksCount, subscribersCount }) => (
                    <GridItem key={_id}>
                        <VStack {...BlogGridItemStyles}>
                            <VStack gap='12px '>
                                <HStack w='100%' justifyContent='space-between'>
                                    <CardAvatar
                                        userData={{ img: photoLink, user: firstName, email: login }}
                                    />
                                </HStack>
                                <Text noOfLines={3}>
                                    {notes[0]?.text || 'Кулинария это очень полезное занятие'}
                                </Text>
                            </VStack>
                            <HStack w='100%' justifyContent='space-between'>
                                <HStack>
                                    <Button
                                        background='black'
                                        color='white'
                                        h='24px '
                                        p='4px 8px'
                                        fontSize='12px'
                                        fontWeight='600'
                                        leftIcon={
                                            <Image src={socialIcons.followIcon} alt='follow icon' />
                                        }
                                    >
                                        Подписаться
                                    </Button>
                                    <Button
                                        h='24px'
                                        fontWeight='600'
                                        color='#2db100'
                                        fontSize='12px'
                                        p='4px 8px'
                                        border='1.5px solid #2db100'
                                        background='white'
                                    >
                                        Читать
                                    </Button>
                                </HStack>
                                <AddNotifications
                                    bookmarks={bookmarksCount}
                                    subscribes={subscribersCount}
                                />
                            </HStack>
                        </VStack>
                    </GridItem>
                ),
            )}
        </Grid>
    );
};
