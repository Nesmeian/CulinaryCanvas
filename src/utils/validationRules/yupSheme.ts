import * as Yup from 'yup';
const voidIfEmpty = (value: string) => (value === '' ? undefined : value);
export const loginSchema = Yup.object({
    login: Yup.string().trim().required('Введите логин').max(50, 'Максимальная длина 50 символов'),
    password: Yup.string().required('Введите пароль').max(50, 'Максимальная длина 50 символов'),
});
export const verifySchema = Yup.object({
    email: Yup.string()
        .trim()
        .required('Введите e-mail')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Введите корректный e-mail'),
});
export const resetPasswordSchema = Yup.object({
    login: Yup.string()
        .trim()
        .required('Введите логин')
        .min(6, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^[A-Za-z0-9!@#$&_.+-]+$/, 'Не соответствует формату'),
    password: Yup.string()
        .required('Введите пароль')
        .min(9, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_.+-]+$/, 'Не соответствует формату'),
    passwordConfirm: Yup.string()
        .transform(voidIfEmpty)
        .required('Повторите пароль')
        .min(9, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_.+-]+$/, 'Не соответствует формату'),
});
export const regSchema = Yup.object({
    firstName: Yup.string()
        .required('Введите имя')
        .trim()
        .matches(/^[а-яё]/iu, 'Должно начинаться с кириллицы А-Я')
        .matches(/^[а-яё-]+$/iu, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    lastName: Yup.string()
        .required('Введите фамилию')
        .trim()
        .matches(/^[а-яё]/iu, 'Должно начинаться с кириллицы А-Я')
        .matches(/^[а-яё-]+$/iu, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    email: Yup.string()
        .required('Введите e-mail')
        .trim()
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Введите корректный e-mail'),
    login: Yup.string()
        .required('Введите логин')
        .trim()
        .min(6, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^[A-Za-z0-9!@#$&_.+-]+$/, 'Не соответствует формату'),
    password: Yup.string()
        .required('Введите пароль')
        .min(9, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_.+-]+$/, 'Не соответствует формату'),
    rePassword: Yup.string()
        .transform(voidIfEmpty)
        .required('Повторите пароль')
        .min(9, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов')
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_.+-]+$/, 'Не соответствует формату'),
});
