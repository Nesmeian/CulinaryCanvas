import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { TEST_IDS } from '~/constants/testsIds';
import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { BreadCrumbsTypes } from '~/types/utilsTypes';
import TranslatePathSegment from '~/utils/BreadCrumbsTranslation';
import GetCurrentPath from '~/utils/getCurrentPath';

import { Loader } from '../loader';
import { breadCrumbPath } from './breadCrumbPath';

export default function BreadCrumb({ isOpen, onClose }: BreadCrumbsTypes) {
    const pathSegments = GetCurrentPath();
    const { data, isLoading } = useGetFilteredCategories();
    if (isLoading) {
        return <Loader />;
    }
    console.log('check');
    return (
        <Breadcrumb
            pt='16px'
            alignSelf='baseline'
            separator={<ChevronRightIcon color='gray.500' />}
            fontSize='md'
            data-test-id={isOpen ? '' : TEST_IDS.BREADCRUMBS}
            color='gray.500'
            sx={{
                '& > .chakra-breadcrumb__list': {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                },
            }}
        >
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} to='/'>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {pathSegments
                .filter((segment) => segment !== 'edit-recipe')
                .map((segment, index) => {
                    const { routeTo, isLast } = breadCrumbPath({
                        segment: segment,
                        index: index,
                        data: data,
                        pathSegments: pathSegments,
                    });
                    return (
                        <BreadcrumbItem key={index} isCurrentPage={isLast}>
                            <BreadcrumbLink
                                onClick={onClose}
                                as={Link}
                                to={routeTo}
                                color={isLast ? 'black' : 'rgba(0, 0, 0, 0.64)'}
                            >
                                <TranslatePathSegment segment={segment} />
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    );
                })}
        </Breadcrumb>
    );
}
