import { AuthProvider } from '@/context/AuthContext';
import { COLORS } from '@/utils/colors';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: '#fff',
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="prvacy"
          options={{ presentation: 'modal', title: 'Privacy Policy' }}
        />
        <Stack.Screen
          name="register"
          options={{ title: 'Create Account', headerBackTitle: 'Login' }}
        />
      </Stack>
    </AuthProvider>
  );
}
