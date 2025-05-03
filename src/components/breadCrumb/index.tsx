import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';

import translatePathSegment from '~/utils/BreadCrumbsTranslation';
import GetCurrentPath from '~/utils/getCurrentPath';

export default function BreadCrumb({ isOpen }: { isOpen?: boolean }) {
    const pathSegments = GetCurrentPath();
    const generatePath = (index: number) => '/' + pathSegments.slice(0, index + 1).join('/');
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
                <BreadcrumbLink href='/'>Главная</BreadcrumbLink>
            </BreadcrumbItem>

            {pathSegments.map((segment, index) => {
                const isLast = index === pathSegments.length - 1;
                console.log(segment);
                return (
                    <BreadcrumbItem key={index} isCurrentPage={isLast}>
                        <BreadcrumbLink
                            href={!isLast ? generatePath(index) : undefined}
                            color={isLast ? 'black' : 'rgba(0, 0, 0, 0.64)'}
                        >
                            <Text>{translatePathSegment(segment)}</Text>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
}
