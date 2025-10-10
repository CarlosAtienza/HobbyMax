import { useAuthStore } from '@/stores/authStore';
import { styles } from '@/styles/styles';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Button, Text, View } from 'react-native';

export default function settings() {
    const router = useRouter();
    const {token, loadToken, logout} = useAuthStore();
    

    const handleLogout = async () => {
        try {
          logout();
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
