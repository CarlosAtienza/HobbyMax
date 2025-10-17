import HobbyList from '@/components/HobbyList';
import { useAuthStore } from '@/stores/authStore';
import { useHobbyStore } from '@/stores/hobbyStore';
import { styles } from '@/styles/styles';
import React, { useEffect } from 'react';
import { View, } from 'react-native';

export default function UserScreen() {
  const {token, userId} = useAuthStore();

  //console.log("UserScreen - userId:", userId, "token:", token);

  const { hobbies, setHobbies, fetchHobbiesByUserId } = useHobbyStore();

  const[loading, setLoading] = React.useState(false);

  useEffect(() => {
  const loadHobbies = async () => {
    if (userId && token) {
      console.log("Fetching hobbies for userId:", userId);
      setLoading(true);
      try {
        await fetchHobbiesByUserId(userId, token);
      } catch (err) {
        console.error("Error fetching hobbies in UserScreen:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  loadHobbies();
}, [userId, token]);

  



  return (
    <View style={styles.container}>
      <HobbyList hobbies={hobbies} loading={loading} />
    </View>
   
  )
}