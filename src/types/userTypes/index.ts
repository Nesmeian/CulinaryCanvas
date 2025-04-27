export interface UserProps {
    userData: UserData;
    isLogo?: boolean;
}
export interface UserData {
    img: string;
    user: string;
    email: string;
}
export type BurgerState = {
    isOpen: boolean;
};
export type FilterState = {
    isOpen: boolean;
};
export type AllergensState = {
    isActive: boolean;
    allergens: string[];
};
export type SearchState = {
    allowSearch: boolean;
    search: string;
};
