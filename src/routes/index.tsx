import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { Alert } from '~/components/alert';
import Categories from '~/components/categories';
import { Loader } from '~/components/loader';
import { VerificationRedirect } from '~/components/LoginComponents/veritificationRedirect';
import Main from '~/components/Main';
import { NotFoundPage } from '~/components/notFoundPage';
import { Login } from '~/components/Pages/Login';
import { MainPage } from '~/components/Pages/MainPage';
import Recipe from '~/components/recipe';
import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { useGetRefreshTokenQuery } from '~/query/services/get/getRefreshToken';

const AppRoutes = () => {
    const { data, isLoading, isError } = useGetFilteredCategories();
    const { data: check } = useGetRefreshTokenQuery();
    console.log(check);
    if (isError) return <Alert />;
    if (isLoading) return <Loader />;
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
                <Route path='/' element={<MainPage />}>
                    <Route index element={<Main />} />
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
                    <Route path='not-found' element={<NotFoundPage />} />
                    <Route path='*' element={<Navigate to='/not-found' replace />} />
                </Route>
                <Route path='login' element={<Login />}></Route>
                <Route path='registration' element={<Login />}></Route>
                <Route path='verification' element={<VerificationRedirect />} />
            </Routes>
        </BrowserRouter>
    );
};
export default AppRoutes;
