import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const VerificationRedirect = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const isVerified = params.get('emailVerified') === 'true';

        navigate(isVerified ? '/login' : '/registration', {
            state: { emailVerified: isVerified },
            replace: true,
        });
    }, [location, navigate]);

    return null;
};
