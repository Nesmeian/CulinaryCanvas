export const newRecipeHeadingStyle = {
    fontSize: '16px',
    lineHeight: '16px',
    fontWeight: '600',
    letterSpacing: '0.5',
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
export const menuText = {
    whiteSpace: 'nowrap',
    flex: '1',
    textAlign: 'left',
    mr: 2,
    fontSize: '16px',
    fontWeight: '400',
} as const;
export const IngredientsDescriptionStyles = {
    fontWeight: '700',
    fontSize: '12px',
    color: '#2db100',
    letterSpacing: '0',
};
export const chooseMeasureMenuStyle = {
    w: { md: '215px', base: '192px' },
    height: '40px',
    textAlign: 'left',
    background: 'white',
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.64)',
    _active: {
        background: 'white',
        border: '1px solid #c4ff61',
        '& svg': {
            transform: 'rotate(180deg)',
        },
    },
    _hover: { background: 'white' },
} as const;
