import { HobbyResponseDTO } from '@/models/api';
import { styles } from '@/styles/styles';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

interface HobbyListProps {
  hobbies: HobbyResponseDTO[];
  loading: boolean;
}

export default function HobbyList({ hobbies, loading }: HobbyListProps) {
  
    const router = useRouter();

    


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