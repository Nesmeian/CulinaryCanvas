import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetRecipesBlogByIdQuery } from '../../model/slice';
import { NotesList } from './noteList';
import { noteSectionWrapperStl } from './styles';

export const NotesSection = () => {
    const { id } = useParams();
    const { data } = useGetRecipesBlogByIdQuery(id!);
    const [visibleCount, setVisibleCount] = useState(3);
    const notes = data?.notes.slice(0, visibleCount) ?? [];
    const totalCount = data?.recipes.length;
    const showLoadMoreBtn = visibleCount < totalCount!;
    const loadMoreHandle = () => {
        setVisibleCount((prev) => prev + 3);
    };
    if (!notes?.length) {
        return null;
    }
    return (
        <VStack {...noteSectionWrapperStl}>
            <Heading as='h3' size='h3' alignSelf='start'>
                Заметки{' '}
                <Text as='span' fontSize='36' color=' rgba(0, 0, 0, 0.48)'>
                    ({notes?.length})
                </Text>
            </Heading>
            <NotesList notes={notes} />
            {showLoadMoreBtn && (
                <Button variant='plain' onClick={loadMoreHandle}>
                    Показать больше
                </Button>
            )}
        </VStack>
    );
};
