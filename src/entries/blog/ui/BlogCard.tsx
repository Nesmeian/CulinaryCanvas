import { Button, HStack, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import CardAvatar from '~/components/CardAvatar';
import { BtnReadStyles } from '~/Pages/BlogsPage/shared/styles/components';
import { BlogGridItemStyles, FollowBtnStyles } from '~/Pages/BlogsPage/ui/BlogsSection/style';
import AddNotifications from '~/utils/addNotifications';

import * as SocialIcons from '../../../assets/socialIcons/index';
import { BlogCardProps } from '../modle/types';

export const BlogCard = ({ blog, isLoading, activeId, onToggleSubscription }: BlogCardProps) => (
    <VStack {...BlogGridItemStyles}>
        <VStack gap='12px'>
            <HStack w='100%' justifyContent='space-between'>
                <CardAvatar
                    userData={{
                        img: blog.photoLink,
                        user: blog.firstName,
                        email: blog.login,
                    }}
                />
            </HStack>
            <Text noOfLines={3}>
                {blog.notes[0]?.text || 'Кулинария это очень полезное занятие'}
            </Text>
        </VStack>
        <HStack w='100%' justifyContent='space-between'>
            {isLoading && activeId === blog._id ? (
                <Spinner />
            ) : (
                <HStack>
                    <Button
                        {...FollowBtnStyles}
                        onClick={() => onToggleSubscription(blog._id)}
                        leftIcon={<Image src={SocialIcons.followIcon} alt='follow icon' />}
                    >
                        Подписаться
                    </Button>
                    <Button as={Link} to={blog._id} {...BtnReadStyles}>
                        Читать
                    </Button>
                </HStack>
            )}
            <AddNotifications bookmarks={blog.bookmarksCount} subscribes={blog.subscribersCount} />
        </HStack>
    </VStack>
);
