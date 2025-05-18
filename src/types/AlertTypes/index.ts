export type ErrorMessageMap = Record<number, ErrorMessageType>;
export type ErrorMessageType = {
    title: string;
    description: string;
};
export type AlertTypes = {
    errorMessage?: ErrorMessageMap;
    errorStatus?: number;
    errorData?: string;
    isSuccessCheck?: boolean;
    successMessage?: string;
};
