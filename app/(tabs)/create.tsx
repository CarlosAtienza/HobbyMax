import { COLORS } from '@/constants/theme';
import { axiosInstance } from '@/lib/axios';
import { HobbyRequestDTO } from '@/models/api';
import { useAuthStore } from '@/stores/authStore';
import { useHobbyStore } from '@/stores/hobbyStore';
import { styles } from '@/styles/styles';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';



export default function create() {

type Goal = {
  id: string;
  value: string;
};

 const router = useRouter();
     const [hobbyName, setHobbyName] = React.useState<string>("");
     const [hobbyDescription, setHobbyDescription] = React.useState<string>("");
     const [hobbyImage, setHobbyImage] = React.useState<string | null>(null);
     const { hobbies, setHobbies } = useHobbyStore();
     const { token, userId } = useAuthStore();
     const screenHeight = Dimensions.get('window').height;
     const [experienceLevel, setExperienceLevel] = React.useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
     const [goals, setGoals] = React.useState<{ id: string, value: string }[]>([]);
     const [goalInput, setGoalInput] = React.useState<string>('')
     const [step, setStep] = React.useState(1);
    

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
      setStep(1);
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

        if (goals && goals.length > 0) {
          goals.forEach((g, idx) => {
            formData.append(`goals[${idx}]`, g.value);
          });
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

     const addGoalHandler = async () => {
      if (!goalInput.trim()){
        Alert.alert('Empty Field', "Add text in the field")
      }
      setGoals([...goals, {id: Math.random().toString(), value: goalInput}]);
      setGoalInput('');
     }


   
 
   return (

     <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 100}
      >
     <ScrollView contentContainerStyle={[styles.container, {padding: 20}]}>

    
     

      {step ===1 && (
        <>
          <TouchableOpacity
              onPress={() => {
                if (!hobbyName.trim() || !hobbyDescription.trim()) {
                  Alert.alert('Error', 'Please fill in the hobby name and description.');
                  return;
                }
              
                setStep(2);
              }}
              style={{
                alignSelf: 'flex-end',
                marginBottom: 20,
                padding: 10,
                backgroundColor: COLORS.primary,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={{ marginBottom: 20, alignItems: 'center' }}>
              {hobbyImage ? (
            <View>
              <Image
                source={{ uri: hobbyImage }}
                style={{ width: '100%', height: screenHeight * 0.0005, borderRadius: 12 }}
              />
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                height: screenHeight * 0.5,
                backgroundColor: COLORS.gray,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: COLORS.gray }}>Tap to select an image</Text>
            </View>
          )}     
          </TouchableOpacity>

        
    
          <TextInput
          style={[styles.input, { marginBottom: 12 }]}
          placeholder="Hobby Name"
          placeholderTextColor={COLORS.black}
          value={hobbyName}
          onChangeText={setHobbyName}
          />
          <TextInput
          style={[styles.input, { marginBottom: 12, height: 80 }]}
          placeholder="Hobby Description"
          placeholderTextColor={COLORS.black}
          value={hobbyDescription}
          onChangeText={setHobbyDescription}
          />
        
      </>
      )}

      {step === 2 && (
        <>
          <TouchableOpacity
              onPress={() => {
                setStep(1);
              }}
              style={{
                alignSelf: 'flex-start',
                marginBottom: 20,
                padding: 10,
                backgroundColor: COLORS.primary,
                borderRadius: 8,
              }}
            >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Back</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10 }}>Experience Level</Text>
          {['Beginner', 'Intermediate', 'Advanced'].map(level => (
            <TouchableOpacity
              key={level}
              onPress={() => setExperienceLevel(level as any)}
              style={{
                padding: 12,
                backgroundColor: experienceLevel === level ? COLORS.primary : COLORS.gray,
                borderRadius: 8,
                marginBottom: 8,
              }}
            >
              <Text style={{ color: '#fff', textAlign: 'center' }}>{level}</Text>
            </TouchableOpacity>
          ))}
        <View style={styles.goalContainer}>
          <TextInput
            style={[styles.input, { marginBottom: 12, height: 80 }]}
            placeholder="Your Goal (e.g., read 3 books/week)"
            placeholderTextColor={COLORS.black}
            value={goalInput}
            onChangeText={setGoalInput}
          />
          <Button title="Add" onPress={addGoalHandler}/>
          </View>
          <FlatList<Goal>
            data={goals}
            keyExtractor={(item) => item.id}
            renderItem={ ({ item }) => (
              <View>
                <Text>{item.value}</Text>
              </View>
            )}
          />



          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setStep(1)} style={[styles.button, { flex: 0.45 }]}>
              <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={createNewHobby} style={[styles.button, { flex: 0.45 }]}>
              <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Create Hobby</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
       
     </ScrollView>
     </KeyboardAvoidingView>
   )
}