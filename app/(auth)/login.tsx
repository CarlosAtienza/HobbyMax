import { axiosInstance } from "@/lib/axios";
import { styles } from "@/styles/auth.styles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/login", {
        username, 
        password,
      });

      console.log("Login success:", response.data);
      router.replace("../(tabs)");
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      Alert.alert("Login Failed", "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing in..." : "Sign in"}
        </Text>
      </TouchableOpacity>

       <TouchableOpacity
        style={[styles.button, { backgroundColor: "#888", marginTop: 10 }]}
        onPress={() => router.push("./(auth)/register")}
      >
        <Text style={styles.buttonText}>Create an account</Text>
      </TouchableOpacity>

    </View>
  );
}
