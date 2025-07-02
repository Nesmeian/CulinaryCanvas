import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { AllAuthorBtnParams } from '../../model/types';

export const AllAuthorsBtn = ({ limit, setLimit, isFetching }: AllAuthorBtnParams) => {
    const isAllAuthorsShown = typeof limit === 'number' ? true : false;
    const [click, setClick] = useState(false);
    const setLimitHandel = () => {
        setClick(true);
        if (limit === 'all') {
            setLimit(9);
        } else {
            setLimit('all');
        }
    };
    useEffect(() => {
        if (!isFetching) {
            setClick(false);
        }
    }, [isFetching]);
    return (
        <>
            {isFetching && click ? (
                <Spinner />
            ) : (
                <Button
                    variant='plain'
                    role='group'
                    onClick={setLimitHandel}
                    rightIcon={
                        isAllAuthorsShown ? (
                            <ArrowForwardIcon
                                transition='transform 0.2s ease'
                                _groupHover={{ transform: 'translateX(8px)' }}
                            />
                        ) : undefined
                    }
                    leftIcon={
                        !isAllAuthorsShown ? (
                            <ArrowBackIcon
                                transition='transform 0.2s ease'
                                _groupHover={{ transform: 'translateX(-8px)' }}
                            />
                        ) : undefined
                    }
                >
                    {isAllAuthorsShown ? 'Все Авторы' : 'Свернуть'}
                </Button>
            )}
        </>
    );
};
