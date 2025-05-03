import { Route, Routes } from 'react-router';

import Categories from '~/components/categories';
import { Loader } from '~/components/loader';
import Main from '~/components/Main';
import Recipe from '~/components/recipe';
import { useFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { useGetJuiciest } from '~/Hooks/useGetJuiciest';

import DB from '../data/db.json';

const AppRoutes = () => {
    const { data, loading } = useFilteredCategories();
    const { data: juiciestData, loading: loadingLikes } = useGetJuiciest();
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
    const juiciestRecipes: Record<string, string[]> = juiciest.reduce(
        (acum, e) => {
            acum[e] = juiciestData?.data.map(({ _id }) => _id);
            return acum;
        },
        {} as Record<string, string[]>,
    );
    const recipes: Record<string, string[]> = categories.reduce(
        (acum, e) => {
            acum[e] = DB.card.filter(({ category }) => category.includes(e)).map(({ id }) => id);
            return acum;
        },
        {} as Record<string, string[]>,
    );
    const mainRecipes = DB.card.map(({ id }) => id);

    return loading && loadingLikes ? (
        <Loader />
    ) : (
        <Routes>
            <Route path='/' element={<Main />} />
            {mainRecipes.map((recipe) => (
                <Route key={recipe} path={recipe} element={<Recipe card={recipe} />} />
            ))}
            {juiciest.map((category) => (
                <Route key={category} path={`/${category}`}>
                    <Route index element={<Categories category={category} />} />
                    {juiciestRecipes[category]?.map((recipe) => (
                        <Route key={recipe} path={recipe} element={<Recipe card={recipe} />} />
                    ))}
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
                            {recipes[category]?.map((recipe) => (
                                <Route
                                    key={`${sub.category}-${recipe}`}
                                    path={recipe}
                                    element={<Recipe card={recipe} />}
                                />
                            ))}
                        </Route>
                    ))}
                    {recipes[category]?.map((recipe) => (
                        <Route key={recipe} path={recipe} element={<Recipe card={recipe} />} />
                    ))}
                </Route>
            ))}

            {/* <Route path='*' element={<Navigate to='/' replace />} /> */}
        </Routes>
    );
};

export default AppRoutes;
