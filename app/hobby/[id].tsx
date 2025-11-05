import HobbyLogList from '@/components/HobbyLogList';
import { useAuthStore } from '@/stores/authStore';
import { useHobbyLogStore } from '@/stores/hobbyLogStore';
import { useHobbyStore } from '@/stores/hobbyStore';
import { styles } from '@/styles/styles';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { Image, ScrollView, View } from 'react-native';


export default function HobbyDetails() {
  
  const {id: idRaw } = useLocalSearchParams();
  const {hobbyData} = useLocalSearchParams();
  const id = Array.isArray(idRaw) ? idRaw[0] : idRaw ?? '';
  const {fetchHobbyLogs} = useHobbyLogStore();
  const { token } = useAuthStore();
  const { hobbies } = useHobbyStore();

  useEffect(() => {
    const hobbyId = Number(id);

    fetchHobbyLogs(hobbyId, token!);

  }, [id, token, hobbies]);

  const hobby = useMemo(() => {
    if (hobbyData){
      const dataString = Array.isArray(hobbyData) ? hobbyData[0] : hobbyData;
      return JSON.parse(dataString);
    }
    else {
      return hobbies.find(hobby => hobby.id === Number(id));
    }
  }, [hobbies, id]);




 



  return (
    <ScrollView style={styles.container}>
      <View style={styles.hobbyHeaderSection}>
        <Image
          source={
                  hobby.hobbyImage ? 
                  { uri: hobby.hobbyImage } : 
                  require('@/assets/images/hobbyImagePlaceHolder.png')
                }
        >

        </Image>
          
      </View>
      <HobbyLogList hobbyId={Number(id)} />
    </ScrollView>
  )
}