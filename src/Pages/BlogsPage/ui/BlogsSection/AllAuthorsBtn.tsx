import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

import { AllAuthorBtnParams } from '../../model/types';

export const AllAuthorsBtn = ({ limit, setLimit }: AllAuthorBtnParams) => {
    const isAllAuthorsShown = typeof limit === 'number' ? true : false;
    const setLimitHandel = () => {
        typeof limit === 'number' ? setLimit('all') : setLimit(9);
    };
    return (
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
    );
};
