import { useParams } from 'react-router-dom';

import BigCardsList from '~/components/bigCardsList';
import { Loader } from '~/components/loader';
import MainStyled from '~/components/styledComponents/Main';

import { useGetRecipesBlogByIdQuery } from './model/slice';
import { BlogUserCard } from './ui/blogsCard';

export const BlogPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetRecipesBlogByIdQuery(id!);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <MainStyled>
            <BlogUserCard />
            <BigCardsList data={data!.recipes} />
        </MainStyled>
    );
};
