import { useAuthStore } from '@/stores/authStore';
import { useHobbyStore } from '@/stores/hobbyStore';
import { styles } from '@/styles/styles';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import CalendarWeek from '@/components/CalendarWeek';
import { axiosInstance } from '@/lib/axios';
import { useHobbyLogStore } from '@/stores/hobbyLogStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';


export default function UserScreen() {
  const {token, userId} = useAuthStore();
  const { hobbies, setHobbies, fetchHobbiesByUserId } = useHobbyStore();
  const[loading, setLoading] = React.useState(false);
  const { setWeeklyLogs } = useHobbyLogStore();
  const router = useRouter();
  
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
  
  const renderHeader = () => (<>
      <LinearGradient colors={['#7F7FD5', '#86A8E7', '#91EAE4']} style={styles.headerCard}>
        <Text style={styles.header}>Welcome back!</Text>
        <Text style={styles.title}>Keep growing your hobbies 🌱</Text>
      </LinearGradient>
      <CalendarWeek />
    </>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#7F7FD5" />
      </View>
    );
  }
  

  return (
   
      

      <FlatList
        data={hobbies}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No Hobbies Created</Text>}
        contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 10, marginTop: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => {
            if (typeof item.id === 'number') {
              router.push({ 
                pathname: "/hobby/[id]", 
                params: { 
                  hobbyData: JSON.stringify(item),
                  id: item.id.toString(),
                } 
              });
            }
          }}
        >
          <View style={styles.hobbyCard}>
            <Image
              source={
                item.hobbyImage ? 
                { uri: item.hobbyImage } : 
                require('@/assets/images/hobbyImagePlaceHolder.png')
              }
              style={styles.hobbyImageCard}
            />
            <View style={styles.hobbyInfo}>
              <Text style={styles.hobbyName}>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
        )}
      >
      
      
       
      </FlatList>

    
   
  );
}  
  
  