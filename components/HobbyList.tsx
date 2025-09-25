import { useHobbyStore } from '@/stores/hobbyStore';
import { useUserStore } from '@/stores/userStore';
import { styles } from '@/styles/styles';
import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function HobbyList() {
    const {hobbies, fetchHobbies, clearHobbies} = useHobbyStore();
    const {user} = useUserStore();

    useEffect(() => {
        fetchHobbies(user?.id!); 
    }, [])


  return (
    <View style={styles.container}>
       <ScrollView style={styles.hobbyList}>
        {hobbies.length === 0 ? (
          <Text>No hobbies available.</Text>
        ) : (
            hobbies.map((hobby) => (
                <View key={hobby.id}>
                    <Text>{hobby.name}</Text>
                </View>

            )))}
       </ScrollView>
           
    </View>
    );
}