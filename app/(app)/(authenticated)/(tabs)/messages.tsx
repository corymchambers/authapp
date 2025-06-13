import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function messages(props): ReactElement {
  return (
    <View style={styles.container}>
      <Text>messages</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
