import './style.css';

import { Heading, HStack, Link, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import filterRecipesOnData from '~/utils/filterOnData';

import BigCardsList from '../../../components/bigCardsList';
import GreenButton from '../../../components/styledComponents/greenButton';

export default function Juiciest() {
    const sortedOnTimeRecipes = filterRecipesOnData();
    return (
        <VStack
            as='section'
            className='juiciest'
            align='flex-start'
            gap={{ xl: '10px', sm: '10px' }}
        >
            <HStack justifyContent='space-between' width='100%'>
                <Heading as='h2' size='h2' className='juiciest__title'>
                    Самое cочное
                </Heading>
                <Link
                    as={RouterLink}
                    to='juiciest'
                    display={{ md: 'none', lg: 'block' }}
                    data-test-id='juiciest-link'
                >
                    <GreenButton text='Вся Подборка' />
                </Link>
            </HStack>

            <BigCardsList data={sortedOnTimeRecipes} maxElems={4} />

            <Link
                as={RouterLink}
                to='juiciest'
                display={{ sm: 'flex', lg: 'none' }}
                alignSelf='center'
                data-test-id='juiciest-link-mobile'
            >
                <GreenButton text='Вся Подборка' />
            </Link>
        </VStack>
    );
}
