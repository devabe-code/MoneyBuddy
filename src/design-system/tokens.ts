import type { Theme } from '@react-navigation/native';

export const tokens = {
  color: {
    canvas: '#F4F6F2',
    surface: '#FFFFFF',
    ink: '#17251E',
    muted: '#627068',
    border: '#E3E9E4',
    borderStrong: '#CBD6CE',
    primary: '#1E6B4E',
    primaryDark: '#164E3A',
    primarySoft: '#E3F1E9',
    accentSurface: '#EDF5F0',
    onPrimary: '#FFFFFF',
    warning: '#D69138',
    warningInk: '#73501D',
    warningSoft: '#F8EACF',
    danger: '#A33D3D',
    dangerSoft: '#F8E6E4',
    info: '#356A85',
    infoSoft: '#E5F0F5',
  },
  radius: { sm: 10, md: 16, lg: 24 },
  space: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
} as const;

export const navigationTheme: Theme = {
  dark: false,
  colors: {
    primary: tokens.color.primary,
    background: tokens.color.canvas,
    card: tokens.color.surface,
    text: tokens.color.ink,
    border: tokens.color.border,
    notification: tokens.color.warning,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '800' },
  },
};
