import { Navigate, Route, Routes } from 'react-router';

import Categories from '~/components/categories';
import Main from '~/components/Main';
import { CategoryKey, SubcategoryKey } from '~/types/routesTypes';

const AppRoutes = () => {
    const categories = ['veganCuisine', 'juiciest'] as const satisfies readonly CategoryKey[];

    const subcategories = [
        'appetizers',
        'firstCourses',
        'mainCourses',
        'sideDishes',
        'desserts',
        'rawFoodDishes',
    ] as const satisfies readonly SubcategoryKey[];

    return (
        <Routes>
            <Route path='/' element={<Main />} />

            {categories.map((category) => (
                <Route key={category} path={`/${category}`}>
                    <Route index element={<Categories category={category} />} />
                    {subcategories.map((sub) => (
                        <Route key={sub} path={sub} element={<Categories category={category} />} />
                    ))}
                </Route>
            ))}

            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export default AppRoutes;
