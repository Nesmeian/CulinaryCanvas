import { Navigate, Route, Routes } from 'react-router';

import Categories from '~/components/categories';
import Main from '~/components/Main';
import Recipe from '~/components/recipe';

import DB from '../data/db.json';
const AppRoutes = () => {
    const categories = DB.navMenu.categories.map(({ routeName }) => routeName);
    const subcategories = DB.navMenu.categories.reduce((acc, { routeName, elems }) => {
        acc[routeName] = Object.values(elems);
        return acc;
    }, {});
    const recipes = categories.reduce((acum, e) => {
        acum[e] = DB.card
            .filter(({ category }) => category.includes(e))
            .map(({ imgUrl }) => imgUrl);
        return acum;
    }, {});
    // const subCategoriesRecipes = DB.navMenu.categories.reduce((acc, { routeName, elems }) => {
    //     const subcatKeys = Object.values(elems);
    //     const subcatMap = subcatKeys.reduce((subAcc, subKey) => {
    //         const urls = DB.card
    //             .filter(({ category }) => category.includes(routeName))
    //             .filter(({ subcategory }) => subcategory.includes(subKey))
    //             .map(({ imgUrl }) => imgUrl);

    //         subAcc[subKey] = urls;
    //         return subAcc;
    //     }, {});

    //     acc[routeName] = subcatMap;
    //     return acc;
    // }, {});

    return (
        <Routes>
            <Route path='/' element={<Main />} />
            {categories.map((category) => (
                <Route key={category} path={`/${category}`}>
                    <Route index element={<Categories category={category} />} />
                    {subcategories[category].map((sub) => (
                        <Route
                            key={sub}
                            path={sub}
                            element={<Categories category={category} subcategory={sub} />}
                        />
                    ))}
                    {recipes[category].map((recipe) => (
                        <Route
                            key={recipe}
                            path={recipe}
                            element={<Recipe card={recipe} category={category} />}
                        />
                    ))}
                </Route>
            ))}

            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export default AppRoutes;
