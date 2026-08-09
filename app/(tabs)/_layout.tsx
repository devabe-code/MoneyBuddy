import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { tokens } from '@/src/design-system/tokens';
import { coreRoutes } from '@/src/navigation/routes';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: tokens.color.canvas },
        tabBarActiveTintColor: tokens.color.primary,
        tabBarInactiveTintColor: tokens.color.muted,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: tokens.color.surface,
          borderTopColor: tokens.color.border,
          height: 84,
          paddingBottom: 22,
          paddingTop: 8,
        },
        tabBarHideOnKeyboard: true,
      }}>
      {coreRoutes.map((route) => (
        <Tabs.Screen
          key={route.key}
          name={route.file}
          options={{
            title: route.title,
            tabBarAccessibilityLabel: `${route.title} tab`,
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                accessibilityElementsHidden
                color={color}
                importantForAccessibility="no-hide-descendants"
                name={focused ? route.activeIcon : route.icon}
                size={size}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
