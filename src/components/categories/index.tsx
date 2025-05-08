import { Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TEST_IDS } from '~/constants/testsIds';
import { useGetCategoryId } from '~/Hooks/useGetCategoryAndSubCategoryId';
import { useGetJuiciest } from '~/Hooks/useGetJuiciest';
import { useGetRecipes } from '~/Hooks/useGetRecipes';
import { useGetSubcategoryRecipesData } from '~/Hooks/useGetSubcategoryRecipesData';
import { addCards, cleanBigCards } from '~/store/bigCardSlice';
import { ApplicationState } from '~/store/configure-store';
import GetCurrentPath from '~/utils/getCurrentPath';

import { CategoriesProps } from '../../types/dataTypes';
import { Alert } from '../alert';
import BigCardsList from '../bigCardsList';
import { Loader } from '../loader';
import Search from '../Search';
import BottomSection from '../sections/bottomsection';
import GreenButton from '../styledComponents/greenButton';
import MainStyled from '../styledComponents/Main';
import AddTabList from '../tabList';
export default function Categories({ category, subcategory }: CategoriesProps) {
    const curentPath = GetCurrentPath();
    const pathString = curentPath.join('/');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(cleanBigCards());
    }, [dispatch, pathString]);
    const [page, setPage] = useState(1);
    const BigCardData = useSelector((state: ApplicationState) => state.bigCardSlice.cards);
    const { data: juiciestData, isLoading: juiciestLoading, isFetching } = useGetJuiciest(8, page);
    const { data, isError } = useGetRecipes(subcategory);
    const { category: categoryData, loading } = useGetCategoryId(subcategory);
    const totalPage = 3;
    const LoadMore = () => {
        setPage((prev) => ++prev);
    };
    useEffect(() => {
        if (juiciestData?.data && juiciestData.data.length > 0) {
            dispatch(addCards(juiciestData.data));
        }
    }, [juiciestData, dispatch]);
    const {
        categoryData: catData,
        recipes,
        isLoading: subcatLoading,
        isError: Error,
    } = useGetSubcategoryRecipesData(categoryData?.subCategories ?? []);
    if (loading || subcatLoading || juiciestLoading) {
        return <Loader />;
    }
    if (isError || Error) {
        return <Alert />;
    }
    return (
        <MainStyled as='main'>
            <VStack width={{ lg: '50%', base: '100%' }}>
                <Heading as='h1' size='h1' pt={{ base: 0, md: 4 }} pb={{ base: '10px', md: 5 }}>
                    {curentPath[curentPath.length - 1] !== 'the-juiciest'
                        ? categoryData?.title
                        : 'Самое Сочное'}
                </Heading>
                <Text
                    textAlign='center'
                    fontSize={{ base: '14px', lg: '16px' }}
                    fontWeight='500'
                    color='rgba(0, 0, 0, 0.48)'
                >
                    {categoryData?.description}
                </Text>
            </VStack>

            <Search />
            {category !== 'the-juiciest' && <AddTabList category={category} />}
            {data ? (
                <>
                    <BigCardsList data={data.data} />
                </>
            ) : (
                <>
                    {BigCardData && <BigCardsList data={BigCardData} />}
                    {page < totalPage && (
                        <GreenButton
                            text={isFetching ? 'Загрузка' : 'Загрузить еще'}
                            onClick={LoadMore}
                            test={TEST_IDS.LOAD_MORE_BTN}
                        />
                    )}
                    <BottomSection isMain />
                </>
            )}

            <BottomSection recipes={recipes?.data} randomCategory={catData} />
        </MainStyled>
    );
}
