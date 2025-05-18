export const handleTrimBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.trim();
};
