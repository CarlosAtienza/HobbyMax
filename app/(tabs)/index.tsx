import HobbyList from '@/components/HobbyList';
import { useAuthStore } from '@/stores/authStore';
import { useHobbyStore } from '@/stores/hobbyStore';
import { styles } from '@/styles/styles';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Text,
  View
} from 'react-native';

import CalendarWeek from '@/components/CalendarWeek';
import { axiosInstance } from '@/lib/axios';
import { useHobbyLogStore } from '@/stores/hobbyLogStore';
import { LinearGradient } from 'expo-linear-gradient';


export default function UserScreen() {
  const {token, userId} = useAuthStore();
  const { hobbies, setHobbies, fetchHobbiesByUserId } = useHobbyStore();
  const[loading, setLoading] = React.useState(false);
  const { setWeeklyLogs } = useHobbyLogStore();

  useEffect(() => {
    const fetchWeeklyLogs = async () => {
      if (!userId || !token) return;
      const response = await axiosInstance.get(`/hobby-logs/${userId}/logs/week`, {
        headers: {Authorization: `Bearer ${token}`}
      });
      setWeeklyLogs(response.data)
    }
    fetchWeeklyLogs();
  }, [userId, token])
  

  
  

  return (
     <View style={[styles.container, {paddingBottom: 100}]}>
      {/* HEADER */}
      <LinearGradient colors={['#7F7FD5', '#86A8E7', '#91EAE4']} style={styles.headerCard}>
        <Text style={styles.header}>Welcome back!</Text>
        <Text style={styles.title}>Keep growing your hobbies 🌱</Text>
      </LinearGradient>
      <CalendarWeek />

      {/* HOBBY LIST */}
      {loading ? <ActivityIndicator size="large" color="#7F7FD5" /> : <HobbyList />}

    
    </View>
  );
}  
  
  