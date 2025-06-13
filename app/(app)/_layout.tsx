import { useAuth } from '@/context/AuthContext';
import { COLORS } from '@/utils/colors';
import { router, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const { token, initialized } = useAuth();
  const segments = useSegments();
  const route = useRouter();

  useEffect(() => {
    if (!initialized) return;
    console.log({ segments });

    const inAuthGroup = segments[1] === '(authenticated)';

    if (token && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/messages');
    } else if (!token && inAuthGroup) {
      router.replace('/');
    }
  }, [initialized, token]);
  return (
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
        name="privacy"
        options={{ presentation: 'modal', title: 'Privacy Policy' }}
      />
      <Stack.Screen
        name="register"
        options={{ title: 'Create Account', headerBackTitle: 'Login' }}
      />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  );
}
