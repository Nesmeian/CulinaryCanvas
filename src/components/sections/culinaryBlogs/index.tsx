import './style.css';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';

import CardAvatar from '~/components/CardAvatar';
import culinaryBlogData from '~/data/culinaryBlogs';
export default function CulinaryBlogs() {
    return (
        <VStack className='culinary-blogs' alignSelf='baseline'>
            <HStack width='100%' justifyContent='space-between'>
                <Heading as='h3' size='h3' className='culinary-blogs__title'>
                    Кулинарные блоги
                </Heading>
                <Button
                    variant='plain'
                    className='culinary-blogs__btn-all-authors'
                    size='lg'
                    rightIcon={<ArrowForwardIcon />}
                >
                    Все авторы
                </Button>
            </HStack>
            <HStack gap='20px'>
                {culinaryBlogData.map(({ img, user, email, description }) => (
                    <VStack
                        key={user}
                        className='culinary-blogs__item'
                        alignItems='flex-start'
                        width='426px'
                        p='24px'
                        borderRadius='8px'
                    >
                        <CardAvatar userData={{ user, email, img }} />
                        <Text fontSize='14px'>{description}</Text>
                    </VStack>
                ))}
            </HStack>
        </VStack>
    );
}
