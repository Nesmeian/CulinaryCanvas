import { HStack, Image, VStack } from '@chakra-ui/react';

import { LoginTabs } from '~/components/LoginComponents/LoginTabs';
import useBreakpoints from '~/themes/chakraBreakPoints';

import LoginImg from '../../../assets/loginImg.png';
import * as logoImg from '../../../assets/loginLogs/index';
export const Login = () => {
    const { isTablet } = useBreakpoints();
    const logo = isTablet ? logoImg.LoginLogMob : logoImg.LoginLogDesc;
    return (
        <HStack width='100vw' height='100vh' gap='0'>
            <VStack
                width={{ lg: '50%', base: '100%' }}
                height='100%'
                background='linear-gradient(208deg, #eaffc7 0%, #29813f 100%);'
                alignItems='center'
            >
                <VStack mt={{ lg: '170px', md: '140px', base: '70px' }}>
                    <Image src={logo} pb={{ lg: '80px', base: '56px' }} />
                    <LoginTabs />
                </VStack>
            </VStack>
            <VStack width='51%' height='100%' display={{ base: 'none', lg: 'block' }}>
                <Image src={LoginImg} alt='login img' w='100%' h='100%' />
            </VStack>
        </HStack>
    );
};
