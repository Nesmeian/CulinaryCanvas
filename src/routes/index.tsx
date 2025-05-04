import { Route, Routes } from 'react-router';

import Categories from '~/components/categories';
import { Loader } from '~/components/loader';
import Main from '~/components/Main';
import Recipe from '~/components/recipe';
import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';

const AppRoutes = () => {
    const { data, loading } = useGetFilteredCategories();
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
    const juiciest = ['the-juiciest'];

    return loading ? (
        <Loader />
    ) : (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path=':id' element={<Recipe />} />
            {juiciest.map((category) => (
                <Route key={category} path={`/${category}`}>
                    <Route index element={<Categories category={category} />} />
                    <Route path=':id' element={<Recipe />} />
                </Route>
            ))}
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

            {/* <Route path='*' element={<Navigate to='/' replace />} /> */}
        </Routes>
    );
};

export default AppRoutes;
