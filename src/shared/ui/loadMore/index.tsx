import GreenButton from '~/components/styledComponents/greenButton';

export const LoadMoreBtn = ({
    loadMore,
}: {
    loadMore: (value: React.SetStateAction<number>) => void;
}) => <GreenButton onClick={loadMore} text='Загрузить еще' />;
