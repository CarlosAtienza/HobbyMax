import { COLORS } from "@/constants/theme";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { styles } from "@/styles/styles";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const { setToken } = useAuthStore();
  const { setUser } = useUserStore();
  

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
      setProfilePhoto(result.assets[0].uri);
    }

  }

  

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      
      const formData = new FormData();
      formData.append("user", JSON.stringify({ username, email, password }));

      if (profilePhoto) {
        const uriParts = profilePhoto.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append("profilePhoto", {
          uri: profilePhoto,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      }


      const response = await axiosInstance.post("/auth/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { token, userId } = response.data;

      console.log("Received token:", token);
      
      await SecureStore.setItemAsync("token", token); 
      await SecureStore.setItemAsync("userId", userId.toString());
      console.log("Register success:", response.data.username);
      

      //Fetching user data to store
      const userResponse = await axiosInstance.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}`},
      });

      setUser(userResponse.data);
      await setToken(token);


      router.replace("/(tabs)");
      
    } catch (error: any) {
      if (error.response?.status === 409) {
        Alert.alert("Register Failed", error.response.data.error)
      }
      else {
        Alert.alert("Register failed: ", error.message)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={[COLORS.black, COLORS.primary]} style={styles.container}>
  
      <Text style={styles.title}>Register</Text>

      <View
        style={styles.avatarContainer}
      >
        <TouchableOpacity onPress={pickImage} style={styles.avatarPlaceholder}>
          {profilePhoto ? (
            <Image 
              source={{ uri: profilePhoto }}
              style={styles.avatar}
            />
          ) : (
            <Text style={styles.avatarText}>Pick a Profile Photo</Text>
          )}
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        autoCapitalize="none"
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Registering..." : "Sign up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#888", marginTop: 10 }]}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    
    </LinearGradient>
  );
}
