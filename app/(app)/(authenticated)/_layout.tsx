import { Stack } from 'expo-router';
import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';

export default function Layout(props): ReactElement {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {},
});
