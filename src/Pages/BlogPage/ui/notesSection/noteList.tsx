import { Grid, GridItem, Text, VStack } from '@chakra-ui/react';

import { Note } from '~/Pages/BlogsPage/model/types';
import { formatDateRU } from '~/shared/lib';

import { noteSectionItemStl } from './styles';

export const NotesList = ({ notes }: { notes: Note[] }) => (
    <Grid templateColumns='repeat(3, 1fr)' gap='16px'>
        {notes.map(({ date, text, _id }) => (
            <GridItem key={_id}>
                <VStack {...noteSectionItemStl} h='100%'>
                    <Text color='#2db100' fontSize='14px'>
                        {formatDateRU(date)}
                    </Text>
                    <Text fontSize='14px'>{text}</Text>
                </VStack>
            </GridItem>
        ))}
    </Grid>
);
