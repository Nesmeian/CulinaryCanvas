import './style.css';

import { VStack } from '@chakra-ui/react';

import NotificationList from '../Notification';
import WriteRecipeButton from '../WriteRecipe';

export default function Aside() {
    return (
        <VStack className='aside' justify='space-between' alignItems='center'>
            <NotificationList direction='horizontal' />
            <WriteRecipeButton />
        </VStack>
    );
}
