import { COLORS } from "@/constants/theme";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/authStore";
import { styles } from "@/styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setTokens, setUser } = useAuthStore();
  

  const handleLogin = async () => {

     if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", {
        username, 
        password,
      });

      console.log("Login success:", response.data);
      
      const { token, refreshToken, userId } = response.data;

     
      
      //Fetch user profile data
      const userResponse = await axiosInstance.get(`/users/${userId}`, {
              headers: { Authorization: `Bearer ${token}`},
            });

      //Save tokens and user data to store
      await setTokens(
        token,
        refreshToken,
      );

      await setUser(userResponse.data, userId.toString());


     
      
      router.replace("/(tabs)");
      
    } catch (error: any) {
        Alert.alert("Login Failed", error.response.data.error)
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={[COLORS.black, COLORS.primary]} style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        autoCapitalize="none"
        placeholderTextColor="#ccc"
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        placeholderTextColor="#ccc"
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Signing in..." : "Log In"}</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={styles.registerLink}>Register here</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
