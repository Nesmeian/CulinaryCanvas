import { Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TEST_IDS } from '~/constants/testsIds';
import { useGetCategoryId } from '~/Hooks/useGetCategoryAndSubCategoryId';
import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { useGetSubcategoryRecipesData } from '~/Hooks/useGetSubcategoryRecipesData';
import {
    useGetRecipesByCategoryQuery,
    useGetRecipesQuery,
    useGetSortedAtLikesQuery,
} from '~/query/services/get';
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
    const mainRef = useRef<HTMLDivElement>(null);
    const curentPath = GetCurrentPath();
    const allowSearch = useSelector((state: ApplicationState) => state.searchState.allowSearch);
    const allergens = useSelector((state: ApplicationState) => state.allergensSlice.allergens);
    const allergensActive = useSelector((state: ApplicationState) => state.allergensSlice.isActive);
    const search = useSelector((state: ApplicationState) => state.searchState.search);
    const filterData = useSelector((state: ApplicationState) => state.filterState.filterData);
    const { data: filteredCategoies } = useGetFilteredCategories();
    const pathString = curentPath.join('/');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(cleanBigCards());
    }, [dispatch, pathString]);
    useEffect(() => {
        setTimeout(() => {
            mainRef.current?.scrollTo(0, 0);
        }, 100);
    }, [allergens]);
    const [page, setPage] = useState(1);
    const BigCardData = useSelector((state: ApplicationState) => state.bigCardSlice.cards);
    const {
        data: juiciestData,
        isLoading: juiciestLoading,
        isFetching,
    } = useGetSortedAtLikesQuery(
        { limit: 8, page: page },
        { skip: pathString[0] == 'the-juiciest' },
    );
    const isRandomBottom = juiciestData ? true : false;

    const {
        data,
        isError,
        isLoading: isDataLoading,
    } = useGetRecipesByCategoryQuery({ id: subcategory }, { skip: !subcategory });
    const { allergens: filteredAllergens, sideDish, meat, category: filterCategory } = filterData;

    const categoryIds = filteredCategoies
        .find(({ title }) => title === filterCategory[0])
        ?.subCategories.map(({ _id }) => _id);
    const { category: categoryData, loading } = useGetCategoryId(subcategory);
    const {
        data: searchData,
        isLoading: searchLoading,
        isFetching: searchFetching,
        isError: searchError,
    } = useGetRecipesQuery(
        {
            searchString: search,
            limit: 8,
            ...(allergensActive && { allergens: allergens.join('') }),
            ...(filteredAllergens.length != 0 && { allergens: filteredAllergens.join('') }),
            ...(sideDish.length != 0 && { garnish: sideDish.join('') }),
            ...(meat.length != 0 && { meat: meat.join('') }),
            subcategory: categoryIds?.length ? categoryIds.join(',') : subcategory,
        },
        { skip: !allowSearch },
    );
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

    if (subcatLoading || loading || juiciestLoading || isDataLoading) {
        return <Loader />;
    }
    if (isError || Error || searchError) {
        return <Alert />;
    }
    return (
        <MainStyled as='main' ref={mainRef}>
            <VStack
                p={{ lg: '30px', base: '16px ' }}
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
        </MainStyled>
    );
}
