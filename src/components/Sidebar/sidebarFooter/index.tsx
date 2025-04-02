import { Button, Heading, Image, VStack } from '@chakra-ui/react';

import exitImg from '../../../assets/exitIcon.svg';
export default function SidebarFooter() {
    return (
        <VStack alignItems='flex-start' className='sidebar__footer' gap='14.4px'>
            <Heading as='p' className='sidebar__version'>
                Версия программы 03.25
            </Heading>
            <Heading as='p' className='sidebar__copyright'>
                Все права защищены, <br /> ученический файл,
                <br /> ©Клевер Технолоджи, 2025
            </Heading>
            <Button variant='subtle' className='sidebar__logout'>
                <Image src={exitImg} alt='exit svg' /> Выйти
            </Button>
        </VStack>
    );
}
