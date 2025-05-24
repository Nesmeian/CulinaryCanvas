export const newRecipeHeadingStyle = {
    fontSize: '16px',
    lineHeight: '16px',
    fontWeight: '600',
};

export const hiddenStyles = {
    position: 'absolute' as const,
    visibility: 'hidden' as const,
    top: 0,
    left: 0,
    zIndex: -1,
};

export const tagStyles = {
    fontSize: '12px',
    px: '8px',
    py: '2px',
    color: '#2db100',
    border: '1px solid #2db100',
    borderRadius: '6px',
    whiteSpace: 'nowrap' as const,
};
