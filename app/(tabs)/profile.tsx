import { useAuthStore } from "@/stores/authStore";
import { useConnectionStore } from "@/stores/connectionStores";
import { useHobbyStore } from "@/stores/hobbyStore";
import { useUserStore } from "@/stores/userStore";
import { styles } from "@/styles/styles";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const hobbies = useHobbyStore((state) => state.hobbies);
  const { connections, fetchConnectionsByUserId } = useConnectionStore();
  const { userId, token } = useAuthStore();

  useEffect(() => {
      const loadConnections = async () => {
        try {
          if (userId && token) {
            const response = await fetchConnectionsByUserId(userId, token);
          }
        } catch (err){
          console.log("Failed to fetch connections")
        }
      }
  }, [userId, token])

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>No user loaded</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
      <Image
        source={
        user.profilePhoto
          ? { uri: user.profilePhoto }
          : require("@/assets/images/default-avatar.jpg")
        }
        style={styles.avatar}
      />
      <Text style={styles.username}>{user.username}</Text>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => router.push("../(tabs)/settings")}
      >
        <Text style={styles.settingsText}>⚙️</Text>
      </TouchableOpacity>
      
      </View>
      <View>
        
      </View>
    </View>
  );
}


