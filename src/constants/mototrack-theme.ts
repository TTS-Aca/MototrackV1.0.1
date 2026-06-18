export type ThemeMode = 'light' | 'dark';

export type MotoTrackTheme = {
  mode: ThemeMode;
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  textMuted: string;
  navBackground: string;
  inverseBackground: string;
  inverseText: string;
  inverseTextMuted: string;
  diagramColor: string;
  labelBackground: string;
  featureAccent: string;
  orangeBadgeBg: string;
  orangeBadgeBorder: string;
  orangeBadgeText: string;
  statusBarStyle: 'light' | 'dark';
  orange500: string;
  orange400: string;
  green400: string;
  white: string;
};

const shared = {
  orange500: '#f97316',
  orange400: '#fb923c',
  green400: '#4ade80',
  white: '#ffffff',
} as const;

export const mototrackThemes: Record<ThemeMode, MotoTrackTheme> = {
  dark: {
    mode: 'dark',
    background: '#09090b',
    surface: '#18181b',
    surfaceMuted: '#27272a',
    border: 'rgba(39, 39, 42, 0.6)',
    text: '#ffffff',
    textSecondary: '#a1a1aa',
    textTertiary: '#71717a',
    textMuted: '#52525b',
    navBackground: 'rgba(9, 9, 11, 0.96)',
    inverseBackground: '#ffffff',
    inverseText: '#09090b',
    inverseTextMuted: 'rgba(9, 9, 11, 0.5)',
    diagramColor: 'rgba(255, 255, 255, 0.6)',
    labelBackground: '#18181b',
    featureAccent: '#ffffff',
    orangeBadgeBg: 'rgba(249, 115, 22, 0.15)',
    orangeBadgeBorder: 'rgba(249, 115, 22, 0.35)',
    orangeBadgeText: '#fb923c',
    statusBarStyle: 'light',
    ...shared,
  },
  light: {
    mode: 'light',
    background: '#f4f4f5',
    surface: '#ffffff',
    surfaceMuted: '#e4e4e7',
    border: '#e4e4e7',
    text: '#09090b',
    textSecondary: '#52525b',
    textTertiary: '#71717a',
    textMuted: '#a1a1aa',
    navBackground: 'rgba(255, 255, 255, 0.96)',
    inverseBackground: '#09090b',
    inverseText: '#ffffff',
    inverseTextMuted: 'rgba(255, 255, 255, 0.5)',
    diagramColor: 'rgba(9, 9, 11, 0.6)',
    labelBackground: '#ffffff',
    featureAccent: '#09090b',
    orangeBadgeBg: '#fff7ed',
    orangeBadgeBorder: '#fed7aa',
    orangeBadgeText: '#c2410c',
    statusBarStyle: 'dark',
    ...shared,
  },
};
