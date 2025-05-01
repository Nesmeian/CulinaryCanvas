export type ComingCategoryData = {
    category: string;
    description: string;
    icon: string;
    _id: string;
    title: string;
    subCategories: {
        category: string;
        rootCategoryId: string;
        title: string;
        _id: string;
    }[];
};
