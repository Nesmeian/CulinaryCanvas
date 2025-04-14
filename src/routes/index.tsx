import { Navigate, Route, Routes } from 'react-router';

import Categories from '~/components/categories';
import Main from '~/components/Main';
import { CategoryKey, SubcategoryKey } from '~/types/routesTypes';

const AppRoutes = () => {
    const categorySubcategories: Record<CategoryKey, SubcategoryKey[]> = {
        veganCuisine: ['mainCourses'],
        juiciest: [
            'appetizers',
            'firstCourses',
            'desserts',
            'mainCourses',
            'sideDishes',
            'rawFoodDishes',
        ],
    };

    const categories = ['veganCuisine', 'juiciest'] as const satisfies readonly CategoryKey[];

    return (
        <Routes>
            <Route path='/' element={<Main />} />

            {categories.map((category) => (
                <Route key={category} path={`/${category}`}>
                    <Route index element={<Categories category={category} />} />

                    {categorySubcategories[category].map((sub) => (
                        <Route key={sub} path={sub} element={<Categories category={category} />} />
                    ))}
                </Route>
            ))}

            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export default AppRoutes;
