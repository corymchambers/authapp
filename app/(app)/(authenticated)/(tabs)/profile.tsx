import { useAuth } from '@/context/AuthContext';
import React, { ReactElement } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function profile(props): ReactElement {
  const { onLogout } = useAuth();
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
