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
export interface FilterData {
    allergens: string[];
    sideDish: string[];
    meat: string[];
    category: string[];
    auth: string[];
}
export type FilterState = {
    isOpen: boolean;
    filterData: FilterData;
};
export type AllergensState = {
    isActive: boolean;
    allergens: string[];
};
export type CategoryState = {
    subCategoryId: string;
    categoryId: string;
    category: string;
    subCategory: string;
};
export type SearchState = {
    allowSearch: boolean;
    search: string;
    findElems: 'common' | 'find' | 'not found';
};
