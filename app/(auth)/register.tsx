import { styles } from "@/styles/auth.styles";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {

      const formData = new FormData();
      formData.append("user", JSON.stringify({ username, email, password }));

      const response = await fetch(process.env.BASE_URL + "/auth/register", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
    });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
      const responseData = await response.json();

      await SecureStore.setItemAsync("token", responseData.data.token); 
      console.log("Register success:", responseData.data);
      router.replace("../(tabs)");
    } catch (error: any) {
      console.error("Register failed:", error.response?.data || error.message);
      Alert.alert("Register Failed", "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}
