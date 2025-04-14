import './style.css';

import { Heading, HStack, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import BigCardsList from '~/components/bigCardsList';
import GreenButton from '~/components/styledComponents/greenButton';

import DB from '../../../data/db.json';

export default function Juiciest() {
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
                <Link to='juiciest' className='linka' data-test-id='juiciest-link'>
                    <GreenButton text='Вся Подборка' />
                </Link>
            </HStack>

            <BigCardsList data={DB.juiciest} maxElems={4} />

            <Link to='juiciest' className='lina' data-test-id='juiciest-link-mobile'>
                <GreenButton center text='Вся Подборка' />
            </Link>
        </VStack>
    );
}
