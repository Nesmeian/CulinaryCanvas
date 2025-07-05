import { Avatar, Button, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { IMG_PATH } from '~/shared/config/api';
import { AuthorData } from '~/types/recipesData';
import AddNotifications from '~/utils/addNotifications';

import followImg from '../../../assets/follow.svg';
export default function RecipeAuthor({ data }: { data: AuthorData }) {
    const { email, imgUrl, name, notifications } = data;
    return (
        <HStack
            position='relative'
            mt={{ lg: '34px', base: '10px' }}
            w='100%'
            p={{ md: '24px', base: '12px' }}
            background='#c4ff61'
            borderRadius='8px'
            justify='space-between'
        >
            <HStack gap='16px'>
                <Avatar boxSize='96px' src={`${IMG_PATH}${imgUrl}`}></Avatar>
                <VStack alignItems='flex-start'>
                    <Heading
                        size='h4'
                        as='h4'
                        fontSize={{ md: '24px', base: '18px' }}
                        fontWeight='700'
                    >
                        {name || ''}
                    </Heading>
                    <Text fontSize={{ base: '14px' }}>{email}</Text>
                    <Button
                        size='xs'
                        background='black'
                        color='white'
                        leftIcon={<Image src={followImg} />}
                        variant='plain'
                    >
                        Подписаться
                    </Button>
                </VStack>
            </HStack>
            <VStack
                justify='space-between'
                h='100%'
                alignItems='flex-end'
                position={{ md: 'static', base: 'absolute' }}
                right={{ md: '0', base: '10px' }}
                top={{ md: '0', base: '6px' }}
                paddingBottom={{ md: 0, base: '22px' }}
            >
                <Text fontSize={{ md: '14px', base: '12px' }}>Автор Рецепта</Text>
                <HStack>
                    <AddNotifications
                        bookmarks={notifications.bookmarks}
                        subscribes={notifications.subscribe}
                    />
                </HStack>
            </VStack>
        </HStack>
    );
}
