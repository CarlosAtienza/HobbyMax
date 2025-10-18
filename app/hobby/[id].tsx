import HobbyLogList from '@/components/HobbyLogList';
import { useAuthStore } from '@/stores/authStore';
import { useHobbyLogStore } from '@/stores/hobbyLogStore';
import { useHobbyStore } from '@/stores/hobbyStore';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';


export default function HobbyDetails() {
  
  const {id: idRaw } = useLocalSearchParams();
  const id = Array.isArray(idRaw) ? idRaw[0] : idRaw ?? '';
  const {fetchHobbyLogs} = useHobbyLogStore();
  const { token } = useAuthStore();
  const { hobbies } = useHobbyStore();

  useEffect(() => {
    const hobbyId = Number(id);

    fetchHobbyLogs(hobbyId, token!);

  }, [id, token, hobbies])




  console.log("Hobby Details - ID:", id);



  return (
    <View>
      <HobbyLogList hobbyId={Number(id)} />
    </View>
  )
}