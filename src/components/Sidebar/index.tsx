import './style.css';

import { VStack } from '@chakra-ui/react';

import NotificationList from '../Notification';
import WriteRecipeButton from '../WriteRecipe';

export default function SideBar() {
    return (
        <VStack className='sidebar' justify='space-between' alignItems='center'>
            <NotificationList direction='horizontal' />
            <WriteRecipeButton />
        </VStack>
    );
}
