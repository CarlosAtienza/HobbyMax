import { COLORS } from "@/constants/theme";
import { useAuthStore } from "@/stores/authStore";
import { useConnectionStore } from "@/stores/connectionStores";
import { useHobbyStore } from "@/stores/hobbyStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const hobbies = useHobbyStore((state) => state.hobbies);

  // Use selectors for reactive state
  const connections = useConnectionStore((state) => state.connections);
  const fetchConnectionsByUserId = useConnectionStore((state) => state.fetchConnectionsByUserId);

  const { user, userId, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState("connections");

  // Load connections on mount or when userId/token changes
  useEffect(() => {
    const loadConnections = async () => {
      try {
        if (userId && token) {
          await fetchConnectionsByUserId(userId, token);
          console.log("Connections fetched:", connections); // will show updated value after next render
        }
      } catch (err: any) {
        console.log("Failed to fetch connections", err.message);
      }
    };
    loadConnections();
  }, [userId, token]);

  // Debug logs
  console.log("Profile rendered, user:", user);
  console.log("Connections:", connections);

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
        <Text style={styles.sectionText}>Connections: {connections?.length || 0}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "connections" && styles.activeTab]}
          onPress={() => setActiveTab("connections")}
        >
          <Text style={[styles.tabText, activeTab === "connections" && styles.activeTabText]}>
            Connections
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "pending" && styles.activeTab]}
          onPress={() => setActiveTab("pending")}
        >
          <Text style={[styles.tabText, activeTab === "pending" && styles.activeTabText]}>
            Pending Requests
          </Text>
        </TouchableOpacity>
      </View>

      {/* Connection List */}
      {activeTab === "connections" ? (
        connections && connections.length > 0 ? (
          connections.map((conn) => (
            <View key={conn.id} style={styles.connectionCard}>
              <Image source={{ uri: conn.otherUser?.profilePhoto }} style={styles.connectionAvatar} />
              <Text style={styles.connectionName}>{conn.otherUser?.username}</Text>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>You have no connections yet.</Text>
        )
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>No pending requests.</Text>
      )}
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

  // Tab Navigation
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 4,
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: COLORS.white,
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#ff4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
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
   // Pending Requests
  pendingCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  pendingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  messageText: {
    fontSize: 13,
    color: "#666",
    fontStyle: "italic",
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  rejectButton: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  rejectButtonText: {
    color: "#666",
    fontSize: 15,
    fontWeight: "600"
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


