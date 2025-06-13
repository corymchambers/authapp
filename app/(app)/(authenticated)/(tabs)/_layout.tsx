import { COLORS } from '@/utils/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';

export default function Layout(props): ReactElement {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#666',
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: '#fff',
      }}
    >
      <Tabs.Screen
        name="messages"
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="message" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {},
});
