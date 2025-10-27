import { COLORS } from "@/constants/theme";
import { useAuthStore } from "@/stores/authStore";
import { useConnectionStore } from "@/stores/connectionStores";
import { useHobbyStore } from "@/stores/hobbyStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
      <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={{ color: "#aaa", marginTop: 4 }}>@{user.email}</Text>
        </View>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => router.push("../(tabs)/settings")}
      >
        <Text style={styles.settingsText}>⚙️</Text>
      </TouchableOpacity>
      
      </View>
       {/* Overview Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.sectionText}>Total Hobbies: {hobbies.length}</Text>
        {/* <Text style={styles.sectionText}>Connections: {connections.length}</Text> */}
        <Text style={styles.sectionText}>XP Level: Coming soon 🚀</Text>
      </View>
    </ScrollView>
  );
}


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ccc",
  },
  username: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.white,
    marginLeft: 20,
  },
  settingsButton: {
    marginLeft: "auto",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 8,
  },
  settingsText: {
    fontSize: 20,
    color: COLORS.white,
  },

  // Section styling
  sectionContainer: {
    marginVertical: 15,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    color: "#444",
  },

  // Connections section
  connectionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  connectionAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 15,
  },
  connectionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  hobbyCountText: {
    fontSize: 14,
    color: "#aaa",
  },

  // Loading / fallback
  loadingText: {
    flex: 1,
    textAlign: "center",
    color: COLORS.white,
    fontSize: 18,
    marginTop: 50,
  },
});


