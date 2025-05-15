export type RegFields = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    rePassword: string;
};
export type LoginFields = {
    login: string;
    password: string;
};
export type VerifyField = {
    email: string;
};
export type ResetPasswordType = {
    login: string;
    password: string;
    passwordConfirm: string;
};
export type verifyCode = {
    otpToken: string;
};
