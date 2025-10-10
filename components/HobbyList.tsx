import { useHobbyStore } from '@/stores/hobbyStore';
import { useUserStore } from '@/stores/userStore';
import { styles } from '@/styles/styles';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

export default function HobbyList() {
    const {hobbies, fetchHobbies, clearHobbies} = useHobbyStore();
    const {user} = useUserStore();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadHobbies = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          await fetchHobbies(user.id);
        } finally {
          setLoading(false);
        }
      }
    };
    loadHobbies();
    }, [])


  return (
    <View>
       <FlatList 
       style={styles.hobbyList}
       data={hobbies}
       keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
       contentContainerStyle={styles.container}
       ListEmptyComponent={<Text>No Hobbies Created</Text>}
       renderItem={({ item }) => (
        <View>
            <Text>{item.name}</Text>
        </View>
       )}

       >
       
       </FlatList>
           
    </View>
    );
}