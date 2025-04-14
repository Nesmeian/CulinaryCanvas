import { Heading } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import useBreakpoints from '~/themes/chakraBreakPoints';
import { CategoriesProps, DBStructure } from '~/types/routesTypes';

import DB from '../../data/db.json';
import BigCardsList from '../bigCardsList';
import Footer from '../Footer';
import Search from '../Search';
import BottomSection from '../sections/vegancuisine';
import GreenButton from '../styledComponents/greenButton';
import MainStyled from '../styledComponents/Main';
import AddTabList from '../tabList';
export default function Categories({ category }: CategoriesProps) {
    const db = DB as unknown as DBStructure;
    const location = useLocation();
    const dbItem = db[category];
    const bottomSectionData = category === 'juiciest' ? 'veganCuisine' : 'desserts';
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const { isTablet } = useBreakpoints();
    return (
        <MainStyled as='main'>
            <Heading as='h1' size='h1' pt={{ base: 0, md: 4 }} pb={{ base: '10px', md: 5 }}>
                {dbItem?.title}
            </Heading>
            <Search />
            {pathSegments.length === 2 && <AddTabList location={pathSegments[1]} />}
            <BigCardsList data={dbItem} maxElems={8}></BigCardsList>
            <GreenButton text='Загрузить еще' />
            <BottomSection data={DB[bottomSectionData]} />
            {isTablet && <Footer />}
        </MainStyled>
    );
}
