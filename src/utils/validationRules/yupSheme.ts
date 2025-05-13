import * as Yup from 'yup';
export const loginSchema = Yup.object({
    login: Yup.string().required('Введите логин').max(50, 'Максимальная длина 50 символов'),
    password: Yup.string().required('Введите пароль').max(50, 'Максимальная длина 50 символов'),
});
