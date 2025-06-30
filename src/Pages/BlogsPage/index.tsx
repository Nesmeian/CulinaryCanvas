import { Heading } from '@chakra-ui/react';

import Slider from '~/components/slider';
import MainStyled from '~/components/styledComponents/Main';

import { BlogsSection } from './ui/BlogsSection';
import { FavoriteBlogsSection } from './ui/FavoriteBlogsSection';

const BlogsPage = () => {
    console.log(1);
    const chosenBlogs = false;
    return (
        <MainStyled>
            <Heading mt='32px' as='h1'>
                Кулинарные блоги
            </Heading>
            {chosenBlogs && <FavoriteBlogsSection />}
            <BlogsSection />
            <Slider />
        </MainStyled>
    );
};
export { BlogsPage };
