import { Navigate, Route, Routes } from 'react-router';

import Categories from '~/components/categories';
import Main from '~/components/Main';
import Recipe from '~/components/recipe';
import { Category } from '~/types/dataTypes';

const AppRoutes = () => {
    const subCategories = [
        'appetizers',
        'firstCourses',
        'desserts',
        'second-dish',
        'sideDishes',
        'rawFoodDishes',
    ];
    const categorySubcategories: Record<Category, string[]> = {
        salads: subCategories,
        snacks: subCategories,
        firstCourses: subCategories,
        'second-dish': subCategories,
        desserts: subCategories,
        grilledDishes: subCategories,
        vegan: subCategories,
        childrenMeals: subCategories,
        therapeuticNutrition: subCategories,
        national: subCategories,
        drinks: subCategories,
        preserves: subCategories,
        sauces: subCategories,
        juiciest: subCategories,
    };
    const recipes: Record<Category, string[]> = {
        juiciest: ['NoodlesWithChickenAndSaffron', 'spaghettiDumplings'],
        vegan: subCategories,
        salads: subCategories,
        snacks: subCategories,
        firstCourses: subCategories,
        'second-dish': subCategories,
        desserts: subCategories,
        grilledDishes: subCategories,
        childrenMeals: subCategories,
        therapeuticNutrition: subCategories,
        national: subCategories,
        drinks: subCategories,
        preserves: subCategories,
        sauces: subCategories,
    };
    const categories: Category[] = [
        'vegan',
        'juiciest',
        'vegan',
        'salads',
        'snacks',
        'firstCourses',
        'second-dish',
        'desserts',
        'grilledDishes',
        'childrenMeals',
        'therapeuticNutrition',
        'national',
        'drinks',
        'preserves',
        'sauces',
    ];

    return (
        <Routes>
            <Route path='/' element={<Main />} />

            {categories.map((category) => (
                <Route key={category} path={`/${category}`}>
                    <Route index element={<Categories category={category} />} />
                    {categorySubcategories[category].map((sub) => (
                        <Route
                            key={sub}
                            path={sub}
                            element={<Categories category={category} subcategory={sub} />}
                        />
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
