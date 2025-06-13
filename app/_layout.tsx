import { AuthProvider } from '@/context/AuthContext';
import { Slot } from 'expo-router';
import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';

export default function RootLayout(props): ReactElement {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
