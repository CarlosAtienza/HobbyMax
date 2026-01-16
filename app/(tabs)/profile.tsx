import { COLORS } from "@/constants/theme";
import { useAuthStore } from "@/stores/authStore";
import { useHobbyStore } from "@/stores/hobbyStore";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const hobbies = useHobbyStore((state) => state.hobbies);

  const { user, userId, token } = useAuthStore();


  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>No user loaded</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Header */}
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
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push("../(tabs)/settings")}
        >
          <Text style={styles.settingsText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Overview */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.sectionText}>Total Hobbies: {hobbies.length}</Text>
        <Text style={styles.sectionText}>Current Streak: {4}</Text>
      </View>

     
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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

  // Loading / fallback
  loadingText: {
    flex: 1,
    textAlign: "center",
    color: COLORS.white,
    fontSize: 18,
    marginTop: 50,
  },
});


