import { HobbyRequestDTO } from '@/models/api';
import { createHobby } from '@/src/api/hobby-controller';
import { styles } from '@/styles/styles';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Text, TextInput, View } from 'react-native';


export default function CreateHobby() {
    const router = useRouter();
    const [hobbyName, setHobbyName] = React.useState("");
    const [hobbyDescription, setHobbyDescription] = React.useState("");
    const [hobbyImage, setHobbyImage] = React.useState<string | null>(null);


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
        const newHobby: HobbyRequestDTO = {
            name: hobbyName,
            description: hobbyDescription,
            image: hobbyImage ? {
                uri: hobbyImage,
                name: 'hobbyImage.jpg',
                type: 'image/jpeg'
            } as any : null,
        };
        const response = await createHobby(newHobby);
        console.log("Hobby created:", response.data.name);
        router.replace("./(tabs)/index")

        } catch (err) {
        console.error("Failed to create hobby:", err);
        Alert.alert("Error", "Failed to create hobby. Please try again.");}
    }

  return (
    <View style={styles.container}>
      
      <Text>Create Your New Hobby</Text>
        <TextInput
        style={styles.input}
        placeholder="Hobby Name"
        value={hobbyName}
        />
        <TextInput
        style={styles.input}
        placeholder="Hobby Description"
        value={hobbyDescription}
        />
        <Text onPress={createNewHobby} style={styles.button}>Create Hobby</Text>
    </View>
  )
}