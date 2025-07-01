import { useCallback, useEffect } from 'react';

import { useToggleSubscriptionMutation } from '~/Pages/BlogsPage/model/slice';

export function useToggleSubscription(
    userId: string,
    setIsToggleLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
    const [toggleSubscription, { isLoading, isSuccess, isError }] = useToggleSubscriptionMutation();

    const handleToggle = useCallback(() => {
        toggleSubscription(userId);
    }, [toggleSubscription, userId]);

    useEffect(() => {
        setIsToggleLoading(isLoading);
    }, [isLoading, setIsToggleLoading]);

    useEffect(() => {
        if (isSuccess || isError) {
            setIsToggleLoading(false);
        }
    }, [isSuccess, isError, setIsToggleLoading]);

    return { handleToggle };
}
