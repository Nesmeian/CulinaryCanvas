import { Heading, VStack } from '@chakra-ui/react';

import DB from '../../data/db.json';
import Search from '../Search';
export default function Categories({ category }) {
    const dbItem = DB[category];
    console.log(dbItem);
    return (
        <VStack as='main'>
            <Heading as='h1' size='h1' pt={{ base: 0, md: 4 }} pb={{ base: '10px', md: 5 }}>
                {dbItem.title}
            </Heading>
            <Search />
        </VStack>
    );
}
