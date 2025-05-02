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
export type ComingRecipeDataProps = {
    data: ComingRecipeData[];
    meta: {
        total: number;
        limit: number;
        page: number;
        totalPages: number;
    };
};
export type ComingRecipeData = {
    authorId: string;
    bookmarks: number;
    likes: number;
    categoriesIds: string[];
    createdAt: string;
    description: string;
    image: string;
    ingredients: {
        title: string;
        count: string;
        measureUnit: string;
    }[];
    nutritionValue: {
        calories: number;
        carbohydrates: number;
        fats: number;
        protein: number;
    };
    portions: number;
    steps: {
        stepNumber: number;
        description: string;
    };
    time: number;
    title: string;
    views: number;
    _id: string;
};
export type SubCategoriesProps = {
    category: string;
    rootCategoryId: string;
    title: string;
    _id: string;
};
