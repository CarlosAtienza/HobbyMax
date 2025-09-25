import { useHobbyStore } from "@/stores/hobbyStore";
import { useUserStore } from "@/stores/userStore";
import { styles } from "@/styles/styles";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const hobbies = useHobbyStore((state) => state.hobbies);

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
        onPress={() => router.push("/settings")}
      >
        <Text style={styles.settingsText}>⚙️</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}


