export const tabStyles = {
    fontSize: { lg: '18px', base: '16px' },
    color: '#134b00',
    fontWeight: '500',
    lineHeight: '28px',
    letterSpacing: '0.5px',
    w: { lg: '163px', base: '151px' },
    _selected: {
        color: '#207e00',
        borderBottomColor: '#207e00',
    },
};
export const LoginFormLabel = {
    mb: '4px',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.5px',
};
export const LoginInputStyles = {
    h: '48px',
    background: 'white',
    borderColor: '#d7ff94',
    color: '#134B00',
    fontSize: '18px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    _placeholder: {
        color: '#134b00',
    },
};
export const LoginModalHeader = {
    as: 'h2',
    size: 'h2',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: '0.5px',
} as const;
export const LoginDescriptionStyles = { fontSize: '16px', textAlign: 'center' } as const;
export const LoginCheckTextStyles = { fontSize: '12px', color: 'rgba(0, 0, 0, 0.48)' } as const;
export const helperTextStyles = {
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.64)',
    fontSize: '12px',
};
export const loginProtectedTextStyles = {
    fontWeight: 600,
    fontSize: '12px',
    p: { md: '30px', base: '26px' },
    width: '100%',
};
export const loginImageText = {
    fontSize: '12px',
    fontWeight: 600,
    position: 'absolute',
    bottom: '0',
    right: '0',
    p: '30px',
} as const;
