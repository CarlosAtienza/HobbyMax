import HobbyList from '@/components/HobbyList';
import { useAuthStore } from '@/stores/authStore';
import { useHobbyStore } from '@/stores/hobbyStore';
import { styles } from '@/styles/styles';
import React from 'react';
import { View, } from 'react-native';

export default function UserScreen() {
  const {token, userId} = useAuthStore();

  //console.log("UserScreen - userId:", userId, "token:", token);

  const { hobbies, setHobbies, fetchHobbiesByUserId } = useHobbyStore();

  const[loading, setLoading] = React.useState(false);

  

  
  console.log("UserSCreen - hobbies:", hobbies);


  return (
    
    <View style={styles.container}>
      <HobbyList />
    </View>
   
  )
}