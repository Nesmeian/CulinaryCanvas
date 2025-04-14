import { Heading } from '@chakra-ui/react';

import DB from '../../data/db.json';
import useBreakpoints from '../../themes/chakraBreakPoints';
import { CategoriesProps } from '../../types/dataTypes';
import GetCurrentPath from '../../utils/getCurrentPath';
import BigCardsList from '../bigCardsList';
import Footer from '../Footer';
import Search from '../Search';
import BottomSection from '../sections/bottomsection';
import GreenButton from '../styledComponents/greenButton';
import MainStyled from '../styledComponents/Main';
import AddTabList from '../tabList';
export default function Categories({ category }: CategoriesProps) {
    const db = DB;
    const pathSegments = GetCurrentPath();
    const bottomSectionData = category === 'juiciest' ? 'veganCuisine' : 'desserts';
    const { isTablet } = useBreakpoints();
    return (
        <MainStyled as='main'>
            <Heading as='h1' size='h1' pt={{ base: 0, md: 4 }} pb={{ base: '10px', md: 5 }}>
                {db[category]?.title}
            </Heading>
            <Search />
            {pathSegments.length === 2 && <AddTabList location={pathSegments[1]} />}
            <BigCardsList data={db[category]} maxElems={8}></BigCardsList>
            <GreenButton text='Загрузить еще' />
            <BottomSection data={DB[bottomSectionData]} />
            {isTablet && <Footer />}
        </MainStyled>
    );
}
