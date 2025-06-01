import { useEffect, useRef } from 'react';
import { useBlocker } from 'react-router-dom';

import { SaveRecipeDraft } from '~/components/buttons/saveRecipeDraft';
import { useBlockNavigationProps } from '~/types/NewRecipesTypes';

export const useBlockNavigation = ({
    isFormDirty,
    open,
    values,
    isSavedSuccessfully,
}: useBlockNavigationProps) => {
    const savedSuccessfullyRef = useRef(false);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isFormDirty && !savedSuccessfullyRef.current && !isSavedSuccessfully) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isFormDirty, isSavedSuccessfully]);

    useBlocker(({ currentLocation, nextLocation }) => {
        if (savedSuccessfullyRef.current || isSavedSuccessfully) return false;

        const navigatingAway = currentLocation.pathname !== nextLocation.pathname;

        if (isFormDirty && navigatingAway) {
            const currentValues = values();
            open(
                <SaveRecipeDraft
                    values={currentValues}
                    onSaveSuccess={() => {
                        savedSuccessfullyRef.current = true;
                    }}
                />,
            );
            return true;
        }

        return false;
    });
};
