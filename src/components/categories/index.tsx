import { Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TEST_IDS } from '~/constants/testsIds';
import { useGetCategoryId } from '~/Hooks/useGetCategoryAndSubCategoryId';
import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { useGetSubcategoryRecipesData } from '~/Hooks/useGetSubcategoryRecipesData';
import { useSearchRecipesHook } from '~/Hooks/useRecipeSearchHook';
import { useGetRecipesByCategoryQuery, useGetSortedAtLikesQuery } from '~/query/services/get';
import { addCards, cleanBigCards } from '~/store/bigCardSlice';
import { ApplicationState } from '~/store/configure-store';
import GetCurrentPath from '~/utils/getCurrentPath';

import { CategoriesProps } from '../../types/dataTypes';
import { Alert } from '../alert';
import BigCardsList from '../bigCardsList';
import { Loader } from '../loader';
import { SearchLoader } from '../loader/searchLoader';
import Search from '../Search';
import BottomSection from '../sections/bottomsection';
import GreenButton from '../styledComponents/greenButton';
import MainStyled from '../styledComponents/Main';
import AddTabList from '../tabList';
export default function Categories({ category, subcategory }: CategoriesProps) {
    const dispatch = useDispatch();
    const mainRef = useRef<HTMLDivElement>(null);
    const curentPath = GetCurrentPath();
    const allowSearch = useSelector((state: ApplicationState) => state.searchState.allowSearch);
    const allergens = useSelector((state: ApplicationState) => state.allergensSlice.allergens);
    const filterData = useSelector((state: ApplicationState) => state.filterState.filterData);
    const BigCardData = useSelector((state: ApplicationState) => state.bigCardSlice.cards);

    const [page, setPage] = useState(1);
    const LoadMore = () => {
        setPage((prev) => ++prev);
    };
    const pathString = curentPath.join('/');

    const { data: filteredCategoies } = useGetFilteredCategories();
    const {
        data,
        isError,
        isLoading: isDataLoading,
        isFetching: isFetchingRecipes,
    } = useGetRecipesByCategoryQuery({ id: subcategory }, { skip: !subcategory });

    const {
        data: juiciestData,
        isLoading: juiciestLoading,
        isFetching,
    } = useGetSortedAtLikesQuery(
        { limit: 8, page: page },
        { skip: pathString[0] == 'the-juiciest' },
    );

    useEffect(() => {
        dispatch(cleanBigCards());
        mainRef.current?.scrollTo(0, 0);
    }, [dispatch, pathString]);
    useEffect(() => {
        setTimeout(() => {
            mainRef.current?.scrollTo(0, 0);
        }, 100);
    }, [allergens]);
    useEffect(() => {
        if (juiciestData?.data && juiciestData.data.length > 0) {
            dispatch(addCards(juiciestData.data));
        }
    }, [juiciestData, dispatch]);

    const { category: filterCategory } = filterData;
    const isRandomBottom = juiciestData ? true : false;

    const categoryIds = filteredCategoies
        .find(({ title }) => title === filterCategory[0])
        ?.subCategories.map(({ _id }) => _id);
    const { category: categoryData, loading } = useGetCategoryId(subcategory);
    const { searchData, searchLoading, searchFetching, searchError } = useSearchRecipesHook({
        subcategory,
        categoryIds,
        allowSearch,
    });

    const {
        categoryData: catData,
        recipes,
        isLoading: subcatLoading,
        isError: Error,
    } = useGetSubcategoryRecipesData(categoryData?.subCategories ?? []);
    const isLoadingCheck =
        subcatLoading || loading || juiciestLoading || isDataLoading || isFetchingRecipes;
    const isErrorCheck = isError || Error || searchError;
    return (
        <MainStyled as='main' ref={mainRef}>
            <VStack
                p={{ lg: '30px', md: '16px', base: '16px 0px' }}
                gap='16px'
                borderRadius='0  0 8px 8px'
                boxShadow='0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1);'
            >
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
                {!searchLoading || !searchFetching ? <Search /> : <SearchLoader />}
            </VStack>

            {allowSearch ? (
                <>
                    <AddTabList category={category} />
                    {searchData && <BigCardsList data={searchData?.data} />}
                </>
            ) : data ? (
                <>
                    <AddTabList category={category} />
                    {data.data && <BigCardsList data={data.data} />}
                </>
            ) : (
                <>
                    {BigCardData && <BigCardsList data={BigCardData} />}
                    {page < (juiciestData?.meta?.totalPages ?? 0) && (
                        <GreenButton
                            text={isFetching ? 'Загрузка' : 'Загрузить еще'}
                            onClick={LoadMore}
                            test={TEST_IDS.LOAD_MORE_BTN}
                        />
                    )}
                </>
            )}

            <BottomSection
                recipes={recipes?.data}
                randomCategory={catData}
                isRandom={isRandomBottom}
            />
            {isLoadingCheck && <Loader />}
            {isErrorCheck && <Alert />}
        </MainStyled>
    );
}
