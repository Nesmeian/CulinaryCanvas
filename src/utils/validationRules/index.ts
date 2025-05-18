export const authPasswordValidation = {
    required: 'Введите Пароль',
    maxLength: { value: 50, message: 'Максимальная длина 50 символов' },
};
export const authLoginValidation = {
    required: 'Введите Логин',
    maxLength: { value: 50, message: 'Максимальная длина 50 символов' },
};
export const regNameValidation = {
    required: 'Введите имя',
    pattern: {
        value: /^[А-Я].*$/,
        message: 'Должно начинаться с кириллицы А-Я',
    },
    validate: {
        cyrillicAndHyphen: (v: string) =>
            /^[А-Я][А-Я-]$/u.test(v.trim()) || 'Только кириллица А-Я, и "-"',
    },
    maxLength: { value: 50, message: 'Максимальная длина 50 символов' },
};
