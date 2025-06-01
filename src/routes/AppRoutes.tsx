import { RouterProvider } from 'react-router-dom';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { useCheckAuthTokenQuery } from '~/query/services/get/getAuthToken';

import { makeRouter } from '.';

export const AppRoutes = () => {
    const { isLoading: isCheckAuthLoading } = useCheckAuthTokenQuery();
    const { data, isLoading: isCategoriesLoading, isError } = useGetFilteredCategories();

    if (isError) return <Alert />;
    if (isCheckAuthLoading || isCategoriesLoading) return <Loader />;

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

    const router = makeRouter(data, subcategories);

    return <RouterProvider router={router} />;
};

export default AppRoutes;
