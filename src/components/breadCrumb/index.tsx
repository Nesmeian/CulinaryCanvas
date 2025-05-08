import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link } from 'react-router';

import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import TranslatePathSegment from '~/utils/BreadCrumbsTranslation';
import GetCurrentPath from '~/utils/getCurrentPath';

import { breadCrumbPath } from './breadCrumbPath';

export default function BreadCrumb({
    isOpen,
    onClose,
}: {
    isOpen?: boolean;
    onClose?: () => void;
}) {
    const pathSegments = GetCurrentPath();
    const { data } = useGetFilteredCategories();
    return (
        <Breadcrumb
            pt='16px'
            alignSelf='baseline'
            separator={<ChevronRightIcon color='gray.500' />}
            fontSize='md'
            data-test-id={isOpen ? '' : 'breadcrumbs'}
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

            {pathSegments.map((segment, index) => {
                const { routeTo, isLast } = breadCrumbPath({
                    segment: segment,
                    index: index,
                    data: data,
                    pathSegments: pathSegments,
                });
                return (
                    <BreadcrumbItem key={index} isCurrentPage={isLast}>
                        <BreadcrumbLink
                            as={Link}
                            to={routeTo}
                            color={isLast ? 'black' : 'rgba(0, 0, 0, 0.64)'}
                            onClick={onClose}
                        >
                            <TranslatePathSegment segment={segment} />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
}
