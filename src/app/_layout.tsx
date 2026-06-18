import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemeModeProvider, useMotoTrackTheme } from '@/contexts/theme-mode-context';
import { AuthProvider } from '@/contexts/auth-context';
import { MotorcycleProvider } from '@/contexts/motorcycle-context';

export default function RootLayout() {
  return (
    <ThemeModeProvider>
      <AuthProvider>
        <MotorcycleProvider>
          <RootLayoutNav />
        </MotorcycleProvider>
      </AuthProvider>
    </ThemeModeProvider>
  );
}

function RootLayoutNav() {
  const { theme } = useMotoTrackTheme();

  return (
    <ThemeProvider value={theme.mode === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={theme.statusBarStyle} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            flex: 1,
            backgroundColor: theme.background,
          },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="gasolina" />
        <Stack.Screen name="servicio" />
        <Stack.Screen name="refaccion" />
        <Stack.Screen name="moto-setup" />
      </Stack>
    </ThemeProvider>
  );
}
