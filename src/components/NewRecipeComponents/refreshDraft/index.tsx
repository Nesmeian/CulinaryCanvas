import { useEffect, useRef } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';

import { useBlockNavigationProps } from '~/types/NewRecipesTypes';

import { UnsavedChangesModal } from '../modal';

export const useBlockNavigation = ({
    isFormDirty,
    open,
    values,
    isSavedSuccessfully,
    close,
}: useBlockNavigationProps) => {
    const navigate = useNavigate();
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
            open(
                <UnsavedChangesModal
                    values={values}
                    onSaveSuccess={() => {
                        savedSuccessfullyRef.current = true;
                        navigate(nextLocation.pathname);
                        close();
                    }}
                />,
            );
            return true;
        }

        return false;
    });
};
