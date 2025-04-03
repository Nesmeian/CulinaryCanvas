import './style.css';

import { VStack } from '@chakra-ui/react';

import WriteRecipeButton from '../Buttons/WriteRecipe';
import NotificationList from '../Notification';
export default function Aside() {
    return (
        <VStack className='aside' justify='space-between' alignItems='center'>
            <NotificationList direction='horizontal' />
            <WriteRecipeButton />
        </VStack>
    );
}
