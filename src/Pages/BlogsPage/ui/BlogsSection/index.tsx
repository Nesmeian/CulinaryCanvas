import { Button, Grid, GridItem, HStack, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as socialIcons from '~/assets/socialIcons/index';
import { Alert } from '~/components/alert';
import CardAvatar from '~/components/CardAvatar';
import { Loader } from '~/components/loader';
import AddNotifications from '~/utils/addNotifications';

import { useGetBlogsQuery, useToggleSubscriptionMutation } from '../../model/slice';
import { BtnReadStyles } from '../../shared/styles/components';
import { AllAuthorsBtn } from './AllAuthorsBtn';
import { BlogGridItemStyles, BlogGridStyles, BlogWrapperStyles } from './style';
export const BlogsSection = () => {
    const navigate = useNavigate();
    const [limit, setLimit] = useState<number | string>(9);
    const [activeId, setActiveId] = useState<string | null>(null);
    const { data, isLoading, isError, isFetching } = useGetBlogsQuery({ limit: limit });
    const [toggleSubscription, { isLoading: toggleLoading }] = useToggleSubscriptionMutation();
    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);
    if (isLoading) {
        return <Loader />;
    }
    if (isError) {
        return <Alert />;
    }
    const toggleSubscriptionHandler = (id: string) => {
        setActiveId(id);
        toggleSubscription(id);
    };
    return (
        <VStack {...BlogWrapperStyles}>
            <Grid {...BlogGridStyles}>
                {data?.others.map(
                    ({
                        _id,
                        photoLink,
                        firstName,
                        login,
                        notes,
                        bookmarksCount,
                        subscribersCount,
                    }) => (
                        <GridItem key={_id}>
                            <VStack {...BlogGridItemStyles}>
                                <VStack gap='12px '>
                                    <HStack w='100%' justifyContent='space-between'>
                                        <CardAvatar
                                            userData={{
                                                img: photoLink,
                                                user: firstName,
                                                email: login,
                                            }}
                                        />
                                    </HStack>
                                    <Text noOfLines={3}>
                                        {notes[0]?.text || 'Кулинария это очень полезное занятие'}
                                    </Text>
                                </VStack>
                                <HStack w='100%' justifyContent='space-between'>
                                    {toggleLoading && activeId === _id ? (
                                        <Spinner />
                                    ) : (
                                        <HStack>
                                            <Button
                                                onClick={() => toggleSubscriptionHandler(_id)}
                                                leftIcon={
                                                    <Image
                                                        src={socialIcons.followIcon}
                                                        alt='follow icon'
                                                    />
                                                }
                                            >
                                                Подписаться
                                            </Button>
                                            <Button {...BtnReadStyles}>Читать</Button>
                                        </HStack>
                                    )}
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
            <AllAuthorsBtn limit={limit} setLimit={setLimit} isFetching={isFetching} />
        </VStack>
    );
};
