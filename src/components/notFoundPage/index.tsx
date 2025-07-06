import { Center, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { TEST_IDS } from '~/constants/testsIds';

import notFound from '../../assets/notFoundPage.png';
export const NotFoundPage = () => (
    <Center h='100vh' w='100vw' background='white' position='fixed' top={0} left={0} zIndex={9999}>
        <VStack>
            <Image src={notFound} alt='not found image' boxSize={{ lg: '206px', base: '108px' }} />
            <Heading fontSize='24px' fontWeight='700' size='h1' as='h1'>
                Упс! Такой страницы нет.
            </Heading>
            <Text fontSize='16px' color='rgba(0, 0, 0, 0.64)'>
                Можете поискать другой рецепт
                <Text
                    as={Link}
                    to='/'
                    textDecoration='underline'
                    data-test-id={TEST_IDS.ERROR_PAGE}
                >
                    здесь.
                </Text>
            </Text>
        </VStack>
    </Center>
);
