export const trimInput = (e: React.FormEvent<HTMLInputElement>) => {
    const tgt = e.currentTarget as HTMLInputElement;
    tgt.value = tgt.value.replace(/^\s+|\s+$/g, '');
};
