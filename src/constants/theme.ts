export const colors = {
    background: '#F7F8F5',
    surface: '#FFFFFF',

    text: '#172B21',
    textSecondary: '#66736B',

    primary: '#285B43',
    onPrimary: '#FFFFFF',
    primaryMuted: '#E8F0EA',

    border: '#DDE5DF',

    income: '#26734D',
    expense: '#B54738',
}

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
} as const;

export const typography = {
    title: {
        fontSize: 32,
        lineHeight: 40,
        fontWeight: '700',
    },
    heading: {
        fontSize: 22,
        lineHeight: 30,
        fontWeight: '600',
    },
    body: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
    },
    caption: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '400',
    },
    amount: {
        fontSize: 40,
        lineHeight: 48,
        fontWeight: '700',
    }
} as const;

export const radii ={
    sm: 8,
    md: 12,
    lg: 20,
} as const;