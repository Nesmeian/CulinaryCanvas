import { Route, Routes } from 'react-router';

import Categories from '~/components/categories';
import Main from '~/components/Main';
import Recipe from '~/components/recipe';

import DB from '../data/db.json';
const AppRoutes = () => {
    const categories: string[] = DB.navMenu.categories.map(({ category }) => category);

    const subcategories: Record<string, string[]> = DB.navMenu.categories.reduce(
        (acc, { category, subCategories }) => {
            acc[category] = subCategories.map(({ category }) => category);
            return acc;
        },
        {} as Record<string, string[]>,
    );
    const juiciest = ['the-juiciest'];
    const juiciestRecipes: Record<string, string[]> = juiciest.reduce(
        (acum, e) => {
            acum[e] = DB.card.map(({ id }) => id);
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
    return (
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
                    <Route index element={<Categories category={category} />} />

                    {subcategories[category]?.map((sub) => (
                        <Route key={sub} path={sub}>
                            <Route
                                index
                                element={<Categories category={category} subcategory={sub} />}
                            />
                            {recipes[category]?.map((recipe) => (
                                <Route
                                    key={`${sub}-${recipe}`}
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
