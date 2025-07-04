import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetRecipesBlogByIdQuery } from '../../model/slice';
import { NotesList } from './noteList';
import { noteSectionWrapperStl } from './styles';

export const NotesSection = () => {
    const nativeCount = 3;
    const { id } = useParams();
    const { data } = useGetRecipesBlogByIdQuery(id!);
    const [visibleCount, setVisibleCount] = useState(nativeCount);
    const notes = data?.notes.slice(0, visibleCount) ?? [];
    const [expanded, setExpanded] = useState(false);
    if (!data) return null;
    const isNoNeedToLoadMore = nativeCount <= data?.notes.length;
    const loadMoreHandle = () => {
        if (!expanded) {
            setVisibleCount(data?.notes.length ?? 0);
        } else {
            setVisibleCount(3);
        }
        setExpanded(!expanded);
    };
    if (!notes?.length) {
        return null;
    }
    return (
        <VStack {...noteSectionWrapperStl}>
            <Heading as='h3' size='h3' alignSelf='start'>
                Заметки{' '}
                <Text as='span' fontSize='36' color=' rgba(0, 0, 0, 0.48)'>
                    ({data?.notes.length})
                </Text>
            </Heading>
            <NotesList notes={notes} />

            {isNoNeedToLoadMore && (
                <Button variant='plain' onClick={loadMoreHandle}>
                    {expanded ? 'Показать больше' : 'Свернуть'}
                </Button>
            )}
        </VStack>
    );
};
