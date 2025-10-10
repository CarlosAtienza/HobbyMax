import { axiosInstance } from '@/lib/axios';
import { HobbyRequestDTO } from '@/models/api';
import { useAuthStore } from '@/stores/authStore';
import { useHobbyStore } from '@/stores/hobbyStore';
import { styles } from '@/styles/styles';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Text, TextInput, View } from 'react-native';



export default function create() {


 const router = useRouter();
     const [hobbyName, setHobbyName] = React.useState<string>("");
     const [hobbyDescription, setHobbyDescription] = React.useState<string>("");
     const [hobbyImage, setHobbyImage] = React.useState<string | null>(null);
     const { createHobby } = useHobbyStore();
     const { token } = useAuthStore();
 
 
     const pickImage = async () => {
         const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
         if (permissionResult.granted === false) {
             Alert.alert("Permission Denied", "Permission to access media library is required!");
             return;
         }
         const result = await ImagePicker.launchImageLibraryAsync({
             mediaTypes: ImagePicker.MediaTypeOptions.Images,
             allowsEditing: true,
             aspect: [1, 1],
             quality: 0.5,
     });
     }
 
     const createNewHobby = async () => {
      try {
        const formData = new FormData();

         const newHobby: HobbyRequestDTO = {
             name: hobbyName,
             description: hobbyDescription,
         };

         formData.append("hobby", JSON.stringify({ name: hobbyName, description: hobbyDescription }));


         const response = await axiosInstance.post("/hobbies", formData, {
             headers: { 
                 'Content-Type': 'multipart/form-data',
                 'Authorization': `Bearer ${token}`
             },
         });
         Alert.alert("Success", "Hobby created successfully!");
 
         router.push("/(tabs)");
 
         } catch (err) {
         console.error("Failed to create hobby:", err);
         Alert.alert("Error", "Failed to create hobby. Please try again.");}
     }
 
   return (
     <View style={styles.container}>
       
       <Text style={styles.title}
       numberOfLines={1}
       adjustsFontSizeToFit
       >Create Your New Hobby</Text>
         <TextInput
         style={styles.input}
         placeholder="Hobby Name"
         value={hobbyName}
         onChangeText={setHobbyName}
         />
         <TextInput
         style={styles.input}
         placeholder="Hobby Description"
         value={hobbyDescription}
         onChangeText={setHobbyDescription}
         />
         <Text onPress={createNewHobby} style={styles.button}>Create Hobby</Text>
     </View>
   )
}