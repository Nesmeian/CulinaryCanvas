import { Blogger } from '~/Pages/BlogsPage/model/types';

export type BlogCardProps = {
    blog: Blogger;
    isLoading?: boolean;
    activeId: string | null;
    onToggleSubscription: (id: string) => void;
};
