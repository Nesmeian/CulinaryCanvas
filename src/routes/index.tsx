import { Navigate, Route, Routes } from 'react-router';

import Categories from '~/components/categories';
import Main from '~/components/Main';
import Recipe from '~/components/recipe';

import DB from '../data/db.json';
const AppRoutes = () => {
    const categories: string[] = DB.navMenu.categories.map(({ routeName }) => routeName);

    const subcategories: Record<string, string[]> = DB.navMenu.categories.reduce(
        (acc, { routeName, elems }) => {
            acc[routeName] = Object.values(elems);
            return acc;
        },
        {} as Record<string, string[]>,
    );

    const recipes: Record<string, string[]> = categories.reduce(
        (acum, e) => {
            acum[e] = DB.card
                .filter(({ category }) => category.includes(e))
                .map(({ imgUrl }) => imgUrl);
            return acum;
        },
        {} as Record<string, string[]>,
    );

    return (
        <Routes>
            <Route path='/' element={<Main />} />
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

            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export default AppRoutes;
