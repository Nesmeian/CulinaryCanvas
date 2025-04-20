import { Navigate, Route, Routes } from 'react-router';

import Categories from '~/components/categories';
import Main from '~/components/Main';
import Recipe from '~/components/recipe';
import { Category } from '~/types/dataTypes';

const AppRoutes = () => {
    const categorySubcategories: Record<Category, string[]> = {
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
    const recipes: Record<Category, string[]> = {
        juiciest: ['NoodlesWithChickenAndSaffron'],
        veganCuisine: ['mainCourses'],
    };
    const categories: Category[] = ['veganCuisine', 'juiciest'];

    return (
        <Routes>
            <Route path='/' element={<Main />} />

            {categories.map((category) => (
                <Route key={category} path={`/${category}`}>
                    <Route index element={<Categories category={category} />} />
                    {categorySubcategories[category].map((sub) => (
                        <Route key={sub} path={sub} element={<Categories category={category} />} />
                    ))}
                    {recipes[category].map((recipe) => (
                        <Route key={recipe} path={recipe} element={<Recipe recipe={recipe} />} />
                    ))}
                </Route>
            ))}

            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export default AppRoutes;
