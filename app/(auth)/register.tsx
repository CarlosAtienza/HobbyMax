import { COLORS } from "@/constants/theme";
import { RegisterBody } from "@/models/api";
import { register } from "@/src/api/auth-controller";
import { styles } from "@/styles/styles";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  

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


  //TODO: Handle profile pictures later
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {

      const registerBody: RegisterBody = {
        user: JSON.stringify({
          username,
          email,
          password,
        }),
        profilePhoto: profilePhoto ? {
          uri: profilePhoto,
          name: 'profile.jpg',
          type: 'image/jpeg'
        } as any : null,
      };

      const response = await register(registerBody);

      await SecureStore.setItemAsync("token", response.data.token!); 
      console.log("Register success:", response.data.username);

      router.replace("../(tabs)");
      
    } catch (error: any) {
      console.error("Register failed:", error.response?.data || error.message);
      Alert.alert("Register Failed", "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={[COLORS.black, COLORS.primary]} style={styles.container}>
  
      <Text style={styles.title}>Register</Text>

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
