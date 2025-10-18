import { HobbyResponseDTO } from '@/models/api';
import { useAuthStore } from '@/stores/authStore';
import { useHobbyStore } from '@/stores/hobbyStore';
import { styles } from '@/styles/styles';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

interface HobbyListProps {
  hobbies: HobbyResponseDTO[];
  loading: boolean;
}

export default function HobbyList() {
  const [logs, setLogs] = React.useState<HobbyResponseDTO[]>([]);
  const router = useRouter();


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
    <View>
       <FlatList 
       style={styles.hobbyList}
       data={hobbies}
       keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
       contentContainerStyle={{paddingBottom: 20}}
       ListEmptyComponent={<Text>No Hobbies Created</Text>}
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
              >
              </Image>

              <View style={styles.hobbyInfo}>
              <Text style={styles.hobbyName}>{item.name}</Text>
                        
            </View>
          </View>
          </TouchableOpacity>       
          
       )}

       >
       
       </FlatList>
           
    </View>
    );
}