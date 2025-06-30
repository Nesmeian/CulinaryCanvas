export type Note = {
    date: string;
    text: string;
    _id: string;
};

export type Blogger = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    photoLink: string;
    notes: Note[];
    newRecipesCount: number;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
};
export type BloggerParams = {
    favorites: Blogger[];
    others: Blogger[];
};
export type GetBlogsArgs = {
    limit?: number | string;
};
export type AllAuthorBtnParams = {
    isFetching: boolean;
    limit: number | string;
    setLimit: React.Dispatch<React.SetStateAction<string | number>>;
};
