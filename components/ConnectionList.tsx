import { useAuthStore } from '@/stores/authStore';
import { useConnectionStore } from '@/stores/connectionStores';
import { styles } from '@/styles/styles';
import { ConnectionResponseDTO } from '@/types';
import React, { useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

export default function ConnectionList() {
    const [ connections, setConnections ] = React.useState<ConnectionResponseDTO>();
    const { userId, token } = useAuthStore();    
    const {fetchConnectionsByUserId } = useConnectionStore();


     useEffect(() => {
          const loadConnections = async () => {
            try {
              if (userId && token) {
                const response = await fetchConnectionsByUserId(userId, token);

              }
            } catch (err){
              console.log("Failed to fetch connections")
            }
          }
      }, [userId, token])

  return (
    <View>
      <FlatList
        data={connections}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        contentContainerStyle={{padding: 20}}
        renderItem={({item}) => {
            <TouchableOpacity 
                          style={styles.searchCard}
                          onPress={() => handlePress(item)}            
                        >
                          <View style={styles.searchAvatarContainer}>
                           
                            <Image source={ 
                              item.profilePhoto 
                               ? {uri: item.profilePhoto}
                               : require("@/assets/images/default-avatar.jpg")
                            }
                                style={styles.searchAvatar}/>
                          </View>
            
                          <View style={styles.searchInfo}>
                            <Text style={styles.username}>{item.username}</Text>
                          </View>
                        </TouchableOpacity>
        }
           
        }
        >

      </FlatList>
    </View>
  )
}