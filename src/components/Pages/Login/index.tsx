import { HStack, Image, Text, VStack } from '@chakra-ui/react';

import { LoginTabs } from '~/components/LoginComponents/LoginTabs';
import { LoginImageText, LoginProtectedText } from '~/constants/LoginTextModals';
import useBreakpoints from '~/themes/chakraBreakPoints';

import LoginImg from '../../../assets/loginImg.png';
import * as logoImg from '../../../assets/loginLogs/index';
import { loginImageText, loginProtectedTextStyles } from './styles';
export const Login = () => {
    const { isTablet } = useBreakpoints();
    const logo = isTablet ? logoImg.LoginLogMob : logoImg.LoginLogDesc;
    return (
        <HStack
            width='100vw'
            height='100vh'
            gap='0'
            background='linear-gradient(208deg, #eaffc7 0%, #29813f 100%);'
            overflowY='scroll'
            sx={{
                '&::-webkit-scrollbar': {
                    width: '0',
                    height: '0',
                    background: 'transparent',
                },
            }}
        >
            <VStack
                width={{ lg: '50%', base: '100%' }}
                height='100%'
                justifyContent='space-between'
            >
                <VStack
                    m={{ lg: 'auto 0', base: '72px 0' }}
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Image src={logo} pb={{ lg: '80px', base: '40px' }} />
                    <LoginTabs />
                </VStack>
                <Text {...loginProtectedTextStyles}>{LoginProtectedText}</Text>
            </VStack>
            <VStack
                position='relative'
                width='51%'
                height='100%'
                display={{ base: 'none', lg: 'block' }}
            >
                <Image src={LoginImg} alt='login img' w='100%' h='100%' />
                <Text {...loginImageText}>{LoginImageText}</Text>
            </VStack>
        </HStack>
    );
};
