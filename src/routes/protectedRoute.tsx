import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '~/store/hooks';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuth = useAppSelector((state) => state.app.isAuth);
    if (!isAuth) {
        return <Navigate to='/login' replace />;
    }
    return children;
};
