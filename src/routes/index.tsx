import { Navigate, Route, Routes } from 'react-router';

import Categories from '~/components/categories';
import Main from '~/components/Main';

const AppRoutes = () => {
    const categories = [
        'salads',
        'snacks',
        'firstCourses',
        'secondCourses',
        'dessertsPastries',
        'grilledDishes',
        'veganCuisine',
        'childrenMeals',
        'therapeuticNutrition',
        'nationalNutrition',
        'sauces',
        'drinks',
        'foodPreparation',
        'juiciest',
    ];

    const subcategories = [
        'appetizers',
        'firstCourses',
        'mainCourses',
        'sideDishes',
        'desserts',
        'rawFoodDishes',
    ];

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
