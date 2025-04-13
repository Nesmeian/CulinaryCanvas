import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

export default function BreadCrumb() {
    return (
        <Breadcrumb separator='-'>
            <BreadcrumbItem>
                <BreadcrumbLink href='#'>Главная</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
    );
}
