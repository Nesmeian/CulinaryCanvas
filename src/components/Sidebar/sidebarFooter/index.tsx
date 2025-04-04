import { Button, Image, Text, VStack } from '@chakra-ui/react';

import exitImg from '../../../assets/exitIcon.svg';
export default function SidebarFooter() {
    return (
        <VStack alignItems='flex-start' className='sidebar__footer' gap='15px' marginBottom='8px'>
            <Text className='sidebar__version' variant='sidebarFooter'>
                Версия программы 03.25
            </Text>
            <Text className='sidebar__copyright' variant='sidebarFooter'>
                Все права защищены, <br /> ученический файл,
                <br /> ©Клевер Технолоджи, 2025
            </Text>
            <Button variant='plain' className='sidebar__logout' padding='0 0 22px 0'>
                <Image src={exitImg} alt='exit svg' /> <Text variant='sidebarFooter'>Выйти</Text>
            </Button>
        </VStack>
    );
}
