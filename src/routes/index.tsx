import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';

import Categories from '~/components/categories';
import { VerificationRedirect } from '~/components/LoginComponents/veritificationRedirect';
import Main from '~/components/Main';
import { NotFoundPage } from '~/components/notFoundPage';
import Recipe from '~/components/recipe';
import { BlogsPage } from '~/Pages/BlogsPage';
import { Login } from '~/Pages/Login';
import { MainPage } from '~/Pages/MainPage';
import { NewRecipe } from '~/Pages/NewRecipe';
import { ComingCategoryData } from '~/types/comingData';

import { ProtectedRoute } from './protectedRoute';

export function makeRouter(
    categoriesData: ComingCategoryData[],
    subcategories: Record<string, { id: string; category: string }[]>,
) {
    return createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path='/'
                    element={
                        <ProtectedRoute>
                            <MainPage />
                        </ProtectedRoute>
                    }
                    errorElement={<NotFoundPage />}
                >
                    <Route index element={<Main />} />
                    <Route path='new-recipe' element={<NewRecipe />} />
                    <Route path='blogs' element={<BlogsPage />} />
                    <Route path='the-juiciest'>
                        <Route index element={<Categories />} />
                        <Route path=':id' element={<Recipe />} />
                    </Route>
                    <Route path=':id' element={<Recipe />} />

                    {categoriesData.map(({ category }) => {
                        const subs = subcategories[category]!;
                        const firstSub = subs[0]!;
                        return (
                            <Route key={category} path={category}>
                                <Route
                                    index
                                    element={
                                        <Navigate
                                            to={`/${category}/${firstSub.category}`}
                                            replace
                                        />
                                    }
                                />
                                {subs.map((sub) => (
                                    <Route key={sub.id} path={sub.category}>
                                        <Route
                                            index
                                            element={
                                                <Categories
                                                    category={category}
                                                    subcategory={sub.id}
                                                />
                                            }
                                        />
                                        <Route path=':id' element={<Recipe />} />
                                    </Route>
                                ))}
                            </Route>
                        );
                    })}

                    <Route path='edit-recipe'>
                        <Route path=':category'>
                            <Route path=':subcategory'>
                                <Route path=':id' element={<NewRecipe />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/registration' element={<Login />} />
                <Route path='/verification' element={<VerificationRedirect />} />
                <Route path='not-found' element={<NotFoundPage />} />
                <Route path='*' element={<Navigate to='/not-found' replace />} />
            </>,
        ),
    );
}
