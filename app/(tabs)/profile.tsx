import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useHobbyStore } from '@/stores/hobbyStore';

export default function Profile() {
  const router = useRouter();
  const setSignedIn = useAuthStore((state) => state.setSignedIn);
  const { hobbies, fetchHobbies, clearHobbies } = useHobbyStore();

  



  return (
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
