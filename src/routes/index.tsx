import { JSX } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { Alert } from '~/components/alert';
import Categories from '~/components/categories';
import { Loader } from '~/components/loader';
import { VerificationRedirect } from '~/components/LoginComponents/veritificationRedirect';
import Main from '~/components/Main';
import { NotFoundPage } from '~/components/notFoundPage';
import { Login } from '~/components/Pages/Login';
import { MainPage } from '~/components/Pages/MainPage';
import { NewRecipe } from '~/components/Pages/NewRecipe';
import Recipe from '~/components/recipe';
import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { useCheckAuthTokenQuery } from '~/query/services/get/getAuthToken';
import { useAppSelector } from '~/store/hooks';
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuth = useAppSelector((state) => state.app.isAuth);
    if (!isAuth) {
        return <Navigate to='/login' replace />;
    }
    return children;
};
const AppRoutes = () => {
    const { isLoading: isCheckAuhtLoading } = useCheckAuthTokenQuery();
    const { data, isLoading: isCategoriesLoading, isError } = useGetFilteredCategories();

    if (isError) return <Alert />;
    if (isCheckAuhtLoading || isCategoriesLoading) return <Loader />;
    const subcategories = data.reduce<Record<string, { id: string; category: string }[]>>(
        (acc, { category, subCategories }) => {
            acc[category] = subCategories.map(({ _id: id, category: sub }) => ({
                id,
                category: sub,
            }));
            return acc;
        },
        {},
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        <ProtectedRoute>
                            <MainPage />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Main />} />
                    <Route path='new-recipe' element={<NewRecipe />} />
                    <Route path='the-juiciest'>
                        <Route index element={<Categories />} />
                        <Route path=':id' element={<Recipe />} />
                    </Route>
                    <Route path=':id' element={<Recipe />} />

                    {data.map(({ category }) => {
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
            </Routes>
        </BrowserRouter>
    );
};
export default AppRoutes;
