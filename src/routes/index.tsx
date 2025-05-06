import { Navigate, Route, Routes } from 'react-router';

import { Alert } from '~/components/alert';
import Categories from '~/components/categories';
import { Loader } from '~/components/loader';
import Main from '~/components/Main';
import { NotFoundPage } from '~/components/notFoundPage';
import Recipe from '~/components/recipe';
import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';

const AppRoutes = () => {
    const { data, isLoading, isError } = useGetFilteredCategories();
    const categories: string[] = data.map(({ category }) => category);

    const subcategories: Record<string, { category: string; id: string }> = data.reduce(
        (acc, { category, subCategories }) => {
            acc[category] = subCategories.map(({ category: sub, _id: id }) => ({
                category: sub,
                id,
            }));
            return acc;
        },
        {} as Record<string, { category: string; id: string }>,
    );
    if (isError) {
        return <Alert />;
    }
    return isLoading ? (
        <Loader />
    ) : (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/the-juiciest' element={<Categories />}>
                <Route path=':id' element={<Recipe />} />
            </Route>
            <Route path=':id' element={<Recipe />} />

            {categories.map((category) => (
                <Route key={category} path={`/${category}`}>
                    {subcategories[category]?.map((sub) => (
                        <Route key={sub.id} path={sub.category}>
                            <Route
                                index
                                element={<Categories category={category} subcategory={sub.id} />}
                            />
                            <Route path=':id' element={<Recipe />} />
                        </Route>
                    ))}
                </Route>
            ))}
            <Route path='/not-found' element={<NotFoundPage />}></Route>
            <Route path='*' element={<Navigate to='/not-found' replace />} />
        </Routes>
    );
};

export default AppRoutes;
