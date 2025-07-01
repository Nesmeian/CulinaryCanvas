import { Heading } from '@chakra-ui/react';

import Slider from '~/components/slider';
import MainStyled from '~/components/styledComponents/Main';

import { BlogsSection } from './ui/BlogsSection';
import { FavoriteSection } from './ui/FavotiteSection.tsx';

const BlogsPage = () => (
    <MainStyled>
        <Heading mt='32px' as='h1'>
            Кулинарные блоги
        </Heading>
        <FavoriteSection />
        <BlogsSection />
        <Slider />
    </MainStyled>
);
export { BlogsPage };
