import './style.css';

import { Heading, HStack, Link, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import { Loader } from '~/components/loader';
import { TEST_IDS } from '~/constants/testsIds';
import { useGetJuiciest } from '~/Hooks/useGetJuiciest';

import BigCardsList from '../../../components/bigCardsList';
import GreenButton from '../../../components/styledComponents/greenButton';

export default function Juiciest() {
    const { data, isLoading } = useGetJuiciest(6, 1);
    if (isLoading) {
        return <Loader />;
    }
    return (
        <VStack
            as='section'
            className='juiciest'
            align='flex-start'
            gap={{ xl: '10px', sm: '10px' }}
        >
            <HStack justifyContent='space-between' width='100%'>
                <Heading as='h1' size='h1' className='juiciest__title'>
                    Самое сочное
                </Heading>
                <Link
                    as={RouterLink}
                    to='the-juiciest'
                    display={{ lg: 'block', base: 'none' }}
                    data-test-id={TEST_IDS.JUICIEST_LINK}
                >
                    <GreenButton text='Вся Подборка' />
                </Link>
            </HStack>

            {data && <BigCardsList data={data.data} maxElems={4} />}

            <Link
                as={RouterLink}
                to='the-juiciest'
                display={{ base: 'flex', lg: 'none' }}
                alignSelf='center'
                data-test-id={TEST_IDS.JUICIEST_LINK_MOB}
            >
                <GreenButton text='Вся Подборка' />
            </Link>
        </VStack>
    );
}
