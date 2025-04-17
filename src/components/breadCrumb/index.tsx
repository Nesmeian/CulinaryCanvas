import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

import GetCurrentPath from '~/utils/getCurrentPath';
export default function BreadCrumb() {
    const pathSegments = GetCurrentPath();

    const translatePathSegment = (segment: string) => {
        const translations: Record<string, string> = {
            veganCuisine: 'Веганская кухня',
            mainCourses: 'Вторые блюда',
            juiciest: 'Самое сочное',
        };
        return translations[segment] || segment;
    };

    const generatePath = (index: number) => '/' + pathSegments.slice(0, index + 1).join('/');
    return (
        <Breadcrumb
            pt='16px'
            alignSelf='baseline'
            separator={<ChevronRightIcon color='gray.500' />}
            fontSize='sm'
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

                return (
                    <BreadcrumbItem key={index} isCurrentPage={isLast}>
                        <BreadcrumbLink
                            href={!isLast ? generatePath(index) : undefined}
                            color={isLast ? 'black' : 'rgba(0, 0, 0, 0.64)'}
                        >
                            {translatePathSegment(segment)}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
}
