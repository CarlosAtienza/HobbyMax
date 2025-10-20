import { axiosInstance } from '@/lib/axios';
import { useAuthStore } from '@/stores/authStore';
import { UserResponseDTO } from '@/types';
import React from 'react';
import { TextInput, View } from 'react-native';

export default function search() {
    const [searchInput, setSearchInput] = React.useState<string>("");
    const [searchResults, setSearchResults] = React.useState<UserResponseDTO[]>();
    const { token } = useAuthStore();

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


  return (
    <View>
      <View>
        <TextInput
            placeholder='Search Here...'
            value={searchInput}
            onChangeText={setSearchInput}
            
        />
        
      </View>
    </View>
  )
}