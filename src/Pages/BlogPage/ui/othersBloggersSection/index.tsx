import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Alert, Button, Grid, GridItem, Heading, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Loader } from '~/components/loader';
import { BlogCard } from '~/entries/blog/ui/BlogsCard';
import { useGetBlogsQuery, useToggleSubscriptionMutation } from '~/Pages/BlogsPage/model/slice';
import { BlogGridStyles } from '~/Pages/BlogsPage/ui/BlogsSection/style';

export const OthersBloggersSection = () => {
    const { data, isLoading, isError } = useGetBlogsQuery();
    const blogs = data?.others;
    const [activeId, setActiveId] = useState<string | null>(null);
    const [toggleSubscription, { isLoading: toggleLoading }] = useToggleSubscriptionMutation();
    const toggleSubscriptionHandler = (id: string) => {
        setActiveId(id);
        toggleSubscription(id);
    };
    if (isLoading) {
        return <Loader />;
    }
    if (isError) {
        return <Alert />;
    }
    return (
        <VStack w='100%' mt='64px'>
            <HStack justify='space-between' w='100%'>
                <Heading as='h2' size='h2'>
                    Другие блоги
                </Heading>
                <Button as={Link} to='/blogs' variant='plain' rightIcon={<ArrowForwardIcon />}>
                    Все Авторы
                </Button>
            </HStack>
            <Grid {...BlogGridStyles}>
                {blogs?.map((blog) => (
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
        </VStack>
    );
};
