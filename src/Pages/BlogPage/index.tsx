import { useState } from 'react';
import { useParams } from 'react-router-dom';

import BigCardsList from '~/components/bigCardsList';
import { Loader } from '~/components/loader';
import MainStyled from '~/components/styledComponents/Main';

import { useGetRecipesBlogByIdQuery } from './model/slice';
import { BlogUserCard } from './ui/blogsCard';
import { NotesSection } from './ui/notesSection';
import { OthersBloggersSection } from './ui/othersBloggersSection';

export const BlogPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetRecipesBlogByIdQuery(id!);
    const [visibleCount, setVisibleCount] = useState(8);
    const totalCount = data?.recipes.length;
    const recipes = data?.recipes.slice(0, visibleCount) ?? [];
    if (isLoading) {
        return <Loader />;
    }
    return (
        <MainStyled gap='24px'>
            <BlogUserCard />
            {recipes && (
                <BigCardsList
                    data={recipes}
                    hasMore={visibleCount < totalCount!}
                    loadMore={() => setVisibleCount((c) => c + 8)}
                />
            )}
            <NotesSection />
            <OthersBloggersSection />
        </MainStyled>
    );
};
