import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import { BlogCard } from '~/entries/blog/ui/BlogsCard';

import { useGetBlogsQuery, useToggleSubscriptionMutation } from '../../model/slice';
import { AllAuthorsBtn } from './AllAuthorsBtn';
import { BlogGridStyles, BlogWrapperStyles } from './style';
export const BlogsSection = () => {
    const navigate = useNavigate();
    const [limit, setLimit] = useState<number | 'all'>(9);
    const [activeId, setActiveId] = useState<string | null>(null);
    const { data, isLoading, isError, isFetching } = useGetBlogsQuery({ limit: limit });
    const [toggleSubscription, { isLoading: toggleLoading }] = useToggleSubscriptionMutation();
    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);
    if (isLoading) {
        return <Loader />;
    }
    if (isError) {
        return <Alert />;
    }

    const toggleSubscriptionHandler = (id: string) => {
        setActiveId(id);
        toggleSubscription(id);
    };
    return (
        <VStack {...BlogWrapperStyles}>
            {data && data.others.length > 0 && (
                <Grid {...BlogGridStyles}>
                    {data.others.map((blog) => (
                        <GridItem key={blog._id}>
                            <BlogCard
                                blog={blog}
                                isLoading={toggleLoading}
                                activeId={activeId}
                                onToggleSubscription={toggleSubscriptionHandler}
                            />
                        </GridItem>
                    ))}
                </Grid>
            )}
            <AllAuthorsBtn
                limit={limit}
                setLimit={(value) => setLimit(value)}
                isFetching={isFetching}
            />
        </VStack>
    );
};
