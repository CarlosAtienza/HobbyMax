import { axiosInstance } from '@/lib/axios';
import { ConnectionResponseDTO, UserResponseDTO } from '@/models/api';
import { useAuthStore } from '@/stores/authStore';
import { useConnectionStore } from '@/stores/connectionStores';
import { styles } from '@/styles/styles';
import React, { useEffect } from 'react';
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
export default function ConnectionList() {
    const [ connections, setConnections ] = React.useState<ConnectionResponseDTO[]>();
    const [ unAcceptedConnections, setUnAcceptedConnections ] = React.useState<ConnectionResponseDTO[]>([]);
    const { userId, token } = useAuthStore();    
    const {fetchConnectionsByUserId } = useConnectionStore();


    //TODO: Create a request for connections that have not been accepted
    
     useEffect(() => {
          const loadConnections = async () => {
            try {
              if (userId && token) {
                const response = await fetchConnectionsByUserId(userId, token);

              }
            } catch (err){
              console.log("Failed to fetch connections")
            }
          };
          loadConnections();
      }, [userId, token]);

//Approve a pending request
const approveRequest = async (user: UserResponseDTO) => {
  try {
    const response = await axiosInstance.post(`/connection/${user.username}/accept`, {}, {
      headers: {Authorization: `Bearer ${token}`}
    });
    setUnAcceptedConnections([...unAcceptedConnections, response.data ])
  } catch(err : any) {
    console.log("Failed to approve request", err.message);
    
  }
}

 const handlePress = (user: UserResponseDTO) => {
    Alert.alert(
      "Approve Connection Request",
      `Do you want to approve ${user.username}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Send", onPress: () => approveRequest(user) },
      ]
    );
  };

 
  //Right now item is a Connection response DTO, but im treating it like a userResponse, either 
  //Change it to userreponse or do something else
  return (
    <View>
       <FlatList
        data={connections}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => {
          const user = item.user!;

          return (
            <TouchableOpacity
              style={styles.searchCard}
              onPress={() => handlePress(user)}
            >
              <View style={styles.searchAvatarContainer}>
                <Image
                  source={
                    user.profilePhoto
                      ? { uri: user.profilePhoto }
                      : require('@/assets/images/default-avatar.jpg')
                  }
                  style={styles.searchAvatar}
                />
              </View>

              <View style={styles.searchInfo}>
                <Text style={styles.username}>{user.username}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
          
    </View>
  )
}