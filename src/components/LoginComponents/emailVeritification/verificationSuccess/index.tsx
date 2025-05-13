import { Center, Heading, Image, Text, useDisclosure, VStack } from '@chakra-ui/react';

import * as loginImgs from '../../../../assets/LoginImg/index';
import closeBtn from '../../../../assets/verificationCloseImg.svg';
export const EmailVerificationSuccess = ({ email }: { email: string }) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    if (!isOpen) return null;
    return (
        <Center
            h='100vh'
            w='100vw'
            bg='rgba(0, 0, 0, 0.7)'
            position='fixed'
            top={0}
            left={0}
            zIndex={9999}
        >
            <VStack
                w='400px'
                h='550px'
                background='white'
                borderRadius='16px'
                p='32px'
                gap='24px'
                position='relative'
            >
                {' '}
                <Image src={loginImgs.regVerification} alt='registration image verification' />
                <Heading
                    as='h2'
                    size='h2'
                    fontSize='24px'
                    lineHeight='32px'
                    fontWeight='700'
                    textAlign='center'
                    letterSpacing='0.5px'
                >
                    Остался последний шаг. Нужно верифицировать ваш e-mail
                </Heading>
                <Text fontSize='16px' textAlign='center' px='50px'>
                    Мы отправили вам на почту&nbsp;
                    <Text as='span' fontWeight='600'>
                        {email}
                    </Text>
                    &nbsp;ссылку для верификации.
                </Text>
                <VStack gap={0}>
                    <Text fontSize='12px'>Не пришло письмо? Проверьте папку Спам.</Text>
                    <Text fontSize='12px'>
                        По другим вопросам свяжитесь с
                        <Text fontSize='12px' as='span' textDecoration='underline'>
                            поддержкой
                        </Text>
                    </Text>
                </VStack>
                <Image
                    position='absolute'
                    right='24px'
                    src={closeBtn}
                    alt='close img'
                    onClick={onClose}
                />
            </VStack>
        </Center>
    );
};
