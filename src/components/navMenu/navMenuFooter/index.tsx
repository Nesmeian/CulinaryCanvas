import { Button, Image, Text, VStack } from '@chakra-ui/react';

import exitImg from '../../../assets/exitIcon.svg';
export default function NavMenuFooter() {
    return (
        <VStack alignItems='flex-start' className='navMenu__footer' gap='15px' marginBottom='8px'>
            <Text className='navMenu__version' variant='navMenuFooter'>
                Версия программы 03.25
            </Text>
            <Text className='navMenu__copyright' variant='navMenuFooter'>
                Все права защищены, <br /> ученический файл,
                <br /> ©Клевер Технолоджи, 2025
            </Text>
            <Button variant='plain' className='navMenu__logout' padding='0 0 22px 0'>
                <Image src={exitImg} alt='exit svg' /> <Text variant='navMenuFooter'>Выйти</Text>
            </Button>
        </VStack>
    );
}
