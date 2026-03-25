import AddGoalModal from "@/components/AddGoalModal";
import GoalsList from "@/components/HobbyId/GoalList";
import HabitList from "@/components/HobbyId/HabitList";
import HobbyLogList from "@/components/HobbyLogList";
import XpBar from "@/components/XpBar";
import { HobbyResponseDTO } from "@/models/api";
import { useAuthStore } from "@/stores/authStore";
import { useHobbyLogStore } from "@/stores/hobbyLogStore";
import { useHobbyStore } from "@/stores/hobbyStore";

import { COLORS } from "@/constants/theme";
import { axiosInstance } from "@/lib/axios";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HobbyDetails() {
  const insets = useSafeAreaInsets();
  const { id: idRaw } = useLocalSearchParams();
  const { hobbyData } = useLocalSearchParams();
  const id = Array.isArray(idRaw) ? idRaw[0] : (idRaw ?? "");
  const { fetchHobbyLogs } = useHobbyLogStore();
  const { token } = useAuthStore();
  const { hobbies, setHobbies } = useHobbyStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalMode, setModalMode] = useState<"habit" | "goal">("goal");
  const [localImage, setLocalImage] = useState<string | null>(null);

  useEffect(() => {
    const hobbyId = Number(id);

    fetchHobbyLogs(hobbyId, token!);
  }, [id, token, hobbies]);

  const hobby: HobbyResponseDTO | undefined = useMemo(() => {
    if (hobbyData) {
      const dataString = Array.isArray(hobbyData) ? hobbyData[0] : hobbyData;
      return JSON.parse(dataString) as HobbyResponseDTO;
    } else {
      return hobbies.find((hobby) => hobby.id === Number(id));
    }
  }, [hobbies, id, hobbyData]);

  const handleAddGoal = async (title: string) => {
    if (title.trim() === "") {
      Alert.alert("Validation Error", "Goal cannot be empty.");
      return;
    }
    await axiosInstance.put(`/hobbies/add-goal/${id}`, title, {
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${token}`,
      },
    });
    Alert.alert("Success", "Goal added successfully!");
  };

  const handleAddHabit = async (title: string) => {
    if (title.trim() === "") {
      Alert.alert("Validation Error", "Habit cannot be empty.");
      return;
    }
    await axiosInstance.put(`/hobbies/add-habit/${id}`, title, {
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${token}`,
      },
    });
    Alert.alert("Success", "Habit added successfully!");
  };

  const handleModalSubmit = async (title: string, _description: string) => {
    if (modalMode === "habit") {
      await handleAddHabit(title);
    } else {
      await handleAddGoal(title);
    }
  };

  const openAddHabitModal = () => {
    setModalMode("habit");
    setShowAddModal(true);
  };

  const openAddGoalModal = () => {
    setModalMode("goal");
    setShowAddModal(true);
  };

  //TODO: DELETE HABIT FUNCTION and GOAL FUNCTION

  const pickAndUploadImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "Permission to access media library is required!",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setLocalImage(imageUri);

      try {
        const formData = new FormData();
        const uriParts = imageUri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("image", {
          uri: imageUri,
          name: `hobbyImage.${fileType}`,
          type: `image/${fileType}`,
        } as any);

        await axiosInstance.put(`/hobbies/${id}/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        // Update local hobbies state
        const updatedHobbies = hobbies.map((h) =>
          h.id === Number(id) ? { ...h, hobbyImage: imageUri } : h,
        );
        setHobbies(updatedHobbies);

        Alert.alert("Success", "Hobby photo updated!");
      } catch (error) {
        console.error("Error uploading image:", error);
        Alert.alert("Error", "Failed to upload image. Please try again.");
        setLocalImage(null);
      }
    }
  };

  return (
    <ScrollView style={[hobbyStyles.container, { paddingTop: insets.top }]}>
      {/* Header Section with Image */}
      <View style={hobbyStyles.headerSection}>
        <Image
          source={
            localImage
              ? { uri: localImage }
              : hobby?.hobbyImage
                ? { uri: hobby?.hobbyImage }
                : require("@/assets/images/hobbyImagePlaceHolder.png")
          }
          style={hobbyStyles.headerImage}
        />
        <View style={hobbyStyles.headerOverlay} />

        {/* Add Photo Button - Top Right */}
        <TouchableOpacity
          style={[hobbyStyles.addPhotoButton, { top: 16 }]}
          onPress={pickAndUploadImage}
        >
          <Ionicons name="camera" size={20} color={COLORS.white} />
        </TouchableOpacity>

        <View style={hobbyStyles.headerContent}>
          <Text style={hobbyStyles.hobbyName}>{hobby?.name || "Hobby"}</Text>
          <View style={hobbyStyles.levelBadge}>
            <Text style={hobbyStyles.levelText}>Level {hobby?.level ?? 1}</Text>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={hobbyStyles.statsContainer}>
        <View style={hobbyStyles.statCard}>
          <Ionicons name="star" size={24} color={COLORS.warning} />
          <Text style={hobbyStyles.statValue}>{hobby?.totalXp ?? 0}</Text>
          <Text style={hobbyStyles.statLabel}>Total XP</Text>
        </View>
        <View style={hobbyStyles.statCard}>
          <Ionicons name="flame" size={24} color={COLORS.error} />
          <Text style={hobbyStyles.statValue}>{hobby?.currentStreak ?? 0}</Text>
          <Text style={hobbyStyles.statLabel}>Current Streak</Text>
        </View>
        <View style={hobbyStyles.statCard}>
          <Ionicons name="trophy" size={24} color={COLORS.success} />
          <Text style={hobbyStyles.statValue}>{hobby?.longestStreak ?? 0}</Text>
          <Text style={hobbyStyles.statLabel}>Best Streak</Text>
        </View>
      </View>

      {/* XP Progress Bar */}
      <View style={hobbyStyles.sectionContainer}>
        <XpBar
          currentXp={hobby?.totalXp ?? 0}
          level={hobby?.level ?? 1}
          xpNeededToLevelUp={hobby?.xpNeededToLevelUp}
        />
      </View>

      {/* Habits Section */}
      <View style={hobbyStyles.sectionContainer}>
        <HabitList
          habits={hobby?.habits ?? []}
          onAddHabit={openAddHabitModal}
        />
      </View>

      {/* Goals Section */}
      <View style={hobbyStyles.sectionContainer}>
        <GoalsList goals={hobby?.goals ?? []} onAddGoal={openAddGoalModal} />
      </View>

      {/* Activity Logs */}
      <View style={hobbyStyles.sectionContainer}>
        <HobbyLogList hobbyId={Number(id)} />
      </View>

      <AddGoalModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleModalSubmit}
        title={modalMode === "habit" ? "Add New Habit" : "Add New Goal"}
      />
    </ScrollView>
  );
}

export const hobbyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerSection: {
    width: "100%",
    height: 280,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  headerContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  hobbyName: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.white,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  levelBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  addPhotoButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statCard: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primaryDark,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
    textAlign: "center",
  },
  sectionContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
});
