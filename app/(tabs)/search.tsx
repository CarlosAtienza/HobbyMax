import { axiosInstance } from '@/lib/axios';
import { useAuthStore } from '@/stores/authStore';
import { styles } from '@/styles/styles';
import { UserResponseDTO } from '@/types';
import React from 'react';
import { Alert, Button, FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function search() {
    const [searchInput, setSearchInput] = React.useState<string>("");
    const [searchResults, setSearchResults] = React.useState<UserResponseDTO[]>();
    const { userId, token } = useAuthStore();

    const search = async () => {
        if (searchInput) {
            try {
                const response = await axiosInstance.get("/users/search", {
                     headers: { Authorization: `Bearer ${token}` },
                     params: {username: searchInput }
                });

                if (!response.data || response.data.length === 0){
                    setSearchResults([]);
                    return;
                }

                setSearchResults(response.data);
            } catch (err){
                console.log("Error at search function")
            }
        }
    }

    const sendRequest = async (user: UserResponseDTO) => {
      if (user && userId) {
        try {
          const formData = new FormData();
          formData.append("receiverId", user.id.toString())
          formData.append("requesterId", userId.toString())
          const response = await axiosInstance.post("/connection", formData, {
              headers: { Authorization: `Bearer ${token}` },
          });
          Alert.alert("Sucess", `Request has sent to ${user.username}`);
        } catch (error : any) {
          Alert.alert("Error", error.message);
        }
      }
    }

    const handlePress = (user: UserResponseDTO) => {
    Alert.alert(
      "Send Connection Request",
      `Do you want to send a connection request to ${user.username}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Send", onPress: () => sendRequest(user) },
      ]
    );
  };


  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <TextInput
            style={[styles.input, {flex: 1}]}
            placeholder='Search Here...'
            value={searchInput}
            onChangeText={setSearchInput}
            onSubmitEditing={search}
        />
        <Button title="Search" onPress={search}/>
      </View>
      {searchResults && searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id?.toString() ?? item.username}
          renderItem={({ item }) => (
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
          )}
        />
      ) : (
        <Text style={styles.loadingText}>No results found.</Text>
      )}
        

    </View>
  )
}