import * as Yup from 'yup';
export const loginSchema = Yup.object({
    login: Yup.string().required('Введите логин').max(50, 'Максимальная длина 50 символов'),
    password: Yup.string().required('Введите пароль').max(50, 'Максимальная длина 50 символов'),
});
export const verifySchema = Yup.object({
    email: Yup.string()
        .trim()
        .required('Введите e-mail')
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Введите корректный e-mail')
        .max(50, 'Максимальная длина 50 символов'),
});
export const resetPasswordSchema = Yup.object({
    login: Yup.string()
        .trim()
        .required('Введите логин')
        .matches(/^[A-Za-z0-9!@#$&_.+-]+$/, 'Не соответствует формату')
        .min(6, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
    password: Yup.string()
        .required('Введите пароль')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_.+-]+$/, 'Не соответствует формату')
        .min(9, 'Не соответствует формату')
        .max(51, 'Максимальная длина 50 символов'),
    passwordConfirm: Yup.string()
        .required('Введите пароль')
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_.+-]+$/, 'Не соответствует формату')
        .min(9, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
});
export const regSchema = Yup.object({
    firstName: Yup.string()
        .required('Введите имя')
        .trim()
        .matches(/^[А-Я]/u, 'Должно начинаться с кириллицы А-Я')
        .matches(/^[А-Яа-я-]+$/u, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    lastName: Yup.string()
        .required('Введите Фамилию')
        .trim()
        .matches(/^[А-Я]/u, 'Должно начинаться с кириллицы А-Я')
        .matches(/^[А-Яа-я-]+$/u, 'Только кириллица А-Я, и "-"')
        .max(50, 'Максимальная длина 50 символов'),
    email: Yup.string()
        .required('Введите e-mail')
        .trim()
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Введите корректный e-mail')
        .max(50, 'Максимальная длина 50 символов'),
    login: Yup.string()
        .required('Введите логин')
        .trim()
        .matches(/^[A-Za-z0-9!@#$&_.+-]+$/, 'Не соответствует формату')
        .min(6, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
    password: Yup.string()
        .required('Введите пароль')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_.+-]+$/, 'Не соответствует формату')
        .min(9, 'Не соответствует формату')
        .max(51, 'Максимальная длина 50 символов'),
    rePassword: Yup.string()
        .required('Введите пароль')
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9!@#$&_.+-]+$/, 'Не соответствует формату')
        .min(9, 'Не соответствует формату')
        .max(50, 'Максимальная длина 50 символов'),
});
