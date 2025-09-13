import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  const router = useRouter();
  const setSignedIn = useAuthStore((state) => state.setSignedIn);


  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      setSignedIn(false);
      router.replace('/(auth)/login'); 
    } catch (error) {
      console.error('Logout failed', error);
      Alert.alert('Error', 'Unable to log out');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Logout button */}
      <Button title="Log Out" onPress={handleLogout} />
    </View>
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
