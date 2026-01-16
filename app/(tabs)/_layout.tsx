import { COLORS } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {
    
  return (
     <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}
                >
            <Tabs.Screen name="index" options={{ 
                tabBarIcon: ({size, color}) => <Ionicons name="home" size={size} color={COLORS.primary} />,
                }} />

            <Tabs.Screen name="create" options={{ 
                tabBarIcon: ({size, color}) => <Ionicons name="add-circle" size={size} color={COLORS.primary} />,
                }} />
            <Tabs.Screen name="profile" options={{ 
                tabBarIcon: ({size, color}) => <Ionicons name="person" size={size} color={COLORS.primary} />,
                }} />
            
            <Tabs.Screen name="settings" options={{ 
                tabBarIcon: ({size, color}) => <Ionicons name="settings" size={size} color={COLORS.primary} />,
                }} />
        </Tabs>
  )
}