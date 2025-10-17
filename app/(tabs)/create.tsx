import { axiosInstance } from '@/lib/axios';
import { HobbyRequestDTO } from '@/models/api';
import { useAuthStore } from '@/stores/authStore';
import { useHobbyStore } from '@/stores/hobbyStore';
import { styles } from '@/styles/styles';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Text, TextInput, View } from 'react-native';



export default function create() {


 const router = useRouter();
     const [hobbyName, setHobbyName] = React.useState<string>("");
     const [hobbyDescription, setHobbyDescription] = React.useState<string>("");
     const [hobbyImage, setHobbyImage] = React.useState<string | null>(null);
     const { hobbies, setHobbies } = useHobbyStore();
     const { token, userId } = useAuthStore();
     

 
 
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
      if (!result.canceled) {
          setHobbyImage(result.assets[0].uri);
      }

     }
 
     const createNewHobby = async () => {
      try {
        const formData = new FormData();

         const newHobby: HobbyRequestDTO = {
             name: hobbyName,
             description: hobbyDescription,
         };

        formData.append("name", hobbyName);
        formData.append("description", hobbyDescription);
        console.log("UserId in create hobby:", userId);
        formData.append("userId", userId!.toString());

        

        if (hobbyImage) {
          const uriParts = hobbyImage.split('.');
          const fileType = uriParts[uriParts.length - 1];

            console.log("IMAGE: ", hobbyImage);

          formData.append("profilePhoto", {
            uri: hobbyImage,
            name: `hobbyImage.${fileType}`,
            type: `image/${fileType}`,
          } as any);
        }






         const response = await axiosInstance.post("/hobbies", formData, {
             headers: { 
                 'Content-Type': 'multipart/form-data',
                 'Authorization': `Bearer ${token}`
             },
         });
         Alert.alert("Success", "Hobby created successfully!");
         setHobbies([...hobbies, response.data]);
 
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
        <Text onPress={pickImage} style={styles.button}>Optional: Pick an image for your hobby</Text>
        {hobbyImage ? (
          <View>
            <Text style={{marginTop: 10}}>Image selected</Text>
            <Image
              source={{ uri: hobbyImage }}
              style={styles.hobbyImagePreview}
            />
          </View>
        ) : (
          <Text style={{marginTop: 10}}>No image selected</Text>
        )}     
         <Text onPress={createNewHobby} style={styles.button}>Create Hobby</Text>
     </View>
   )
}