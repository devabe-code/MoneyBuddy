import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { navigationTheme, tokens } from '@/src/design-system/tokens';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ThemeProvider value={navigationTheme}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: tokens.color.canvas },
          headerBackTitle: 'Back',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: tokens.color.canvas },
          headerTintColor: tokens.color.ink,
          headerTitleStyle: { fontWeight: '700' },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ title: 'How MoneyBuddy works' }} />
        <Stack.Screen name="+not-found" options={{ title: 'Page not found' }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
